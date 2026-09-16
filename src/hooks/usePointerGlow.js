import { useCallback, useEffect, useRef } from 'react'

/** Only fine pointers get the spotlight — touch would leave it stuck on. */
const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/**
 * Pointer-follow spotlight for cards and panels.
 *
 * Writes `--mx` / `--my` (pointer position as a percentage of the element) and
 * `--glow` (0 → 1 fade) straight onto the node's inline style, so the highlight
 * is pure CSS compositing: **no React state, therefore no re-renders**, and one
 * `requestAnimationFrame` write per frame at most.
 *
 * `tilt` adds a very shallow 3D rotation (default 5°) via `--rx` / `--ry`. It is
 * opt-in because it only suits larger cards.
 *
 * Reduced motion and coarse pointers both short-circuit to a no-op, and the
 * handlers are simply not attached in that case.
 *
 * @param {{ tilt?: boolean, maxTilt?: number }} [options]
 * @returns {{ ref: React.RefObject<HTMLElement>, onPointerMove: Function,
 *             onPointerEnter: Function, onPointerLeave: Function }}
 *          spread the handlers onto the element and attach the ref
 */
export function usePointerGlow({ tilt = false, maxTilt = 5 } = {}) {
  const ref = useRef(null)
  const frame = useRef(0)
  const enabled = useRef(false)

  /* Resolve capability once, and keep it correct if the user plugs in a mouse
     or flips the reduced-motion setting mid-session. */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const pointer = window.matchMedia(FINE_POINTER)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => {
      enabled.current = pointer.matches && !motion.matches
      if (!enabled.current) reset()
    }

    sync()
    pointer.addEventListener('change', sync)
    motion.addEventListener('change', sync)
    return () => {
      pointer.removeEventListener('change', sync)
      motion.removeEventListener('change', sync)
    }
    // reset is stable (useCallback with no deps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const reset = useCallback(() => {
    const node = ref.current
    if (!node) return
    node.style.setProperty('--glow', '0')
    node.style.setProperty('--rx', '0deg')
    node.style.setProperty('--ry', '0deg')
  }, [])

  /* Cancel any queued frame on unmount so a pending write cannot touch a
     detached node. */
  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    },
    [],
  )

  const onPointerMove = useCallback(
    (event) => {
      if (!enabled.current) return
      const node = ref.current
      if (!node) return

      /* Read the pointer position now, apply it on the next frame — coalescing
         the many pointermove events a fast cursor fires into one style write. */
      const { clientX, clientY } = event
      if (frame.current) return

      frame.current = requestAnimationFrame(() => {
        frame.current = 0
        const rect = node.getBoundingClientRect()
        if (!rect.width || !rect.height) return

        const x = (clientX - rect.left) / rect.width
        const y = (clientY - rect.top) / rect.height

        node.style.setProperty('--mx', `${(x * 100).toFixed(2)}%`)
        node.style.setProperty('--my', `${(y * 100).toFixed(2)}%`)

        if (tilt) {
          /* Invert Y so the card leans towards the cursor. */
          node.style.setProperty('--ry', `${((x - 0.5) * 2 * maxTilt).toFixed(2)}deg`)
          node.style.setProperty('--rx', `${((0.5 - y) * 2 * maxTilt).toFixed(2)}deg`)
        }
      })
    },
    [tilt, maxTilt],
  )

  const onPointerEnter = useCallback(() => {
    if (!enabled.current) return
    ref.current?.style.setProperty('--glow', '1')
  }, [])

  const onPointerLeave = useCallback(() => {
    if (frame.current) {
      cancelAnimationFrame(frame.current)
      frame.current = 0
    }
    reset()
  }, [reset])

  return { ref, onPointerMove, onPointerEnter, onPointerLeave }
}
