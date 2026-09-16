import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import BrowserMockup from '../components/BrowserMockup.jsx'
import GlowCard from '../components/GlowCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { webWork } from '../data/projects.js'
import { fadeUp, SPRING, stagger, viewportOnce } from '../utils/motion.js'
import '../styles/showcase.css'

/** Web strengths — each phrase traces back to a resume bullet. */
const STRENGTHS = [
  { title: 'React.js', desc: 'Component-based UI with hooks and reusable modules.' },
  { title: 'Responsive design', desc: 'Consistent UX from small mobile widths to desktop.' },
  { title: 'JavaScript', desc: 'Primary language across every project.' },
  { title: 'API integration', desc: 'REST endpoints wired into the interface.' },
  { title: 'State management', desc: 'Redux, Context API and React Hooks.' },
  { title: 'Performance', desc: 'Rendering optimisation and cross-browser compatibility.' },
]

export default function WebShowcase() {
  return (
    <section className="section showcase showcase--web" id="web" aria-labelledby="web-title">
      <div className="container">
        <SectionHeading
          eyebrow="Web development"
          eyebrowIcon="globe"
          id="web-title"
          title={
            <>
              Interfaces for the <span className="grad">browser</span>
            </>
          }
          desc="Alongside mobile work I build for the browser — responsive React interfaces, admin dashboards and CMS panels, with Node.js, Express and MongoDB behind them."
        />

        <div className="web__layout">
          <div className="browsers">
            {webWork.map((item, index) => (
              <BrowserMockup item={item} index={index} key={item.id} />
            ))}
          </div>

          <motion.aside
            className="web__side"
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.h3 className="web__side-title" variants={fadeUp}>
              What I bring to web work
            </motion.h3>
            <ul className="web__strengths">
              {STRENGTHS.map((item) => (
                <GlowCard as="li" key={item.title} variants={fadeUp} whileHover={{ y: -3, transition: SPRING }}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </GlowCard>
              ))}
            </ul>
            <motion.p className="note" variants={fadeUp}>
              <Info size={14} aria-hidden="true" />
              My resume does not list individual public web products, so these panels describe the web work performed in
              each role rather than named products.
            </motion.p>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
