import { lazy, Suspense } from 'react'
import AnimatedButton from '../components/AnimatedButton.jsx'
import PageHeader from '../components/PageHeader.jsx'
import PageTransition from '../components/PageTransition.jsx'
import RevealAnimation from '../components/RevealAnimation.jsx'
import SectionSkeleton from '../components/Skeleton.jsx'
import { pageIndex, routes } from '../data/nav.js'
import { profile } from '../data/profile.js'

/* Resume carries the certifications and the PDF actions; Experience repeats the
   timeline here because a resume page without the employment history would send
   the visitor back a page to find it. */
const Resume = lazy(() => import('../sections/Resume.jsx'))
const Experience = lazy(() => import('../sections/Experience.jsx'))

const meta = routes.find((route) => route.id === 'resume')

export default function ResumePage() {
  return (
    <PageTransition className="page">
      <div className="container">
        <PageHeader index={pageIndex('resume')} title={['Resume']} blurb={meta.blurb} id="resume-page-title">
          <RevealAnimation className="phead__actions" delay={0.1}>
            <AnimatedButton
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              variant="primary"
              arrow={false}
            >
              Download PDF
            </AnimatedButton>
            <AnimatedButton href={profile.resumeUrl} variant="outline" arrow={false}>
              Open in browser
            </AnimatedButton>
          </RevealAnimation>
        </PageHeader>
      </div>

      <Suspense fallback={<SectionSkeleton label="background" cards={2} />}>
        <Resume />
      </Suspense>

      <Suspense fallback={<SectionSkeleton label="experience" cards={3} />}>
        <Experience />
      </Suspense>
    </PageTransition>
  )
}
