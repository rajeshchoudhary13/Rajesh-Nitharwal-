import { useCallback, useRef } from 'react'
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * Magnetic pull for a call-to-action.
 *
 * While the pointer is inside the element, the element leans toward it by up to
 * `strength` pixels, then springs back on leave. The offset is held in motion
 * values, so tracking the pointer costs no React renders.
 *
 * Deliberately inert in two cases:
 *  • reduced motion — returns a static style, so the button simply does not move;
 *  • coarse pointers — a finger is already on the element, so there is nothing
 *    to lean toward and the effect would only fight the tap.
 *
 * @param {{ strength?: number }} options
 * @returns {{ ref, style, onPointerMove, onPointerLeave }} spread onto a motion element
 */
export function useMagnetic({ strength = 9 } = {}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 })

  const onPointerMove = useCallback(
    (event) => {
      /* pointerType is the reliable signal here: a hover media query can be
         true on a hybrid laptop that is being touched right now. */
      if (reduceMotion || event.pointerType === 'touch') return
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      /* -1..1 from the centre, scaled — the pull is proportional, so the corner
         of a wide button leans as far as the corner of a narrow one. */
      x.set(((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * strength)
      y.set(((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * strength * 0.6)
    },
    [reduceMotion, strength, x, y],
  )

  const onPointerLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return {
    ref,
    style: reduceMotion ? undefined : { x: sx, y: sy },
    onPointerMove,
    onPointerLeave,
  }
}
