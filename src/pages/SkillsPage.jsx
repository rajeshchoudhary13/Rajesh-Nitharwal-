import AnimatedButton from '../components/AnimatedButton.jsx'
import Icon from '../components/Icon.jsx'
import Masthead from '../components/Masthead.jsx'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import RevealAnimation from '../components/RevealAnimation.jsx'
import TechIcon from '../components/TechIcon.jsx'
import { pageIndex, routes } from '../data/nav.js'
import { skillGroups } from '../data/skills.js'
import '../styles/skillspage.css'

const meta = routes.find((route) => route.id === 'skills')

/**
 * SKILLS — the technical expertise.
 *
 * COMPOSITION. The brief's requirement here is explicit: group the technologies
 * logically, and use visually different layouts rather than one large repetitive
 * icon grid. The old page mounted <TechStack>, which is a tab bar over a single
 * logo grid — every group rendered identically, and four of the five were behind
 * a click.
 *
 * This page shows all five groups at once, each in a shape chosen for what it
 * actually contains:
 *
 *   1. CORE          the strongest technologies, as large marks with a claim
 *                    each. The strongest items get the most space, which is the
 *                    brief's "highlight strongest technologies more prominently".
 *   2. FRONTEND      a wide two-column list, because it is the longest group.
 *   3. MOBILE        a feature panel — the deepest experience, so it gets the
 *                    one tinted surface on the page.
 *   4. BACKEND/DATA  paired side by side, because they are read together.
 *   5. PLATFORM      a dense inline mark row, because eleven tools are a
 *                    reference list rather than a set of claims.
 *
 * Every group keeps its own data unchanged — the same names, the same `desc`
 * lines, the same `level: 'Core'` markers. What changes is that no two groups
 * look the same, and nothing is hidden behind a tab.
 *
 * `level: 'Core'` is the existing marker in data/skills.js for the strongest
 * items; both the core block and the per-group emphasis read from it, so the
 * hierarchy on this page is data-driven rather than hand-picked here.
 */

/** The groups, addressed by id so a reordering of the data file cannot silently
    change which layout a group gets. */
const GROUPS = Object.fromEntries(skillGroups.map((group) => [group.id, group]))

/* The headline technologies. Taken one per group so the row spans the stack
   rather than showing five frontend logos — the same reasoning as the home
   page's core strip. */
const CORE = skillGroups
  .map((group) => {
    const skill = group.skills.find((item) => item.level === 'Core')
    return skill ? { ...skill, group: group.title, groupId: group.id } : null
  })
  .filter(Boolean)

export default function SkillsPage() {
  const frontend = GROUPS.frontend
  const mobile = GROUPS.mobile
  const backend = GROUPS.backend
  const data = GROUPS.data
  const platform = GROUPS.platform

  return (
    <PageTransition className="page skills-page">
      <div className="container">
        <Masthead
          index={pageIndex('skills')}
          title={['Skills']}
          lead={meta.blurb}
          id="skills-page-title"
          facts={[
            { key: 'Groups', value: skillGroups.length },
            {
              key: 'Technologies',
              value: skillGroups.reduce((total, group) => total + group.skills.length, 0),
            },
            { key: 'Strongest', value: 'React Native' },
            { key: 'Also', value: 'React · Node · Mongo' },
          ]}
        />

        {/* ================= 1. CORE ================= */}
        <section className="score" aria-labelledby="skills-core-title">
          <Reveal className="score__head">
            <p className="band__eyebrow">
              <span className="band__num" aria-hidden="true">
                01
              </span>
              <span>Strongest</span>
            </p>
            <h2 className="band__title" id="skills-core-title">
              What I reach for first.
            </h2>
            <p className="band__lead">
              One from each layer of the stack. These are the technologies behind the production work
              on this site, not a list of everything I have opened.
            </p>
          </Reveal>

          <ul className="score__list">
            {CORE.map((skill, index) => (
              <RevealAnimation as="li" className="score__item" key={skill.name} delay={index * 0.06}>
                <span className="score__mark" aria-hidden="true">
                  {skill.brand ? (
                    <TechIcon slug={skill.brand} size={30} />
                  ) : (
                    <Icon name={skill.icon} size={28} />
                  )}
                </span>
                <span className="score__name">{skill.name}</span>
                <span className="score__group">{skill.group}</span>
                <span className="score__desc">{skill.desc}</span>
              </RevealAnimation>
            ))}
          </ul>
        </section>

        {/* ================= 2. FRONTEND ================= */}
        {frontend && (
          <GroupSection group={frontend} num="02">
            <ul className="sgrid" data-accent={frontend.accent}>
              {frontend.skills.map((skill, index) => (
                <SkillRow skill={skill} key={skill.name} delay={index * 0.04} />
              ))}
            </ul>
          </GroupSection>
        )}

        {/* ================= 3. MOBILE ================= */}
        {/* The deepest experience, so it gets the page's one filled panel and a
            wider treatment — the visual weight matches the actual claim. */}
        {mobile && (
          <section className="smobile" aria-labelledby="skills-mobile-title" data-accent={mobile.accent}>
            <div className="smobile__inner split split--editorial">
              <Reveal>
                <p className="band__eyebrow">
                  <span className="band__num" aria-hidden="true">
                    03
                  </span>
                  <span>{mobile.title}</span>
                </p>
                <h2 className="band__title" id="skills-mobile-title">
                  Five live applications, on both stores.
                </h2>
                <p className="band__lead">{mobile.blurb}</p>
                <AnimatedButton to="/projects" variant="outline" size="sm">
                  See the Apps
                </AnimatedButton>
              </Reveal>

              <ul className="smobile__list">
                {mobile.skills.map((skill, index) => (
                  <RevealAnimation
                    as="li"
                    className="smobile__item"
                    key={skill.name}
                    delay={index * 0.05}
                  >
                    <span className="smobile__mark" aria-hidden="true">
                      {skill.brand ? (
                        <TechIcon slug={skill.brand} size={22} />
                      ) : (
                        <Icon name={skill.icon} size={20} />
                      )}
                    </span>
                    <span className="smobile__body">
                      <span className="smobile__name">
                        {skill.name}
                        {skill.level === 'Core' && <em className="sbadge">Core</em>}
                      </span>
                      <span className="smobile__desc">{skill.desc}</span>
                    </span>
                  </RevealAnimation>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ================= 4. BACKEND + DATA ================= */}
        {/* Paired, because "what serves the data" and "where the data lives" are
            read together — and pairing them is a third shape on the page. */}
        <section className="spair" aria-labelledby="skills-server-title">
          <Reveal className="spair__head">
            <p className="band__eyebrow">
              <span className="band__num" aria-hidden="true">
                04
              </span>
              <span>Server side</span>
            </p>
            <h2 className="band__title" id="skills-server-title">
              The half a client never sees.
            </h2>
          </Reveal>

          <div className="spair__cols split" style={{ '--ratio': '1fr' }}>
            {[backend, data].filter(Boolean).map((group) => (
              <Reveal className="spair__col" key={group.id} data-accent={group.accent}>
                <h3 className="spair__title">
                  <Icon name={group.icon} size={16} />
                  {group.title}
                </h3>
                <p className="spair__blurb">{group.blurb}</p>
                <ul className="spair__list">
                  {group.skills.map((skill) => (
                    <li className="spair__item" key={skill.name}>
                      <span className="spair__mark" aria-hidden="true">
                        {skill.brand ? (
                          <TechIcon slug={skill.brand} size={18} />
                        ) : (
                          <Icon name={skill.icon} size={16} />
                        )}
                      </span>
                      <span>
                        <span className="spair__name">
                          {skill.name}
                          {skill.level === 'Core' && <em className="sbadge">Core</em>}
                        </span>
                        <span className="spair__desc">{skill.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= 5. PLATFORM ================= */}
        {/* Eleven tools. A reference list rather than a set of claims, so it gets
            the most compact treatment: inline marks, no descriptions. */}
        {platform && (
          <section className="splat" aria-labelledby="skills-platform-title" data-accent={platform.accent}>
            <Reveal className="splat__head">
              <p className="band__eyebrow">
                <span className="band__num" aria-hidden="true">
                  05
                </span>
                <span>{platform.title}</span>
              </p>
              <h2 className="band__title" id="skills-platform-title">
                Branch to store listing.
              </h2>
              <p className="band__lead">{platform.blurb}</p>
            </Reveal>

            <Reveal as="ul" className="splat__list" delay={0.06}>
              {platform.skills.map((skill) => (
                <li className="splat__item" key={skill.name} title={skill.desc}>
                  <span className="splat__mark" aria-hidden="true">
                    {skill.brand ? (
                      <TechIcon slug={skill.brand} size={20} />
                    ) : (
                      <Icon name={skill.icon} size={18} />
                    )}
                  </span>
                  <span className="splat__name">{skill.name}</span>
                </li>
              ))}
            </Reveal>
          </section>
        )}

        <Reveal className="pagecta">
          <h2 className="pagecta__title">Where the stack has actually been used.</h2>
          <p className="pagecta__text">
            Every technology above appears in shipped work — the projects page lists which.
          </p>
          <div className="pagecta__actions">
            <AnimatedButton to="/projects" variant="primary">
              View Projects
            </AnimatedButton>
            <AnimatedButton to="/experience" variant="outline">
              See Experience
            </AnimatedButton>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  )
}

/** Heading wrapper shared by the groups that use a plain heading + content. */
function GroupSection({ group, num, children }) {
  const headingId = `skills-${group.id}-title`

  return (
    <section className="sgroup" aria-labelledby={headingId}>
      <Reveal className="sgroup__head split split--editorial">
        <div>
          <p className="band__eyebrow">
            <span className="band__num" aria-hidden="true">
              {num}
            </span>
            <span>{group.title}</span>
          </p>
          <h2 className="band__title" id={headingId}>
            {group.skills.length} technologies, one system.
          </h2>
        </div>
        <p className="sgroup__blurb">{group.blurb}</p>
      </Reveal>

      {children}
    </section>
  )
}

/** One technology as a bordered row: mark, name, what it was used for. */
function SkillRow({ skill, delay }) {
  return (
    <RevealAnimation as="li" className="sgrid__item" delay={delay}>
      <span className="sgrid__mark" aria-hidden="true">
        {skill.brand ? <TechIcon slug={skill.brand} size={22} /> : <Icon name={skill.icon} size={20} />}
      </span>
      <span className="sgrid__body">
        <span className="sgrid__name">
          {skill.name}
          {skill.level === 'Core' && <em className="sbadge">Core</em>}
        </span>
        <span className="sgrid__desc">{skill.desc}</span>
      </span>
    </RevealAnimation>
  )
}
