/**
 * Shared Framer Motion variants.
 *
 * Kept in one place so animation timing stays consistent across sections and
 * can be tuned from a single file. Distances are short and durations quick, so
 * reveals feel responsive rather than slow.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in App.jsx — Framer then strips transform animations automatically.
 */
export const EASE = [0.22, 1, 0.36, 1]

/** Default scroll-reveal viewport config. */
export const viewportOnce = { once: true, amount: 0.2 }

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
}

export const fadeRight = {
  hidden: { opacity: 0, x: 18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
}

/** Parent container that staggers its children. */
export const stagger = (staggerChildren = 0.06, delayChildren = 0.02) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Word-by-word headline reveal — a clean slide-up, no blur. */
export const wordReveal = {
  hidden: { opacity: 0, y: '0.34em' },
  show: { opacity: 1, y: '0em', transition: { duration: 0.5, ease: EASE } },
}

/* ---------- Modal + backdrop ---------- */
export const backdropVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
}

export const modalVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: EASE } },
  exit: { opacity: 0, y: 12, scale: 0.99, transition: { duration: 0.2, ease: EASE } },
}

/* ---------- Mobile navigation drawer ---------- */
export const drawerVariants = {
  hidden: { opacity: 0, y: -12, pointerEvents: 'none' },
  show: {
    opacity: 1,
    y: 0,
    pointerEvents: 'auto',
    transition: { duration: 0.28, ease: EASE, staggerChildren: 0.045, delayChildren: 0.04 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.18, ease: EASE } },
}

export const drawerItem = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.28, ease: EASE } },
}

/* ==========================================================================
   Premium motion layer
   --------------------------------------------------------------------------
   Additions only — every variant above keeps its original timing, so existing
   sections animate exactly as before. These entries add the spring vocabulary,
   mask reveals and micro-interaction presets the refreshed UI uses.

   Rules of thumb applied throughout:
   • transform + opacity only, so nothing animates layout;
   • springs for anything a pointer triggers (it should feel physical);
   • durations for anything time-based (entrances, exits, status messages);
   • reduced motion is still handled globally by <MotionConfig reducedMotion="user">.
   ========================================================================== */

/** Snappy spring for press / hover feedback — settles without wobble. */
export const SPRING = { type: 'spring', stiffness: 420, damping: 32, mass: 0.7 }

/** Softer spring for entrances that should feel weighted rather than instant. */
export const SPRING_SOFT = { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 }

/** Bouncier spring reserved for small confirmations (copied, sent, checked). */
export const SPRING_POP = { type: 'spring', stiffness: 520, damping: 20, mass: 0.6 }

/* ---------- Interaction presets ----------
   Spread onto any motion element to get consistent hover/press behaviour.

   Each preset carries its spring *inside* the animation target rather than as a
   sibling `transition` key. A target-level transition wins over the element's
   `transition` prop, so a component that also sets `transition` for its entrance
   (a stagger delay, say) cannot accidentally apply that delay — or drop the
   spring — on hover and press. */

/** Standard interactive card: lifts on hover, sinks slightly on press. */
export const liftHover = {
  whileHover: { y: -6, transition: SPRING },
  whileTap: { y: -2, scale: 0.995, transition: SPRING },
}

/** Buttons and pills — a shorter travel than cards so they feel tighter. */
export const pressable = {
  whileHover: { y: -2, transition: SPRING },
  whileTap: { scale: 0.96, transition: SPRING },
}

/** Icon-only controls, where scale reads better than travel. */
export const pressableIcon = {
  whileHover: { y: -2, scale: 1.06, transition: SPRING },
  whileTap: { scale: 0.92, transition: SPRING },
}

/* ---------- Entrances ---------- */

/** Slightly longer travel + scale, for hero-level elements. */
export const riseIn = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.62, ease: EASE } },
}

/** Scale-up entrance for cards that sit in a grid. */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

/** Clip-path curtain reveal — used for headline lines and media panels. */
export const maskUp = {
  hidden: { opacity: 0, y: '38%', clipPath: 'inset(100% 0 0 0)' },
  show: {
    opacity: 1,
    y: '0%',
    clipPath: 'inset(-15% 0 0 0)',
    transition: { duration: 0.72, ease: EASE },
  },
}

/** Panel that grows out of nothing — timeline cards, snapshot rows. */
export const growIn = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE } },
}

/** Horizontal bar / rail that draws itself in. */
export const drawX = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

/* ---------- Status + feedback ---------- */

/** Success / error message strip. */
export const statusVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: SPRING_SOFT },
  exit: { opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.18, ease: EASE } },
}

/** Short lateral shake for a rejected submit. Keyframes, so it self-returns. */
export const shake = {
  x: [0, -7, 6, -4, 3, 0],
  transition: { duration: 0.42, ease: 'easeInOut' },
}

/** Small badge / count pop-in. */
export const popIn = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: SPRING_POP },
  exit: { opacity: 0, scale: 0.7, transition: { duration: 0.14 } },
}

/** Tab-panel crossfade that slides in the travel direction. */
export const panelSwap = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.34, ease: EASE } },
  exit: { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.2, ease: EASE } },
}

/** Viewport config for elements that should start a touch earlier. */
export const viewportEarly = { once: true, amount: 0.12 }

/** Viewport config for large panels that would otherwise never reach `amount`. */
export const viewportLoose = { once: true, margin: '0px 0px -12% 0px' }

/* ==========================================================================
   MULTI-PAGE MOTION LAYER
   --------------------------------------------------------------------------
   Everything above is unchanged, so every existing section animates exactly as
   it did. What follows is the vocabulary the routed pages use: the page
   transition, the scroll reveal, and the staggered page entrance.

   Timings come straight from the brief — 450-650ms for a page change,
   600-800ms for a scroll reveal — and every one of them animates transform and
   opacity only, so nothing here can trigger layout.
   ========================================================================== */

/** The one easing curve the whole site moves on. */
export const EASE_PAGE = [0.22, 1, 0.36, 1]

/* 520ms in, 380ms out. The exit is shorter on purpose: <AnimatePresence
   mode="wait"> plays them in sequence, so enter + exit is what the visitor
   actually waits through on every navigation. */
export const PAGE_TRANSITION = { duration: 0.52, ease: EASE_PAGE }

export const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: EASE_PAGE } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.38, ease: EASE_PAGE } },
}

/** Scroll reveal — 700ms, inside the briefed 600-800ms band. */
export const revealVariants = {
  transition: { duration: 0.7, ease: EASE_PAGE },
}

/** Reveals fire a little before the element is fully on screen. */
export const viewportReveal = { once: true, amount: 0.15 }

/* ---------- Page entrance ----------
   A page's own content cascades in the reading order the brief specifies:
   heading, then standfirst, then body, then cards, then actions. `pageStagger`
   goes on the wrapper and `pageChild` on each block; the order of the children
   in the markup is the order of the cascade, so no per-element delays are
   needed and nothing has to be renumbered when a block moves. */
export const pageStagger = (staggerChildren = 0.08, delayChildren = 0.06) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const pageChild = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EASE_PAGE } },
}

/** Same cascade, shorter travel — for dense rows where 30px would be too much. */
export const pageChildTight = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_PAGE } },
}

/** Editorial rule that draws itself along its own axis. */
export const ruleIn = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.9, ease: EASE_PAGE } },
}
