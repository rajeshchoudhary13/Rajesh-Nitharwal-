import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, FolderOpen, MapPin, Clock } from 'lucide-react'
import HeroVisual from '../components/HeroVisual.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import Pressable from '../components/Pressable.jsx'
import TechMarquee from '../components/TechMarquee.jsx'
import { site } from '../config/site.js'
import { EASE, fadeUp, maskUp, stagger } from '../utils/motion.js'
import { scrollToId } from '../utils/scroll.js'
import '../styles/hero.css'

/**
 * The headline is split into lines rather than words: each line rises out from
 * behind its own clip edge, which reads as type being set. Splitting per word
 * at this size makes a long sentence flicker.
 */
const HEADLINE = ['I Build Digital Products', 'That Turn Ideas Into', 'Scalable Experiences.']

/** Technology indicators — the seven a client scans for, in plain language. */
const INDICATORS = ['React Native', 'React.js', 'Node.js', 'APIs', 'Firebase', 'Cloud', 'Mobile Apps']

export default function Hero() {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()

  /* Depth on scroll: the copy and the visual leave the viewport at slightly
     different rates. Driven by motion values, so the parallax costs no React
     renders — and it is skipped entirely for reduced-motion visitors. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 })
  const copyY = useTransform(smooth, [0, 1], [0, -46])
  const visualY = useTransform(smooth, [0, 1], [0, -96])
  const fade = useTransform(smooth, [0, 0.85], [1, 0.35])

  const parallax = reduceMotion ? {} : { style: { y: copyY, opacity: fade } }
  const visualParallax = reduceMotion ? {} : { style: { y: visualY } }

  return (
    <section className="hero section" id="home" aria-labelledby="hero-title" ref={sectionRef}>
      <div className="container hero__inner">
        <motion.div
          className="hero__copy"
          variants={stagger(0.08, 0.12)}
          initial="hidden"
          animate="show"
          {...parallax}
        >
          {/* Availability first: it is the one fact that decides whether the
              rest of the page is worth reading. */}
          <motion.p
            className={`hero__badge${site.available ? '' : ' is-busy'}`}
            variants={fadeUp}
            role="status"
          >
            <span className="hero__badge-dot" aria-hidden="true" />
            {site.available ? site.availabilityLabel : site.availabilityBusyLabel}
          </motion.p>

          <h1 className="hero__title" id="hero-title">
            {/* The visible copy is per-line and hidden from assistive tech; the
                sentence is announced once, intact, from the sr-only copy. */}
            <span className="sr-only">{HEADLINE.join(' ')}</span>
            <span aria-hidden="true" className="hero__title-lines">
              {HEADLINE.map((line, i) => (
                <motion.span className="hero__word" key={line} variants={maskUp}>
                  <span className={i === HEADLINE.length - 1 ? 'hero__title-grad' : undefined}>{line}</span>
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p className="hero__intro" variants={fadeUp}>
            <strong>{site.role}</strong> helping startups, businesses and entrepreneurs design, build and launch
            high-quality web and mobile applications.
          </motion.p>

          <motion.div className="hero__cta" variants={fadeUp}>
            <MagneticButton
              type="button"
              className="btn btn--primary btn--arrow hero__cta-primary"
              onClick={() => scrollToId('contact')}
            >
              Start a Project
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </MagneticButton>

            <Pressable type="button" className="btn btn--outline" onClick={() => scrollToId('projects')}>
              <FolderOpen size={16} strokeWidth={2} aria-hidden="true" />
              View My Work
            </Pressable>
          </motion.div>

          <motion.ul className="hero__stack" variants={fadeUp} aria-label="Core technologies">
            {INDICATORS.map((tech) => (
              <li key={tech} className="hero__stack-item mono">
                {tech}
              </li>
            ))}
          </motion.ul>

          <motion.ul className="hero__facts" variants={fadeUp}>
            <li>
              <MapPin size={14} strokeWidth={2} aria-hidden="true" />
              {site.location} · {site.timezone}
            </li>
            <li>
              <Clock size={14} strokeWidth={2} aria-hidden="true" />
              {site.responseTime}
            </li>
          </motion.ul>
        </motion.div>

        <motion.div className="hero__visual-wrap" {...visualParallax}>
          <HeroVisual />
        </motion.div>
      </div>

      {/* Scroll affordance — a quiet nudge that there is more below the fold. */}
      <motion.button
        type="button"
        className="scroll-cue hero__cue"
        onClick={() => scrollToId('services')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.05, ease: EASE }}
      >
        <span className="scroll-cue__track" aria-hidden="true">
          <span className="scroll-cue__dot" />
        </span>
        What I build
      </motion.button>

      <motion.div
        className="hero__marquee"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
      >
        <TechMarquee />
      </motion.div>
    </section>
  )
}
