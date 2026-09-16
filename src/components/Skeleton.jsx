/**
 * Loading placeholders.
 *
 * Plain markup with a CSS-driven shimmer — no Framer Motion here, because a
 * skeleton can be on screen while a chunk is still parsing and it should cost
 * nothing. Every block is `aria-hidden`; the announcement comes from the
 * `role="status"` wrapper in <SectionSkeleton>.
 */

/**
 * One shimmering bar.
 * @param {{ w?: string|number, h?: string|number, variant?: 'text'|'title'|'chip'|'icon'|'block',
 *           radius?: string, className?: string, style?: object }} props
 */
export function Skeleton({ w, h, variant = 'block', radius, className = '', style, ...rest }) {
  const variantClass = variant === 'block' ? '' : ` skeleton--${variant}`
  return (
    <span
      className={`skeleton${variantClass}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
      style={{ width: w, height: h, borderRadius: radius, ...style }}
      {...rest}
    />
  )
}

/** A card-shaped cluster of bars — icon, title, two lines and a chip row. */
export function SkeletonCard() {
  return (
    <div className="sk-card">
      <Skeleton variant="icon" />
      <Skeleton variant="title" w="62%" />
      <Skeleton variant="text" w="100%" />
      <Skeleton variant="text" w="86%" />
      <span className="chip-row" aria-hidden="true">
        <Skeleton variant="chip" />
        <Skeleton variant="chip" w="3.4rem" />
      </span>
    </div>
  )
}

/**
 * Full-section placeholder used while a lazy section chunk resolves.
 * Reserves a realistic amount of height so the real section replaces it without
 * shifting the page, and keeps the polite live-region announcement the previous
 * text-only fallback provided.
 *
 * @param {{ label: string, cards?: number }} props
 */
export default function SectionSkeleton({ label, cards = 3 }) {
  return (
    <div className="sk-section" role="status" aria-live="polite" aria-busy="true">
      <div className="container">
        <span className="sr-only">Loading {label}…</span>

        <div className="sk-section__head">
          <Skeleton variant="chip" w="9rem" h="1.9rem" />
          <Skeleton variant="title" w="min(100%, 26rem)" h="2.1rem" />
          <Skeleton variant="text" w="min(100%, 34rem)" />
          <Skeleton variant="text" w="min(100%, 24rem)" />
        </div>

        <div className="sk-section__grid">
          {Array.from({ length: cards }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
