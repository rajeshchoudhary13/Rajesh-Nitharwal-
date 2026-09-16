import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../utils/motion.js'

/**
 * Thin wrapper for one-shot scroll reveals, so sections do not repeat
 * the same initial/whileInView/viewport boilerplate everywhere.
 */
export default function Reveal({
  children,
  variants = fadeUp,
  as = 'div',
  delay = 0,
  amount,
  className,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={amount ? { ...viewportOnce, amount } : viewportOnce}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
