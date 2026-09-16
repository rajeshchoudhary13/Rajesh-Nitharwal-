/**
 * Fixed ambient backdrop: gradient wash, developer grid, drifting orbs, noise.
 * Pure CSS animation (no JS per frame) and pointer-events:none so it never
 * interferes with interaction. Disabled by the reduced-motion media query.
 */
export default function BackgroundFX() {
  return (
    <div className="bgfx" aria-hidden="true">
      <div className="bgfx__grid" />
      <span className="bgfx__orb bgfx__orb--1" />
      <span className="bgfx__orb bgfx__orb--2" />
      <span className="bgfx__orb bgfx__orb--3" />
      <div className="bgfx__noise" />
    </div>
  )
}
