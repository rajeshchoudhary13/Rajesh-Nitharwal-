import { motion } from 'framer-motion'
import { Atom, Braces, Boxes, Database, Flame, GitBranch, Smartphone, Waypoints } from 'lucide-react'
import { ReactMark } from './BrandIcons.jsx'
import { EASE } from '../utils/motion.js'
import '../styles/hero.css'

/** Floating technology pills — resume technologies only. */
const FLOATERS = [
  { id: 'rn', label: 'React Native', Glyph: Smartphone, className: 'f-1', accent: 'cyan' },
  { id: 'redux', label: 'Redux', Glyph: Boxes, className: 'f-2', accent: 'violet' },
  { id: 'rest', label: 'REST API', Glyph: Waypoints, className: 'f-3', accent: 'emerald' },
  { id: 'firebase', label: 'Firebase', Glyph: Flame, className: 'f-4', accent: 'amber' },
  { id: 'js', label: 'JavaScript', Glyph: Braces, className: 'f-5', accent: 'blue' },
  { id: 'git', label: 'Git', Glyph: GitBranch, className: 'f-6', accent: 'violet' },
]

const CODE_LINES = [
  [
    { t: 'import', c: 'kw' },
    { t: ' { View, Text } ', c: '' },
    { t: 'from', c: 'kw' },
    { t: " 'react-native'", c: 'str' },
  ],
  [
    { t: 'const', c: 'kw' },
    { t: ' Trips = () => {', c: '' },
  ],
  [
    { t: '  const', c: 'kw' },
    { t: ' { data } = ', c: '' },
    { t: 'useTrips', c: 'fn' },
    { t: '()', c: '' },
  ],
  [{ t: '  return <TripList items={data} />', c: '' }],
  [{ t: '}', c: '' }],
]

export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      {/* Concentric orbit rings + React atom */}
      <div className="hv__orbits">
        <motion.span
          className="hv__ring hv__ring--1"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <span className="hv__ring hv__ring--2" />
        <motion.div
          className="hv__atom"
          animate={{ rotate: 360 }}
          transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
        >
          <ReactMark size={72} />
        </motion.div>
      </div>

      {/* Code card */}
      <motion.div
        className="hv__code glass"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
      >
        <div className="hv__code-bar">
          <span className="hv__dots">
            <i /> <i /> <i />
          </span>
          <span className="mono hv__file">Trips.jsx</span>
        </div>
        <pre className="hv__code-body mono">
          {CODE_LINES.map((line, i) => (
            <motion.span
              className="hv__line"
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.45 + i * 0.08, ease: EASE }}
            >
              <span className="hv__ln">{i + 1}</span>
              {line.map((tok, j) => (
                <span className={tok.c ? `tok-${tok.c}` : undefined} key={j}>
                  {tok.t}
                </span>
              ))}
            </motion.span>
          ))}
          <motion.span
            className="hv__caret"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </pre>
      </motion.div>

      {/* API connection animation: client -> API -> service */}
      <motion.div
        className="hv__api glass"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.7, ease: EASE }}
      >
        <span className="hv__api-node">
          <Smartphone size={15} strokeWidth={1.8} />
          App
        </span>
        <span className="hv__api-wire">
          <svg viewBox="0 0 120 12" preserveAspectRatio="none">
            <path d="M2 6 H118" stroke="rgba(164, 142, 255,.35)" strokeWidth="1.4" strokeDasharray="4 4" fill="none" />
          </svg>
          <motion.span
            className="hv__packet"
            animate={{ x: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
            transition={{
              x: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 2.6, repeat: Infinity, times: [0, 0.15, 0.85, 1] },
            }}
          />
          <span className="mono hv__api-label">REST</span>
        </span>
        <span className="hv__api-node">
          <Database size={15} strokeWidth={1.8} />
          API
        </span>
      </motion.div>

      {/* Mini device */}
      <motion.div
        className="hv__phone"
        initial={{ opacity: 0, y: 22, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
      >
        <motion.div
          className="hv__phone-body"
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="hv__phone-notch" />
          <div className="hv__phone-screen">
            <span className="hv__phone-avatar">
              <Atom size={18} strokeWidth={1.8} />
            </span>
            <span className="hv__phone-bar w70" />
            <span className="hv__phone-bar w45" />
            <div className="hv__phone-cards">
              <span />
              <span />
            </div>
            <span className="hv__phone-cta" />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating technology pills */}
      {FLOATERS.map(({ id, label, Glyph, className, accent }, i) => (
        <motion.span
          key={id}
          className={`hv__float ${className}`}
          data-accent={accent}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1, y: [-5, 5, -5] }}
          transition={{
            opacity: { duration: 0.35, delay: 0.55 + i * 0.07 },
            scale: { duration: 0.35, delay: 0.55 + i * 0.07, ease: EASE },
            y: { duration: 7 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 },
          }}
        >
          <Glyph size={14} strokeWidth={1.9} />
          {label}
        </motion.span>
      ))}
    </div>
  )
}
