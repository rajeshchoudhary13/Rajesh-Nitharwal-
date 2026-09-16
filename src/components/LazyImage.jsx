/**
 * Image primitive with lazy loading, async decoding and explicit dimensions
 * (explicit width/height reserves layout space and avoids CLS).
 * Alt text is required by signature so decorative use must pass alt="".
 */
export default function LazyImage({ src, alt, width, height, className, eager = false, ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'low'}
      {...rest}
    />
  )
}
