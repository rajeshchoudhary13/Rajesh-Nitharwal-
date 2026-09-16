import { motion } from 'framer-motion'
import Icon from './Icon.jsx'
import { EASE, SPRING } from '../utils/motion.js'
import '../styles/mockups.css'

/**
 * Animated smartphone frame.
 *
 * The screen shows a *schematic* representation of the app (name, stated domain,
 * technologies), not a screenshot — no real client UI is reproduced or invented.
 *
 * @param {{ project: object, index?: number, floating?: boolean }} props
 */
export default function PhoneMockup({ project, index = 0, floating = true }) {
  const { name, domain, icon, accent, tech = [], platform } = project

  return (
    <motion.div
      className="phone"
      data-accent={accent}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.06 }}
    >
      <motion.div
        className="phone__frame"
        animate={floating ? { y: [-4, 4, -4] } : undefined}
        transition={
          floating
            ? { duration: 8 + index * 0.7, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }
            : undefined
        }
        whileHover={{ y: -6, transition: SPRING }}
      >
        <span className="phone__notch" aria-hidden="true" />
        <span className="phone__btn phone__btn--power" aria-hidden="true" />
        <span className="phone__btn phone__btn--vol" aria-hidden="true" />

        <div className="phone__screen">
          <div className="phone__status" aria-hidden="true">
            <span className="mono">9:41</span>
            <span className="phone__status-icons">
              <i /> <i /> <i />
            </span>
          </div>

          <div className="phone__app">
            <div className="phone__app-icon">
              <Icon name={icon} size={22} />
            </div>
            <h4 className="phone__app-name">{name}</h4>
            {domain && <p className="phone__app-domain">{domain}</p>}

            <div className="phone__skeleton" aria-hidden="true">
              {[0, 1, 2].map((row) => (
                <motion.span
                  key={row}
                  className="phone__row"
                  initial={{ opacity: 0.25, scaleX: 0.7 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.38, delay: 0.2 + row * 0.08, ease: EASE }}
                />
              ))}
            </div>

            <ul className="phone__tech">
              {tech.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="phone__tabbar" aria-hidden="true">
            <span className="is-active" />
            <span />
            <span />
            <span />
          </div>
        </div>
      </motion.div>

      <p className="phone__caption">
        <span className="mono">{platform}</span>
      </p>
    </motion.div>
  )
}
