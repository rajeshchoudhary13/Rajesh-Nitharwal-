import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedButton from '../components/AnimatedButton.jsx'
import { Check, ChevronDown } from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { services } from '../data/services.js'
import { EASE, scaleIn, stagger } from '../utils/motion.js'
import '../styles/services.css'

/**
 * Services — the section that has to answer "can you build my thing?" before a
 * visitor scrolls past it.
 *
 * Each card shows icon → number → title → what you get → technologies, and
 * holds its detail behind a disclosure. That keeps the grid scannable in ten
 * seconds while still letting one card go deep, which a fixed-height card
 * cannot do and a modal makes heavier than it needs to be.
 */
export default function Services() {
  /* One open card at a time: two expanded cards in the same row stretch the
     row and push the rest of the grid around. */
  const [open, setOpen] = useState(null)

  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          eyebrow="What I do"
          eyebrowIcon="wrench"
          center
          id="services-title"
          title={
            <>
              Services <span className="grad">I offer</span>
            </>
          }
          desc="From idea to production — I help businesses build reliable, scalable and polished digital products."
        />

        <Reveal as="ul" className="svc__grid" variants={stagger(0.05)}>
          {services.map((service) => {
            const isOpen = open === service.id
            const panelId = `svc-detail-${service.id}`

            return (
              <GlowCard
                as="li"
                className={`svc glass${isOpen ? ' is-open' : ''}`}
                key={service.id}
                data-accent={service.accent}
                variants={scaleIn}
                lift={!isOpen}
              >
                <div className="svc__head">
                  <span className="svc__icon" aria-hidden="true">
                    <Icon name={service.icon} size={22} />
                  </span>
                  <span className="svc__num mono" aria-hidden="true">
                    {service.num}
                  </span>
                </div>

                <h3 className="svc__title">{service.title}</h3>
                <p className="svc__lead">{service.lead}</p>
                <p className="svc__desc">{service.desc}</p>

                <ul className="svc__tech" aria-label={`Technologies used for ${service.title}`}>
                  {service.tech.map((tech) => (
                    <li key={tech} className="svc__tech-item mono">
                      {tech}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="svc__toggle"
                  onClick={() => setOpen(isOpen ? null : service.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  {isOpen ? 'Hide details' : 'View details'}
                  <motion.span
                    className="svc__toggle-chevron"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.24, ease: EASE }}
                    aria-hidden="true"
                  >
                    <ChevronDown size={15} strokeWidth={2.2} />
                  </motion.span>
                </button>

                {/* Height is animated from `auto`, so the panel does not need a
                    hard-coded height that would clip longer copy. */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="svc__detail"
                      id={panelId}
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                    >
                      <div className="svc__detail-inner">
                        <p className="svc__detail-text">{service.detail}</p>
                        <p className="svc__detail-label mono">What you get</p>
                        <ul className="svc__list">
                          {service.deliverables.map((item) => (
                            <li key={item}>
                              <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <AnimatedButton to="/contact" variant="outline" size="sm" className="svc__detail-cta">
                          Discuss this
                        </AnimatedButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlowCard>
            )
          })}
        </Reveal>

        <Reveal className="svc__foot">
          <p className="svc__foot-text">
            Not sure which of these you need? Describe the outcome you want and I will tell you what it takes.
          </p>
          <AnimatedButton to="/contact" variant="primary">
            Start a Project
          </AnimatedButton>
        </Reveal>
      </div>
    </section>
  )
}
