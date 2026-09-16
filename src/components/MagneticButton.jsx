import Pressable from './Pressable.jsx'
import { useMagnetic } from '../hooks/useMagnetic.js'

/**
 * A `Pressable` that also leans toward the pointer.
 *
 * Used only for the primary calls to action — "Start a Project" and the final
 * CTA. Applying it to every button would turn a deliberate cue into noise, and
 * the whole point is that the two buttons that matter feel slightly alive.
 *
 * Pointer handlers are composed rather than replaced, so a caller can still
 * pass its own `onPointerMove` / `onPointerLeave`.
 */
export default function MagneticButton({ strength, onPointerMove, onPointerLeave, ...rest }) {
  const magnet = useMagnetic({ strength })

  return (
    <Pressable
      ref={magnet.ref}
      style={magnet.style}
      onPointerMove={(event) => {
        magnet.onPointerMove(event)
        onPointerMove?.(event)
      }}
      onPointerLeave={(event) => {
        magnet.onPointerLeave(event)
        onPointerLeave?.(event)
      }}
      {...rest}
    />
  )
}
