import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useRipple } from '../hooks/useRipple.js'
import { useScrolled } from '../hooks/useScrolled.js'
import { scrollToTop } from '../utils/scroll.js'
import { SPRING, SPRING_POP } from '../utils/motion.js'

/** Circumference of the r=21 progress ring, used as the dash pattern. */
const RADIUS = 21
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Appears after the first viewport of scrolling.
 *
 * The ring around the button doubles as a reading-progress indicator, so the
 * control reports position as well as offering a way back. It is driven by a
 * spring-smoothed motion value — `pathLength` is animated on the compositor, so
 * scrolling triggers no React renders.
 */
export default function BackToTop() {
  const visible = useScrolled(600)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const ripple = useRipple()

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="to-top ripple-host"
          onClick={scrollToTop}
          onPointerDown={ripple.onPointerDown}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.7, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 14 }}
          whileHover={{ y: -3, scale: 1.06 }}
          whileTap={{ scale: 0.93 }}
          transition={SPRING_POP}
        >
          <svg className="to-top__ring" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
            <circle className="to-top__ring-track" cx="24" cy="24" r={RADIUS} />
            <motion.circle
              className="to-top__ring-fill"
              cx="24"
              cy="24"
              r={RADIUS}
              style={{ pathLength: progress }}
              strokeDasharray={CIRCUMFERENCE}
            />
          </svg>
          <motion.span className="to-top__glyph" whileHover={{ y: -2 }} transition={SPRING}>
            <ArrowUp size={19} strokeWidth={2} aria-hidden="true" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
