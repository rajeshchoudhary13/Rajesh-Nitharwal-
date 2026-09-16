import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Counts from 0 to `target` the first time the element scrolls into view.
 * Respects prefers-reduced-motion by jumping straight to the final value.
 *
 * @returns {[React.RefObject, string]} ref to attach, and the formatted value
 */
export function useCountUp(target, { duration = 1400, decimals = 0 } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setValue(target)
      return
    }

    let frame = 0
    let start

    const tick = (now) => {
      start ??= now
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration, reduceMotion])

  return [ref, value.toFixed(decimals)]
}
