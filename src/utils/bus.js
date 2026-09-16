/**
 * A one-event bus, used for exactly one job: letting the featured-work cards
 * open a specific case study in the case-study section.
 *
 * Why not props or context? The two sections are independently lazy-loaded
 * siblings under <App>, so sharing state would mean lifting it into App and
 * eagerly coupling the two chunks. A DOM CustomEvent keeps them decoupled and
 * costs nothing — the listener is installed once and fires at most once per
 * click.
 *
 * `window` is guarded so the module stays importable in a non-DOM environment
 * (a test runner, or a future prerender step).
 */
const OPEN_CASE_STUDY = 'rn:open-case-study'

/** Ask the case-study section to select `id` and scroll to itself. */
export function openCaseStudy(id) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(OPEN_CASE_STUDY, { detail: { id } }))
}

/**
 * Subscribe to those requests.
 * @param {(id: string) => void} handler
 * @returns {() => void} unsubscribe
 */
export function onOpenCaseStudy(handler) {
  if (typeof window === 'undefined') return () => {}
  const listener = (event) => handler(event.detail?.id)
  window.addEventListener(OPEN_CASE_STUDY, listener)
  return () => window.removeEventListener(OPEN_CASE_STUDY, listener)
}
