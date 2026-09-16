import { lazy, Suspense } from 'react'
import AnimatedButton from '../components/AnimatedButton.jsx'
import Band from '../components/Band.jsx'
import Masthead from '../components/Masthead.jsx'
import MetricStrip from '../components/MetricStrip.jsx'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import RevealAnimation from '../components/RevealAnimation.jsx'
import SectionSkeleton from '../components/Skeleton.jsx'
import Icon from '../components/Icon.jsx'
import { pageIndex, routes } from '../data/nav.js'
import { site } from '../config/site.js'
import { education, profile, stats } from '../data/profile.js'
import { experience } from '../data/experience.js'
import { advantages } from '../data/advantages.js'
import '../styles/about.css'

/* Services renders data/services.js. It is the one section that reads that
   file, so it is what keeps the six services on the site — "what I build"
   belongs on the page about the person building it. Buildables and WhyMe are
   dropped from this route: their content is now carried directly by the
   strengths ledger and the approach band below, and mounting them as well put
   three consecutive card grids on one page. */
const Services = lazy(() => import('../sections/Services.jsx'))

const meta = routes.find((route) => route.id === 'about')

/**
 * ABOUT — the personal story.
 *
 * COMPOSITION. This page is the asymmetric one. It opens with <Masthead>
 * rather than <PageHeader>, so its first screen is a split — the positioning
 * statement in a wide column, the hard facts in a rail beside it — instead of
 * the centred column every route used to open with.
 *
 * Below that the flow is deliberately not a stack of card grids:
 *
 *   masthead    who this is, with the facts alongside            (split)
 *   story       two-column running prose + education aside       (asymmetric)
 *   career      a vertical timeline, not cards                   (timeline)
 *   approach    how I work, as a numbered ledger                 (ledger)
 *   services    the existing section, the one grid on the page   (grid)
 *   close       where to go next                                 (band)
 *
 * Each block is a different shape from the one above it, which is what stops
 * the page reading as one template applied six times.
 *
 * WHAT WAS REMOVED. The old version mounted About, Services, Buildables and
 * WhyMe — four sections, three of them a card grid, and the About section
 * duplicated `profile.summary` which the page also printed as a standfirst. The
 * prose below carries the summary once, the strengths ledger carries the WhyMe
 * content in a different shape, and the education list moves into the story
 * aside where a reader looking for it would expect it.
 */
export default function AboutPage() {
  /* The three claims that can be counted from the record. `stats` has four
     entries; the fourth (professional roles) is what the timeline below is,
     so printing it as a figure as well would say the same thing twice. */
  const figures = stats.filter((stat) => stat.label !== 'Professional roles')

  return (
    <PageTransition className="page about-page">
      <div className="container">
        <Masthead
          index={pageIndex('about')}
          title={['About']}
          lead={meta.blurb}
          id="about-page-title"
          facts={[
            { key: 'Based in', value: site.location },
            { key: 'Role', value: profile.role },
            { key: 'Current', value: profile.currentCompany },
            { key: 'Experience', value: '1.5+ years' },
            { key: 'Focus', value: 'React Native · MERN' },
          ]}
        />

        {/* ---------- The story ----------
            An asymmetric split: running prose in the wide column, the
            credentials in a narrow sticky aside. This is the page's editorial
            centre of gravity — the one place a visitor reads rather than scans,
            so it gets a proper measure and nothing competes with it. */}
        <section className="about-page__story split split--editorial" aria-labelledby="about-story-title">
          <div className="about-page__prose">
            <Reveal>
              <h2 className="about-page__story-title" id="about-story-title">
                I build the whole feature, not a layer of it.
              </h2>
            </Reveal>

            <Reveal className="prose" delay={0.05}>
              <p>{profile.summary}</p>
              <p>{profile.summarySecondary}</p>
              <p>
                Most of that production experience is mobile — five live client applications on
                Android and iOS — and the way I work is the same on either side of the stack: own
                the feature end to end, from the data model and the API through to the release, and
                leave behind code the next developer can read.
              </p>
              <p>
                Where a platform genuinely will not do what a product needs from JavaScript, I write
                the native module rather than accept the workaround. That is how the background
                location service in the Samriddhi Finance app survives the OS killing the app, and
                how push notifications in the EVClass driver app arrive in every app state.
              </p>
            </Reveal>
          </div>

          {/* The aside. Education and the countable record — the facts a reader
              checks rather than reads, which is exactly what belongs beside
              running prose rather than inside it. */}
          <Reveal className="about-page__aside rail" delay={0.1}>
            <div className="about-page__aside-block">
              <h3 className="about-page__aside-title">
                <Icon name="graduation-cap" size={15} />
                Education
              </h3>
              <ul className="about-page__edu">
                {education.map((item) => (
                  <li key={item.id}>
                    <span className="about-page__edu-degree">{item.degree}</span>
                    <span className="about-page__edu-inst">{item.institute}</span>
                    <span className="about-page__edu-meta">
                      {item.period} · {item.score}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-page__aside-block">
              <h3 className="about-page__aside-title">
                <Icon name="file-text" size={15} />
                The record
              </h3>
              <p className="about-page__aside-text">
                Education, certifications and the full professional history, plus the resume as a
                PDF.
              </p>
              <AnimatedButton to="/resume" variant="outline" size="sm">
                View Resume
              </AnimatedButton>
            </div>
          </Reveal>
        </section>
      </div>

      {/* ---------- Career timeline ----------
          A band, so it breaks the column rhythm, holding a vertical timeline
          rather than the four cards this content used to be. The Experience
          page carries the same roles in full; this is the short form — company,
          role, duration and the one-line summary — with the detail one click
          away. Different depth, not repeated content. */}
      <div className="container">
        <Band
          num="01"
          eyebrow="Career"
          title="Four roles, one direction."
          lead="Frontend to full-stack to production mobile, in about eighteen months."
          headingId="about-career-title"
        >
          <ol className="atimeline">
            {experience.map((role, index) => (
              <RevealAnimation as="li" className="atimeline__item" key={role.id} delay={index * 0.06}>
                <span className="atimeline__marker" aria-hidden="true">
                  <span className={`atimeline__dot${role.current ? ' is-current' : ''}`} />
                </span>

                <div className="atimeline__body">
                  <p className="atimeline__period">
                    {role.period}
                    {role.current && <span className="atimeline__now">Current</span>}
                  </p>
                  <h3 className="atimeline__role">{role.title}</h3>
                  <p className="atimeline__company">
                    {role.company} · {role.location}
                  </p>
                  <p className="atimeline__summary">{role.summary}</p>
                </div>

                {/* The stack for the role, in its own column.

                    Without it the row was a 60ch paragraph on a 1165px band —
                    text left, nothing right, which is precisely the one-sided
                    layout this pass exists to remove. The fix is content rather
                    than a wider measure: stretching the summary to the full band
                    would make it unreadable, and the stack is the fact a reader
                    scanning a career actually wants beside each role. */}
                {role.tech?.length > 0 && (
                  <ul className="atimeline__tech" aria-label={`${role.title} technologies`}>
                    {role.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                )}
              </RevealAnimation>
            ))}
          </ol>

          <Reveal className="atimeline__foot">
            <p>Responsibilities, achievements and the stack for each role.</p>
            <AnimatedButton to="/experience" variant="outline" size="sm">
              Full Experience
            </AnimatedButton>
          </Reveal>
        </Band>
      </div>

      {/* ---------- Approach ----------
          The WhyMe content, as a numbered ledger instead of a six-card grid.
          Same six commitments, same evidence lines, different shape — and it no
          longer sits directly above another card grid. */}
      <div className="container">
        <section className="about-page__approach" aria-labelledby="about-approach-title">
          <Reveal className="about-page__approach-head">
            <p className="band__eyebrow">
              <span className="band__num" aria-hidden="true">
                02
              </span>
              <span>How I work</span>
            </p>
            <h2 className="band__title" id="about-approach-title">
              Six commitments, each with something behind it.
            </h2>
          </Reveal>

          <ol className="aledger">
            {advantages.map((item, index) => (
              <RevealAnimation
                as="li"
                className="aledger__item split"
                key={item.id}
                delay={Math.min(index, 4) * 0.06}
                data-accent={item.accent}
              >
                <div className="aledger__lead">
                  <span className="aledger__num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="aledger__title">
                      <Icon name={item.icon} size={16} />
                      {item.title}
                    </h3>
                    <p className="aledger__text">{item.desc}</p>
                  </div>
                </div>

                {item.evidence && (
                  <p className="aledger__evidence">
                    <Icon name="check" size={13} />
                    {item.evidence}
                  </p>
                )}
              </RevealAnimation>
            ))}
          </ol>
        </section>
      </div>

      {/* The one card grid on this page, and it earns it: six services with
          deliverables and a disclosure is genuinely grid-shaped content. */}
      <Suspense fallback={<SectionSkeleton label="services" cards={3} />}>
        <Services />
      </Suspense>

      {/* ---------- Close ----------
          A metric strip then a closing band. The figures are bare type, so this
          page never shows the filled stat panel the home page opens with. */}
      <div className="container">
        <MetricStrip items={figures} label="The countable record" />

        <Reveal className="pagecta">
          <h2 className="pagecta__title">See what that looks like in practice.</h2>
          <p className="pagecta__text">
            Thirteen projects across mobile and web, with the stack and my part in each one.
          </p>
          <div className="pagecta__actions">
            <AnimatedButton to="/projects" variant="primary">
              View Projects
            </AnimatedButton>
            <AnimatedButton to="/contact" variant="outline">
              Start a Project
            </AnimatedButton>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  )
}
