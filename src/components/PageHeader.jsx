import { motion } from 'framer-motion'
import AnimatedText from './AnimatedText.jsx'
import { pageChild, pageStagger, ruleIn } from '../utils/motion.js'

/**
 * The masthead every routed page opens with.
 *
 * One component so all six pages share an identical vertical rhythm — index,
 * title, standfirst, rule — which is most of what makes a set of pages read as
 * one publication rather than six separate templates.
 *
 * The heading is an <h1> because each of these is now its own document with its
 * own outline; the sections underneath keep their <h2>s, so the hierarchy is
 * correct per page rather than per site.
 *
 * @param {{ index?: string, title: string | string[], blurb?: React.ReactNode }} props
 */
export default function PageHeader({ index, title, blurb, id, children }) {
  const lines = Array.isArray(title) ? title : [title]

  return (
    <motion.header
      className="phead"
      variants={pageStagger(0.09, 0.04)}
      initial="hidden"
      animate="show"
    >
      {index && (
        <motion.p className="phead__index" variants={pageChild} aria-hidden="true">
          {index}
        </motion.p>
      )}

      {/* AnimatePresence remounts the page on every route change, so this runs
          its own entrance rather than waiting on a scroll trigger. */}
      <AnimatedText className="phead__title" lines={lines} as="h1" id={id} delay={0.1} />

      {blurb && (
        <motion.p className="phead__blurb" variants={pageChild}>
          {blurb}
        </motion.p>
      )}

      <motion.span className="phead__rule" variants={ruleIn} aria-hidden="true" />

      {children}
    </motion.header>
  )
}
