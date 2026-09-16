import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedButton from '../components/AnimatedButton.jsx'
import { Check, Info, MonitorSmartphone, Users } from 'lucide-react'
import Icon from '../components/Icon.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { CASE_STAGES, caseStudies } from '../data/caseStudies.js'
import { onOpenCaseStudy } from '../utils/bus.js'
import { useScrollRail } from '../hooks/useScrollRail.js'
import { fadeUp, panelSwap, SPRING_POP, SPRING_SOFT, stagger, viewportEarly } from '../utils/motion.js'
import { scrollToId } from '../utils/scroll.js'
import '../styles/casestudy.css'

/**
 * Whether a stage has anything to show for this study.
 *
 * Checked against the data rather than against the rendered output: a component
 * that returns `null` still produces a truthy element, so testing the element
 * would let an empty stage through as a numbered step with nothing under it.
 */
function hasStage(stageId, study) {
  switch (stageId) {
    case 'features':
      return Boolean(study.features?.length)
    case 'technology':
    case 'integrations':
      return Boolean(study[stageId]?.length)
    case 'challenges':
      return Boolean(study.challenges)
    default:
      return Boolean(study[stageId])
  }
}

/**
 * Renders one stage of the timeline. The stages carry different shapes of
 * content — prose, a checklist, chips, a nested deep-dive — so the switch is
 * here rather than in the data, which keeps data/caseStudies.js declarative.
 */
function StageBody({ stage, study }) {
  switch (stage.id) {
    case 'problem':
    case 'solution':
    case 'result':
      return <p className="cs__prose">{study[stage.id]}</p>

    case 'features':
      return (
        <ul className="cs__checklist">
          {study.features.map((feature) => (
            <li key={feature}>
              <Check size={13} strokeWidth={2.6} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      )

    case 'technology':
    case 'integrations': {
      const items = study[stage.id]
      if (!items?.length) return null
      return (
        <ul className="cs__chips">
          {items.map((item) => (
            <li key={item} className="mono">
              {item}
            </li>
          ))}
        </ul>
      )
    }

    case 'challenges': {
      const deep = study.challenges
      if (!deep) return null
      return (
        <div className="cs__deep">
          <p className="cs__deep-title">{deep.title}</p>
          <p className="cs__prose">{deep.intro}</p>
          <ul className="cs__deep-points">
            {deep.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          {deep.reliability && (
            <p className="cs__deep-note">
              <Info size={13} strokeWidth={2} aria-hidden="true" />
              {deep.reliability}
            </p>
          )}
        </div>
      )
    }

    default:
      return null
  }
}

/**
 * Case studies — the section that answers "have you done work like mine?".
 *
 * One project at a time, walked through as a seven-stage timeline from the
 * client's problem to the finished result. The rail beside the stages fills as
 * the section is scrolled, so the progress through the story is visible.
 *
 * The project tabs can also be driven from the featured-work section: it
 * dispatches an id on the bus in utils/bus.js, and the effect below selects
 * that study and scrolls here.
 */
export default function CaseStudies() {
  const [activeId, setActiveId] = useState(caseStudies[0]?.id)


  /* The rail fill is a scroll-linked spring, so it never re-renders React. */
  const { trackRef, progress: railFill } = useScrollRail({ offset: ['start 70%', 'end 70%'] })

  useEffect(
    () =>
      onOpenCaseStudy((id) => {
        if (!caseStudies.some((study) => study.id === id)) return
        setActiveId(id)
        /* Scroll after paint, so the newly selected panel is already laid out
           and the section lands at the right offset rather than mid-swap. */
        requestAnimationFrame(() => scrollToId('case-studies'))
      }),
    [],
  )

  const select = useCallback((id) => setActiveId(id), [])

  const study = caseStudies.find((item) => item.id === activeId) ?? caseStudies[0]
  if (!study) return null

  return (
    <section className="section cs" id="case-studies" aria-labelledby="case-studies-title">
      <div className="container">
        <SectionHeading
          eyebrow="Case studies"
          eyebrowIcon="file-text"
          center
          id="case-studies-title"
          title={
            <>
              How the work <span className="grad">actually went</span>
            </>
          }
          desc="The full story of four production applications — the problem the business had, what was built, what was hard about it and what the finished product does. No technical background needed."
        />

        {/* Project selector */}
        <div className="cs__tabs" role="tablist" aria-label="Choose a case study">
          {caseStudies.map((item) => {
            const isActive = item.id === study.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`cs-tab-${item.id}`}
                aria-selected={isActive}
                aria-controls={`cs-panel-${item.id}`}
                className={`cs__tab${isActive ? ' is-active' : ''}`}
                data-accent={item.accent}
                onClick={() => select(item.id)}
              >
                {isActive && (
                  /* One shared layoutId, so the highlight slides between tabs
                     instead of blinking out and in. */
                  <motion.span
                    className="cs__tab-bg"
                    layoutId="cs-tab-bg"
                    transition={SPRING_SOFT}
                    aria-hidden="true"
                  />
                )}
                <Icon name={item.icon} size={16} />
                <span className="cs__tab-name">{item.name}</span>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="cs__panel"
            key={study.id}
            id={`cs-panel-${study.id}`}
            role="tabpanel"
            aria-labelledby={`cs-tab-${study.id}`}
            data-accent={study.accent}
            variants={panelSwap}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* ---- Study header ---- */}
            <header className="cs__head glass">
              <span className="cs__head-icon" aria-hidden="true">
                <Icon name={study.icon} size={24} />
              </span>
              <div className="cs__head-text">
                <p className="cs__head-domain mono">{study.domain}</p>
                <h3 className="cs__head-name">{study.name}</h3>
                <p className="cs__head-tagline">{study.tagline}</p>
              </div>
              <dl className="cs__head-meta">
                <div>
                  <dt>
                    <Users size={13} strokeWidth={2} aria-hidden="true" />
                    Built for
                  </dt>
                  <dd>{study.audience}</dd>
                </div>
                <div>
                  <dt>
                    <MonitorSmartphone size={13} strokeWidth={2} aria-hidden="true" />
                    Platform
                  </dt>
                  <dd>{study.platform}</dd>
                </div>
              </dl>
            </header>

            {/* ---- Timeline ---- */}
            <div className="cs__track" ref={trackRef}>
              <div className="cs__rail" aria-hidden="true">
                <motion.span className="cs__rail-fill" style={{ scaleY: railFill }} />
              </div>

              <motion.ol className="cs__stages" variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={viewportEarly}>
                {/* Filtered before numbering, so the visible steps read 01, 02, 03
                    with no gap where a skipped stage would have been. */}
                {CASE_STAGES.filter((stage) => hasStage(stage.id, study)).map((stage, index) => (
                  <motion.li className="cs__stage" key={stage.id} variants={fadeUp}>
                    <motion.span
                      className="cs__node"
                      aria-hidden="true"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={viewportEarly}
                      transition={SPRING_POP}
                    >
                      <Icon name={stage.icon} size={14} />
                    </motion.span>

                    <div className="cs__stage-body">
                      <p className="cs__stage-step mono" aria-hidden="true">
                        Step {String(index + 1).padStart(2, '0')}
                      </p>
                      <h4 className="cs__stage-title">{stage.label}</h4>
                      <StageBody stage={stage} study={study} />
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </div>

            {study.note && (
              <p className="note cs__note">
                <Info size={14} aria-hidden="true" />
                {study.note}
              </p>
            )}

            <div className="cs__cta">
              <p className="cs__cta-text">Building something in this space? The groundwork is already done.</p>
              <AnimatedButton to="/contact" variant="primary">
                Discuss a similar project
              </AnimatedButton>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
