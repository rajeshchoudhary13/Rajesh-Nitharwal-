import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Theme state for the light / dark / night switcher.
 *
 * The theme is applied by writing `data-theme` on <html>, which is also what
 * the inline boot script in index.html does before first paint — this hook has
 * to agree with that script or the page would flash. It therefore *reads* the
 * attribute the script already set rather than assuming a default, and only
 * falls back to system preference if nothing is stored.
 *
 * Nothing here reloads or re-renders the tree for styling: the CSS custom
 * properties under `[data-theme]` do all the work, so switching is a single
 * attribute write.
 */
export const THEMES = ['light', 'dark', 'night']
const STORAGE_KEY = 'rn-theme'

/** Shared with the boot script in index.html — keep the two in step. */
function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return THEMES.includes(v) ? v : null
  } catch {
    /* Private mode or blocked storage: fall through to system preference. */
    return null
  }
}

function systemPreference() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'light'
    // The boot script already resolved this; trust the DOM as the source of truth.
    const applied = document.documentElement.dataset.theme
    return THEMES.includes(applied) ? applied : readStored() || systemPreference()
  })

  /* The cross-fade must not run on the first commit: the boot script already
     painted the correct theme, and animating from nothing would show a flash of
     the default palette on every load. */
  const firstRun = useRef(true)

  useEffect(() => {
    const root = document.documentElement
    let timer

    if (firstRun.current) {
      firstRun.current = false
    } else {
      /* `.theme-anim` carries the transition (see global.css) and is removed
         once the fade is done, so it never interferes with hover transitions. */
      root.classList.add('theme-anim')
      const ms = parseFloat(getComputedStyle(root).getPropertyValue('--t-theme')) || 0.42
      timer = setTimeout(() => root.classList.remove('theme-anim'), ms * 1000 + 60)
    }

    root.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* Non-fatal: the theme still applies for this session. */
    }

    /* Keep the browser UI (address bar, task switcher) in step with the page.
       Read after the attribute write so the new palette is what we sample. */
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      const bg = getComputedStyle(root).getPropertyValue('--bg').trim()
      if (bg) meta.setAttribute('content', bg)
    }

    return () => timer && clearTimeout(timer)
  }, [theme])

  /* Follow the OS only while the visitor has not made an explicit choice. */
  useEffect(() => {
    if (readStored()) return undefined
    if (typeof matchMedia !== 'function') return undefined
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => setTheme(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const cycle = useCallback(() => {
    setTheme((t) => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length])
  }, [])

  return { theme, setTheme, cycle }
}
