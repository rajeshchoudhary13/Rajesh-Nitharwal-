import { motion } from 'framer-motion'
import Pressable from './Pressable.jsx'

/**
 * Filter pill row for the projects grid.
 *
 * The active indicator is a shared `layoutId` element rather than a background
 * on the button, so Framer animates it *between* pills instead of cross-fading
 * two backgrounds — the pill the user picked visibly receives the highlight.
 *
 * Rendered as a tablist: arrow-key semantics come free from the roles, and the
 * count in each pill tells the user what a filter costs before they press it.
 *
 * @param {{
 *   filters: { id: string, label: string }[],
 *   active: string,
 *   onChange: (id: string) => void,
 *   countFor: (id: string) => number,
 * }} props
 */
export default function ProjectFilters({ filters, active, onChange, countFor }) {
  return (
    <div className="pfilters" role="tablist" aria-label="Filter projects by category">
      {filters.map((f) => {
        const isActive = f.id === active
        return (
          <Pressable
            key={f.id}
            type="button"
            role="tab"
            className={`pfilter${isActive ? ' is-active' : ''}`}
            aria-selected={isActive}
            aria-controls="projects-grid"
            onClick={() => onChange(f.id)}
          >
            {isActive && (
              <motion.span
                className="pfilter__bg"
                layoutId="pfilter-bg"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                aria-hidden="true"
              />
            )}
            <span className="pfilter__label">{f.label}</span>
            <span className="pfilter__count mono" aria-hidden="true">
              {countFor(f.id)}
            </span>
          </Pressable>
        )
      })}
    </div>
  )
}
