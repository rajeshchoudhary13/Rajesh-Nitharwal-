import Reveal from './Reveal.jsx'

/**
 * A full-width tinted band.
 *
 * The main tool against the "one long centred column" reading. A page with two
 * or three bands has a visible large-scale structure — the eye can find the
 * chapter breaks while scrolling — which is most of what the brief means by
 * visual rhythm.
 *
 * It deliberately does NOT use `.section__head`. Every section on the site
 * announces itself with the same eyebrow-title-rule block from
 * <SectionHeading>, and reusing it here would make a band look like one more
 * section. A band announces itself with a numbered rule instead, so the two
 * kinds of break are visually distinguishable.
 *
 * Must be rendered inside a `.container` — it reaches full width by negating
 * the container's own gutter (see `.bleed` in layout.css), which is correct
 * inside a container and wrong outside one.
 *
 * @param {{
 *   num?: string,
 *   eyebrow?: string,
 *   title?: React.ReactNode,
 *   lead?: React.ReactNode,
 *   variant?: 'default' | 'open' | 'flush',
 *   as?: string,
 *   headingId?: string,
 * }} props
 */
export default function Band({
  num,
  eyebrow,
  title,
  lead,
  variant = 'default',
  as: Tag = 'section',
  headingId,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'band',
    'bleed',
    variant === 'open' && 'band--open',
    variant === 'flush' && 'band--flush',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} aria-labelledby={title ? headingId : undefined} {...rest}>
      {(eyebrow || title || lead) && (
        <Reveal className="band__head">
          {eyebrow && (
            <p className="band__eyebrow">
              {num && (
                <span className="band__num" aria-hidden="true">
                  {num}
                </span>
              )}
              <span>{eyebrow}</span>
            </p>
          )}
          {title && (
            <h2 className="band__title" id={headingId}>
              {title}
            </h2>
          )}
          {lead && <p className="band__lead">{lead}</p>}
        </Reveal>
      )}

      {children}
    </Tag>
  )
}
