import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view using a single IntersectionObserver.
 * Cheaper and smoother than scroll-event maths, and it stays correct on resize.
 *
 * Sections below the fold are code-split, so most of them are absent from the
 * DOM when this hook first runs. A MutationObserver re-attaches the
 * IntersectionObserver as those sections mount, then stops watching.
 *
 * @param {string[]} ids section element ids, in document order
 * @returns {string} id of the section closest to the viewport centre
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  const [mounted, setMounted] = useState(0)

  /* Count how many of the observed sections exist, and re-count as more arrive. */
  useEffect(() => {
    const countPresent = () => ids.reduce((total, id) => total + (document.getElementById(id) ? 1 : 0), 0)

    setMounted(countPresent())
    if (countPresent() === ids.length || typeof MutationObserver === 'undefined') return

    const watcher = new MutationObserver(() => {
      const present = countPresent()
      setMounted(present)
      if (present === ids.length) watcher.disconnect()
    })

    watcher.observe(document.body, { childList: true, subtree: true })
    return () => watcher.disconnect()
  }, [ids])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length || typeof IntersectionObserver === 'undefined') return

    const visible = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        }
        if (!visible.size) return
        // Highest visible ratio wins; ties resolve to document order.
        const next = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0]
        setActive(next)
      },
      {
        // Bias the band towards the middle of the viewport so short sections still register.
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 1],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, mounted])

  return active
}
