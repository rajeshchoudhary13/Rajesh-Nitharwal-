import { Check } from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { advantages } from '../data/advantages.js'
import { scaleIn, stagger } from '../utils/motion.js'
import '../styles/whyme.css'

/**
 * Why work with me — six trust points.
 *
 * Every card carries a line of evidence under the claim, and that is the whole
 * design idea: a trust section made of adjectives is worth nothing, so each
 * point has to name something on this site or in the work that backs it up.
 */
export default function WhyMe() {
  return (
    <section className="section why" id="why" aria-labelledby="why-title">
      <div className="container">
        <SectionHeading
          eyebrow="Working together"
          eyebrowIcon="handshake"
          center
          id="why-title"
          title={
            <>
              Why <span className="grad">work with me?</span>
            </>
          }
          desc="Six commitments, each with something concrete behind it rather than an adjective."
        />

        <Reveal as="ul" className="why__grid" variants={stagger(0.05)}>
          {advantages.map((item, index) => (
            <GlowCard
              as="li"
              className="why__card glass"
              key={item.id}
              data-accent={item.accent}
              variants={scaleIn}
            >
              <span className="why__num mono" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="why__icon" aria-hidden="true">
                <Icon name={item.icon} size={20} />
              </span>
              <h3 className="why__title">{item.title}</h3>
              <p className="why__desc">{item.desc}</p>
              <p className="why__evidence">
                <Check size={12} strokeWidth={2.6} aria-hidden="true" />
                {item.evidence}
              </p>
            </GlowCard>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
