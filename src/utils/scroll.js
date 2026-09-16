/**
 * Height of the sticky navbar.
 *
 * Measured from `.nav__inner` — the bar itself — rather than the `<header>`,
 * because the header also contains the mobile drawer and would report the open
 * drawer's height. The navbar shrinks once the page is scrolled, so measuring
 * beats reading the token; the `--nav-h` token remains the fallback for the
 * first call, before the navbar has mounted.
 */
function navOffset() {
  const bar = document.querySelector('.nav__inner')
  const measured = bar?.getBoundingClientRect().height
  if (measured) return measured

  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  const parsed = Number.parseInt(raw, 10)
  return Number.isFinite(parsed) ? parsed : 74
}

/**
 * Smoothly scrolls a section into view, accounting for the sticky navbar.
 * Falls back to an instant jump when the user prefers reduced motion.
 */
export function scrollToId(id) {
  const target = document.getElementById(id)
  if (!target) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = target.getBoundingClientRect().top + window.scrollY - navOffset() - 8

  window.scrollTo({ top: Math.max(top, 0), behavior: reduce ? 'auto' : 'smooth' })
}

export function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}
