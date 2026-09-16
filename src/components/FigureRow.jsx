import RevealAnimation from './RevealAnimation.jsx'

/**
 * An alternating content row: visual one side, write-up the other, flipping
 * down the page.
 *
 * This is what replaces "every project in an identical card". A card grid gives
 * each project the same 300px box and the same three lines; a figure row gives
 * it a full-width band and room for the seven fields the brief asks for — role,
 * technologies, features, contribution, results.
 *
 * The flip is driven by the caller's index, not `:nth-child`. The project lists
 * are filtered, and `:nth-child` on a filtered list flips whichever rows happen
 * to land on an even position rather than alternating the rows actually shown.
 *
 * The flip is also visual only: `.split--flip` reorders with CSS `order`, so the
 * DOM keeps the write-up before the visual on every row. Screen readers and
 * keyboard tabbing get a consistent reading order down the page, and the
 * stacked mobile layout puts the text above its own figure rather than below
 * someone else's.
 *
 * @param {{
 *   index?: number,
 *   flip?: boolean,
 *   eyebrow?: React.ReactNode,
 *   title: React.ReactNode,
 *   text?: React.ReactNode,
 *   facts?: Array<{ key: string, value: React.ReactNode }>,
 *   figure?: React.ReactNode,
 *   headingId?: string,
 *   children?: React.ReactNode,
 * }} props
 */
export default function FigureRow({
  index,
  flip,
  eyebrow,
  title,
  text,
  facts = [],
  figure,
  headingId,
  as = 'article',
  className = '',
  children,
}) {
  /* Either prop works: `flip` states it outright, `index` derives the
     alternation. `flip` wins where both are given. */
  const flipped = flip ?? (typeof index === 'number' && index % 2 === 1)

  const classes = ['frow', 'split', flipped && 'split--flip', className].filter(Boolean).join(' ')

  return (
    <RevealAnimation as={as} className={classes} aria-labelledby={headingId}>
      <div className="frow__body">
        {eyebrow && <p className="frow__index">{eyebrow}</p>}

        <h3 className="frow__title" id={headingId}>
          {title}
        </h3>

        {text && <p className="frow__text">{text}</p>}

        {facts.length > 0 && (
          <dl className="frow__facts">
            {facts.map((fact) => (
              <div className="frow__fact" key={fact.key}>
                <dt className="frow__fact-key">{fact.key}</dt>
                <dd className="frow__fact-val">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {children}
      </div>

      {/* Rendered even when empty so the split keeps two tracks and the rows
          stay on a consistent grid whether or not a project has a visual. */}
      <div className="frow__figure">{figure}</div>
    </RevealAnimation>
  )
}
