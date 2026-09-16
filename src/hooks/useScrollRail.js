import { useRef } from 'react'
import { useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * The self-drawing progress rail shared by the timeline sections.
 *
 * Experience, Process and CaseStudies each had this written out inline, with
 * hand-copied spring constants that had already drifted apart (stiffness 80 in
 * one, 90 in another). The rail is the site's one "you are here" gesture, so
 * the three should move identically — and a shared spring is the only way to
 * guarantee that as they get tuned.
 *
 * Returns the ref to attach to the track element and a motion value for the
 * rail's fill. The consumer decides whether that drives `scaleY` (a vertical
 * timeline) or `scaleX` (a horizontal process strip); both need
 * `transform-origin` set on the fill element in CSS, which is left to the
 * section stylesheet because the axis is the section's choice.
 *
 * REDUCED MOTION. A rail that fills on scroll is a scroll indicator, not
 * decoration — hiding it entirely would remove information. So under
 * `prefers-reduced-motion` the spring is bypassed and the raw scroll progress is
 * returned: the rail still tracks position, it just does not ease or overshoot.
 *
 * @param {{ offset?: [string, string], stiffness?: number, damping?: number }} options
 * @returns {{ trackRef: React.RefObject, progress: import('framer-motion').MotionValue<number> }}
 */
export function useScrollRail({
  /* The rail starts filling when the track's top reaches 85% down the viewport
     and is full when its bottom passes 60% — so it completes as the last item
     is read rather than only once the section has left the screen. */
  offset = ['start 85%', 'end 60%'],
  stiffness = 85,
  damping = 26,
} = {}) {
  const trackRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: trackRef, offset })

  const smooth = useSpring(scrollYProgress, {
    stiffness,
    damping,
    restDelta: 0.001,
  })

  /* `useTransform` rather than returning `scrollYProgress` directly in the
     reduced-motion branch: both hooks must be called on every render, and this
     keeps the returned value the same type either way so the consumer never
     needs to know which branch it got. */
  const raw = useTransform(scrollYProgress, (value) => value)

  return { trackRef, progress: reduceMotion ? raw : smooth }
}
