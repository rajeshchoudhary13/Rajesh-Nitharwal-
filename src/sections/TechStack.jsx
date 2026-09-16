import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import Icon from '../components/Icon.jsx'
import Pressable from '../components/Pressable.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { EmptyState } from '../components/StateFeedback.jsx'
import TechIcon from '../components/TechIcon.jsx'
import { skillGroups } from '../data/skills.js'
import { panelSwap, scaleIn, SPRING_SOFT, stagger, viewportOnce } from '../utils/motion.js'
import '../styles/skills.css'

export default function TechStack() {
  const [activeId, setActiveId] = useState(skillGroups[0].id)
  /* Which tile the pointer or keyboard is on. The left panel reads from this, so
     the group blurb is replaced by that technology's own line — the descriptions
     stay in the design instead of being dropped for a logo-only grid. */
  const [hovered, setHovered] = useState(null)

  const activeGroup = skillGroups.find((group) => group.id === activeId) ?? skillGroups[0]
  const skills = activeGroup.skills ?? []
  const focused = hovered ? skills.find((s) => s.name === hovered) : null

  const selectGroup = useCallback((id) => {
    setActiveId(id)
    setHovered(null)
  }, [])

  const coreCount = skills.filter((s) => s.level === 'Core').length

  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <div className="container">
        <SectionHeading
          eyebrow="Technology stack"
          eyebrowIcon="layers"
          center
          id="stack-title"
          title={
            <>
              What your product will <span className="grad">be built with</span>
            </>
          }
          desc="Proven, widely-supported technology — chosen so your product is maintainable by any competent developer later, not only by me."
        />

        {/* Category switcher */}
        <motion.div
          className="skills__tabs"
          role="tablist"
          aria-label="Technology categories"
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {skillGroups.map((group) => {
            const selected = group.id === activeId
            return (
              <Pressable
                key={group.id}
                sheen={false}
                type="button"
                role="tab"
                id={`tab-${group.id}`}
                aria-selected={selected}
                aria-controls={`panel-${group.id}`}
                className={`skills__tab${selected ? ' is-active' : ''}`}
                data-accent={group.accent}
                variants={scaleIn}
                onClick={() => selectGroup(group.id)}
              >
                <Icon name={group.icon} size={16} />
                <span>{group.title}</span>
                <span className="skills__tab-count mono">{group.skills.length}</span>
                {selected && (
                  /* Shared layoutId, so the filled pill glides from the previous
                     tab to this one instead of cross-fading. */
                  <motion.span className="skills__tab-bg" layoutId="skill-tab" transition={SPRING_SOFT} />
                )}
              </Pressable>
            )
          })}
        </motion.div>

        {/* `mode="wait"` lets the outgoing panel finish before the next arrives,
            which keeps the section height from snapping mid-transition. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup.id}
            id={`panel-${activeGroup.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeGroup.id}`}
            className="techstack"
            data-accent={activeGroup.accent}
            variants={panelSwap}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* ---- Left: the category, or the technology under the pointer ---- */}
            <aside className="techstack__panel" aria-hidden="true">
              <span className="techstack__panel-glow" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={focused ? focused.name : activeGroup.id}
                  className="techstack__panel-inner"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {focused ? (
                    <>
                      <span className="techstack__panel-mark">
                        {focused.brand ? (
                          <TechIcon slug={focused.brand} size={40} />
                        ) : (
                          <Icon name={focused.icon} size={34} />
                        )}
                      </span>
                      <h3 className="techstack__panel-title">{focused.name}</h3>
                      {focused.level && <span className="techstack__panel-tag">{focused.level}</span>}
                      <p className="techstack__panel-text">{focused.desc}</p>
                    </>
                  ) : (
                    <>
                      <span className="techstack__panel-mark techstack__panel-mark--group">
                        <Icon name={activeGroup.icon} size={30} />
                      </span>
                      <h3 className="techstack__panel-title">{activeGroup.title}</h3>
                      <p className="techstack__panel-text">{activeGroup.blurb}</p>
                      <dl className="techstack__stats">
                        <div>
                          <dt>Technologies</dt>
                          <dd className="mono">{skills.length}</dd>
                        </div>
                        {coreCount > 0 && (
                          <div>
                            <dt>Core to my work</dt>
                            <dd className="mono">{coreCount}</dd>
                          </div>
                        )}
                      </dl>
                      <p className="techstack__hint">Hover a technology for what I use it for.</p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </aside>

            {/* ---- Right: the logo grid ---- */}
            {skills.length > 0 ? (
              <motion.ul
                className="techstack__grid"
                variants={stagger(0.035)}
                initial="hidden"
                animate="show"
                onMouseLeave={() => setHovered(null)}
              >
                {skills.map((skill) => (
                  <motion.li
                    className={`techtile${hovered === skill.name ? ' is-on' : ''}`}
                    key={skill.name}
                    variants={scaleIn}
                    tabIndex={0}
                    onMouseEnter={() => setHovered(skill.name)}
                    onFocus={() => setHovered(skill.name)}
                    onBlur={() => setHovered(null)}
                  >
                    <span className="techtile__mark">
                      {skill.brand ? (
                        <TechIcon slug={skill.brand} size={34} />
                      ) : (
                        /* No authentic brand mark exists for this one, so it keeps
                           a generic glyph rather than borrowing a product's logo. */
                        <Icon name={skill.icon} size={30} className="techtile__glyph" />
                      )}
                    </span>
                    <span className="techtile__name">{skill.name}</span>
                    {skill.level === 'Core' && <span className="techtile__dot" aria-hidden="true" />}
                    {/* The description is real content, so it stays in the
                        accessibility tree even though the panel shows it visually. */}
                    <span className="sr-only">{skill.desc}</span>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              /* Defensive: a category defined in data/skills.js with an empty
                 list renders a proper empty state instead of a blank panel. */
              <EmptyState
                icon={Layers}
                title="Nothing listed in this category yet"
                text="This group has no technologies on my resume at the moment. Pick another category above."
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
