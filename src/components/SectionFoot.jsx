import AnimatedButton from './AnimatedButton.jsx'
import Reveal from './Reveal.jsx'

/**
 * The closing line of a section: one sentence, one or two actions.
 *
 * Six sections had written this out by hand — Services, Buildables, Process,
 * Faq, Engagement and FeaturedWork — each with its own `X__foot` /
 * `X__foot-text` class pair and otherwise identical markup. That is six places
 * to change when the spacing is wrong, and six chances for them to disagree,
 * which is part of why the pages read as one repeated template.
 *
 * The class prefix stays a prop rather than being hard-coded, so each section
 * keeps the hook its own stylesheet already targets and nothing has to be
 * restyled to adopt this. Callers that do not need a prefix get the shared
 * `.sfoot` treatment.
 *
 * @param {{
 *   text?: React.ReactNode,
 *   prefix?: string,
 *   actions?: Array<{ label: string, to?: string, href?: string, variant?: string }>,
 *   align?: 'start' | 'center',
 *   children?: React.ReactNode,
 * }} props
 */
export default function SectionFoot({
  text,
  prefix,
  actions = [],
  align = 'start',
  className = '',
  children,
}) {
  const classes = [
    'sfoot',
    prefix && `${prefix}__foot`,
    align === 'center' && 'sfoot--center',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Reveal className={classes}>
      {text && <p className={['sfoot__text', prefix && `${prefix}__foot-text`].filter(Boolean).join(' ')}>{text}</p>}

      {actions.length > 0 && (
        <div className="sfoot__actions cluster cluster--stack-mobile">
          {actions.map((action) => (
            <AnimatedButton
              key={action.label}
              to={action.to}
              href={action.href}
              variant={action.variant ?? 'outline'}
              size={action.size}
            >
              {action.label}
            </AnimatedButton>
          ))}
        </div>
      )}

      {children}
    </Reveal>
  )
}
