import { useEffect } from 'react'
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom'

/**
 * Puts a newly-opened page at the top, and leaves a page reached via Back or
 * Forward where the visitor left it.
 *
 * The browser only restores scroll on its own for full document loads; in a
 * client-side router every navigation keeps the same document, so without this
 * a click on a nav link from halfway down Projects would open Contact already
 * scrolled into its middle.
 *
 * The `POP` check is the reason this is not a one-liner: a back-navigation
 * should feel like returning to where you were, so those are left alone and the
 * browser's own `history.scrollRestoration` handles them.
 *
 * `behavior: 'auto'` — an instant jump, deliberately. The page is mid-crossfade
 * at this moment, so the movement is hidden; a smooth scroll would instead race
 * the transition and be visible as a slide.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()
  const navigate = useNavigate()

  /* Consume the `?redirect=` handoff from public/404.html.
     Hosts that cannot be configured with an SPA rewrite (GitHub Pages) serve
     404.html for a deep link; that page stashes the requested path here and
     loads the app at the root. Replaying it as a `replace` gets the visitor to
     the page they asked for without leaving the redirect in their history.

     Runs before the scroll effect below so the restored route is what gets
     scrolled to the top. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const target = params.get('redirect')
    if (!target) return
    /* Only same-origin absolute paths — never an arbitrary URL from the query
       string, which would make this an open redirect. */
    if (!target.startsWith('/') || target.startsWith('//')) return
    navigate(target, { replace: true })
  }, [navigate])

  useEffect(() => {
    if (navigationType === 'POP') return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, navigationType])

  return null
}
