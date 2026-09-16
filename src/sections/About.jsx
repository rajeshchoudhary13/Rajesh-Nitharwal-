import { motion } from 'framer-motion'
import { Bug, Code, GraduationCap, Layers, Smartphone, Waypoints } from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import LazyImage from '../components/LazyImage.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import StatCard from '../components/StatCard.jsx'
import { education, profile, stats } from '../data/profile.js'
import { fadeRight, fadeUp, maskUp, SPRING, stagger, viewportOnce } from '../utils/motion.js'
import workspaceArt from '../assets/dev-workspace.svg'
import '../styles/about.css'

/** Specialisations — each maps to a capability the resume states explicitly. */
const FOCUS = [
  {
    icon: Smartphone,
    title: 'Mobile Development',
    desc: 'Production React Native apps for Android and iOS, delivered from a single codebase.',
    accent: 'cyan',
  },
  {
    icon: Code,
    title: 'Web Development',
    desc: 'Responsive React.js interfaces with reusable components and consistent UX across screen sizes.',
    accent: 'violet',
  },
  {
    icon: Waypoints,
    title: 'API Integration',
    desc: 'REST APIs wired into core app functionality with reliable client–backend data flow.',
    accent: 'emerald',
  },
  {
    icon: Layers,
    title: 'State Management',
    desc: 'Application state structured with Redux, Context API and React Hooks.',
    accent: 'blue',
  },
  {
    icon: Bug,
    title: 'Problem Solving',
    desc: 'Diagnosing and resolving UI and functional bugs in live client apps to improve stability.',
    accent: 'amber',
  },
]

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          eyebrow="About me"
          eyebrowIcon="atom"
          id="about-title"
          title={
            <>
              Engineer behind the <span className="grad">mobile products</span>
            </>
          }
          desc="A short profile built from my professional experience — what I work on, how I work, and where I have shipped."
        />

        <div className="about__grid">
          <GlowCard
            className="about__profile glass"
            lift={false}
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            {/* Curtain reveal on the cover art, so the panel opens rather than
                simply appearing. */}
            <motion.div className="about__cover" variants={maskUp}>
              {/* Decorative: lazy-loaded and dimension-locked so it never shifts layout. */}
              <LazyImage src={workspaceArt} alt="" width={640} height={200} className="about__cover-img" />
            </motion.div>

            <motion.div className="about__card-head" variants={fadeUp}>
              <span className="about__avatar" aria-hidden="true">
                RN
              </span>
              <div>
                <h3>{profile.name}</h3>
                <p className="mono about__role">{profile.role}</p>
              </div>
            </motion.div>

            <motion.p className="about__text" variants={fadeUp}>
              {profile.summary}
            </motion.p>
            <motion.p className="about__text" variants={fadeUp}>
              {profile.summarySecondary}
            </motion.p>

            <motion.dl className="about__meta" variants={fadeUp}>
              <div>
                <dt>Current role</dt>
                <dd>
                  React Native Developer, {profile.currentCompany}
                  <span className="about__meta-sub">Jul 2025 – Present</span>
                </dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Core stack</dt>
                <dd>React Native · React.js · JavaScript · Redux · REST APIs</dd>
              </div>
            </motion.dl>

            <motion.div className="about__education" variants={fadeUp}>
              <h4>
                <GraduationCap size={16} strokeWidth={2} aria-hidden="true" />
                Education
              </h4>
              <ul>
                {education.map((item) => (
                  <li key={item.id}>
                    <span className="about__edu-degree">{item.degree}</span>
                    <span className="about__edu-meta">
                      {item.institute} · {item.period} · {item.score}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </GlowCard>

          <div className="about__side">
            <motion.ul
              className="about__focus"
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {FOCUS.map(({ icon: Glyph, title, desc, accent }) => (
                <GlowCard
                  as="li"
                  className="focus glass"
                  key={title}
                  data-accent={accent}
                  variants={fadeRight}
                  /* Shorter travel than the default card lift — these are list
                     rows, and 6px on a 40px-tall row reads as a jump. */
                  whileHover={{ y: -3, transition: SPRING }}
                >
                  <span className="focus__icon">
                    <Glyph size={19} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </GlowCard>
              ))}
            </motion.ul>

            <motion.div
              className="about__stats"
              variants={stagger(0.07)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {stats.map((stat, index) => (
                <StatCard stat={stat} index={index} key={stat.label} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
