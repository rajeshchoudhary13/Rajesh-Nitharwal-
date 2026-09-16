import { motion } from 'framer-motion'
import { useRipple } from '../hooks/useRipple.js'
import { pressable, pressableIcon } from '../utils/motion.js'

/**
 * Button / link with the site's standard touch feedback:
 * a press ripple, a spring lift on hover, a scale-down on press and — for
 * filled and outlined buttons — a light sweep across the surface.
 *
 * It renders whatever element the caller asks for (`as`), so semantics stay the
 * caller's choice: `button` for actions, `a` for navigation and downloads. All
 * remaining props are forwarded, so `href`, `download`, `type`, `onClick`,
 * `disabled` and every `aria-*` attribute behave exactly as on the bare element.
 *
 * @param {{ as?: 'button'|'a', icon?: boolean, sheen?: boolean,
 *           className?: string, children: React.ReactNode }} props
 */
export default function Pressable({ as = 'button', icon = false, sheen = true, className = '', children, ...rest }) {
  const Tag = motion[as] ?? motion.button
  const ripple = useRipple()

  const classes = ['ripple-host', sheen ? 'sheen' : '', className].filter(Boolean).join(' ')
  const preset = icon ? pressableIcon : pressable

  /* A disabled control should look and feel inert: no ripple, no spring. */
  const disabled = rest.disabled || rest['aria-disabled'] === true
  const feedback = disabled ? {} : { ...preset, onPointerDown: ripple.onPointerDown }

  return (
    <Tag className={classes} {...feedback} {...rest}>
      {children}
    </Tag>
  )
}
