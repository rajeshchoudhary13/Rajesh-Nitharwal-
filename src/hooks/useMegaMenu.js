import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Open/close state for the mega menu, with the pointer handling that makes a
 * hover-opened panel usable.
 *
 * THE PROBLEM THIS SOLVES. A naive `onMouseEnter`/`onMouseLeave` pair opens the
 * panel the instant the pointer crosses a tab — so sweeping the mouse across the
 * bar to reach something else flickers four panels open — and closes it the
 * instant the pointer leaves the tab, which is the moment you start moving
 * toward the panel you just opened. Both are fixed with timers rather than with
 * an invisible bridge element:
 *
 *   OPEN_DELAY   a short intent delay. Crossing a tab on the way somewhere else
 *                never opens it; pausing on it does.
 *   CLOSE_DELAY  a grace period. The pointer may leave the tab and travel the
 *                gap to the panel without the panel closing underneath it.
 *
 * A pending open is cancelled by a pending close and vice versa, so the two
 * timers can never both be live and race each other.
 *
 * Keyboard and click use `toggle`/`close`, which bypass both delays — a
 * deliberate press should be instant.
 */
const OPEN_DELAY = 90
const CLOSE_DELAY = 180

export function useMegaMenu() {
  const [openId, setOpenId] = useState(null)
  const openTimer = useRef(null)
  const closeTimer = useRef(null)

  const clearTimers = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current)
      openTimer.current = null
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  /* A pending timer must never fire after unmount. */
  useEffect(() => clearTimers, [clearTimers])

  /** Pointer entered a tab (or re-entered the open panel). */
  const hoverOpen = useCallback(
    (id) => {
      clearTimers()
      /* Already showing this one — nothing to schedule. */
      if (openId === id) return
      /* Switching between tabs while a panel is already open is immediate:
         the visitor has demonstrated intent, and a delay here reads as lag. */
      if (openId !== null) {
        setOpenId(id)
        return
      }
      openTimer.current = setTimeout(() => setOpenId(id), OPEN_DELAY)
    },
    [openId, clearTimers],
  )

  /** Pointer left a tab or the panel. */
  const hoverClose = useCallback(() => {
    clearTimers()
    closeTimer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY)
  }, [clearTimers])

  /** Pointer entered the panel — cancel the grace-period close. */
  const keepOpen = useCallback(() => {
    clearTimers()
  }, [clearTimers])

  const toggle = useCallback(
    (id) => {
      clearTimers()
      setOpenId((current) => (current === id ? null : id))
    },
    [clearTimers],
  )

  const close = useCallback(() => {
    clearTimers()
    setOpenId(null)
  }, [clearTimers])

  return { openId, hoverOpen, hoverClose, keepOpen, toggle, close }
}
