import { motion } from 'framer-motion'
import GlowCard from './GlowCard.jsx'
import { useCountUp } from '../hooks/useCountUp.js'
import { drawX, scaleIn } from '../utils/motion.js'

/**
 * Accent rotation. Purely presentational — the stats data stays free of styling
 * concerns, and four accents across four stats keeps the row from reading flat.
 */
const ACCENTS = ['cyan', 'blue', 'violet', 'emerald']

/**
 * Animated statistic. Values come from `data/profile.js` and are only ever
 * things the resume states outright (years, app count, roles, platforms).
 *
 * @param {{ stat: object, index?: number }} props
 */
export default function StatCard({ stat, index = 0 }) {
  const [ref, value] = useCountUp(stat.value, { decimals: stat.decimals })

  return (
    <GlowCard className="stat glass" data-accent={ACCENTS[index % ACCENTS.length]} variants={scaleIn}>
      <p className="stat__value" ref={ref}>
        <span>{value}</span>
        {stat.suffix && <em>{stat.suffix}</em>}
      </p>

      {/* Accent rule that draws itself in as the card arrives — a visual echo of
          the number counting up. */}
      <motion.span className="stat__rule" variants={drawX} aria-hidden="true" />

      <p className="stat__label">{stat.label}</p>
      {stat.hint && <p className="stat__hint">{stat.hint}</p>}
    </GlowCard>
  )
}
