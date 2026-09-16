import { motion } from 'framer-motion'
import { usePointerGlow } from '../hooks/usePointerGlow.js'
import { liftHover } from '../utils/motion.js'

/**
 * Interactive surface used by every card in the site.
 *
 * Wraps a Framer `motion` element with:
 *  • the pointer-follow spotlight (`.spot` + usePointerGlow),
 *  • a gradient hairline that lights up on hover (`.edge-lit`),
 *  • the shared lift-on-hover / sink-on-press spring (`liftHover`).
 *
 * Everything is driven by CSS custom properties written straight to the node, so
 * moving the pointer across a card re-renders nothing.
 *
 * `parallax` additionally publishes `--rx` / `--ry` on the card. It deliberately
 * does *not* transform the card itself — Framer owns this element's `transform`
 * (entrance variants plus the hover lift) and an inline transform always beats a
 * stylesheet one. Instead a child element opts in, e.g.
 *
 *   .pcard:hover .pcard__device { transform: rotateX(var(--rx)) rotateY(var(--ry)); }
 *
 * which keeps the 3D effect on the one element that should move in depth.
 *
 * Any other prop is forwarded to the motion element, so `variants`,
 * `data-accent`, `aria-*` and event handlers keep working unchanged.
 *
 * @param {{ as?: string, parallax?: boolean, maxTilt?: number, lift?: boolean,
 *           className?: string, children: React.ReactNode }} props
 */
export default function GlowCard({
  as = 'div',
  parallax = false,
  maxTilt = 6,
  lift = true,
  className = '',
  children,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div
  const glow = usePointerGlow({ tilt: parallax, maxTilt })

  const classes = ['spot', 'edge-lit', className].filter(Boolean).join(' ')
  /* `lift` can be switched off for a card that already sits inside an animating
     parent (a floating mockup, say), where two transforms would fight. */
  const interaction = lift ? liftHover : {}

  return (
    <Tag
      ref={glow.ref}
      className={classes}
      onPointerMove={glow.onPointerMove}
      onPointerEnter={glow.onPointerEnter}
      onPointerLeave={glow.onPointerLeave}
      {...interaction}
      {...rest}
    >
      {children}
    </Tag>
  )
}
