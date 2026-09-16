import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import '../styles/cursor.css'

/**
 * Desktop cursor companion: a small dot that tracks the pointer exactly, and a
 * ring that trails it on a spring and swells over anything interactive.
 *
 * Three deliberate constraints:
 *  • It never replaces the native cursor. A hidden system cursor is a real
 *    usability cost on a content site, and this is decoration.
 *  • It renders only for a fine pointer that can hover, so it never mounts on
 *    a phone or tablet.
 *  • Position is written to motion values, so pointer movement paints on the
 *    compositor and triggers no React render. Only the hover *state* changes
 *    React state, and that happens at most once per element entered.
 */
export default function Cursor() {
  const reduceMotion = useReducedMotion()
  const isPrecise = useMediaQuery('(hover: hover) and (pointer: fine)')
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  /* The ring lags the dot; that gap is the whole effect. */
  const rx = useSpring(x, { stiffness: 240, damping: 26, mass: 0.45 })
  const ry = useSpring(y, { stiffness: 240, damping: 26, mass: 0.45 })

  const enabled = isPrecise && !reduceMotion

  useEffect(() => {
    if (!enabled) return

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
      /* One closest() per pointermove is cheap and keeps the check accurate as
         the DOM changes, which a mount-time listener sweep would not. */
      setHovering(Boolean(event.target?.closest?.('a, button, [role="button"], input, select, textarea, summary')))
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div className="cursor" aria-hidden="true">
      <motion.span
        className={`cursor__ring${hovering ? ' is-active' : ''}`}
        style={{ x: rx, y: ry }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 1.9 : 1 }}
        transition={{ duration: 0.22 }}
      />
      <motion.span
        className="cursor__dot"
        style={{ x, y }}
        animate={{ opacity: visible && !hovering ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      />
    </div>
  )
}
