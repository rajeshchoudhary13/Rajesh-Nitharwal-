import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Menu, Minus, Plus, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'
import MegaMenu from './MegaMenu.jsx'
import Pressable from './Pressable.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { navLinks, pillLinks } from '../data/nav.js'
import { assertMegaMenuTargets, panelFor } from '../data/megaMenu.js'
import { channels, site } from '../config/site.js'
import { profile } from '../data/profile.js'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { useMegaMenu } from '../hooks/useMegaMenu.js'
import { useScrolled } from '../hooks/useScrolled.js'
import useTheme from '../hooks/useTheme.js'
import { EASE, EASE_PAGE, SPRING_SOFT } from '../utils/motion.js'
import '../styles/navbar.css'

/* The mega menu is a pointer affordance and needs the width to lay out two
   panels side by side, so it is desktop-only. Tablet and phone get the
   accordion drawer, which is the same information in a shape that works with a
   thumb. Kept in step by hand with the 1024px breakpoint in navbar.css. */
const DESKTOP = '(min-width: 1024px)'

/* Contact is a single destination in the bar even though it has a panel — the
   panel is reachable by hovering, but the tab itself must always just go to
   /contact, because that is what a visitor clicking "Contact" wants. */
export default function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const { theme, setTheme } = useTheme()
  const scrolled = useScrolled(24)
  const { pathname } = useLocation()
  const isDesktop = useMediaQuery(DESKTOP)
  const headerRef = useRef(null)

  const { openId, hoverOpen, hoverClose, keepOpen, toggle, close } = useMegaMenu()

  useLockBodyScroll(drawerOpen)

  /* Dev-only guard: every link in the mega menu must resolve to a real route.
     Runs once, and only in development, so a mistyped path is a loud console
     error during authoring rather than a dead link in production. */
  useEffect(() => {
    if (import.meta.env.DEV) assertMegaMenuTargets(navLinks.map((link) => link.path))
  }, [])

  /* Any route change closes everything. Keyed on `pathname` rather than done in
     the click handlers so it also covers the browser's back button and any
     redirect — the menu can never be left open over a page it does not belong
     to. */
  useEffect(() => {
    close()
    setDrawerOpen(false)
    setExpanded(null)
  }, [pathname, close])

  /* Crossing the breakpoint must not leave the other mode's UI on screen. */
  useEffect(() => {
    if (isDesktop) setDrawerOpen(false)
    else close()
  }, [isDesktop, close])

  /* Escape closes whichever is open. */
  useEffect(() => {
    if (!openId && !drawerOpen) return undefined
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      close()
      setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openId, drawerOpen, close])

  /* Click outside closes the panel. Bound to the header rather than to the
     panel: the tab that opened it is also outside the panel, and a listener on
     the panel alone would close and instantly reopen on that click. */
  useEffect(() => {
    if (!openId) return undefined
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) close()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [openId, close])

  /* Focus leaving the header entirely closes the panel, so tabbing past the nav
     does not leave it hanging open behind the page. */
  const onBlurCapture = useCallback(
    (event) => {
      if (!openId) return
      const next = event.relatedTarget
      if (next && headerRef.current?.contains(next)) return
      close()
    },
    [openId, close],
  )

  const activePanel = openId ? panelFor(openId) : null

  return (
    <motion.header
      ref={headerRef}
      className={`nav${scrolled ? ' is-scrolled' : ''}${drawerOpen ? ' is-open' : ''}${openId ? ' is-mega' : ''}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      onBlurCapture={onBlurCapture}
    >
      <nav className="nav__inner container" aria-label="Primary">
        {/* ---------- Left: identity ---------- */}
        <Link className="nav__logo" to="/" onClick={() => setDrawerOpen(false)}>
          <span className="nav__logo-name">{profile.name}</span>
          <span className="nav__logo-role">Full Stack Developer</span>
        </Link>

        {/* ---------- Centre: the pill ---------- */}
        <div className="nav__pill" onMouseLeave={hoverClose}>
          <ul className="nav__links">
            {pillLinks.map((link) => {
              const panel = panelFor(link.id)
              const isOpen = openId === link.id

              return (
                <li key={link.id} onMouseEnter={() => (panel ? hoverOpen(link.id) : hoverClose())}>
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `nav__link${isActive ? ' is-active' : ''}${isOpen ? ' is-expanded' : ''}`
                    }
                    /* A tab with a panel is still a link first — it navigates on
                       click. The panel is opened by hover, and by the caret
                       button beside the label for keyboard and touch users, so
                       clicking "Projects" never traps someone in a menu. */
                    aria-haspopup={panel ? 'true' : undefined}
                    aria-expanded={panel ? isOpen : undefined}
                    id={panel ? `megatab-${link.id}` : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        <span className="nav__link-label">{link.label}</span>
                        {isActive && (
                          <motion.span
                            className="nav__indicator"
                            layoutId="nav-indicator"
                            transition={SPRING_SOFT}
                            aria-hidden="true"
                          />
                        )}
                      </>
                    )}
                  </NavLink>

                  {panel && (
                    /* A separate control, not part of the link: it opens the
                       panel without navigating, which is the only way a keyboard
                       user can reach the panel's contents at all. */
                    <button
                      type="button"
                      className={`nav__caret${isOpen ? ' is-open' : ''}`}
                      onClick={() => toggle(link.id)}
                      aria-expanded={isOpen}
                      aria-controls={`megapanel-${link.id}`}
                      aria-label={`${isOpen ? 'Close' : 'Open'} ${link.label} menu`}
                    >
                      <ChevronDown size={13} strokeWidth={2.1} aria-hidden="true" />
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {/* ---------- Right: actions ---------- */}
        <div className="nav__actions">
          {site.available && (
            <p className="nav__status" title={site.availabilityLabel}>
              <span className="nav__status-dot" aria-hidden="true" />
              <span className="nav__status-text">Available</span>
            </p>
          )}

          <ThemeToggle theme={theme} setTheme={setTheme} />

          <Link className="nav__cta" to="/contact">
            <span>Get in touch</span>
            <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
          </Link>

          <Pressable
            icon
            sheen={false}
            type="button"
            className="nav__burger"
            onClick={() => setDrawerOpen((value) => !value)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={drawerOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.16, ease: EASE }}
                style={{ display: 'grid', placeItems: 'center' }}
              >
                {drawerOpen ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
              </motion.span>
            </AnimatePresence>
          </Pressable>
        </div>
      </nav>

      {/* ---------- Desktop mega panel ----------
          Mounted in the header so `onBlurCapture` and the outside-click check
          both treat it as inside. `keepOpen` on enter cancels the grace-period
          close started when the pointer left the tab. */}
      <AnimatePresence>
        {isDesktop && activePanel && (
          <div
            className="mega__layer"
            id={`megapanel-${openId}`}
            onMouseEnter={keepOpen}
            onMouseLeave={hoverClose}
          >
            <div className="container">
              <MegaMenu
                panel={activePanel}
                onNavigate={close}
                labelledBy={`megatab-${openId}`}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ---------- Mobile / tablet drawer ---------- */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="nav__drawer"
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <ul className="nav__drawer-links">
              {navLinks.map((link, index) => {
                const panel = panelFor(link.id)
                const isExpanded = expanded === link.id

                return (
                  <li key={link.id} className={isExpanded ? 'is-expanded' : undefined}>
                    <div className="nav__drawer-row">
                      <NavLink
                        to={link.path}
                        end={link.path === '/'}
                        className={({ isActive }) => `nav__drawer-link${isActive ? ' is-active' : ''}`}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <span className="nav__drawer-num" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="nav__drawer-label">{link.label}</span>
                      </NavLink>

                      {panel && (
                        <button
                          type="button"
                          className="nav__drawer-toggle"
                          onClick={() => setExpanded(isExpanded ? null : link.id)}
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${link.label}`}
                        >
                          {isExpanded ? (
                            <Minus size={16} strokeWidth={2} aria-hidden="true" />
                          ) : (
                            <Plus size={16} strokeWidth={2} aria-hidden="true" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Accordion. `height: auto` is animatable by Framer, and the
                        overflow clip on the wrapper is what makes it read as a
                        reveal rather than a fade. */}
                    <AnimatePresence initial={false}>
                      {panel && isExpanded && (
                        <motion.div
                          className="nav__sub"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.26, ease: EASE_PAGE }}
                        >
                          <ul className="nav__sub-list">
                            {(panel.layout === 'columns' ? panel.columns : panel.items).map((entry) => (
                              <li key={entry.id}>
                                <SubLink entry={entry} onDone={() => setDrawerOpen(false)} />
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>

            <div className="nav__drawer-foot">
              <Link className="nav__cta nav__cta--block" to="/contact" onClick={() => setDrawerOpen(false)}>
                <span>Get in touch</span>
                <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
              </Link>

              <div className="nav__drawer-theme">
                <span className="nav__drawer-theme-label">Theme</span>
                <ThemeToggle theme={theme} setTheme={setTheme} compact />
              </div>

              <ul className="nav__drawer-socials">
                {channels.map((channel) => (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      aria-label={channel.label}
                      title={channel.label}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    >
                      <Icon name={channel.icon} size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/**
 * One row inside an expanded accordion section.
 *
 * Handles all three entry shapes the panels produce: a `columns` heading (which
 * carries `to` and `title`), a `links` item, and a `cards` item. External
 * channels stay real anchors.
 */
function SubLink({ entry, onDone }) {
  const label = entry.title
  if (entry.href) {
    const isWeb = entry.href.startsWith('http')
    return (
      <a
        className="nav__sub-link"
        href={entry.href}
        onClick={onDone}
        target={isWeb ? '_blank' : undefined}
        rel={isWeb ? 'noreferrer noopener' : undefined}
      >
        {entry.icon && <Icon name={entry.icon} size={15} />}
        {label}
      </a>
    )
  }

  return (
    <Link className="nav__sub-link" to={entry.to} onClick={onDone}>
      {entry.icon && <Icon name={entry.icon} size={15} />}
      {label}
    </Link>
  )
}
