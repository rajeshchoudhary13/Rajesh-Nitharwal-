import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import {
  Building2,
  CalendarDays,
  ExternalLink,
  Info,
  Layers,
  ListOrdered,
  Smartphone,
  User,
  X,
  Zap,
} from 'lucide-react'
import Icon from './Icon.jsx'
import Pressable from './Pressable.jsx'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js'
import { backdropVariants, fadeUp, modalVariants, stagger } from '../utils/motion.js'
import '../styles/modal.css'

/**
 * Accessible animated project dialog.
 * - Escape closes, backdrop click closes.
 * - Focus moves to the panel on open and returns to the trigger on close.
 * - Focus is trapped inside the dialog while it is open.
 * - On phones the panel is a bottom sheet that can be dragged down to dismiss.
 */
export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null)
  const lastFocused = useRef(null)
  /* Drag starts from the sheet's grab handle only, so the panel keeps its own
     vertical scrolling — a full-panel drag listener would claim the gesture. */
  const dragControls = useDragControls()

  useLockBodyScroll(Boolean(project))

  useEffect(() => {
    if (!project) return
    lastFocused.current = document.activeElement
    panelRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const candidates = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      /* Filter out anything not actually rendered: the bottom-sheet grab handle
         is `display: none` above the phone breakpoint, and calling focus() on a
         hidden element does nothing — which would silently break the Tab wrap. */
      const focusables = [...(candidates ?? [])].filter((el) => el.offsetParent !== null)
      if (!focusables.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      lastFocused.current?.focus?.()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal"
          variants={backdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="modal__panel"
            data-accent={project.accent}
            variants={modalVariants}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            ref={panelRef}
            onClick={(event) => event.stopPropagation()}
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_event, info) => {
              /* Distance or flick — either dismisses, which is what makes a
                 sheet feel native rather than merely draggable. */
              if (info.offset.y > 120 || info.velocity.y > 600) onClose()
            }}
          >
            {/* Sheet grab handle. Only visible at the width where the panel
                becomes a bottom sheet (see modal.css); it is also a real close
                button, so keyboard users are never asked to swipe. */}
            <button
              type="button"
              className="modal__handle"
              onPointerDown={(event) => dragControls.start(event)}
              onClick={onClose}
              aria-label="Close project details"
            >
              <span aria-hidden="true" />
            </button>

            <Pressable
              icon
              sheen={false}
              type="button"
              className="modal__close"
              onClick={onClose}
              aria-label="Close project details"
            >
              <X size={18} strokeWidth={2} aria-hidden="true" />
            </Pressable>

            {/* One staggered parent so the dialog's sections cascade in rather
                than all appearing with the panel. */}
            <motion.div className="modal__body" variants={stagger(0.055, 0.12)} initial="hidden" animate="show">
              <motion.header className="modal__head" variants={fadeUp}>
                <span className="modal__icon">
                  <Icon name={project.icon} size={26} />
                </span>
                <div>
                  <h3 id="modal-title">{project.name}</h3>
                  <p className="modal__tagline">{project.tagline}</p>
                </div>
              </motion.header>

              {/* Every row is optional except Period: the client apps carry role,
                  platform and company, while the earlier web work carries none of
                  them. A missing value drops its row rather than printing a
                  labelled blank. */}
              <motion.dl className="modal__meta" variants={fadeUp}>
                {project.role && (
                  <div>
                    <dt>
                      <User size={13} strokeWidth={2} aria-hidden="true" /> Role
                    </dt>
                    <dd>{project.role}</dd>
                  </div>
                )}
                {project.platform && (
                  <div>
                    <dt>
                      <Smartphone size={13} strokeWidth={2} aria-hidden="true" /> Platform
                    </dt>
                    <dd>{project.platform}</dd>
                  </div>
                )}
                {project.company && (
                  <div>
                    <dt>
                      <Building2 size={13} strokeWidth={2} aria-hidden="true" /> Company
                    </dt>
                    <dd>{project.company}</dd>
                  </div>
                )}
                {project.period && (
                  <div>
                    <dt>
                      <CalendarDays size={13} strokeWidth={2} aria-hidden="true" /> Period
                    </dt>
                    <dd>{project.period}</dd>
                  </div>
                )}
                {project.domain && (
                  <div>
                    <dt>
                      <Layers size={13} strokeWidth={2} aria-hidden="true" /> Domain
                    </dt>
                    <dd>{project.domain}</dd>
                  </div>
                )}
              </motion.dl>

              {/* Stack facts, shown only for projects that document them. */}
              {project.spec?.length > 0 && (
                <motion.ul className="modal__spec" variants={fadeUp}>
                  {project.spec.map(({ label, value }) => (
                    <li key={label}>
                      <span className="modal__spec-label mono">{label}</span>
                      <span className="modal__spec-value">{value}</span>
                    </li>
                  ))}
                </motion.ul>
              )}

              <motion.div className="modal__section" variants={fadeUp}>
                <h4>Overview</h4>
                <p>{project.description}</p>
              </motion.div>

              {/* The engineering callout leads, because it is what the flow and
                  the contribution list are ultimately evidence for. */}
              {project.deepDive && (
                <motion.div className="modal__section modal__deep" variants={fadeUp}>
                  <h4>
                    <Zap size={13} strokeWidth={2} aria-hidden="true" />
                    Core technical piece — {project.deepDive.title}
                  </h4>
                  <p>{project.deepDive.intro}</p>
                  <ul className="modal__list modal__deep-list">
                    {project.deepDive.points.map((point) => (
                      <li key={point}>
                        <span className="modal__bullet" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {project.deepDive.reliability && (
                    <p className="modal__deep-foot">{project.deepDive.reliability}</p>
                  )}
                </motion.div>
              )}

              {project.contributions?.length > 0 && (
              <motion.div className="modal__section" variants={fadeUp}>
                <h4>{project.kind === 'mobile' ? 'Contributions' : 'What it does'}</h4>
                <ul className="modal__list">
                  {project.contributions.map((point) => (
                    <li key={point}>
                      <span className="modal__bullet" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
              )}

              {/* Runtime flow, numbered so the reader can follow the app the
                  way a user actually moves through it. */}
              {project.flow?.length > 0 && (
                <motion.div className="modal__section" variants={fadeUp}>
                  <h4>
                    <ListOrdered size={13} strokeWidth={2} aria-hidden="true" />
                    End-to-end flow
                  </h4>
                  <ol className="modal__flow">
                    {project.flow.map((step, index) => (
                      <li key={step}>
                        <span className="modal__flow-num mono" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="modal__flow-text">{step}</span>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}

              {project.integrations?.length > 0 && (
                <motion.div className="modal__section" variants={fadeUp}>
                  <h4>Integrations</h4>
                  <div className="chip-row">
                    {project.integrations.map((item) => (
                      <span className="chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {project.tech?.length > 0 ? (
                <motion.div className="modal__section" variants={fadeUp}>
                  <h4>Technologies</h4>
                  <div className="chip-row">
                    {project.tech.map((item) => (
                      <span className="chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  {project.techNote && <p className="modal__foot-note">{project.techNote}</p>}
                </motion.div>
              ) : (
                project.techNote && (
                  <motion.div className="modal__section" variants={fadeUp}>
                    <h4>Technologies</h4>
                    <p className="modal__foot-note">{project.techNote}</p>
                  </motion.div>
                )
              )}

              {project.links?.length > 0 && (
                <motion.div className="modal__actions" variants={fadeUp}>
                  {project.links.map((link) => (
                    <Pressable
                      as="a"
                      key={link.href}
                      className="btn btn--sm btn--primary"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {link.label}
                      <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
                    </Pressable>
                  ))}
                </motion.div>
              )}

              {/* Says why a live link is missing, so its absence reads as a
                  verified fact rather than an oversight. */}
              {project.linkNote && !project.links?.length && (
                <motion.p className="modal__foot-note" variants={fadeUp}>
                  {project.linkNote}
                </motion.p>
              )}

              {project.note && (
                <motion.p className="note modal__note" variants={fadeUp}>
                  <Info size={14} aria-hidden="true" />
                  {project.note}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
