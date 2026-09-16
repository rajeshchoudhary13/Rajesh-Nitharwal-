import { techMarquee } from '../data/skills.js'

/**
 * Infinite technology ticker. The list is rendered twice so the CSS
 * translate(-50%) loop is seamless; the duplicate is hidden from a11y.
 */
export default function TechMarquee() {
  return (
    <div className="marquee" aria-label="Technologies used">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <ul className="marquee__group" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
            {techMarquee.map((tech) => (
              <li className="marquee__item" key={`${copy}-${tech}`}>
                <span className="marquee__dot" />
                {tech}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
