import { motion } from 'framer-motion'
import { PAGE_TRANSITION, pageVariants } from '../utils/motion.js'

/**
 * The wrapper every route renders inside.
 *
 * <AnimatePresence mode="wait"> in App.jsx keys on the pathname, so the
 * outgoing page finishes its exit before the incoming one mounts. That ordering
 * is what makes the cross-fade read as one movement instead of two pages
 * briefly stacked — and it is also why the exit here is shorter than the enter:
 * the visitor has already decided to leave, so the departure should not make
 * them wait for it.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">,
 * which strips the transform and leaves the opacity fade.
 */
export default function PageTransition({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={PAGE_TRANSITION}
    >
      {children}
    </motion.div>
  )
}
