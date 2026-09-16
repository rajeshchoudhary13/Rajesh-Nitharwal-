import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sparkles, Sun } from 'lucide-react'
import Pressable from './Pressable.jsx'
import { THEMES } from '../hooks/useTheme.js'
import { EASE } from '../utils/motion.js'

const META = {
  light: { label: 'Light', Glyph: Sun },
  dark: { label: 'Dark', Glyph: Moon },
  night: { label: 'Night', Glyph: Sparkles },
}

/**
 * Theme control: one button that cycles light -> dark -> night -> light.
 *
 * Previously a three-position segmented switch. A single button is the right
 * shape here for two reasons: the editorial navbar has no room for a segmented
 * control without it becoming the loudest object in the bar, and with only three
 * modes the cycle is short enough that "press again" is a reasonable mental
 * model — the cost a cycling control normally carries (not knowing how many
 * presses to a given state) is small at three.
 *
 * What a cycle *does* hide is where you are and what comes next, so both are
 * stated rather than implied: the current mode's glyph is shown, and the
 * accessible label and tooltip name the mode you are in **and** the one the next
 * press gives you.
 *
 * There is deliberately no `aria-live` region. `aria-label` already changes with
 * the theme, and a focused button whose label changes is announced by screen
 * readers on its own — adding a live region on top of that makes every press
 * speak twice.
 *
 * @param {{ theme: string, setTheme: (t: string) => void, compact?: boolean }} props
 */
export default function ThemeToggle({ theme, setTheme, compact = false }) {
  const index = THEMES.indexOf(theme)
  /* Fall back to the first theme if `theme` is somehow unknown, so the button
     can never become inert. */
  const current = META[theme] ?? META[THEMES[0]]
  const next = THEMES[(index + 1 + THEMES.length) % THEMES.length]
  const { Glyph } = current

  return (
    <Pressable
      icon={!compact}
      sheen={false}
      type="button"
      className={`themebtn${compact ? ' themebtn--compact' : ''}`}
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${current.label}. Switch to ${META[next].label.toLowerCase()}.`}
      title={`${current.label} — switch to ${META[next].label.toLowerCase()}`}
    >
      {/* mode="wait" so the outgoing glyph clears before the new one arrives;
          two glyphs crossfading in a 34px box reads as a smudge. */}
      <span className="themebtn__glyph">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
            transition={{ duration: 0.2, ease: EASE }}
            style={{ display: 'grid', placeItems: 'center' }}
          >
            <Glyph size={compact ? 16 : 15} strokeWidth={1.7} aria-hidden="true" />
          </motion.span>
        </AnimatePresence>
      </span>

      {/* The drawer has room for words; the bar does not. */}
      {compact && <span className="themebtn__label">{current.label}</span>}
    </Pressable>
  )
}
