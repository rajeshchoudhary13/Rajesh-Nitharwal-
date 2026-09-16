import { ArrowUpRight, ExternalLink, Info, Layers, Monitor, Palette, Smartphone, Zap } from 'lucide-react'
import GlowCard from './GlowCard.jsx'
import Icon from './Icon.jsx'
import LazyImage from './LazyImage.jsx'
import Pressable from './Pressable.jsx'
import { fadeUp } from '../utils/motion.js'

/**
 * Category badge shown on every card.
 *
 * Mobile apps are called out first and by name, because "is this person a real
 * app developer" is the question the grid has to answer at a glance — a project
 * that ships to a store should never read as just another web card.
 */
const BADGES = {
  mobile: { label: 'Mobile App', Glyph: Smartphone },
  fullstack: { label: 'Full Stack', Glyph: Layers },
  web: { label: 'Web', Glyph: Monitor },
  ui: { label: 'UI/UX', Glyph: Palette },
}

function badgeFor(project) {
  if (project.kind === 'mobile') return BADGES.mobile
  if (project.kind === 'ui') return BADGES.ui
  if (project.tags?.includes('fullstack')) return BADGES.fullstack
  return BADGES.web
}

/**
 * Project card, in two materials.
 *
 * Mobile apps keep the generated schematic device panel they always had — no
 * screenshots of client apps exist to publish, and none are invented. Earlier
 * web and UI work carries its real screenshot instead, so the two kinds are
 * visibly different objects in the same grid rather than one pretending to be
 * the other.
 *
 * `parallax` on the GlowCard publishes --rx / --ry from the pointer position;
 * only the media inside the panel consumes them (see projects.css), so the
 * depth effect stays on the object that should move in 3D while the card itself
 * keeps its lift spring.
 *
 * @param {{ project: object, index: number, onOpen: (project: object) => void }} props
 */
export default function ProjectCard({ project, index, onOpen }) {
  const {
    id, name, domain, tagline, highlight, icon, accent, tech = [], techNote,
    platform, image, imageAlt, portrait, linkNote, links = [],
  } = project
  const titleId = `project-${id}-title`
  const { label: badgeLabel, Glyph: BadgeGlyph } = badgeFor(project)
  const isMobile = project.kind === 'mobile'

  return (
    <GlowCard
      as="article"
      className="pcard glass"
      data-accent={accent}
      data-kind={project.kind}
      variants={fadeUp}
      parallax
      aria-labelledby={titleId}
    >
      <div className={`pcard__media${image ? ' pcard__media--shot' : ''}`}>
        <span className="pcard__glow" aria-hidden="true" />

        {image ? (
          /* Real screenshot of earlier web / UI work. */
          <div className={`pcard__shot${portrait ? ' pcard__shot--portrait' : ''}`}>
            <LazyImage src={image} alt={imageAlt || `${name} screenshot`} className="pcard__shot-img" />
          </div>
        ) : (
          /* Schematic device — used for the client apps, which have no
             publishable screenshots. */
          <div className="pcard__device" aria-hidden="true">
            <span className="pcard__device-notch" />
            <div className="pcard__device-screen">
              <span className="pcard__device-icon">
                <Icon name={icon} size={20} />
              </span>
              <span className="pcard__device-bar w60" />
              <span className="pcard__device-bar w40" />
              <span className="pcard__device-block" />
            </div>
          </div>
        )}

        <span className="pcard__index mono" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* The category badge. Mobile apps additionally show their platforms. */}
        <span className={`pcard__badge mono${isMobile ? ' pcard__badge--app' : ''}`}>
          <BadgeGlyph size={12} strokeWidth={2.2} aria-hidden="true" />
          {badgeLabel}
        </span>

        {isMobile && platform && (
          <span className="pcard__platform mono" aria-hidden="true">
            {platform}
          </span>
        )}
      </div>

      <div className="pcard__body">
        <div className="pcard__title-row">
          <h3 className="pcard__title" id={titleId}>
            {name}
          </h3>
          {domain && <span className="pcard__domain">{domain}</span>}
        </div>

        <p className="pcard__text">{tagline}</p>

        {/* The one line that says why the project was hard to build. Only the
            projects with documented internals carry it. */}
        {highlight && (
          <p className="pcard__highlight">
            <Zap size={13} strokeWidth={2.2} aria-hidden="true" />
            {highlight}
          </p>
        )}

        {tech.length > 0 ? (
          <div className="chip-row pcard__tech">
            {tech.slice(0, 4).map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
            {tech.length > 4 && <span className="chip chip--more">+{tech.length - 4}</span>}
          </div>
        ) : (
          /* No stack was published for this project, so nothing is guessed. */
          techNote && (
            <p className="pcard__meta-note">
              <Info size={12} strokeWidth={2} aria-hidden="true" />
              {techNote}
            </p>
          )
        )}

        <div className="pcard__actions">
          <Pressable
            type="button"
            className="btn btn--sm btn--outline btn--arrow"
            onClick={() => onOpen(project)}
            aria-label={`View details of ${name}`}
          >
            View Details
            <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
          </Pressable>

          {/* Rendered only for URLs verified to resolve over valid HTTPS. */}
          {links.map((link) => (
            <Pressable
              as="a"
              key={link.href}
              className="btn btn--sm btn--ghost"
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {link.label}
              <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
            </Pressable>
          ))}
        </div>

        {/* Why a live link is absent, when one would otherwise be expected. */}
        {linkNote && links.length === 0 && (
          <p className="pcard__meta-note pcard__meta-note--link">
            <Info size={12} strokeWidth={2} aria-hidden="true" />
            {linkNote}
          </p>
        )}
      </div>
    </GlowCard>
  )
}
