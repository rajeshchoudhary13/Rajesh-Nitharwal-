import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { ArrowRight, Download, Menu, X } from 'lucide-react'
import Icon from './Icon.jsx'
import MagneticButton from './MagneticButton.jsx'
import Pressable from './Pressable.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { navLinks, sectionIds, sectionToNavLink } from '../data/nav.js'
import { channels, site } from '../config/site.js'
import { profile } from '../data/profile.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { useScrolled } from '../hooks/useScrolled.js'
import useTheme from '../hooks/useTheme.js'
import { scrollToId } from '../utils/scroll.js'
import { drawerItem, drawerVariants, EASE, SPRING, SPRING_SOFT } from '../utils/motion.js'
import '../styles/navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  /* Theme lives here so both the desktop switch and the drawer switch drive the
     same state; the hook writes `data-theme` on <html>, so no re-render of the
     page is needed for the change to apply. */
  const { theme, setTheme } = useTheme()
  /* Drag is started from the grab handle only — see the drawer below. */
  const dragControls = useDragControls()
  const scrolled = useScrolled(28)
  const inView = useActiveSection(sectionIds)
  /* Many sections have no nav entry of their own (trust bar, stack, archive,
     FAQ…), so they highlight the closest link rather than leaving the bar
     blank — see sectionToNavLink in data/nav.js. */
  const active = sectionToNavLink[inView] ?? inView

  useLockBodyScroll(open)

  /* Close the drawer once the layout is wide enough for the inline nav. */
  const isDesktop = useMediaQuery('(min-width: 981px)')
  useEffect(() => {
    if (isDesktop) setOpen(false)
  }, [isDesktop])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const go = useCallback((id) => {
    setOpen(false)
    scrollToId(id)
  }, [])

  return (
    <motion.header
      className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
    >
      <nav className="nav__inner container" aria-label="Primary">
        <motion.a
          className="nav__logo"
          href="#home"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING}
          onClick={(event) => {
            event.preventDefault()
            go('home')
          }}
        >
          <span className="nav__logo-mark" aria-hidden="true">
            RN
          </span>
          <span className="nav__logo-text mono">
            {profile.brand}
            <motion.span
              className="nav__logo-caret"
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
          </span>
        </motion.a>

        <ul className="nav__links">
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav__link${isActive ? ' is-active' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    go(link.id)
                  }}
                >
                  <span className="nav__link-label">{link.label}</span>
                  {isActive && (
                    /* One shared layoutId means the pill slides between links
                       rather than fading out and in. */
                    <motion.span
                      className="nav__pill"
                      layoutId="nav-pill"
                      transition={SPRING_SOFT}
                      aria-hidden="true"
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="nav__actions">
          <ThemeToggle theme={theme} setTheme={setTheme} />

          {/* Availability, stated in the bar itself. It is the fact that decides
              whether a visitor bothers with the CTA beside it. */}
          {site.available && (
            <p className="nav__status mono" title={site.availabilityLabel}>
              <span className="nav__status-dot" aria-hidden="true" />
              <span className="nav__status-text">Available</span>
            </p>
          )}

          {/* One primary action in the bar, everywhere on the page. */}
          <MagneticButton
            type="button"
            className="btn btn--primary btn--sm nav__cta"
            strength={5}
            onClick={() => go('contact')}
          >
            Start a Project
            <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
          </MagneticButton>

          <Pressable
            icon
            sheen={false}
            type="button"
            className="nav__burger"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={open ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -60, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 60, scale: 0.8 }}
                transition={{ duration: 0.18, ease: EASE }}
                style={{ display: 'grid', placeItems: 'center' }}
              >
                {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </Pressable>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__drawer"
            id="mobile-nav"
            variants={drawerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            /* Swipe up to dismiss, driven from the grab handle rather than the
               whole panel: enabling Framer's own drag listener here would set
               `touch-action` on the drawer and trap its vertical scrolling on a
               short screen. `dragListener={false}` + dragControls keeps the
               gesture on the handle and the scrolling intact. */
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.35, bottom: 0 }}
            onDragEnd={(_event, info) => {
              if (info.offset.y < -70 || info.velocity.y < -450) setOpen(false)
            }}
          >
            <button
              type="button"
              className="nav__drawer-handle"
              onPointerDown={(event) => dragControls.start(event)}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <span aria-hidden="true" />
            </button>

            <ul className="nav__drawer-links">
              {navLinks.map((link, index) => (
                <motion.li key={link.id} variants={drawerItem}>
                  <a
                    href={`#${link.id}`}
                    className={`nav__drawer-link${active === link.id ? ' is-active' : ''}`}
                    aria-current={active === link.id ? 'true' : undefined}
                    onClick={(event) => {
                      event.preventDefault()
                      go(link.id)
                    }}
                  >
                    <span className="mono nav__drawer-num">{String(index + 1).padStart(2, '0')}</span>
                    {link.label}
                    <span className="nav__drawer-chevron" aria-hidden="true" />
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div className="nav__drawer-foot" variants={drawerItem}>
              {/* Labelled on mobile: there is room for words here, and the
                  drawer is the only place a touch user can reach the control. */}
              <div className="nav__drawer-theme">
                <span className="nav__drawer-theme-label mono">Theme</span>
                <ThemeToggle theme={theme} setTheme={setTheme} compact />
              </div>

              <Pressable type="button" className="btn btn--primary btn--block" onClick={() => go('contact')}>
                Start a Project
                <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
              </Pressable>

              <Pressable
                as="a"
                className="btn btn--outline btn--block"
                href={profile.resumeUrl}
                download={profile.resumeFileName}
              >
                <Download size={15} strokeWidth={2} aria-hidden="true" />
                Download Resume
              </Pressable>

              <ul className="nav__drawer-socials">
                {channels.map((channel) => (
                  <li key={channel.id}>
                    <Pressable
                      as="a"
                      icon
                      sheen={false}
                      href={channel.href}
                      aria-label={channel.label}
                      title={channel.label}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    >
                      <Icon name={channel.icon} size={17} />
                    </Pressable>
                  </li>
                ))}
              </ul>
              <p className="nav__drawer-hint mono" aria-hidden="true">
                Swipe up to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
