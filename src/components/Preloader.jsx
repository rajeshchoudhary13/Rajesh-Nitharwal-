import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useTransform } from 'framer-motion'
import { profile } from '../data/profile.js'
import { EASE_PAGE } from '../utils/motion.js'
import '../styles/preloader.css'

/**
 * The initial-load preloader. Original implementation; the reference was only
 * ever the *feel* of a premium loader — full-bleed paper, the name set large,
 * a counter and a single hairline that draws itself across.
 *
 * Progress is real, not theatre: `useAppReady` in App.jsx weights four genuine
 * milestones (React mount, webfonts, window load, and a short minimum so a warm
 * cache does not flash) and this component only renders what that hook reports.
 * It also guarantees a hard 3.5s ceiling, so the loader can never trap the page.
 *
 * The counter is subscribed to imperatively via `useMotionValueEvent` rather
 * than rendered from state. The value updates ~60x/second; putting it in state
 * would re-render this component sixty times a second during the single most
 * performance-sensitive moment of the page's life.
 *
 * @param {{ progress: import('framer-motion').MotionValue<number>, onExit: () => void }} props
 */
export default function Preloader({ progress, exiting, onExit }) {
  const [shown, setShown] = useState(0)

  /* The rail fill is a scaleX, so the 0-100 progress value is mapped straight
     to a 0-1 scale factor. Deriving it with useTransform keeps it on the
     compositor — no React render is involved in the bar moving at all. */
  const fillScale = useTransform(progress, [0, 100], [0, 1])

  useMotionValueEvent(progress, 'change', (latest) => {
    /* Floor, not round: the counter must never show 100 while the loader is
       still on screen — reaching 100 is the exit cue, so an early 100 reads as
       a stall. */
    setShown(Math.min(100, Math.floor(latest)))
  })

  /* Lock the page while the loader owns the viewport, so a trackpad flick
     during load does not leave the revealed page scrolled halfway down. */
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  return (
    <motion.div
      className="pre"
      role="status"
      aria-live="polite"
      aria-label="Loading"
      initial={{ opacity: 1 }}
      animate={
        exiting
          ? /* Step 7 + 8 of the brief: the content settles back a touch, then
               the whole plate clips upward off the screen. */
            { opacity: 0, transition: { duration: 0.62, ease: EASE_PAGE, delay: 0.12 } }
          : { opacity: 1 }
      }
      onAnimationComplete={() => exiting && onExit?.()}
    >
      <motion.div
        className="pre__inner"
        animate={exiting ? { scale: 0.985, y: -8 } : { scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_PAGE }}
      >
        {/* Name — fades in and scales from 0.96, per the brief.

            A <p>, not an <h1>: the loader is a transient status overlay that
            sits on top of a page which has its own <h1>, and shipping two of
            them meant every route briefly had a broken heading outline. The
            whole plate is already labelled `role="status"`, so the name here is
            presentation rather than structure. */}
        <motion.p
          className="pre__name"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.72, ease: EASE_PAGE, delay: 0.08 }}
        >
          {profile.name}
        </motion.p>

        {/* Subtitle — rises into place just behind the name. */}
        <motion.p
          className="pre__role"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PAGE, delay: 0.26 }}
        >
          Full Stack Developer
        </motion.p>

        <motion.div
          className="pre__meter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.38 }}
        >
          {/* The rail is a 1px hairline; the fill is scaled, never widthed, so
              the growth is composited rather than laid out. */}
          <span className="pre__rail" aria-hidden="true">
            <motion.span className="pre__fill" style={{ scaleX: fillScale }} />
          </span>

          <span className="pre__count" aria-hidden="true">
            {String(shown).padStart(2, '0')}
            <span className="pre__pct">%</span>
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
