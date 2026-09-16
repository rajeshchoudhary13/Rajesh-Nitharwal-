import Reveal from './Reveal.jsx'
import { useCountUp } from '../hooks/useCountUp.js'

/**
 * A row of figures separated by rules — bare type on the page, no panel.
 *
 * Deliberately not <StatCard> or the `.trust__panel` bar. Those are filled
 * surfaces, and a visitor moving from Home to Experience to a case study would
 * otherwise meet the same filled stat bar three times. This is the same
 * information as unadorned display figures, so the two treatments stay
 * distinguishable.
 *
 * `value` may be a number (counted up on reveal) or a string (rendered as-is,
 * for things like "Jul 2025" that are not countable).
 *
 * @param {{
 *   items: Array<{ value: number | string, suffix?: string, decimals?: number, label: string }>,
 *   label?: string,
 * }} props
 */
export default function MetricStrip({ items = [], label, className = '' }) {
  if (items.length === 0) return null

  return (
    <Reveal
      as="ul"
      className={['metrics', className].filter(Boolean).join(' ')}
      aria-label={label}
    >
      {items.map((item) => (
        <li className="metrics__item" key={item.label}>
          <Metric {...item} />
          <span className="metrics__label">{item.label}</span>
        </li>
      ))}
    </Reveal>
  )
}

/**
 * One figure. Split out because `useCountUp` is a hook and cannot be called
 * conditionally inside the map above — every item gets the hook, and the
 * string case simply ignores its result.
 */
function Metric({ value, suffix = '', decimals = 0 }) {
  const numeric = typeof value === 'number'
  const [ref, display] = useCountUp(numeric ? value : 0, { decimals })

  return (
    <span className="metrics__value" ref={numeric ? ref : undefined}>
      {numeric ? display : value}
      {suffix}
    </span>
  )
}
