import { motion } from 'framer-motion'
import AnimatedButton from '../components/AnimatedButton.jsx'
import GlowCard from '../components/GlowCard.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { processSteps } from '../data/process.js'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import { useScrollRail } from '../hooks/useScrollRail.js'
import { fadeUp, SPRING, SPRING_POP, stagger, viewportEarly } from '../utils/motion.js'
import '../styles/process.css'

/**
 * How I work — seven steps.
 *
 * One list, two shapes: a horizontal rail on desktop and a vertical one on
 * mobile. The layout itself is pure CSS, so the markup is identical either way;
 * only the *axis the rail grows along* has to be chosen in JS, because Framer
 * writes the fill as an inline transform and a stylesheet cannot override it.
 * One media-query boolean is the whole cost.
 *
 * Each card carries what the client gets out of the step and how much of their
 * time it costs, because "how involved will I have to be?" is the real question
 * behind a process section.
 */
export default function Process() {

  /* Matches the 720px breakpoint in process.css, where the rail moves into the
     left gutter. Kept in step with that media query by hand — one number. */
  const isStacked = useMediaQuery('(max-width: 720px)')

  const { trackRef, progress } = useScrollRail({ offset: ['start 80%', 'end 65%'] })

  return (
    <section className="section process" id="process" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading
          eyebrow="Process"
          eyebrowIcon="route"
          center
          id="process-title"
          title={
            <>
              How <span className="grad">I work</span>
            </>
          }
          desc="Seven steps from first conversation to a supported, live product — with what you get and what it asks of you at every one."
        />

        <div className="process__track" ref={trackRef}>
          <div className="process__rail" aria-hidden="true">
            <motion.span
              className="process__rail-fill"
              style={isStacked ? { scaleY: progress, scaleX: 1 } : { scaleX: progress, scaleY: 1 }}
            />
          </div>

          <motion.ol
            className="process__list"
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={viewportEarly}
          >
            {processSteps.map((step) => (
              <motion.li className="process__item" key={step.id} data-accent={step.accent} variants={fadeUp}>
                <motion.span
                  className="process__node"
                  aria-hidden="true"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportEarly}
                  transition={SPRING_POP}
                />

                <GlowCard className="process__card glass" whileHover={{ y: -5, transition: SPRING }}>
                  <div className="process__card-head">
                    <span className="process__icon" aria-hidden="true">
                      <Icon name={step.icon} size={19} />
                    </span>
                    <span className="process__step mono" aria-hidden="true">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="process__title">{step.title}</h3>
                  <p className="process__desc">{step.desc}</p>

                  <dl className="process__meta">
                    <dt>You get</dt>
                    <dd>{step.output}</dd>
                    <dt>Your part</dt>
                    <dd>{step.involvement}</dd>
                  </dl>
                </GlowCard>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <Reveal className="process__foot">
          <p className="process__foot-text">
            Step one is a conversation, and it costs nothing. Tell me what you are building and I will tell you what it
            takes.
          </p>
          <AnimatedButton to="/contact" variant="primary">
            Start at step one
          </AnimatedButton>
        </Reveal>
      </div>
    </section>
  )
}
