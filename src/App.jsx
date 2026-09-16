import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Cursor from './components/Cursor.jsx'
import Navigation from './components/Navigation.jsx'
import Preloader from './components/Preloader.jsx'
import SectionSkeleton from './components/Skeleton.jsx'
import Footer from './sections/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import { useAppReady } from './hooks/useAppReady.js'
import { EASE } from './utils/motion.js'
import './styles/page.css'

/**
 * APPLICATION SHELL
 * -----------------
 * A real multi-page site: six routes plus /resume, each with its own URL, its
 * own <h1> and its own entrance. The long single-scroll document this replaced
 * is gone, but none of its content is — every section component it rendered is
 * still rendered, redistributed across the pages where a visitor would look for
 * it (see the individual files in ./pages).
 *
 * Home is imported eagerly because it is the landing route and must be in the
 * first paint; the other six are code-split, so visiting /about downloads only
 * that page's chunk. The shared chunks — sections used by more than one page —
 * are hoisted by Rollup automatically.
 */
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const SkillsPage = lazy(() => import('./pages/SkillsPage.jsx'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage.jsx'))
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
const BlogsPage = lazy(() => import('./pages/BlogsPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const ResumePage = lazy(() => import('./pages/ResumePage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

export default function App() {
  const { progress, ready } = useAppReady()

  /* Two flags, not one. `ready` says loading has finished, but the loader still
     has an exit animation to play, and the page underneath must not be
     scrollable or focusable until that finishes — so `dismissed` is what
     actually unmounts it, set by the Preloader's own onExit. */
  const [dismissed, setDismissed] = useState(false)

  /* Belt and braces over the hook's own 3.5s ceiling: if the exit animation
     itself never completes (a backgrounded tab suspends rAF, so onAnimationComplete
     can genuinely never fire), this removes the loader anyway. The loader must
     never be able to trap the site. */
  useEffect(() => {
    if (!ready) return undefined
    const timer = setTimeout(() => setDismissed(true), 1400)
    return () => clearTimeout(timer)
  }, [ready])

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE }}>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <AnimatePresence>
        {!dismissed && (
          <Preloader
            key="preloader"
            progress={progress}
            exiting={ready}
            onExit={() => setDismissed(true)}
          />
        )}
      </AnimatePresence>

      <Cursor />

      <div className="shell">
        <Navigation />
        <main className="shell__main" id="main">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}

/**
 * The routing table, wrapped so the transition can key on the location.
 *
 * `mode="wait"` matters: it holds the incoming page until the outgoing one has
 * finished leaving. Without it both pages are mounted at once and the taller of
 * the two sets the scroll height, which makes the page visibly jump mid-fade.
 *
 * The Suspense fallback sits *inside* AnimatePresence, so a lazy chunk that is
 * still downloading does not abort the exit animation of the page being left.
 */
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense key={location.pathname} fallback={<PageFallback />}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          {/* The brief lists both / and /home; /home redirects so the landing
              page keeps exactly one canonical URL. `replace` keeps it out of
              the history stack, so Back does not bounce between the two. */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          {/* `/blog` singular is accepted too — it is the form people type and
              guess, and a 404 on it would be a self-inflicted dead end. */}
          <Route path="/blog" element={<Navigate to="/blogs" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

/** Holds the page's own height while a route chunk downloads. */
function PageFallback() {
  return (
    <div className="page container">
      <SectionSkeleton label="loading" cards={2} />
    </div>
  )
}
