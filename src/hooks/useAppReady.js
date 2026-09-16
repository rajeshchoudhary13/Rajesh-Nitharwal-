import { useEffect, useRef, useState } from 'react'
import { animate, useMotionValue, useReducedMotion } from 'framer-motion'

/**
 * Real loading progress for the preloader.
 *
 * The progress bar is tied to things that actually happen, not to a timer
 * pretending to be one. Four milestones each carry a weight, the target is the
 * sum of whatever has completed, and the displayed number eases toward that
 * target — so it always moves smoothly, but it never claims 90% while the fonts
 * are still in flight.
 *
 *   mount  0.20  React committed; the bundle is parsed and running.
 *   fonts  0.35  document.fonts.ready — the heaviest real dependency here,
 *                since the display and mono faces come from Google Fonts.
 *   load   0.30  window 'load' — initial images and stylesheets are in.
 *   settle 0.15  a minimum on-screen time, so a warm cache does not flash the
 *                loader for 80ms, which looks like a glitch rather than a load.
 *
 * THE LOADER CAN NEVER TRAP THE PAGE. Three independent guarantees:
 *  • every milestone is also satisfied by a `FALLBACK_MS` timeout that forces
 *    the target to 1, so one stalled font or image cannot hold the site hostage;
 *  • `document.fonts` and the `load` event are both checked for having *already*
 *    happened before a listener is attached, which is the usual race on a warm
 *    cache;
 *  • the exit runs off the target reaching 1, never off a specific milestone.
 *
 * Returns the motion value rather than a number on purpose: the percentage
 * updates ~60×/s and React must not re-render for any of them. The only state
 * changes here are the three that matter — `ready` and the milestone set.
 *
 * @returns {{ progress: import('framer-motion').MotionValue<number>, ready: boolean }}
 */
const WEIGHTS = { mount: 0.2, fonts: 0.35, load: 0.3, settle: 0.15 }

/** Hard ceiling on how long the loader may ever be shown. */
const FALLBACK_MS = 3500

/** Minimum on-screen time on a cold load, and on a warm one within the session. */
const MIN_MS = 620
const MIN_MS_REVISIT = 220

const SESSION_KEY = 'rn-visited'

function seenThisSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    /* Blocked storage: treat every load as a first visit. */
    return false
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    /* Non-fatal — only affects how long the loader shows next time. */
  }
}

export function useAppReady() {
  const reduceMotion = useReducedMotion()
  const progress = useMotionValue(0)
  const [ready, setReady] = useState(false)

  /* A ref, not state: the effect below mutates it as milestones land and reads
     the running total. Re-rendering on each one would buy nothing, because the
     bar is driven by the motion value. */
  const done = useRef({ mount: false, fonts: false, load: false, settle: false })

  useEffect(() => {
    let cancelled = false
    let controls
    const timers = []

    const target = () =>
      Object.entries(WEIGHTS).reduce((sum, [key, weight]) => (done.current[key] ? sum + weight : sum), 0)

    /** Ease the bar toward whatever has completed; finish the exit at 1. */
    const advance = () => {
      if (cancelled) return
      const next = Math.min(target(), 1)

      controls?.stop()
      controls = animate(progress, next * 100, {
        /* Slower and softer for intermediate steps, decisive for the last one:
           the jump to 100 should read as completion, not as another increment. */
        duration: next >= 1 ? 0.42 : 0.9,
        ease: next >= 1 ? [0.22, 1, 0.36, 1] : [0.33, 1, 0.68, 1],
        onComplete: () => {
          if (!cancelled && next >= 1) setReady(true)
        },
      })
    }

    const complete = (key) => {
      if (cancelled || done.current[key]) return
      done.current[key] = true
      advance()
    }

    /* --- mount: already true by definition, this effect is the proof. ------ */
    complete('mount')

    /* --- fonts ------------------------------------------------------------ */
    if (typeof document !== 'undefined' && document.fonts) {
      /* `status` is checked first: on a warm cache the promise has often already
         settled, and awaiting it would still cost a microtask. */
      if (document.fonts.status === 'loaded') complete('fonts')
      else document.fonts.ready.then(() => complete('fonts')).catch(() => complete('fonts'))
    } else {
      complete('fonts')
    }

    /* --- window load ------------------------------------------------------ */
    const onLoad = () => complete('load')
    if (document.readyState === 'complete') complete('load')
    else window.addEventListener('load', onLoad, { once: true })

    /* --- minimum on-screen time ------------------------------------------ */
    const minMs = seenThisSession() ? MIN_MS_REVISIT : MIN_MS
    timers.push(setTimeout(() => complete('settle'), reduceMotion ? MIN_MS_REVISIT : minMs))

    /* --- the guarantee --------------------------------------------------- */
    timers.push(
      setTimeout(() => {
        if (cancelled) return
        for (const key of Object.keys(WEIGHTS)) done.current[key] = true
        advance()
      }, FALLBACK_MS),
    )

    return () => {
      cancelled = true
      controls?.stop()
      window.removeEventListener('load', onLoad)
      for (const timer of timers) clearTimeout(timer)
    }
  }, [progress, reduceMotion])

  useEffect(() => {
    if (ready) markSeen()
  }, [ready])

  return { progress, ready }
}
