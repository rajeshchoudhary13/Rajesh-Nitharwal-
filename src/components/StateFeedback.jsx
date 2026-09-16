import { motion } from 'framer-motion'
import { Inbox } from 'lucide-react'
import { fadeUp, SPRING_POP, SPRING_SOFT, stagger } from '../utils/motion.js'

/**
 * Small shared feedback primitives: success and empty.
 * Grouped in one module because they are always used together with a form or a
 * list, and each is only a few lines of markup.
 */

/**
 * Success tick that draws itself, inside a ring that springs in.
 * Decorative — the caller owns the announced message.
 * @param {{ size?: number }} props
 */
export function SuccessCheck({ size = 46 }) {
  return (
    <motion.span
      className="check"
      style={{ '--check-size': `${size}px` }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={SPRING_POP}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M4.5 12.6l4.7 4.6L19.5 6.9" />
      </svg>
    </motion.span>
  )
}

/**
 * Empty state for a list or panel that has nothing to show.
 * @param {{ icon?: React.ComponentType, title: string, text?: string,
 *           action?: React.ReactNode }} props
 */
export function EmptyState({ icon: Glyph = Inbox, title, text, action }) {
  return (
    <motion.div
      className="empty"
      variants={stagger(0.06)}
      initial="hidden"
      animate="show"
      role="status"
      aria-live="polite"
    >
      <motion.span
        className="empty__icon"
        variants={fadeUp}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Glyph size={24} strokeWidth={1.6} aria-hidden="true" />
      </motion.span>
      <motion.p className="empty__title" variants={fadeUp}>
        {title}
      </motion.p>
      {text && (
        <motion.p className="empty__text" variants={fadeUp}>
          {text}
        </motion.p>
      )}
      {action && (
        <motion.div variants={fadeUp} transition={SPRING_SOFT}>
          {action}
        </motion.div>
      )}
    </motion.div>
  )
}
