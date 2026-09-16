import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Clock } from 'lucide-react'
import AnimatedButton from '../components/AnimatedButton.jsx'
import AnimatedText from '../components/AnimatedText.jsx'
import Icon from '../components/Icon.jsx'
import PageTransition from '../components/PageTransition.jsx'
import RevealAnimation from '../components/RevealAnimation.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionSkeleton from '../components/Skeleton.jsx'
import TechIcon from '../components/TechIcon.jsx'
import { channels, site } from '../config/site.js'
import { profile, stats } from '../data/profile.js'
import { featuredProjects } from '../data/projects.js'
import { services } from '../data/services.js'
import { skillGroups } from '../data/skills.js'
import { pageChild, pageStagger } from '../utils/motion.js'
import '../styles/home.css'

const TrustStats = lazy(() => import('../sections/TrustStats.jsx'))

/**
 * HOME — the introduction.
 *
 * WHAT CHANGED AND WHY
 * The previous version was a single 62ch column of type on a 1280px container,
 * which left roughly half the page empty to the right of every element on it —
 * the "content feels concentrated on one side" problem, in its purest form. It
 * also stopped after the hero and two project links, so the page never
 * answered "what can you do for me" at all.
 *
 * It is now a genuine two-column hero — copy left, a signal panel right — over
 * four short bands that each answer one question and hand off to the page that
 * answers it properly:
 *
 *   hero         who is this, and what do they do
 *   trust bar    is there any evidence behind that
 *   value prop   what do I get out of working with them   (new)
 *   selected     what has that looked like in practice
 *   stack        what do they build it with                (new)
 *   services     what could they do for me                 (new)
 *   close        what do I do next                         (new)
 *
 * The page stays a taste rather than a summary: two projects, six technologies,
 * three services. Everything is one click from where it is shown, and no block
 * repeats content another block already carried.
 *
 * The headline is set per-line so the break is chosen rather than left to the
 * viewport; <AnimatedText> carries the sentence intact for screen readers.
 */
const HEADLINE = ['Full Stack', 'Developer']

/* The value proposition. Three claims, each of which the site can evidence
   elsewhere — deliberately not adjectives about being passionate. */
const VALUE = [
  {
    id: 'end-to-end',
    title: 'Owned end to end',
    text: 'Data model, API, client and store release. One person accountable for the feature rather than a handoff at every layer.',
  },
  {
    id: 'production',
    title: 'Shipped, not prototyped',
    text: 'Five client applications live on Android and iOS, including the native work the platform forced — background services, push in every app state.',
  },
  {
    id: 'maintainable',
    title: 'Readable afterwards',
    text: 'Typed contracts, one state pattern, and a component the next developer can change without archaeology.',
  },
]

/* Six technologies, read from the skills data rather than hard-coded, so this
   strip cannot drift out of step with the Skills page. `level: 'Core'` is that
   file's existing marker for the strongest items.

   Taken one per group rather than as a flat `slice(0, 6)`: flattening returns
   the first six in file order, which is React.js, JavaScript, Redux Toolkit,
   React Native, Android, iOS — three frontend and three mobile, with nothing
   from the server side at all. That would advertise a mobile developer on a
   page whose headline says full stack. One per group spans the stack, which is
   the claim the hero is actually making. */
const CORE_TECH = skillGroups
  .map((group) => group.skills.find((skill) => skill.level === 'Core') ?? group.skills[0])
  .filter(Boolean)
  .slice(0, 6)

export default function HomePage() {
  /* Two projects, not the whole archive — this is a taste, and /projects is one
     click away. */
  const selected = featuredProjects.slice(0, 2)
  /* Three of the six services. The rest are on /about, where the full set with
     deliverables and detail already lives. */
  const preview = services.slice(0, 3)

  return (
    <PageTransition className="page home">
      {/* ---------- Hero ---------- */}
      <div className="container">
        <motion.div
          className="home__hero split"
          variants={pageStagger(0.09, 0.05)}
          initial="hidden"
          animate="show"
        >
          <div className="home__hero-copy">
            <motion.p className="home__eyebrow" variants={pageChild}>
              <span className="home__eyebrow-dot" aria-hidden="true" />
              {site.available ? site.availabilityLabel : site.availabilityBusyLabel}
            </motion.p>

            <motion.p className="home__name" variants={pageChild}>
              {profile.name}
            </motion.p>

            <AnimatedText className="home__title" lines={HEADLINE} as="h1" delay={0.18} />

            <motion.p className="home__intro" variants={pageChild}>
              {profile.heroIntro}
            </motion.p>

            <motion.div className="home__actions" variants={pageChild}>
              <AnimatedButton to="/projects" variant="primary">
                View Projects
              </AnimatedButton>
              <AnimatedButton to="/contact" variant="outline">
                Contact Me
              </AnimatedButton>
              <AnimatedButton
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                variant="ghost"
                arrow={false}
                className="home__resume"
              >
                Download Resume
              </AnimatedButton>
            </motion.div>
          </div>

          {/* The right column. Not decoration: it carries the facts a visitor
              would otherwise have to hunt for — where he is, how fast he
              replies, what he works in, and where to reach him. That is what
              gives the hero a second column with something to say. */}
          <motion.aside className="home__signal" variants={pageChild} aria-label="At a glance">
            <dl className="home__signal-facts">
              <div className="home__signal-fact">
                <dt>
                  <MapPin size={13} strokeWidth={1.7} aria-hidden="true" />
                  Based in
                </dt>
                <dd>{site.location}</dd>
              </div>
              <div className="home__signal-fact">
                <dt>
                  <Clock size={13} strokeWidth={1.7} aria-hidden="true" />
                  Response
                </dt>
                <dd>{site.responseTime.replace('Replies within ', 'Within ')}</dd>
              </div>
              <div className="home__signal-fact">
                <dt>
                  <Icon name="code" size={13} />
                  Focus
                </dt>
                <dd>React Native &amp; MERN</dd>
              </div>
            </dl>

            <ul className="home__signal-tech" aria-label="Core technologies">
              {CORE_TECH.map((skill) => (
                <li key={skill.name}>
                  {/* Same fallback the Skills page uses: a real brand mark where
                      the technology has one, an honest generic glyph where it
                      does not. <TechIcon> renders nothing for an unknown slug,
                      so the branch is required rather than defensive. */}
                  {skill.brand ? (
                    <TechIcon slug={skill.brand} size={18} />
                  ) : (
                    <Icon name={skill.icon} size={18} />
                  )}
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>

            <ul className="home__socials" aria-label="Elsewhere">
              {channels.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    aria-label={channel.label}
                    title={channel.label}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  >
                    <Icon name={channel.icon} size={16} />
                    <span>{channel.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.aside>
        </motion.div>
      </div>

      <Suspense fallback={<SectionSkeleton label="experience at a glance" cards={1} />}>
        <TrustStats />
      </Suspense>

      {/* ---------- Value proposition ----------
          Three columns of type with a rule above each. Deliberately not cards:
          the trust bar directly above is already a panel, and two panels in
          sequence is where the old page started to read as one template. */}
      <section className="section home__value" aria-labelledby="home-value-title">
        <div className="container">
          <Reveal className="home__value-head">
            <h2 className="home__value-title" id="home-value-title">
              What you get
            </h2>
            <p className="home__value-lead">
              The same three things on every project, whether it is a mobile app or the API behind
              one.
            </p>
          </Reveal>

          <ul className="home__value-list grid-cards" data-cols="3" style={{ '--min': '240px' }}>
            {VALUE.map((item, index) => (
              <RevealAnimation as="li" key={item.id} delay={index * 0.07} className="home__value-item">
                <span className="home__value-num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="home__value-item-title">{item.title}</h3>
                <p className="home__value-text">{item.text}</p>
              </RevealAnimation>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Selected work ---------- */}
      <section className="section home__selected" aria-labelledby="home-selected-title">
        <div className="container">
          <RevealAnimation className="home__selected-head">
            <h2 className="home__selected-title" id="home-selected-title">
              Selected work
            </h2>
            <AnimatedButton to="/projects" variant="ghost" size="sm" className="home__selected-link">
              All projects
            </AnimatedButton>
          </RevealAnimation>

          <ul className="home__selected-list">
            {selected.map((project, index) => (
              <RevealAnimation as="li" key={project.id} delay={index * 0.08} className="home__work">
                {/* These are client applications under NDA-style attribution —
                    `links` is empty for all of them in the data, so the card
                    routes to /projects rather than inventing a live URL. */}
                <Link className="home__work-link" to="/projects">
                  <span className="home__work-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="home__work-body">
                    <span className="home__work-name">{project.name}</span>
                    <span className="home__work-cat">{project.domain}</span>
                    {/* The one-line "hardest part" from the project record. It
                        is the reason to click, and the old list omitted it. */}
                    {project.highlight && (
                      <span className="home__work-note">{project.highlight}</span>
                    )}
                  </span>
                  <span className="home__work-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </RevealAnimation>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Services preview ----------
          A numbered list, not a card grid — /about carries the full six with
          deliverables, and repeating that treatment here would be the same
          component twice on two pages. */}
      <section className="section home__services" aria-labelledby="home-services-title">
        <div className="container">
          <div className="split split--editorial">
            <div>
              <Reveal>
                <h2 className="home__services-title" id="home-services-title">
                  How I can help
                </h2>
                <p className="home__services-lead">
                  Six services in total, all of them evidenced by work on this site. These are the
                  three clients ask for most.
                </p>
                <AnimatedButton to="/about" variant="outline" size="sm">
                  All services
                </AnimatedButton>
              </Reveal>
            </div>

            <ol className="home__services-list">
              {preview.map((service, index) => (
                <RevealAnimation as="li" key={service.id} delay={index * 0.07} className="home__service">
                  <span className="home__service-num" aria-hidden="true">
                    {service.num}
                  </span>
                  <div className="home__service-body">
                    <h3 className="home__service-name">{service.title}</h3>
                    <p className="home__service-text">{service.lead}</p>
                  </div>
                </RevealAnimation>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- Close ----------
          A full-width closing statement rather than the `.pagecta` block every
          other page used to end with — this is the landing page, and its close
          should be the strongest one on the site. */}
      <section className="section home__close" aria-labelledby="home-close-title">
        <div className="container">
          <RevealAnimation className="home__close-inner">
            <h2 className="home__close-title" id="home-close-title">
              Have something that needs building?
            </h2>
            <p className="home__close-text">
              Tell me what you have in mind and I will come back with a scope, a timeline and a
              figure. {site.responseTime.replace('Replies', 'I reply')}.
            </p>
            <div className="home__close-actions cluster cluster--stack-mobile">
              <AnimatedButton to="/contact" variant="primary">
                Start a Project
              </AnimatedButton>
              <AnimatedButton to="/projects" variant="outline">
                See the Work
              </AnimatedButton>
            </div>
          </RevealAnimation>

          {/* The countable record, as bare figures. The trust bar at the top of
              the page is a filled panel; this is the same kind of information in
              a different treatment, closing the page on evidence. */}
          <Reveal as="ul" className="home__close-stats" aria-label="By the numbers">
            {stats.map((stat) => (
              <li key={stat.label}>
                <span className="home__close-stat-value">
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="home__close-stat-label">{stat.label}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
