import { motion } from 'framer-motion'
import { site, stats } from '../config/site.js'
import { useCountUp } from '../hooks/useCountUp.js'
import { drawX, fadeUp, stagger, viewportOnce } from '../utils/motion.js'
import '../styles/trust.css'

/**
 * One statistic. Two shapes are supported and the difference is deliberate:
 *
 *  • a `value` counts up when the row scrolls into view;
 *  • a `text` entry renders as-is, for the facts that are a capability rather
 *    than a number ("Web + Mobile"). Padding those out with an invented figure
 *    is exactly the thing this site does not do.
 */
function Stat({ stat }) {
  const isNumber = typeof stat.value === 'number'
  const [ref, counted] = useCountUp(isNumber ? stat.value : 0, { decimals: stat.decimals ?? 0 })

  return (
    <motion.li className="trust__item" variants={fadeUp}>
      <p className="trust__value" ref={isNumber ? ref : undefined}>
        {isNumber ? (
          <>
            <span>{counted}</span>
            {stat.suffix && <em>{stat.suffix}</em>}
          </>
        ) : (
          <span className="trust__value-text">{stat.text}</span>
        )}
      </p>
      <p className="trust__label">{stat.label}</p>
      <p className="trust__hint">{stat.hint}</p>
    </motion.li>
  )
}

/**
 * The trust bar: the numbers a client wants before they read anything else.
 * Values come from config/site.js, so they are edited in one place.
 */
export default function TrustStats() {
  return (
    <section className="trust" id="trust" aria-label="Experience at a glance">
      <div className="container">
        <motion.div
          className="trust__panel glass"
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.span className="trust__rule" variants={drawX} aria-hidden="true" />

          <ul className="trust__list">
            {stats.map((stat) => (
              <Stat stat={stat} key={stat.id} />
            ))}
          </ul>

          <motion.p className="trust__foot mono" variants={fadeUp}>
            {site.location} · {site.timezone} · {site.responseTime}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
