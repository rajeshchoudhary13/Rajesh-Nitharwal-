import { motion } from 'framer-motion'
import { ArrowRight, Check, MonitorSmartphone } from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import Icon from '../components/Icon.jsx'
import PhoneMockup from '../components/PhoneMockup.jsx'
import Pressable from '../components/Pressable.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { caseStudies } from '../data/caseStudies.js'
import { featuredProjects } from '../data/projects.js'
import { openCaseStudy } from '../utils/bus.js'
import { fadeLeft, fadeRight, fadeUp, maskUp, stagger, viewportOnce } from '../utils/motion.js'
import { scrollToId } from '../utils/scroll.js'
import '../styles/featured.css'

/**
 * The featured apps that have a documented case study, in case-study order.
 * A project without a narrative appears in the compact strip below instead of
 * being padded out with copy that was never written about it.
 */
const STUDY_IDS = new Set(caseStudies.map((study) => study.id))
const alsoShipped = featuredProjects.filter((project) => !STUDY_IDS.has(project.id))

/**
 * Featured projects, as editorial rows rather than a grid of thumbnails.
 *
 * Each row gives one project the whole width: a schematic device preview on one
 * side, and on the other the four things a client actually reads — what the
 * business problem was, what was built, which features matter and what it runs
 * on. The rows alternate side on desktop so the eye moves down the page instead
 * of scanning a column.
 *
 * Every "View Case Study" button hands the id to the case-study section through
 * the small event bus in utils/bus.js, so the two sections stay independent.
 */
export default function FeaturedWork() {
  return (
    <section className="section featured" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          eyebrow="Featured work"
          eyebrowIcon="blocks"
          center
          id="projects-title"
          title={
            <>
              Products already <span className="grad">live in production</span>
            </>
          }
          desc="Client applications shipped on Android and iOS. Each one starts from a business problem — open the case study to see how it was solved."
        />

        <div className="featured__rows">
          {caseStudies.map((study, index) => {
            const flipped = index % 2 === 1

            return (
              <motion.article
                className={`fw${flipped ? ' fw--flip' : ''}`}
                key={study.id}
                data-accent={study.accent}
                variants={stagger(0.08)}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
              >
                {/* Visual. Schematic on purpose — no client UI is reproduced. */}
                <motion.div className="fw__visual" variants={flipped ? fadeRight : fadeLeft}>
                  <span className="fw__aura" aria-hidden="true" />
                  <PhoneMockup project={study} index={index} floating={false} />
                </motion.div>

                <div className="fw__body">
                  <motion.p className="fw__meta" variants={fadeUp}>
                    <span className="fw__index mono" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="fw__domain">{study.domain}</span>
                  </motion.p>

                  <motion.h3 className="fw__name" variants={maskUp}>
                    {study.name}
                  </motion.h3>

                  <motion.p className="fw__tagline" variants={fadeUp}>
                    {study.tagline}
                  </motion.p>

                  {/* Problem before solution, every time: a client recognises
                      their own situation in the first block and only then cares
                      about the second. */}
                  <motion.dl className="fw__narrative" variants={fadeUp}>
                    <dt>The problem</dt>
                    <dd>{study.problem}</dd>
                    <dt>What I built</dt>
                    <dd>{study.solution}</dd>
                  </motion.dl>

                  <motion.div className="fw__features" variants={fadeUp}>
                    <p className="fw__label mono">Key features</p>
                    <ul>
                      {study.features.slice(0, 4).map((feature) => (
                        <li key={feature}>
                          <Check size={13} strokeWidth={2.6} aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.ul className="fw__tech" variants={fadeUp} aria-label={`Technologies in ${study.name}`}>
                    {study.technology.slice(0, 6).map((tech) => (
                      <li key={tech} className="mono">
                        {tech}
                      </li>
                    ))}
                    {study.technology.length > 6 && (
                      <li className="mono fw__tech-more">+{study.technology.length - 6} more</li>
                    )}
                  </motion.ul>

                  <motion.div className="fw__foot" variants={fadeUp}>
                    <p className="fw__platform mono">
                      <MonitorSmartphone size={14} strokeWidth={2} aria-hidden="true" />
                      {study.platform}
                    </p>
                    <Pressable
                      type="button"
                      className="btn btn--sm btn--primary btn--arrow"
                      onClick={() => openCaseStudy(study.id)}
                    >
                      View Case Study
                      <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                    </Pressable>
                  </motion.div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Projects without a written case study still belong on the page —
            they just do not pretend to have one. */}
        {alsoShipped.length > 0 && (
          <Reveal as="div" className="featured__also">
            <p className="fw__label mono">Also shipped</p>
            <ul className="featured__also-list">
              {alsoShipped.map((project) => (
                <GlowCard
                  as="li"
                  className="fwmini glass"
                  key={project.id}
                  data-accent={project.accent}
                  variants={fadeUp}
                >
                  <span className="fwmini__icon" aria-hidden="true">
                    <Icon name={project.icon} size={18} />
                  </span>
                  <span className="fwmini__text">
                    <span className="fwmini__name">{project.name}</span>
                    <span className="fwmini__domain">{project.domain}</span>
                  </span>
                  <span className="fwmini__platform mono">{project.platform}</span>
                </GlowCard>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal className="featured__foot">
          <p className="featured__foot-text">
            Want to see the whole archive, including earlier web and UI work?
          </p>
          <Pressable type="button" className="btn btn--sm btn--outline" onClick={() => scrollToId('archive')}>
            Browse all projects
            <ArrowRight size={14} strokeWidth={2.2} aria-hidden="true" />
          </Pressable>
        </Reveal>
      </div>
    </section>
  )
}
