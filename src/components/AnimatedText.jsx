import { motion } from 'framer-motion'
import { EASE_PAGE } from '../utils/motion.js'

/**
 * Line-by-line editorial headline reveal.
 *
 * Each line sits in its own overflow-hidden track and slides up from beneath
 * it, so the text appears to be uncovered rather than to fade in. Splitting by
 * line rather than by word is deliberate: a word-by-word reveal on a 5rem
 * display face reads as a gimmick, and — more practically — wrapping every word
 * in its own element breaks `text-wrap: balance` and lets long headings hyphenate
 * mid-word.
 *
 * `lines` is an array of strings, so the caller controls exactly where the
 * heading breaks instead of leaving it to the viewport.
 *
 * ACCESSIBILITY. The per-line spans would be read out as separate fragments, so
 * the whole heading is announced once from a visually-hidden copy and the
 * animated lines are hidden from assistive tech. That keeps the accessible name
 * a single clean sentence — "Full Stack Developer", not "Full Stack" then
 * "Developer" — without the caller having to build the pair by hand.
 *
 * @param {{ lines: string[], as?: string, delay?: number, stagger?: number }} props
 */
export default function AnimatedText({
  lines,
  as = 'h1',
  className,
  delay = 0,
  stagger = 0.09,
  ...rest
}) {
  const Tag = motion[as] ?? motion.h1

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      <span className="sr-only">{lines.join(' ')}</span>

      <span aria-hidden="true">
        {lines.map((line, index) => (
          // The key is the index because a heading may legitimately repeat a line.
          <span className="atext__line" key={index}>
            <motion.span
              className="atext__inner"
              variants={{
                hidden: { y: '105%' },
                show: { y: '0%', transition: { duration: 0.78, ease: EASE_PAGE } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
