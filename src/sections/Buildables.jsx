import { Check } from 'lucide-react'
import AnimatedButton from '../components/AnimatedButton.jsx'
import GlowCard from '../components/GlowCard.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { buildables } from '../data/buildables.js'
import { allProjects } from '../data/projects.js'
import { scaleIn, stagger } from '../utils/motion.js'
import '../styles/buildables.css'

/** Project id → display name, so a category can name the work that backs it. */
const PROJECT_NAMES = new Map(allProjects.map((project) => [project.id, project.name]))

/**
 * "Have an idea? I can build it." — the recognition section.
 *
 * Twelve product categories in plain language. A visitor is meant to find the
 * one that matches the idea in their head and stop looking for reasons to
 * leave, which is why the copy describes outcomes rather than technology.
 *
 * Categories that already have comparable work behind them say so and name it.
 * The rest are honest capability statements with no badge — the distinction is
 * visible on purpose, because a claim that quietly implies past work is the
 * kind of thing a client discovers later.
 */
export default function Buildables() {
  return (
    <section className="section" id="build" aria-labelledby="build-title">
      <div className="container">
        <SectionHeading
          eyebrow="What I can build for you"
          eyebrowIcon="lightbulb"
          center
          id="build-title"
          title={
            <>
              Have an idea? <span className="grad">I can build it.</span>
            </>
          }
          desc="The kinds of products I take on. If yours is not on this list, it is almost certainly a variation of something that is."
        />

        <Reveal as="ul" className="build__grid" variants={stagger(0.04)}>
          {buildables.map((item) => {
            const builtName = item.evidence ? PROJECT_NAMES.get(item.evidence) : null

            return (
              <GlowCard
                as="li"
                className="build__card glass"
                key={item.id}
                data-accent={item.accent}
                variants={scaleIn}
              >
                <span className="build__icon" aria-hidden="true">
                  <Icon name={item.icon} size={21} />
                </span>
                <h3 className="build__title">{item.title}</h3>
                <p className="build__desc">{item.desc}</p>

                {builtName && (
                  <p className="build__proof">
                    <Check size={12} strokeWidth={2.6} aria-hidden="true" />
                    Built before — {builtName}
                  </p>
                )}
              </GlowCard>
            )
          })}
        </Reveal>

        <Reveal className="build__foot">
          <p className="build__foot-text">
            Describe your idea in a few sentences — you do not need a spec, a wireframe or the technical words for it.
          </p>
          <AnimatedButton to="/contact" variant="primary">
            Tell me your idea
          </AnimatedButton>
        </Reveal>
      </div>
    </section>
  )
}
