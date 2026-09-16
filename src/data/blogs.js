/**
 * BLOG POSTS
 *
 * ============================ PLACEHOLDER DATA ============================
 * The three entries below are SCAFFOLDING, not Rajesh's writing. They exist so
 * the /blogs route, its cards and its layout can be built, styled and QA'd
 * against realistic shapes — a long title, a short one, a two-tag post, a
 * three-tag post.
 *
 * Every one carries `draft: true`. That flag is not decoration: the page reads
 * it and renders a visible "Placeholder" marker on the card, so a draft entry
 * can never be mistaken for a published article by a visitor or by Rajesh.
 *
 * TO PUBLISH FOR REAL:
 *   1. Replace `title`, `excerpt`, `date`, `readingTime` and `tags` with the
 *      real post's values.
 *   2. Delete the `draft: true` line — that alone removes the marker.
 *   3. Set `href` to where the post actually lives (an external URL is fine;
 *      leave it null and the card is not a link).
 *
 * The site's content policy applies here as it does everywhere else: no
 * fabricated claims, metrics or client names. Nothing in this file is presented
 * as published work while `draft` is set.
 * ==========================================================================
 *
 * FIELDS
 *   id           stable slug, used as the React key and the anchor
 *   title        the post's headline
 *   excerpt      one or two sentences; the card shows this in full
 *   date         ISO `YYYY-MM-DD`. Sorted newest-first by the page, and
 *                formatted for display at render time — never store a
 *                pre-formatted date string, it cannot be re-sorted or localised.
 *   readingTime  a string, e.g. '6 min' — free text, shown as-is
 *   tags         short topic labels; the page renders them as chips
 *   href         external URL, or null for a post with nowhere to go yet
 *   draft        true marks the entry as placeholder/unpublished
 */
export const blogs = [
  {
    id: 'placeholder-react-native-performance',
    title: 'Replace me — a post about React Native performance',
    excerpt:
      'Replace this with a one or two sentence summary of the post. This placeholder is deliberately long enough to show how a two-line excerpt sets inside the card.',
    date: '2026-06-18',
    readingTime: '7 min',
    tags: ['React Native', 'Performance'],
    href: null,
    draft: true,
  },
  {
    id: 'placeholder-api-design',
    title: 'Replace me — notes on API design',
    excerpt: 'Replace this with the post summary. A shorter excerpt, to check the card at one line.',
    date: '2026-04-02',
    readingTime: '4 min',
    tags: ['Node.js', 'APIs'],
    href: null,
    draft: true,
  },
  {
    id: 'placeholder-shipping-to-stores',
    title: 'Replace me — what shipping to both app stores actually involves',
    excerpt:
      'Replace this with the post summary. This third entry exists so the list can be checked with an odd number of cards and a three-tag row.',
    date: '2026-01-27',
    readingTime: '9 min',
    tags: ['Android', 'iOS', 'Release'],
    href: null,
    draft: true,
  },
]

/**
 * Newest first.
 *
 * Sorted here rather than in the component so the order is a property of the
 * data, and so the page cannot accidentally render them in file order. String
 * comparison is correct and cheap for ISO `YYYY-MM-DD`; `new Date()` per item
 * per render would be neither.
 */
export const blogsByDate = [...blogs].sort((a, b) => b.date.localeCompare(a.date))

/** Any entry still marked as scaffolding. Drives the page's notice. */
export const draftCount = blogs.filter((post) => post.draft).length

/**
 * `2026-06-18` -> `18 June 2026`.
 *
 * Built from the ISO parts rather than `new Date(iso)`: parsing a bare
 * date-only string is treated as UTC midnight, so in any timezone behind UTC
 * the local date renders one day early.
 */
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function formatPostDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  const name = MONTHS[month - 1]
  if (!name) return iso
  return `${day} ${name} ${year}`
}
