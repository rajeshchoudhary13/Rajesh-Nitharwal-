import { useEffect } from 'react'

/**
 * Locks page scrolling while an overlay (mobile menu / project modal) is open.
 * Compensates for the scrollbar width so the layout does not jump.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return

    const { body, documentElement: html } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - html.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [locked])
}
