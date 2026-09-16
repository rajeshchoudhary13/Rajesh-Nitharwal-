import { motion } from 'framer-motion'
import AnimatedText from './AnimatedText.jsx'
import { pageChild, pageStagger, ruleIn } from '../utils/motion.js'

/**
 * The asymmetric masthead — the alternative to <PageHeader>.
 *
 * <PageHeader> stacks index, title, blurb and rule in one left-aligned column,
 * and every route opened with it. That is what made the pages read as one
 * template: the first 300px of all seven were structurally identical.
 *
 * This one is a split. The title and lead hold the wide column; `facts` become
 * a rule-separated rail beside them, carrying the numbers and labels that were
 * otherwise dropped into the page body as yet another card grid. The rail is
 * sticky on desktop (`.rail`), so it stays with the reader through the first
 * screen of content.
 *
 * Pages use this OR <PageHeader>, never both — so half the routes open with a
 * column and half with a split, which is the point.
 *
 * The heading is an <h1>: each route is its own document with its own outline.
 *
 * @param {{
 *   index?: string,
 *   title: string | string[],
 *   lead?: React.ReactNode,
 *   facts?: Array<{ key: string, value: React.ReactNode }>,
 *   ratio?: number,
 *   id?: string,
 *   children?: React.ReactNode,
 * }} props
 */
export default function Masthead({
  index,
  title,
  lead,
  facts = [],
  /* Wide title column by default. The rail carries short facts, so it does not
     need half the page — and an even split here would be the symmetric layout
     this component exists to avoid. */
  ratio = 1.45,
  id,
  children,
}) {
  const lines = Array.isArray(title) ? title : [title]

  return (
    <motion.header
      className="mast split"
      style={{ '--ratio': `${ratio}fr` }}
      variants={pageStagger(0.09, 0.04)}
      initial="hidden"
      animate="show"
    >
      <div>
        {index && (
          <motion.span className="mast__index" variants={pageChild} aria-hidden="true">
            {index}
          </motion.span>
        )}

        {/* Runs its own entrance rather than waiting on a scroll trigger:
            AnimatePresence remounts the page on every route change, so this is
            always above the fold when it mounts. */}
        <AnimatedText className="mast__title" lines={lines} as="h1" id={id} delay={0.1} />

        {lead && (
          <motion.p className="mast__lead" variants={pageChild}>
            {lead}
          </motion.p>
        )}

        {children && <motion.div variants={pageChild}>{children}</motion.div>}
      </div>

      {facts.length > 0 && (
        /* `<dl>` because these are genuinely term/definition pairs, and a
           screen reader announcing "Location, Jaipur India" is the correct
           reading. The wrapping divs are permitted in a dl and are what let
           each pair be one bordered row. */
        <motion.dl className="mast__rail rail" variants={pageChild}>
          {facts.map((fact) => (
            <div className="mast__fact" key={fact.key}>
              <dt className="mast__fact-key">{fact.key}</dt>
              <dd className="mast__fact-val">{fact.value}</dd>
            </div>
          ))}
        </motion.dl>
      )}

      {/* Only drawn when there is no rail — with a rail the split's own edge
          already closes the masthead, and a rule as well is one line too many. */}
      {facts.length === 0 && (
        <motion.span className="phead__rule" variants={ruleIn} aria-hidden="true" />
      )}
    </motion.header>
  )
}
