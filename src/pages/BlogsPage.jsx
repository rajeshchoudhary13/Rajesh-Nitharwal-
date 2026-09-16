import { Info } from 'lucide-react'
import AnimatedButton from '../components/AnimatedButton.jsx'
import PageHeader from '../components/PageHeader.jsx'
import PageTransition from '../components/PageTransition.jsx'
import RevealAnimation from '../components/RevealAnimation.jsx'
import { blogsByDate, draftCount, formatPostDate } from '../data/blogs.js'
import { pageIndex, routes } from '../data/nav.js'
import '../styles/blogs.css'

const meta = routes.find((route) => route.id === 'blogs')

/**
 * BLOGS — the writing index.
 *
 * A list, not a card grid: posts are distinguished by their titles and dates,
 * and a wall of equal-weight cards makes seven of those harder to scan rather
 * than easier. Same treatment as the selected-work list on the home page, so
 * the two read as one publication.
 *
 * SCAFFOLDING NOTICE. Every entry in data/blogs.js currently carries
 * `draft: true`. While any do, this page says so at the top and marks each one
 * on the card — a placeholder that looks like a published post is worse than an
 * empty page, because it is the kind of thing a client notices before you do.
 * Removing the flags removes the notice; no code change needed.
 */
export default function BlogsPage() {
  const posts = blogsByDate
  const allDrafts = draftCount === posts.length

  return (
    <PageTransition className="page">
      <div className="container">
        <PageHeader index={pageIndex('blogs')} title={['Blogs']} blurb={meta.blurb} id="blogs-page-title" />

        {draftCount > 0 && (
          <RevealAnimation className="blogs__notice" role="note">
            <Info size={15} strokeWidth={1.8} aria-hidden="true" />
            <p>
              {allDrafts
                ? 'Nothing here is published yet — the entries below are placeholders that show how posts will be listed. Real writing is on the way.'
                : `${draftCount} of these entries ${draftCount === 1 ? 'is a placeholder' : 'are placeholders'} and not yet published.`}
            </p>
          </RevealAnimation>
        )}

        {posts.length === 0 ? (
          /* Not reachable with the current data, but a list page must not render
             as a blank column if the array is ever emptied. */
          <RevealAnimation className="blogs__empty">
            <p className="blogs__empty-text">No posts published yet.</p>
            <AnimatedButton to="/contact" variant="outline">
              Get in touch
            </AnimatedButton>
          </RevealAnimation>
        ) : (
          <ul className="blogs__list">
            {posts.map((post, index) => (
              <RevealAnimation as="li" key={post.id} delay={index * 0.06} className="blogs__item">
                <PostBody post={post} index={index} />
              </RevealAnimation>
            ))}
          </ul>
        )}

        <RevealAnimation className="pagecta">
          <h2 className="pagecta__title">Want to talk about something I have written?</h2>
          <p className="pagecta__text">
            Or about something you are building — either is a good reason to get in touch.
          </p>
          <div className="pagecta__actions">
            <AnimatedButton to="/contact" variant="primary">
              Start a Conversation
            </AnimatedButton>
            <AnimatedButton to="/projects" variant="outline">
              View Projects
            </AnimatedButton>
          </div>
        </RevealAnimation>
      </div>
    </PageTransition>
  )
}

/**
 * One row. Rendered as an <a> only when the post has somewhere to go — a link
 * to nowhere is worse than plain text, because it advertises a click that does
 * nothing.
 */
function PostBody({ post, index }) {
  const inner = (
    <>
      <span className="blogs__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="blogs__body">
        <span className="blogs__head">
          <span className="blogs__title">{post.title}</span>
          {post.draft && <span className="blogs__flag">Placeholder</span>}
        </span>

        <span className="blogs__excerpt">{post.excerpt}</span>

        <span className="blogs__meta">
          {/* A real <time> element, so the machine-readable date is the ISO
              value while the visitor reads the formatted one. */}
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} read</span>
        </span>

        {post.tags?.length > 0 && (
          <span className="blogs__tags">
            {post.tags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </span>
        )}
      </span>

      {post.href && (
        <span className="blogs__arrow" aria-hidden="true">
          &rarr;
        </span>
      )}
    </>
  )

  if (!post.href) {
    return <div className="blogs__row">{inner}</div>
  }

  return (
    <a
      className="blogs__row blogs__row--link"
      href={post.href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {inner}
    </a>
  )
}
