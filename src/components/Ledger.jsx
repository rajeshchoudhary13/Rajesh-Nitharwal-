import RevealAnimation from './RevealAnimation.jsx'

/**
 * A numbered editorial list: large display figure in the margin, content beside
 * it, a hairline between rows.
 *
 * This is the Services and Skills answer to "do not use a 3/4-column card
 * grid". Those pages have content that is genuinely sequential — a delivery
 * process, a stack ordered by layer — and a grid of equal boxes actively hides
 * that order by presenting every item as a peer. A ledger reads top to bottom
 * and numbers itself.
 *
 * The numbering is a CSS counter rather than a prop, so a reordered or filtered
 * list cannot show "01, 02, 04" — a class of bug the existing `num: '01'` fields
 * in data/services.js are exposed to the moment a service is removed.
 *
 * @param {{
 *   items: Array<{
 *     id: string,
 *     title: React.ReactNode,
 *     text?: React.ReactNode,
 *     aside?: React.ReactNode,
 *   }>,
 *   ratio?: number,
 *   label?: string,
 *   renderItem?: (item: object, index: number) => React.ReactNode,
 * }} props
 */
export default function Ledger({ items = [], ratio = 1.6, label, className = '', renderItem }) {
  if (items.length === 0) return null

  return (
    <ol className={['ledger', className].filter(Boolean).join(' ')} aria-label={label}>
      {items.map((item, index) => (
        <RevealAnimation
          as="li"
          className="ledger__item split"
          style={{ '--ratio': `${ratio}fr` }}
          key={item.id}
          /* Capped so a long list does not build an ever-growing delay — by the
             eighth row a linear stagger is waiting a second before anything
             appears. */
          delay={Math.min(index, 4) * 0.06}
        >
          {renderItem ? (
            renderItem(item, index)
          ) : (
            <>
              <div className="ledger__lead">
                <span className="ledger__num" aria-hidden="true" />
                <h3 className="ledger__title">{item.title}</h3>
                {item.text && <p className="ledger__text">{item.text}</p>}
              </div>
              <div className="ledger__aside">{item.aside}</div>
            </>
          )}
        </RevealAnimation>
      ))}
    </ol>
  )
}
