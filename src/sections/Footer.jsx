import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { navLinks } from '../data/nav.js'
import { channels, contact, site } from '../config/site.js'
import { profile } from '../data/profile.js'
import '../styles/footer.css'

/**
 * One footer, every page. Rendered by the shell in App.jsx rather than by the
 * pages, so it cannot drift between routes and is not re-mounted by the page
 * transition — it stays put while the page above it changes, which is what makes
 * the transition read as a page swap inside a site rather than a whole-site
 * reload.
 *
 * Route links go through <Link>, so the footer navigates client-side exactly
 * like the navbar; the contact channels stay real anchors because they leave the
 * site (or open a mail client).
 *
 * NOT scroll-revealed, deliberately. A footer is the one block that is always
 * the last thing on the page, so a `whileInView` wrapper here buys nothing and
 * costs correctness: on a short route it can already be on screen at load, and
 * anything that stops the observer firing (a print stylesheet, a screenshot
 * pass, an unusual scroll container) leaves the site's contact details sitting
 * at opacity 0. It renders plainly and is always visible.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          {/* ---------- Identity ---------- */}
          <div className="footer__brand">
            <p className="footer__name">{profile.name}</p>
            <p className="footer__role">Full Stack Developer</p>
            <p className="footer__blurb">
              Building production web and mobile applications from {site.location}.
            </p>
            {site.available && (
              <p className="footer__status">
                <span className="footer__status-dot" aria-hidden="true" />
                {site.availabilityLabel}
              </p>
            )}
          </div>

          {/* ---------- Sitemap ---------- */}
          <div className="footer__col">
            <h2 className="footer__heading">Pages</h2>
            <ul className="footer__links">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Direct channels ---------- */}
          <div className="footer__col">
            <h2 className="footer__heading">Elsewhere</h2>
            <ul className="footer__links">
              {channels.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  >
                    <Icon name={channel.icon} size={14} />
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- Contact ---------- */}
          <div className="footer__col">
            <h2 className="footer__heading">Get in touch</h2>
            <ul className="footer__links footer__links--plain">
              <li>
                <a href={contact.emailHref}>{contact.email}</a>
              </li>
              <li>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
              <li>
                <span className="footer__quiet">{site.responseTime}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- Legal ---------- */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <p className="footer__built">Built with React &amp; Vite</p>
        </div>
      </div>
    </footer>
  )
}
