import { motion } from 'framer-motion'
import { revealVariants, viewportReveal } from '../utils/motion.js'
import { useIsCompact } from '../hooks/useIsCompact.js'

/**
 * One-shot scroll reveal: fades up as it enters the viewport, then stays put.
 *
 * Framer's `whileInView` is used rather than a hand-rolled IntersectionObserver
 * because Framer is already a dependency here and shares one observer pool
 * internally — adding our own would mean a second mechanism doing the same job.
 * `once: true` is the important part: content that re-animates every time it
 * scrolls past is the single most irritating thing a portfolio can do.
 *
 * On small screens the travel is halved (see `useIsCompact`), because 40px of
 * movement on a 375px-tall viewport is proportionally a much bigger gesture
 * than it is on a desktop.
 *
 * @param {{ delay?: number, distance?: number, as?: string }} props
 */
export default function RevealAnimation({
  children,
  as = 'div',
  delay = 0,
  distance,
  className,
  amount,
  ...rest
}) {
  const compact = useIsCompact()
  const Tag = motion[as] ?? motion.div
  const travel = distance ?? (compact ? 20 : 40)

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: travel }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={amount ? { ...viewportReveal, amount } : viewportReveal}
      transition={{ ...revealVariants.transition, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
