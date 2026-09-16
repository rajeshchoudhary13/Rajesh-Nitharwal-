import AnimatedButton from '../components/AnimatedButton.jsx'
import PageHeader from '../components/PageHeader.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { navLinks } from '../data/nav.js'
import { Link } from 'react-router-dom'

/**
 * 404. Reached by any unmatched path.
 *
 * It lists every real route rather than only offering "go home", because the
 * usual way to land here is a mistyped or stale URL and the page the visitor
 * actually wanted is almost always one of six.
 */
export default function NotFoundPage() {
  return (
    <PageTransition className="page">
      <div className="container">
        <PageHeader
          index="404"
          title={['Page not', 'found']}
          blurb="That URL does not exist on this site. Everything that does is listed below."
        />

        <nav className="nf__links" aria-label="All pages">
          {navLinks.map((link) => (
            <Link key={link.id} to={link.path} className="nf__link">
              <span className="nf__link-label">{link.label}</span>
              <span className="nf__link-path">{link.path}</span>
            </Link>
          ))}
        </nav>

        <div className="nf__action">
          <AnimatedButton to="/" variant="primary">
            Back to Home
          </AnimatedButton>
        </div>
      </div>
    </PageTransition>
  )
}
