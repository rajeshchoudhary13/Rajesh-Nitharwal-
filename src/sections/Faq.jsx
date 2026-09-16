import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedButton from '../components/AnimatedButton.jsx'
import { Minus, Plus } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { faqs } from '../data/faq.js'
import { EASE, fadeUp, stagger } from '../utils/motion.js'
import '../styles/faq.css'

/**
 * FAQ accordion.
 *
 * Built from buttons and `aria-expanded` rather than <details>/<summary>,
 * because the answer's height is animated and a native disclosure cannot be
 * animated open without fighting the element's own toggle behaviour.
 *
 * One item open at a time. With seven questions, allowing all of them open at
 * once turns the section into a wall of text — which is the thing an accordion
 * exists to prevent.
 */
export default function Faq() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq__container">
        <SectionHeading
          eyebrow="Questions"
          eyebrowIcon="circle-help"
          center
          id="faq-title"
          title={
            <>
              Before you <span className="grad">get in touch</span>
            </>
          }
          desc="The questions that arrive most often, answered honestly — including the one about cost."
        />

        <Reveal as="ul" className="faq__list" variants={stagger(0.04)}>
          {faqs.map((item) => {
            const isOpen = open === item.id
            const panelId = `faq-panel-${item.id}`
            const buttonId = `faq-button-${item.id}`

            return (
              <motion.li className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.id} variants={fadeUp}>
                <h3 className="faq__q">
                  <button
                    type="button"
                    id={buttonId}
                    className="faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                  >
                    <span className="faq__q-text">{item.q}</span>
                    {/* Plus / minus rather than a rotating chevron: the state is
                        readable at a glance without relying on remembering
                        which way the arrow pointed a moment ago. */}
                    <span className="faq__mark" aria-hidden="true">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={isOpen ? 'minus' : 'plus'}
                          initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                          transition={{ duration: 0.16, ease: EASE }}
                          style={{ display: 'grid', placeItems: 'center' }}
                        >
                          {isOpen ? <Minus size={16} strokeWidth={2.4} /> : <Plus size={16} strokeWidth={2.4} />}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq__a"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <p className="faq__a-text">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </Reveal>

        <Reveal className="faq__foot">
          <p className="faq__foot-text">Still unanswered? Ask directly — a short reply costs me nothing.</p>
          {/* A real route now, not an in-page scroll: this section is mounted on
              /contact and on nothing else, so the link points at the form above
              it — and works from anywhere the section is later reused. */}
          <AnimatedButton to="/contact" variant="outline" size="sm">
            Ask a question
          </AnimatedButton>
        </Reveal>
      </div>
    </section>
  )
}
