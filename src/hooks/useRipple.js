import { useCallback, useEffect, useRef } from 'react'

const RIPPLE_MS = 620

/**
 * Material-style press ripple for buttons and links.
 *
 * The ripple span is created, animated and removed through the DOM directly
 * rather than through React state — a press must not re-render the button (or
 * the section around it), and the element is purely decorative.
 *
 * The host element needs `position: relative` and `overflow: hidden`; `.btn`
 * and `.ripple-host` in the stylesheets already provide both.
 *
 * Skipped entirely when the visitor prefers reduced motion.
 *
 * @returns {{ onPointerDown: (event: PointerEvent) => void }} spread onto the element
 */
export function useRipple() {
  /* Track live nodes so unmount mid-animation cannot leak a timer. */
  const timers = useRef(new Set())

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      timers.current.clear()
    },
    [],
  )

  const onPointerDown = useCallback((event) => {
    /* Primary button / single touch only — a right-click should not ripple. */
    if (event.button != null && event.button !== 0) return
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const host = event.currentTarget
    if (!host) return

    const rect = host.getBoundingClientRect()
    /* Radius that reaches the furthest corner from the press point. */
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const radius = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y))

    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.setAttribute('aria-hidden', 'true')
    ripple.style.left = `${x - radius}px`
    ripple.style.top = `${y - radius}px`
    ripple.style.width = ripple.style.height = `${radius * 2}px`

    host.appendChild(ripple)

    const timer = setTimeout(() => {
      ripple.remove()
      timers.current.delete(timer)
    }, RIPPLE_MS)
    timers.current.add(timer)
  }, [])

  return { onPointerDown }
}
