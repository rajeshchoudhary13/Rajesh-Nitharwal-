import { useSyncExternalStore } from 'react'

/**
 * Is the viewport a small screen?
 *
 * Deliberately NOT built on `useMediaQuery`: dozens of reveal wrappers ask this
 * question, and one `matchMedia` listener per instance would mean dozens of
 * listeners and a re-render of every wrapper on each resize tick. This is a
 * single module-level listener with a subscriber set, read through
 * `useSyncExternalStore`, so the cost is constant no matter how many components
 * use it.
 *
 * Kept in step by hand with the 640px breakpoint the stylesheets use.
 */
const QUERY = '(max-width: 640px)'

let mql = null
let snapshot = false
const listeners = new Set()

function ensure() {
  if (mql || typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
  mql = window.matchMedia(QUERY)
  snapshot = mql.matches
  mql.addEventListener('change', (event) => {
    snapshot = event.matches
    for (const listener of listeners) listener()
  })
}

function subscribe(onChange) {
  ensure()
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

/* The store is read during render, so the first call has to be able to
   initialise it — hence `ensure()` here as well as in `subscribe`. */
function getSnapshot() {
  ensure()
  return snapshot
}

/** Server render has no viewport; assume the roomier layout. */
function getServerSnapshot() {
  return false
}

export function useIsCompact() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
