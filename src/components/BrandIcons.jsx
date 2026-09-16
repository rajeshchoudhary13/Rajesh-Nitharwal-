/**
 * Brand marks that lucide-react (v1) no longer ships.
 * Drawn as simple inline SVG so no extra dependency or network request is needed.
 */
export function LinkedInIcon({ size = 20, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M6.94 5.5a2.19 2.19 0 1 1-4.38 0 2.19 2.19 0 0 1 4.38 0ZM3 8.4h3.85V21H3V8.4Zm6.32 0h3.69v1.72h.05a4.05 4.05 0 0 1 3.64-2c3.9 0 4.62 2.56 4.62 5.9V21h-3.85v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21H9.32V8.4Z" />
    </svg>
  )
}

/** Simplified React atom mark used in the hero visual. */
export function ReactMark({ size = 44, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false" {...rest}>
      <circle cx="50" cy="50" r="9" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="4" opacity="0.85">
        <ellipse cx="50" cy="50" rx="44" ry="17" />
        <ellipse cx="50" cy="50" rx="44" ry="17" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="44" ry="17" transform="rotate(120 50 50)" />
      </g>
    </svg>
  )
}

/** GitHub mark. Path from simple-icons (CC0); trademark belongs to GitHub, Inc. */
export function GitHubIcon({ size = 20, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7 0-.7 0-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1a2.6 2.6 0 0 1 .7-1.6c-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0C17.3 4.8 18.3 5 18.3 5c.7 1.6.3 2.8.1 3.2a4.5 4.5 0 0 1 1.3 3.2c0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.3v3.4c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
    </svg>
  )
}

/** WhatsApp mark. Path from simple-icons (CC0); trademark belongs to Meta. */
export function WhatsAppIcon({ size = 20, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1l-1 1.2c-.1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2.1c-.2-.3 0-.5.1-.6l.7-.8c.2-.2.1-.4 0-.6L9 6.9c-.2-.5-.4-.4-.6-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.5 1 2.9 1.2 3.1.1.2 2 3.2 5 4.4 2.4 1 2.9.8 3.4.7.5 0 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.3ZM12 22a10 10 0 0 1-5.1-1.4L2 22l1.4-4.8A10 10 0 1 1 12 22Zm0-18.3a8.3 8.3 0 0 0-7 12.7l.2.3-.8 2.9 3-.8.3.2A8.3 8.3 0 1 0 12 3.7Z" />
    </svg>
  )
}
