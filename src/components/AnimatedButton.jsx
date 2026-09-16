import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SPRING } from '../utils/motion.js'

const MotionLink = motion.create(Link)

/**
 * The site's one button component.
 *
 * Three shapes behind one prop, because the three differ only in where they
 * send the visitor and every browser needs the semantically correct element for
 * each: `to` renders a router <Link> (client-side navigation), `href` renders an
 * <a> (external links, mailto:, the resume download), and neither renders a
 * <button>. Getting this wrong is what produces middle-click and
 * open-in-new-tab bugs on a portfolio.
 *
 * The arrow is opt-out rather than opt-in (`arrow={false}`) because nearly every
 * call site wants it; it travels on hover via a CSS rule on `.btn--arrow` so the
 * movement costs nothing at runtime.
 */
const AnimatedButton = forwardRef(function AnimatedButton(
  { children, to, href, variant = 'primary', size, arrow = true, className = '', ...rest },
  ref,
) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size === 'sm' && 'btn--sm',
    size === 'block' && 'btn--block',
    arrow && 'btn--arrow',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && <ArrowRight size={15} strokeWidth={1.9} aria-hidden="true" />}
    </>
  )

  /* Hover lift lives here rather than in CSS so it shares the site's spring and
     is stripped automatically under prefers-reduced-motion by <MotionConfig>. */
  const motionProps = {
    whileHover: { y: -2, transition: SPRING },
    whileTap: { y: 0, scale: 0.985, transition: SPRING },
  }

  if (to) {
    return (
      <MotionLink ref={ref} to={to} className={classes} {...motionProps} {...rest}>
        {content}
      </MotionLink>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <motion.a
        ref={ref}
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        {...motionProps}
        {...rest}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button ref={ref} type="button" className={classes} {...motionProps} {...rest}>
      {content}
    </motion.button>
  )
})

export default AnimatedButton
