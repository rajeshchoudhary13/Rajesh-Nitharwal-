import { ArrowRight, Check } from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import Icon from '../components/Icon.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { engagements } from '../config/site.js'
import { scaleIn, stagger } from '../utils/motion.js'
import { scrollToId } from '../utils/scroll.js'
import '../styles/engagement.css'

/**
 * Freelance engagement models.
 *
 * Three ways in, because a visitor arrives in one of three states — nothing
 * built yet, something built that is not working, or a product that needs
 * someone to keep going with it. Naming all three lets a client self-select
 * instead of wondering whether their situation is the kind you take on.
 */
export default function Engagement() {
  return (
    <section className="section engage" id="engagement" aria-labelledby="engagement-title">
      <div className="container">
        <SectionHeading
          eyebrow="Freelance engagement"
          eyebrowIcon="briefcase"
          center
          id="engagement-title"
          title={
            <>
              Let&apos;s build your <span className="grad">next product</span>
            </>
          }
          desc="Whether you have a startup idea, an existing application that needs improvements, or a complete product to be built from scratch, I can help take it from concept to production."
        />

        <Reveal as="ul" className="engage__grid" variants={stagger(0.06)}>
          {engagements.map((option) => (
            <GlowCard
              as="li"
              className="engage__card glass"
              key={option.id}
              data-accent={option.accent}
              variants={scaleIn}
            >
              <span className="engage__tag mono">{option.tag}</span>
              <span className="engage__icon" aria-hidden="true">
                <Icon name={option.icon} size={22} />
              </span>
              <h3 className="engage__title">{option.title}</h3>
              <p className="engage__desc">{option.desc}</p>

              <ul className="engage__points">
                {option.points.map((point) => (
                  <li key={point}>
                    <Check size={13} strokeWidth={2.6} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </Reveal>

        <Reveal className="engage__cta">
          <MagneticButton
            type="button"
            className="btn btn--primary btn--arrow"
            onClick={() => scrollToId('contact')}
          >
            Discuss Your Project
            <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
          </MagneticButton>
          <p className="engage__cta-note">
            Not sure which one fits? Describe the situation and I will tell you which of the three it is.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
