import {
  Bell,
  Boxes,
  Cpu,
  Languages,
  Map as MapIcon,
  MonitorSmartphone,
  RadioTower,
  Smartphone,
  Waypoints,
} from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import PhoneMockup from '../components/PhoneMockup.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { mobileProjects } from '../data/projects.js'
import { scaleIn, SPRING, stagger } from '../utils/motion.js'
import '../styles/showcase.css'

/**
 * Mobile capability chips.
 *
 * Each entry corresponds to work documented in one of the five production apps
 * (see data/projects.js) — the real-time, native-module, maps and localization
 * entries are evidenced by EVClass Driver, Samriddhi Finance, TankToppa and
 * PI Entrepreneur respectively. Nothing here is a capability without a project
 * behind it.
 */
const CAPABILITIES = [
  { icon: Smartphone, label: 'React Native + TypeScript', desc: 'Single codebase, two platforms' },
  { icon: MonitorSmartphone, label: 'Android & iOS', desc: 'New Architecture and Hermes in production' },
  { icon: RadioTower, label: 'Socket.IO real-time', desc: 'Live dispatch, proximity and payment events' },
  { icon: Cpu, label: 'Native modules', desc: 'Android Java/Kotlin services bridged to JS' },
  { icon: MapIcon, label: 'Google Maps & Places', desc: 'Route rendering, snapping and live position' },
  { icon: Boxes, label: 'Redux Toolkit & Zustand', desc: 'Predictable state at the right weight' },
  { icon: Waypoints, label: 'REST & TanStack Query', desc: 'Server state with caching and polling' },
  { icon: Bell, label: 'FCM & Notifee', desc: 'Push in foreground, background and killed states' },
  { icon: Languages, label: 'i18next localization', desc: 'Fully bilingual EN/FR product' },
]

export default function MobileShowcase() {
  return (
    <section className="section showcase showcase--mobile" id="mobile" aria-labelledby="mobile-title">
      <div className="showcase__aura" aria-hidden="true" />

      <div className="container">
        <SectionHeading
          eyebrow="Mobile app development"
          eyebrowIcon="smartphone"
          center
          id="mobile-title"
          title={
            <>
              Apps that ship to <span className="grad">Android &amp; iOS</span>
            </>
          }
          desc="Mobile is my core discipline. Every app below is live in production and supported with React Native across both platforms."
        />

        {/* Becomes a snap-scrolling, swipeable strip on narrow screens (see
            showcase.css) rather than squashing five phones into one column. */}
        <div className="devices">
          {mobileProjects.map((project, index) => (
            <PhoneMockup project={project} index={index} key={project.id} />
          ))}
        </div>

        <p className="devices__caption mono">
          <span className="devices__swipe-hint">Swipe to explore · </span>
          Schematic device previews — client UI is not reproduced.
        </p>

        <Reveal as="ul" className="caps" variants={stagger(0.05)}>
          {CAPABILITIES.map(({ icon: Glyph, label, desc }) => (
            <GlowCard
              as="li"
              className="cap glass"
              key={label}
              variants={scaleIn}
              whileHover={{ y: -4, transition: SPRING }}
            >
              <span className="cap__icon">
                <Glyph size={18} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <h3>{label}</h3>
                <p>{desc}</p>
              </div>
            </GlowCard>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
