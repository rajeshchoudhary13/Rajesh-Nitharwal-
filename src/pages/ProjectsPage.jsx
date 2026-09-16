import { lazy, Suspense, useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Info } from 'lucide-react'
import AnimatedButton from '../components/AnimatedButton.jsx'
import Band from '../components/Band.jsx'
import Icon from '../components/Icon.jsx'
import LazyImage from '../components/LazyImage.jsx'
import PageHeader from '../components/PageHeader.jsx'
import PageTransition from '../components/PageTransition.jsx'
import PhoneMockup from '../components/PhoneMockup.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectFilters from '../components/ProjectFilters.jsx'
import ProjectModal from '../components/ProjectModal.jsx'
import Reveal from '../components/Reveal.jsx'
import RevealAnimation from '../components/RevealAnimation.jsx'
import SectionSkeleton from '../components/Skeleton.jsx'
import { pageIndex, routes } from '../data/nav.js'
import {
  activeFilters,
  allProjects,
  countFor,
  featuredProjects,
  projects,
  reading,
  webWork,
} from '../data/projects.js'
import { stagger, viewportOnce } from '../utils/motion.js'
import '../styles/projects.css'
import '../styles/projectspage.css'

/* The five documented client applications get the long-form treatment above;
   CaseStudies is the client-readable narrative for the same five, so it stays
   as the closing chapter of this page rather than being dropped. */
const CaseStudies = lazy(() => import('../sections/CaseStudies.jsx'))

const meta = routes.find((route) => route.id === 'projects')

/**
 * PROJECTS — the work showcase.
 *
 * COMPOSITION. This is the mixed-showcase page, and it is deliberately the
 * least uniform route on the site. Four different treatments, in descending
 * order of prominence:
 *
 *   1. HERO PROJECT      one project, full width, with its own metric strip and
 *                        deep-dive callout. The single most important piece of
 *                        work, given the space to prove it.
 *   2. ALTERNATING ROWS  the remaining documented applications as full-width
 *                        rows, phone mockup and write-up swapping sides down
 *                        the page. Each row carries the seven fields the brief
 *                        asks for: name, description, role, technologies, key
 *                        features, contribution, result.
 *   3. WEB WORK          a compact two-column band — different content, so a
 *                        different shape.
 *   4. THE ARCHIVE       the filterable grid, for everything else. A grid is
 *                        the right answer for "thirteen items, scan for one",
 *                        which is what this section is actually for — it is no
 *                        longer the page's only idea.
 *
 * WHAT CHANGED. The old page mounted Archive, MobileShowcase, WebShowcase and
 * CaseStudies back to back. Three of those four opened with the same
 * <SectionHeading> and put the same five applications on screen a second and
 * third time — the five phone mockups in MobileShowcase were the same five
 * projects already in the grid above them. The hero and the alternating rows
 * replace MobileShowcase entirely: same content, given the room to say
 * something, and shown once.
 */
export default function ProjectsPage() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const close = useCallback(() => setSelected(null), [])

  /* The hero is the first featured project; the rows are the rest of the
     documented five. `projects` is the five client applications — the archive
     below is `allProjects`, which is those plus the earlier web work. */
  const hero = featuredProjects[0]
  const rows = useMemo(() => projects.filter((project) => project.id !== hero?.id), [hero])

  const shown = useMemo(
    () => (filter === 'all' ? allProjects : allProjects.filter((p) => p.tags?.includes(filter))),
    [filter],
  )

  return (
    <PageTransition className="page projects-page">
      <div className="container">
        <PageHeader
          index={pageIndex('projects')}
          title={['Projects']}
          blurb={meta.blurb}
          id="projects-page-title"
        >
          <Reveal className="phead__meta" delay={0.1}>
            <span>{allProjects.length} projects</span>
            <span>5 in production</span>
            <span>Mobile &amp; web</span>
          </Reveal>
        </PageHeader>
      </div>

      {/* ================= 1. HERO PROJECT ================= */}
      {hero && (
        <div className="container">
          <section className="hproj" aria-labelledby="hproj-title">
            <Reveal className="hproj__label">
              <span className="hproj__label-num" aria-hidden="true">
                01
              </span>
              <span>Featured project</span>
            </Reveal>

            <div className="hproj__top split split--editorial">
              <div>
                <RevealAnimation>
                  <p className="hproj__domain">{hero.domain}</p>
                  <h2 className="hproj__title" id="hproj-title">
                    {hero.name}
                  </h2>
                  <p className="hproj__tagline">{hero.tagline}</p>
                  <p className="hproj__desc">{hero.description}</p>
                </RevealAnimation>

                <Reveal className="hproj__actions cluster cluster--stack-mobile" delay={0.08}>
                  <AnimatedButton onClick={() => setSelected(hero)} variant="primary">
                    View Case Study
                  </AnimatedButton>
                  <AnimatedButton to="/contact" variant="ghost">
                    Discuss a Project
                  </AnimatedButton>
                </Reveal>
              </div>

              {/* The schematic device. No screenshots of client apps exist to
                  publish and none are invented — see PhoneMockup. */}
              <Reveal className="hproj__device" delay={0.12}>
                <PhoneMockup project={hero} floating={false} />
              </Reveal>
            </div>

            {/* The stack facts as a rule-separated strip, which is a different
                treatment from the chips the archive cards use below. */}
            {hero.spec?.length > 0 && (
              <Reveal as="dl" className="hproj__spec" aria-label="Technical specification">
                {hero.spec.map((item) => (
                  <div className="hproj__spec-item" key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </Reveal>
            )}

            <div className="hproj__detail split" style={{ '--ratio': '1fr' }}>
              {/* My contribution — the field the brief asks for by name, and
                  the one a client actually wants on a team project. */}
              <RevealAnimation className="hproj__block">
                <h3 className="hproj__block-title">
                  <Icon name="wrench" size={15} />
                  My contribution
                </h3>
                <ul className="hproj__list">
                  {hero.contributions?.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </RevealAnimation>

              {/* The hardest engineering problem in the project. */}
              {hero.deepDive && (
                <RevealAnimation className="hproj__block hproj__block--dive" delay={0.06}>
                  <h3 className="hproj__block-title">
                    <Icon name="zap" size={15} />
                    {hero.deepDive.title}
                  </h3>
                  <p className="hproj__dive-intro">{hero.deepDive.intro}</p>
                  <ul className="hproj__list">
                    {hero.deepDive.points?.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {hero.deepDive.reliability && (
                    <p className="hproj__dive-note">
                      <Icon name="shield" size={13} />
                      {hero.deepDive.reliability}
                    </p>
                  )}
                </RevealAnimation>
              )}
            </div>
          </section>
        </div>
      )}

      {/* ================= 2. ALTERNATING ROWS ================= */}
      <div className="container">
        <Band
          num="02"
          eyebrow="Production applications"
          title="Four more, live on both stores."
          lead="Each one delivered at Emizen Tech. Role, stack, what I built and what the finished product does."
          headingId="projects-rows-title"
        >
          <div className="prow-list">
            {rows.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                onOpen={() => setSelected(project)}
              />
            ))}
          </div>
        </Band>
      </div>

      {/* ================= 3. WEB WORK ================= */}
      <div className="container">
        <section className="webstrip" aria-labelledby="webstrip-title">
          <Reveal className="webstrip__head split split--editorial">
            <div>
              <p className="band__eyebrow">
                <span className="band__num" aria-hidden="true">
                  03
                </span>
                <span>Web &amp; platform work</span>
              </p>
              <h2 className="band__title" id="webstrip-title">
                The web half of the stack.
              </h2>
            </div>
            <p className="webstrip__lead">
              Responsive interfaces, performance work and backend support tasks — the day-to-day of
              the roles before mobile became the focus.
            </p>
          </Reveal>

          <ul className="webstrip__list">
            {webWork.map((item, index) => (
              <RevealAnimation
                as="li"
                className="webstrip__item"
                key={item.id}
                delay={index * 0.06}
                data-accent={item.accent}
              >
                <span className="webstrip__num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="webstrip__body">
                  <h3 className="webstrip__name">
                    <Icon name={item.icon} size={16} />
                    {item.name}
                  </h3>
                  {/* These entries are framed as work areas rather than
                      invented product names, so the attribution matters: it is
                      what makes clear this is real role work. */}
                  <p className="webstrip__source">
                    {item.source} · {item.period}
                  </p>
                  <p className="webstrip__text">{item.summary}</p>
                  {item.tech?.length > 0 && (
                    <ul className="webstrip__tech" aria-label={`${item.name} technologies`}>
                      {item.tech.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </RevealAnimation>
            ))}
          </ul>
        </section>
      </div>

      {/* ================= 4. THE ARCHIVE ================= */}
      <section className="section projects-page__archive" id="archive" aria-labelledby="archive-title">
        <div className="container">
          <Reveal className="projects-page__archive-head">
            <p className="band__eyebrow">
              <span className="band__num" aria-hidden="true">
                04
              </span>
              <span>Full archive</span>
            </p>
            <h2 className="band__title" id="archive-title">
              Every project, in one place.
            </h2>
            <p className="band__lead">
              All {allProjects.length}, filterable by discipline. Open any card for its end-to-end
              flow and the hardest engineering problem inside it.
            </p>
          </Reveal>

          <ProjectFilters
            filters={activeFilters}
            active={filter}
            onChange={setFilter}
            countFor={countFor}
          />

          {/* `layout` lets Framer animate the reflow when a filter removes
              cards, instead of the remaining ones snapping into place. */}
          <motion.div
            className="projects__grid"
            id="projects-grid"
            layout
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  className="projects__cell"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.16 } }}
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                >
                  <ProjectCard project={project} index={index} onOpen={setSelected} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <p className="note projects__note">
            <Info size={14} aria-hidden="true" />
            The five client applications are delivered through Emizen Tech Pvt. Ltd. No public store
            listing or repository is published for them, so their previews are schematic rather than
            screenshots. Earlier web and UI work shows its real screenshots, and carries a live link
            only where the URL still resolves over valid HTTPS.
          </p>

          {/* ---- Reading strip ----
              The previous portfolio listed these under a "Books" filter beside
              its projects. They are books rather than project work, so they keep
              their place on the site but stay out of the work grid — a recruiter
              scanning for projects should never meet a book cover in it.

              Carried over from the <Archive> section this page absorbed;
              `reading` is rendered nowhere else, so dropping it would have
              silently removed the content from the site. */}
          <div className="reading">
            <h3 className="reading__title">
              <BookOpen size={15} strokeWidth={2} aria-hidden="true" />
              Reading &amp; references
            </h3>
            <ul className="reading__list">
              {reading.map((book) => (
                <li className="reading__item" key={book.id}>
                  <span className="reading__cover">
                    <LazyImage src={book.image} alt={`${book.title} cover`} className="reading__img" />
                  </span>
                  <span className="reading__meta">
                    <span className="reading__name">{book.title}</span>
                    <span className="reading__author">{book.author}</span>
                    <span className="reading__note">{book.note}</span>
                    <span className="reading__topic mono">{book.topic}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= 5. CASE STUDIES ================= */}
      <Suspense fallback={<SectionSkeleton label="case studies" cards={2} />}>
        <CaseStudies />
      </Suspense>

      <div className="container">
        <Reveal className="pagecta">
          <h2 className="pagecta__title">Want something like this built?</h2>
          <p className="pagecta__text">
            Tell me what you have in mind and I will come back with a scope and a timeline.
          </p>
          <div className="pagecta__actions">
            <AnimatedButton to="/contact" variant="primary">
              Start a Project
            </AnimatedButton>
            <AnimatedButton to="/skills" variant="outline">
              See the Stack
            </AnimatedButton>
          </div>
        </Reveal>
      </div>

      <ProjectModal project={selected} onClose={close} />
    </PageTransition>
  )
}

/**
 * One alternating project row.
 *
 * The flip is `index % 2` rather than `:nth-child`, and it is applied through
 * CSS `order` — so the DOM keeps the write-up before the device on every row.
 * That matters twice: a screen reader gets a consistent reading order down the
 * page, and the stacked mobile layout puts each write-up above its own device
 * instead of below the previous one's.
 */
function ProjectRow({ project, index, onOpen }) {
  const titleId = `prow-${project.id}-title`
  const flipped = index % 2 === 1

  /* The client applications share one scope statement in the data, so a row
     shows its own specific contributions where it has them and falls back to
     nothing rather than repeating the shared boilerplate five times. */
  const contributions = project.contributions?.slice(0, 3) ?? []

  return (
    <RevealAnimation
      as="article"
      className={`prow split${flipped ? ' split--flip' : ''}`}
      aria-labelledby={titleId}
    >
      <div className="prow__body">
        <p className="prow__index" aria-hidden="true">
          {String(index + 2).padStart(2, '0')}
        </p>

        <h3 className="prow__title" id={titleId}>
          {project.name}
        </h3>
        <p className="prow__domain">{project.domain}</p>
        <p className="prow__text">{project.description}</p>

        <dl className="prow__facts">
          <div className="prow__fact">
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div className="prow__fact">
            <dt>Platform</dt>
            <dd>{project.platform}</dd>
          </div>
          {project.highlight && (
            <div className="prow__fact">
              <dt>Hardest part</dt>
              <dd>{project.highlight}</dd>
            </div>
          )}
        </dl>

        {contributions.length > 0 && (
          <div className="prow__contrib">
            <h4 className="prow__contrib-title">What I built</h4>
            <ul>
              {contributions.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {project.tech?.length > 0 && (
          <ul className="prow__tech" aria-label={`${project.name} technologies`}>
            {project.tech.slice(0, 7).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}

        <div className="prow__actions">
          <AnimatedButton onClick={onOpen} variant="outline" size="sm">
            View Case Study
          </AnimatedButton>
        </div>
      </div>

      <div className="prow__figure">
        {/* Web projects in this list would carry a real screenshot; the five
            client applications do not have one to publish, so they get the
            schematic device instead. */}
        {project.image ? (
          <LazyImage
            src={project.image}
            alt={project.imageAlt ?? `${project.name} interface`}
            className="prow__img"
          />
        ) : (
          <PhoneMockup project={project} index={index} floating={false} />
        )}
      </div>
    </RevealAnimation>
  )
}
