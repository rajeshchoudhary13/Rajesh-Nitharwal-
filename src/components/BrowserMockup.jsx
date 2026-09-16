import { motion } from 'framer-motion'
import GlowCard from './GlowCard.jsx'
import Icon from './Icon.jsx'
import { EASE, SPRING } from '../utils/motion.js'
import '../styles/mockups.css'

/**
 * Browser-window frame for web work.
 * The chrome shows a workspace-style path label, not a live URL — the resume
 * does not list any published web addresses, so none are implied.
 *
 * @param {{ item: object, index?: number }} props
 */
export default function BrowserMockup({ item, index = 0 }) {
  const { name, icon, accent, highlights = [], tech = [] } = item

  return (
    <GlowCard
      className="browser"
      data-accent={accent}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.06 }}
      whileHover={{ y: -5, transition: SPRING }}
    >
      <div className="browser__bar">
        <span className="browser__dots" aria-hidden="true">
          <i /> <i /> <i />
        </span>
        <span className="browser__url mono" aria-hidden="true">
          {name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
        </span>
      </div>

      <div className="browser__viewport">
        <div className="browser__head">
          <span className="browser__icon">
            <Icon name={icon} size={18} />
          </span>
          <h4>{name}</h4>
        </div>

        <ul className="browser__list">
          {highlights.map((line, i) => (
            <motion.li
              key={line}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.36, delay: 0.12 + i * 0.07, ease: EASE }}
            >
              <span className="browser__bullet" aria-hidden="true" />
              {line}
            </motion.li>
          ))}
        </ul>

        <div className="chip-row browser__tech">
          {tech.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </GlowCard>
  )
}
