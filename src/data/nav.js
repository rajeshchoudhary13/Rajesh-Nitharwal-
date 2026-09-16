/**
 * NAVIGATION — route manifest.
 *
 * The site is a real multi-page application: every entry below is its own route
 * with its own URL, not an anchor into a long scroll. This file is the single
 * source of truth for the bar, the mobile drawer, the footer and the sitemap
 * generator, so adding a page means editing one array.
 *
 * `label` is what the visitor reads; `path` is what the router matches; `title`
 * and `blurb` are the page's own heading and standfirst, kept here so the
 * <PageHeader> of every route reads from the same place the nav does.
 */
export const routes = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    title: 'Home',
    blurb: 'Full-stack developer building production web and mobile applications.',
  },
  {
    id: 'about',
    label: 'About',
    path: '/about',
    title: 'About',
    blurb:
      'Who you would be working with — the background, the way I build, and what I care about in a codebase.',
  },
  {
    id: 'skills',
    label: 'Skills',
    path: '/skills',
    title: 'Skills',
    blurb:
      'The stack I work in day to day, grouped by where it sits in a product — front end, back end, mobile, data, cloud and tooling.',
  },
  {
    id: 'experience',
    label: 'Experience',
    path: '/experience',
    title: 'Experience',
    blurb: 'Where the experience comes from — roles, responsibilities and what shipped in each one.',
  },
  {
    id: 'services',
    label: 'Services',
    path: '/services',
    title: 'Services',
    blurb:
      'What I can be hired to build, and the process each engagement runs through — from the first call to the release and after it.',
  },
  {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    title: 'Projects',
    blurb: 'Selected work across mobile and web, with the stack and the part I built on each one.',
  },
  {
    id: 'blogs',
    label: 'Blogs',
    path: '/blogs',
    title: 'Blogs',
    blurb: 'Notes on building for web and mobile — what worked, what did not, and what I would do differently.',
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    title: 'Contact',
    blurb: 'Tell me what you want built and I will come back with a scope, a timeline and a figure.',
  },
  {
    id: 'resume',
    label: 'Resume',
    path: '/resume',
    title: 'Resume',
    blurb: 'Education, certifications and the full professional record, plus the PDF.',
  },
]

/** The bar and the drawer render every route, in this order. */
export const navLinks = routes

/**
 * The tabs the desktop pill shows.
 *
 * Not every route: eight tabs plus their carets made the pill wider than the
 * space between the name and the actions, so it overlapped the name by up to
 * 144px at 1024px. Resume and Blogs come out of the bar — Resume is reachable
 * from the About and Experience panels and from the footer, Blogs from the
 * footer — which is what buys the pill enough room to stay centred without
 * colliding with either side.
 *
 * Services is excluded for the same width reason. It was added as a route after
 * that measurement, and putting it in the bar would restore exactly the overlap
 * the exclusions above exist to prevent — six tabs is what fits. It is reachable
 * from the About panel of the mega menu, from the footer, from the home page's
 * services preview, and from the mobile drawer, which lists every route.
 *
 * If the bar is ever given room for a seventh tab, this is the first entry that
 * should come back into it.
 */
const PILL_EXCLUDE = new Set(['resume', 'blogs', 'services'])

export const pillLinks = routes.filter((route) => !PILL_EXCLUDE.has(route.id))

/**
 * The two-digit index a page shows above its title.
 *
 * Derived from this array's order rather than hard-coded per page: the indices
 * were duplicated the moment a route was inserted in the middle (Blogs and
 * Contact both read "05"), and a number that can silently go wrong is worse
 * than no number. Home is the landing page and is not numbered, so counting
 * starts at the route after it.
 */
export function pageIndex(id) {
  const numbered = routes.filter((route) => route.path !== '/')
  const position = numbered.findIndex((route) => route.id === id)
  return position < 0 ? null : String(position + 1).padStart(2, '0')
}

/**
 * `/home` is offered as an alias of `/` because the brief lists both. It
 * redirects rather than rendering a duplicate, so the home page has exactly one
 * canonical URL and never competes with itself in search results.
 */
export const HOME_ALIASES = ['/home']
