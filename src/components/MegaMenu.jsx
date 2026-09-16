import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { EASE_PAGE } from '../utils/motion.js'

/* ---------- Motion ----------
   250-400ms as briefed. The panel itself carries the opacity/translate/scale;
   the two halves and the individual rows stagger inside it, so the panel reads
   as one object arriving rather than a list of things appearing. */
const panelVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: EASE_PAGE, staggerChildren: 0.03, delayChildren: 0.04 },
  },
  exit: { opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.18, ease: EASE_PAGE } },
}

const introVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.32, ease: EASE_PAGE } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: EASE_PAGE } },
}

/**
 * The panel that opens under a nav tab.
 *
 * Two halves: an accent information panel on the left (title, standfirst, one
 * stat, one call to action) and the destinations on the right in one of three
 * layouts — `links`, `columns` or `cards` — chosen per panel in data/megaMenu.js.
 *
 * `onNavigate` is called on every activation so the parent can close the menu;
 * the panel does not own its own open state, because the parent also has to
 * close it on Escape, on outside click and on a route change, and two sources of
 * truth for one boolean is how a menu ends up stuck open.
 *
 * Nothing here is focusable when closed: the parent unmounts it entirely rather
 * than hiding it, so tabbing past the nav never lands inside an invisible panel.
 */
export default function MegaMenu({ panel, onNavigate, labelledBy }) {
  if (!panel) return null

  return (
    <motion.div
      className="mega"
      variants={panelVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      role="region"
      aria-labelledby={labelledBy}
    >
      <div className="mega__grid">
        {/* ---------- Left: information panel ---------- */}
        <motion.div className="mega__intro" variants={introVariants}>
          <p className="mega__intro-title">{panel.intro.title}</p>
          <p className="mega__intro-text">{panel.intro.text}</p>

          {panel.intro.stat && (
            <p className="mega__stat">
              <span className="mega__stat-value">{panel.intro.stat.value}</span>
              <span className="mega__stat-label">{panel.intro.stat.label}</span>
            </p>
          )}

          <Link className="mega__cta" to={panel.intro.cta.to} onClick={onNavigate}>
            {panel.intro.cta.label}
            <ArrowRight size={15} strokeWidth={1.9} aria-hidden="true" />
          </Link>
        </motion.div>

        {/* ---------- Right: destinations ---------- */}
        <div className={`mega__content mega__content--${panel.layout}`}>
          {panel.layout === 'columns'
            ? panel.columns.map((column) => (
                <motion.div className="mega__col" key={column.id} variants={rowVariants}>
                  {/* The heading is the only link in a column: there is no page
                      per technology, so the names below stay plain text rather
                      than advertising a click that goes nowhere. */}
                  <Link className="mega__col-title" to={column.to} onClick={onNavigate}>
                    {column.title}
                    <ArrowRight size={12} strokeWidth={2} aria-hidden="true" />
                  </Link>
                  <ul className="mega__col-list">
                    {column.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                    {column.more > 0 && <li className="mega__col-more">+{column.more} more</li>}
                  </ul>
                </motion.div>
              ))
            : panel.items.map((item) => (
                <motion.div key={item.id} variants={rowVariants}>
                  <MegaItem item={item} onNavigate={onNavigate} layout={panel.layout} />
                </motion.div>
              ))}
        </div>
      </div>
    </motion.div>
  )
}

/**
 * One destination row.
 *
 * A router <Link> for an internal route, a plain <a> for anything that leaves
 * the site (mailto:, tel:, LinkedIn, GitHub). Getting this distinction wrong is
 * what breaks middle-click and "open in new tab" on a nav menu.
 */
function MegaItem({ item, onNavigate, layout }) {
  const external = Boolean(item.href)
  const className = `mega__item${layout === 'cards' ? ' mega__item--card' : ''}`

  const inner = (
    <>
      <span className="mega__item-icon" aria-hidden="true">
        <Icon name={item.icon} size={17} />
      </span>
      <span className="mega__item-body">
        <span className="mega__item-title">{item.title}</span>
        {item.desc && <span className="mega__item-desc">{item.desc}</span>}
      </span>
      <span className="mega__item-arrow" aria-hidden="true">
        {external ? (
          <ArrowUpRight size={15} strokeWidth={1.8} />
        ) : (
          <ArrowRight size={15} strokeWidth={1.8} />
        )}
      </span>
    </>
  )

  if (external) {
    /* mailto: and tel: must not open a tab; http(s) must not replace the site. */
    const isWeb = item.href.startsWith('http')
    return (
      <a
        className={className}
        href={item.href}
        onClick={onNavigate}
        target={isWeb ? '_blank' : undefined}
        rel={isWeb ? 'noreferrer noopener' : undefined}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link className={className} to={item.to} onClick={onNavigate}>
      {inner}
    </Link>
  )
}
