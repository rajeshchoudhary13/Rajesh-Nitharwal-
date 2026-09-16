import { motion } from 'framer-motion'
import { CircleDot, MapPin } from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import Icon from '../components/Icon.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { experience } from '../data/experience.js'
import { useScrollRail } from '../hooks/useScrollRail.js'
import { fadeUp, growIn, SPRING, SPRING_POP, stagger, viewportOnce } from '../utils/motion.js'
import '../styles/experience.css'

export default function Experience() {
  /* The progress line grows as the timeline scrolls through the viewport.
     Shared with the Process and CaseStudies rails via the hook, so the site's
     one "you are here" gesture moves identically in all three places — the
     spring constants had already drifted apart when each section owned its
     own copy. */
  const { trackRef, progress: scaleY } = useScrollRail({ offset: ['start 78%', 'end 55%'] })

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          eyebrow="Work experience"
          eyebrowIcon="briefcase"
          id="experience-title"
          title={
            <>
              Where I have <span className="grad">shipped</span>
            </>
          }
          desc="Four professional roles across mobile and web development, from a web development internship to owning React Native features on live client apps."
        />

        <div className="timeline" ref={trackRef}>
          <div className="timeline__rail" aria-hidden="true">
            <motion.span className="timeline__progress" style={{ scaleY }} />
          </div>

          <ol className="timeline__list">
            {experience.map((job) => (
              <motion.li
                className="tl-item"
                key={job.id}
                variants={stagger(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
              >
                {/* The node lands on a spring just ahead of its card, so the
                    eye is drawn to the rail before the content fills in. */}
                <motion.span
                  className="tl-item__node"
                  variants={fadeUp}
                  transition={SPRING_POP}
                  aria-hidden="true"
                >
                  <Icon name={job.icon} size={15} />
                  {job.current && (
                    <motion.span
                      className="tl-item__pulse"
                      animate={{ scale: [1, 1.65], opacity: [0.4, 0] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                </motion.span>

                <GlowCard
                  as="article"
                  className="tl-card glass"
                  variants={growIn}
                  whileHover={{ y: -4, transition: SPRING }}
                >
                  <header className="tl-card__head">
                    <div>
                      <h3 className="tl-card__title">{job.title}</h3>
                      <p className="tl-card__company">
                        {job.company}
                        <span className="tl-card__loc">
                          <MapPin size={12} strokeWidth={2} aria-hidden="true" />
                          {job.location}
                        </span>
                      </p>
                    </div>
                    <span className={`tl-card__period mono${job.current ? ' is-current' : ''}`}>
                      {job.current && <CircleDot size={12} strokeWidth={2.4} aria-hidden="true" />}
                      {job.period}
                    </span>
                  </header>

                  <p className="tl-card__summary">{job.summary}</p>

                  <ul className="tl-card__points">
                    {job.points.map((point) => (
                      <li key={point}>
                        <span className="tl-card__bullet" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="chip-row tl-card__tech">
                    {job.tech.map((tech) => (
                      <span className="chip" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
