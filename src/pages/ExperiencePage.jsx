import { lazy, Suspense } from 'react'
import AnimatedButton from '../components/AnimatedButton.jsx'
import Band from '../components/Band.jsx'
import MetricStrip from '../components/MetricStrip.jsx'
import PageHeader from '../components/PageHeader.jsx'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionSkeleton from '../components/Skeleton.jsx'
import { pageIndex, routes } from '../data/nav.js'
import { experience } from '../data/experience.js'
import { projects } from '../data/projects.js'
import '../styles/experiencepage.css'

/* The existing Experience section is the scroll-driven timeline — thin rail,
   node per role, staggered reveal — and it is the right shape for this page, so
   it is reused rather than rebuilt. Process sits underneath it because "how I
   work" is the question that follows "where have you worked". */
const Experience = lazy(() => import('../sections/Experience.jsx'))
const Process = lazy(() => import('../sections/Process.jsx'))

const meta = routes.find((route) => route.id === 'experience')

/**
 * EXPERIENCE — the career journey.
 *
 * COMPOSITION. The timeline is this page's whole identity, so unlike the other
 * routes it does not try to introduce a second structural gesture above it. What
 * it adds instead is *framing*: a horizontal span strip that shows the shape of
 * the career before the reader starts down the vertical timeline, so the
 * timeline is read as a trajectory rather than as four disconnected jobs.
 *
 *   masthead   the standard column — this page's distinction is the timeline
 *   span       a horizontal strip: four roles, left to right, with dates
 *   metrics    the countable record, as bare figures
 *   timeline   the existing section, unchanged
 *   process    how I work
 *   close      the credentials behind it
 *
 * The About page also shows a timeline, deliberately at a different depth: it
 * carries company, role, duration and a one-line summary, where this one carries
 * the full responsibilities, achievements and stack per role. Same shape, two
 * levels of detail, with the link between them stated on both pages — which is
 * the difference between a summary and a repeat.
 */
export default function ExperiencePage() {
  /* Derived from the data rather than written out, so adding a role updates the
     strip, the count and the span together. `experience` is newest-first, which
     is right for the timeline and wrong for a left-to-right span. */
  const chronological = [...experience].reverse()

  /* The span's endpoints. Read off the first and last periods rather than
     hard-coded, so they cannot fall out of step with the roles. */
  const firstYear = chronological[0]?.period.match(/\d{4}/)?.[0]
  const currentRole = experience.find((role) => role.current) ?? experience[0]

  /* Counted from the data, not written down: a hard-coded company count is
     exactly the sort of figure that silently goes wrong the first time a role is
     added. All four roles are in Jaipur and all four companies are distinct, so
     both of these are derived rather than asserted. */
  const companies = new Set(experience.map((role) => role.company)).size

  const figures = [
    { value: experience.length, label: 'Professional roles' },
    { value: 1.5, suffix: '+', decimals: 1, label: 'Years building software' },
    { value: projects.length, label: 'Live production apps' },
    { value: companies, label: 'Companies' },
  ]

  return (
    <PageTransition className="page experience-page">
      <div className="container">
        <PageHeader
          index={pageIndex('experience')}
          title={['Experience']}
          blurb={meta.blurb}
          id="experience-page-title"
        >
          <Reveal className="phead__meta" delay={0.1}>
            <span>{firstYear ? `${firstYear} – present` : 'Since 2024'}</span>
            <span>{experience.length} roles</span>
            <span>{currentRole.company}</span>
          </Reveal>
        </PageHeader>

        {/* ---------- Span strip ----------
            The shape of the career, left to right, before the vertical timeline
            below. Four steps from a web development internship to owning React
            Native features on live client apps — which is the story the
            timeline tells one card at a time and nothing showed at a glance. */}
        <section className="cspan" aria-labelledby="cspan-title">
          <Reveal className="cspan__head">
            <p className="band__eyebrow">
              <span className="band__num" aria-hidden="true">
                01
              </span>
              <span>The trajectory</span>
            </p>
            <h2 className="band__title" id="cspan-title">
              Intern to production, in four steps.
            </h2>
          </Reveal>

          <Reveal as="ol" className="cspan__list" delay={0.06}>
            {chronological.map((role, index) => (
              <li className="cspan__step" key={role.id} data-current={role.current || undefined}>
                <span className="cspan__marker" aria-hidden="true">
                  <span className="cspan__dot" />
                </span>
                <span className="cspan__period">{role.period}</span>
                <span className="cspan__role">{role.title.replace(' — Internship', '')}</span>
                <span className="cspan__company">{role.company.replace(/ (Pvt\.|Private).*$/, '')}</span>
                {/* The step number reads as progression rather than as a count. */}
                <span className="cspan__num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </li>
            ))}
          </Reveal>
        </section>

        <MetricStrip items={figures} label="The countable record" className="experience-page__metrics" />
      </div>

      <Suspense fallback={<SectionSkeleton label="experience" cards={3} />}>
        <Experience />
      </Suspense>

      <Suspense fallback={<SectionSkeleton label="process" cards={4} />}>
        <Process />
      </Suspense>

      <div className="container">
        <Band
          num="04"
          eyebrow="Credentials"
          title="The record behind it."
          lead="Education, certifications and the full professional history, plus the resume as a PDF."
          variant="flush"
          headingId="experience-close-title"
        >
          <div className="cluster cluster--stack-mobile">
            <AnimatedButton to="/resume" variant="primary">
              View Resume
            </AnimatedButton>
            <AnimatedButton to="/contact" variant="outline">
              Get In Touch
            </AnimatedButton>
          </div>
        </Band>
      </div>
    </PageTransition>
  )
}
