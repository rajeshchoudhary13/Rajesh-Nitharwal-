# Rajesh_Nitharwal

Freelance portfolio site for **Rajesh Nitharwal** — Full Stack & Mobile App Developer
(React Native · React.js · Node.js · APIs), based in Jaipur, India.

Built with React 19, Vite, React Router, Framer Motion and Lucide icons. Three themes
(light / dark / night), fully responsive, accessible, and code-split per route.

**A real multi-page application.** Seven routes, each with its own URL, its own `<h1>` and its own
entrance animation — not a long scroll with anchor links. The visual language is warm editorial:
a paper-toned palette, Playfair Display over Inter, thin rules, square corners and generous
whitespace, with a single terracotta accent.

**This is a client-conversion site, not a résumé page.** Each page answers a question a
prospective client asks — *what do you build, have you done it before, how do you work, who am I
dealing with, how do I start*. The résumé-facing material (about, experience, credentials) is all
present, distributed to the page where a visitor would look for it.

---

## Content policy

**Every claim on this site traces to one of two sources: the resume PDF, or Rajesh's own
application-flow documentation for the client apps.** Nothing is invented.

All copy lives in `src/data/*.js`.

- The resume covers profile, experience, education, certifications, skills and web work.
- Four of the five client apps (EVClass Driver, Samriddhi Finance, PI Entrepreneur, TankToppa) are
  additionally described from the project flow documentation: the real stack, the end-to-end runtime
  flow, and the hardest engineering problem in each app. Framework version numbers are deliberately
  omitted — they date the work without describing it.
- Punjab Radio has no flow document yet, so it stays at resume-level detail. It is deliberately
  thinner than the others rather than padded to match them.
- No fabricated projects, clients, testimonials, metrics or GitHub stats.
- No invented project URLs — no public store listing or repository is published, so the project
  cards and modal render no external links and say so explicitly (`links: []` plus a visible note).
- Statistics in the About section are only things countable from the resume: 1.5+ years of
  experience, 5 live production apps, 4 professional roles, 2 platforms (Android and iOS).
- Device and browser mockups are **schematic**: they display the app name, stated domain and
  technologies. No client UI is reproduced or imagined, and the UI says as much.
- GitHub / Bitbucket are absent from the resume. The GitHub URL in `src/config/site.js` is
  **inferred** from the previous portfolio host (`rajeshchoudhary13.github.io`) and is marked
  `VERIFY` in that file — confirm it before going live, or delete the channel.

### Client-facing claims

The repositioning added service, capability and process copy, which is a new kind of claim. The
rules applied to it:

- **Services** (`src/data/services.js`) each carry a `proof` array of project ids. Nothing is
  offered that is not evidenced by work already in `src/data/projects.js`.
- **"What I can build"** (`src/data/buildables.js`) distinguishes the two cases visibly: a category
  with comparable past work shows a *"Built before — <project>"* badge naming it; a category
  without one shows no badge and is an honest capability statement. A claim that quietly implies
  past work is the kind of thing a client discovers later.
- **Case-study `result` fields** describe *what the product does*, never a business metric. No
  download counts, revenue figures or percentage improvements appear anywhere, because none were
  measured or shared.
- **`problem` / `solution` / `features`** are re-framings of facts already in `projects.js`;
  `technology`, `integrations` and `challenges` are read straight from the project record at import
  time, so they cannot drift.
- **No price is quoted.** The budget bands in `src/config/site.js` exist to route a conversation,
  the copy says so, and the FAQ answers the cost question by explaining what drives it. Nothing on
  the site commits to a rate, a fixed timeline, or contractual terms.
- **No testimonials or client logos**, because none were supplied.

### Project fields

`src/data/projects.js` documents its own contract. The optional fields are what carry the extra
depth, and every consumer degrades gracefully when they are absent:

| Field | Renders as |
| --- | --- |
| `spec` | Stack chips (state, real-time, native, maps…) under the modal meta grid |
| `highlight` | The one-line "why this was hard" on the project card |
| `flow` | Numbered end-to-end flow inside the modal |
| `deepDive` | Accent-edged engineering callout: `{ title, intro, points[], reliability? }` |

If you add real links or screenshots later, put them in `src/data/projects.js`
(`links: [{ label: 'Play Store', href: '…' }]`) and the buttons appear automatically.

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 19 (function components + hooks) |
| Build tool | Vite 8 |
| Animation | Framer Motion 13 |
| Icons | lucide-react (+ two hand-drawn SVG brand marks) |
| Styling | Plain CSS3 — custom properties, grid, flexbox, `clamp()` |
| Language | JavaScript (JSX), ES modules |
| Linting | oxlint |

No CSS framework, no UI kit, no state library — the dependency list is intentionally minimal.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build → ./dist
npm run build

# 4. Preview the production build locally (http://localhost:4173)
npm run preview

# 5. Lint
npm run lint
```

Requires Node.js 20.19+ (developed and verified on Node 22).

---

## Project structure

```text
Rajesh_Nitharwal/
├── public/
│   ├── 404.html                                    # GitHub Pages SPA fallback
│   ├── _redirects                                   # Netlify SPA fallback
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   ├── media/                                       # NOT projects/ or resume/ — those are routes
│   │   ├── projects/                                # project screenshots
│   │   └── resume/                                  # Rajesh_Nitharwal.pdf
│   ├── og.png
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── gen-seo.mjs                                 # writes robots.txt, sitemap.xml, JSON-LD
│   └── gen-tech-icons.mjs                          # regenerates TechIcon.jsx brand marks
├── src/
│   ├── App.jsx
│   ├── assets/
│   │   └── dev-workspace.svg
│   ├── pages/                                       # one file per route
│   │   ├── HomePage.jsx                             # editorial hero (eager — landing route)
│   │   ├── AboutPage.jsx
│   │   ├── SkillsPage.jsx
│   │   ├── ExperiencePage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── ResumePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── components/
│   │   ├── AnimatedButton.jsx                       # ★ Link / <a> / <button> behind one prop
│   │   ├── AnimatedText.jsx                         # ★ line-by-line heading reveal + sr-only name
│   │   ├── Navigation.jsx                           # ★ fixed bar, active state from useLocation
│   │   ├── PageHeader.jsx                           # ★ the masthead every route opens with
│   │   ├── PageTransition.jsx                       # ★ the wrapper every route renders inside
│   │   ├── Preloader.jsx                            # ★ 00→100% initial load, real milestones
│   │   ├── RevealAnimation.jsx                      # ★ one-shot scroll reveal
│   │   ├── ScrollToTop.jsx                          # scroll restore + ?redirect= handoff
│   │   ├── BackToTop.jsx                            # (unused — superseded by page routing)
│   │   ├── BackgroundFX.jsx                        # gradient wash, grid, orbs, noise
│   │   ├── BrandIcons.jsx                          # LinkedIn / GitHub / WhatsApp marks + React atom
│   │   ├── BrowserMockup.jsx
│   │   ├── Cursor.jsx                              # desktop cursor companion, motion values only
│   │   ├── GlowCard.jsx                            # ★ card surface: spotlight + lit edge + lift
│   │   ├── HeroVisual.jsx                          # code card, API animation, device, floaters
│   │   ├── Icon.jsx                                # string → lucide icon registry (70 entries)
│   │   ├── LazyImage.jsx
│   │   ├── MagneticButton.jsx                      # ★ primary CTA that leans toward the pointer
│   │   ├── Navbar.jsx                              # + scroll-shrink, swipe-to-close drawer
│   │   ├── PhoneMockup.jsx
│   │   ├── Pressable.jsx                           # ★ button/link: ripple + press spring + sheen
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectFilters.jsx
│   │   ├── ProjectModal.jsx                        # + drag-to-dismiss bottom sheet
│   │   ├── Reveal.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── Skeleton.jsx                            # ★ Skeleton / SkeletonCard / SectionSkeleton
│   │   ├── StatCard.jsx
│   │   ├── StateFeedback.jsx                       # ★ SuccessCheck / EmptyState
│   │   ├── TechIcon.jsx                            # GENERATED brand marks (simple-icons)
│   │   ├── TechMarquee.jsx
│   │   └── ThemeToggle.jsx
│   ├── config/
│   │   └── site.js                                 # ★ ONE FILE for availability, stats, channels, form options, SEO
│   ├── data/
│   │   ├── advantages.js                           # "why work with me" points
│   │   ├── buildables.js                           # "what I can build for you" categories
│   │   ├── caseStudies.js                          # client narrative layered over projects.js
│   │   ├── experience.js
│   │   ├── faq.js                                  # client questions — no price quoted
│   │   ├── nav.js
│   │   ├── process.js                              # the seven engagement steps
│   │   ├── profile.js
│   │   ├── projects.js                             # client apps + web work + archive
│   │   ├── services.js                             # the six services, each with proof ids
│   │   └── skills.js
│   ├── hooks/
│   │   ├── useActiveSection.js                     # IntersectionObserver + lazy-mount aware
│   │   ├── useCountUp.js                           # counts up on first scroll into view
│   │   ├── useLockBodyScroll.js
│   │   ├── useMagnetic.js                          # ★ pointer pull, inert on touch + reduced motion
│   │   ├── useMediaQuery.js
│   │   ├── usePointerGlow.js                       # ★ pointer spotlight, CSS vars, zero re-renders
│   │   ├── useRipple.js                            # ★ press ripple, DOM-only
│   │   ├── useScrolled.js
│   │   └── useTheme.js
│   ├── main.jsx
│   ├── sections/
│   │   ├── About.jsx
│   │   ├── Archive.jsx                             # filterable full project grid
│   │   ├── Buildables.jsx                          # twelve recognition tiles
│   │   ├── CaseStudies.jsx                         # tabs + seven-stage timeline
│   │   ├── Contact.jsx                             # project inquiry form
│   │   ├── Engagement.jsx                          # three ways to work together
│   │   ├── Experience.jsx
│   │   ├── Faq.jsx
│   │   ├── FeaturedWork.jsx                        # editorial rows, alternating sides
│   │   ├── FinalCta.jsx                            # closing call to action
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── MobileShowcase.jsx
│   │   ├── Process.jsx
│   │   ├── Resume.jsx
│   │   ├── Services.jsx
│   │   ├── TechStack.jsx                           # technology ecosystem, tabbed
│   │   ├── TrustStats.jsx                          # animated counters + text capabilities
│   │   ├── WebShowcase.jsx
│   │   └── WhyMe.jsx
│   ├── styles/
│   │   ├── about.css
│   │   ├── buildables.css
│   │   ├── casestudy.css
│   │   ├── contact.css
│   │   ├── cursor.css
│   │   ├── effects.css
│   │   ├── engagement.css
│   │   ├── experience.css
│   │   ├── faq.css
│   │   ├── featured.css
│   │   ├── finalcta.css
│   │   ├── footer.css
│   │   ├── global.css
│   │   ├── hero.css
│   │   ├── mockups.css
│   │   ├── modal.css
│   │   ├── navbar.css
│   │   ├── process.css
│   │   ├── projects.css
│   │   ├── resume.css
│   │   ├── services.css
│   │   ├── showcase.css
│   │   ├── skills.css
│   │   ├── tokens.css
│   │   ├── trust.css
│   │   ├── ui.css
│   │   └── whyme.css
│   └── utils/
│       ├── bus.js                                  # one-event bus: featured work → case studies
│       ├── motion.js                               # shared variants, springs, interaction presets
│       ├── scroll.js                               # nav-offset-aware smooth scrolling
│       └── validate.js                             # inquiry validation + mailto builder
├── index.html                                      # SEO head + theme boot + generated JSON-LD
└── vite.config.js                                  # manual vendor chunks (react / motion)
```

Two directories carry the weight. `src/config/site.js` is the single file for everything a client
sees about Rajesh; `src/data/*` holds everything about the work. No component contains copy.

---
## Routes

Eight pages. `src/data/nav.js` is the single source of truth — the navbar, the mobile drawer, the
footer sitemap, each page's two-digit index and the generated `sitemap.xml` all read from the same
`routes` array, so adding a page means editing one file.

| Route | Page | Answers | Sections mounted |
| --- | --- | --- | --- |
| `/` | Home | Who are you, what do you do, are you available? | editorial hero, trust bar, selected work |
| `/about` | About | Who am I dealing with, and what do you build? | About, Services, What I can build, Why work with me |
| `/skills` | Skills | What will my product be built with? | Technology stack |
| `/experience` | Experience | Where did the experience come from, and how do you work? | Experience timeline, Process |
| `/projects` | Projects | Have you actually shipped anything? | Archive grid, Mobile showcase, Web showcase, Case studies |
| `/blogs` | Blogs | What do you think about this work? | Post list (see **Blog content** below) |
| `/contact` | Contact | How do I start? | Project inquiry form, FAQ |
| `/resume` | Resume | What are the credentials? | Background & certifications, Experience timeline |

`/home` redirects to `/` (the brief listed both; one canonical URL avoids competing with itself in
search), and `/blog` redirects to `/blogs` because that is the singular form people type. Any
unmatched path renders the 404 page, which lists every real route.

The two-digit index above each page title comes from `pageIndex(id)` in `src/data/nav.js`, derived
from the array order. It used to be hard-coded per page and went wrong the first time a route was
inserted in the middle — Blogs and Contact both rendered "05".

**Nothing was deleted in the restructure.** All twenty original section components still exist and
nineteen are still rendered — redistributed across the pages above. `Hero`, `FeaturedWork`,
`FinalCta`, `Engagement`, `Navbar`, `BackgroundFX`, `ScrollProgress` and `BackToTop` are the
exceptions: their job is now done by the new page-level components (`HomePage`'s hero, each page's
closing CTA, `Navigation`), and they are left in the tree rather than removed so nothing is lost.
Every data file in `src/data/` is still read by something — `webWork` in particular is a separate
list from `allProjects`, which is why `/projects` mounts `WebShowcase` as well as the archive.

Two sections cross-link: a **View Case Study** button asks the case-study section to select that
project, over the one-event bus in `src/utils/bus.js`.

---

## Updating content

**Start here:** `src/config/site.js` is the one file that holds everything a client sees *about
Rajesh rather than about the work* — availability, the trust-bar numbers, every contact channel,
the engagement models, and the form's dropdown options. Most content edits are in that file alone.

| To change | Edit |
| --- | --- |
| Availability, location, response time, role | `src/config/site.js` → `site` |
| Email, phone, WhatsApp, LinkedIn, GitHub | `src/config/site.js` → `contact` / `channels` |
| Trust-bar numbers | `src/config/site.js` → `stats` |
| Engagement options | `src/config/site.js` → `engagements` |
| Project-type / budget / timeline dropdowns | `src/config/site.js` → `projectTypes`, `budgetRanges`, `timelines` |
| Page title, meta description, keywords | `src/config/site.js` → `seo`, then `npm run seo` |
| Services (the six cards) | `src/data/services.js` |
| "What I can build" categories | `src/data/buildables.js` |
| Case-study narratives | `src/data/caseStudies.js` |
| Process steps | `src/data/process.js` |
| "Why work with me" points | `src/data/advantages.js` |
| FAQ questions and answers | `src/data/faq.js` |
| Projects / mobile apps / web work | `src/data/projects.js` |
| Résumé facts, education, certifications | `src/data/profile.js` |
| Work history timeline | `src/data/experience.js` |
| Technology stack groups | `src/data/skills.js` |
| Navbar items | `src/data/nav.js` |
| Colours, type scale, spacing, motion timing | `src/styles/tokens.css` |
| Animation variants | `src/utils/motion.js` |

### Blog content — READ BEFORE LAUNCH

**`src/data/blogs.js` currently contains three placeholder entries, not Rajesh's writing.** They
exist so the `/blogs` route could be built, styled and QA'd against realistic shapes (a long title,
a short one, two- and three-tag rows). Every one carries `draft: true`, and the page reads that flag
to render a visible **Placeholder** marker on the entry plus a notice at the top — so a scaffold
entry cannot be mistaken for a published post by a visitor or by Rajesh.

This is the same evidence rule the rest of the site follows: no content is presented as his work
unless it is his.

To publish a real post:

1. Replace `title`, `excerpt`, `date` (ISO `YYYY-MM-DD`), `readingTime` and `tags`.
2. **Delete the `draft: true` line** — that alone removes the marker and the notice.
3. Set `href` to where the post lives (an external URL is fine). Left `null`, the entry renders as
   plain text rather than a dead link.

Ordering and date formatting are handled in the data file (`blogsByDate`, `formatPostDate`), so the
page never sorts or formats at render time. `formatPostDate` builds the string from the ISO parts
rather than `new Date(iso)`, which would parse as UTC midnight and render a day early in any
timezone behind UTC.

If every entry is deleted, the page renders a designed empty state rather than a blank column.

### Adding a project

Add the project to `src/data/projects.js`. It appears in the archive immediately. To give it a
featured editorial row and a case study, add a matching entry to `NARRATIVE` in
`src/data/caseStudies.js`, keyed by the same id — the two are merged at import, so the technology
and integration lists can never drift out of step with the project record.

### Stats and the evidence rule

The numbers in `stats` are only things that can be counted from Rajesh's own record: 1.5+ years
professional experience, 5 live production apps, 13 delivered projects. Two entries are
capabilities rather than counts (`Web + Mobile`, `Android + iOS`) and render as text instead of
animating a counter — deliberately, rather than being padded out with an invented figure. If a
number changes in real life, change it here; please do not change it to look bigger.

### Replacing the resume PDF

`public/resume/Rajesh_Nitharwal.pdf` is what the **View Resume** and **Download Resume** buttons
serve. This copy was regenerated from the resume's own content, so it matches the original one-page-
per-section layout but is not the original file byte-for-byte — drop your master PDF in at the same
path to replace it. The filename offered on download comes from `profile.resumeFileName`.

---

## Project inquiry form

There is **no backend and, deliberately, no third-party form service.** The form validates on
submit and then hands a fully composed brief to the visitor's own mail client via a prefilled
`mailto:` link. A client's unreleased product idea should not pass through a form vendor on its way
to an inbox, and this way nothing about the project is stored anywhere.

Fields: name, email, company / business, project type, budget range, project description, expected
timeline. Only **name, email and description** are required — see `src/utils/validate.js` for why.
In short: a client who does not yet know their budget is exactly the client worth talking to, and a
required dropdown would either lose them or teach them to pick something untrue. Optional fields
left blank are omitted from the mail body rather than sent as empty labels.

Budget bands exist to route the conversation, not to quote a price, and the copy around them says
so. The FAQ answers the cost question the same way: what drives the number, then an invitation to
scope it properly.

States it renders: per-field errors with `role="alert"`, a one-shot shake on a rejected submit, a
live character meter that turns amber near the cap, a drawn success tick on handoff, and an
animated icon swap on copy-to-clipboard.

The `mailto:` assignment stays **synchronous inside the submit handler** — there is deliberately no
artificial "sending" delay in front of it, because deferring the navigation risks losing the user
activation the mail-client handoff depends on.

To wire a real endpoint later, replace the `window.location.href = buildInquiryMailto(...)` call in
`src/sections/Contact.jsx` with a `fetch` POST to your form service and keep the existing
validation and status states — that is also the point at which a genuine pending state becomes
meaningful, which is why one is deliberately not faked in front of the `mailto:` handoff today.

---

## Animation & interaction system

Framer Motion for anything stateful, CSS for anything ambient. Shared variants and springs live in
`src/utils/motion.js`; the CSS-only interaction primitives live in `src/styles/ui.css`.

**Motion vocabulary** — `src/utils/motion.js`

| Kind | Entries |
| --- | --- |
| Springs | `SPRING` (press/hover), `SPRING_SOFT` (entrances, layout), `SPRING_POP` (confirmations) |
| Interaction presets | `liftHover`, `pressable`, `pressableIcon` |
| Entrances | `fadeUp/Left/Right`, `riseIn`, `scaleIn`, `maskUp` (clip curtain), `growIn`, `drawX` |
| Feedback | `statusVariants`, `shake`, `popIn`, `panelSwap` |

Each interaction preset carries its spring **inside** the animation target, not as a sibling
`transition` key, so a component that sets `transition` for its entrance cannot flatten the spring
on hover or press.

**Where the motion is**

Page entrance · hero clip-path headline reveal · scroll-linked hero parallax and scroll cue ·
section heading curtain reveal with a drawn accent rule · pointer-follow spotlight on every card ·
gradient edge that lights on hover · press ripple on buttons and links · scroll-shrinking navbar ·
sliding active-link pill (`layoutId`) · swipe-to-close mobile drawer · drag-to-dismiss project sheet ·
snap-scrolling device strip on phones · scroll-driven timeline and workflow rails · count-up
statistics · skeleton section placeholders · form error shake and drawn success tick · back-to-top
with a reading-progress ring · ambient background.

**Performance rules followed**

- Transform and opacity only — no animation touches layout.
- The spotlight and parallax are driven by CSS custom properties and motion values, so **pointer
  movement and scrolling cause no React re-renders**.
- `usePointerGlow` coalesces `pointermove` into at most one `requestAnimationFrame` style write.
- `useRipple` creates and removes its element through the DOM, so a press never re-renders the
  button or the section around it.
- Framer owns an element's `transform`; CSS decoration that must coexist with it uses the
  standalone `translate` / `rotate` properties or a child element instead.

**Reduced motion:** `<MotionConfig reducedMotion="user">` wraps the app, so Framer honours the OS
setting globally. `usePointerGlow` and `useRipple` short-circuit to no-ops, and
`@media (prefers-reduced-motion: reduce)` disables every CSS keyframe animation (background grid and
orbs, marquee, shimmer, skeleton sweep, scroll cue, tick draw), removes scroll snapping and
instant-scrolls anchor navigation.

---

## Navigation

A three-part header: the name on the left, a centred pill of tabs, and a
**Get in touch** action on the right. Layout is a CSS grid with content-sized
side tracks rather than `space-between`, because the pill has to sit optically
centred regardless of how wide the name and actions happen to be.

**Desktop (>= 1024px) — mega menu.** Five of the six tabs open a full-width
panel: an accent information panel on the left (title, standfirst, one factual
stat, one call to action) and destinations on the right in one of three layouts
(`links`, `columns`, `cards`) chosen per panel in `src/data/megaMenu.js`.

`useMegaMenu` (`src/hooks/useMegaMenu.js`) owns the open state and the pointer
behaviour that makes a hover menu usable:

- a **90ms open delay**, so sweeping the pointer across the bar to reach
  something else does not flicker four panels open;
- a **180ms close delay**, so the pointer can cross the gap from the tab into the
  panel without it closing underneath — a grace period rather than an invisible
  bridge element;
- switching tabs while a panel is open is immediate (intent is already proven);
- click and keyboard bypass both delays.

The panel also closes on Escape, on a click outside the header, when focus
leaves the header, and on any route change (keyed on `pathname`, so the browser
back button is covered too).

A tab is a **link first**: clicking "Projects" navigates to `/projects`. The
panel is opened by hover, and by a separate caret button beside the label — which
is the only way a keyboard user can reach the panel's contents at all. Both
carry `aria-haspopup` / `aria-expanded`, and the caret has `aria-controls`.

**Tablet and mobile (< 1024px) — accordion.** The pill gives way to a burger and
a full-height drawer listing all eight routes; the five panel-bearing entries get
a `+`/`-` expander that reveals their sub-links. The page link and the expander
are separate targets, so tapping "About" goes to `/about` rather than only
opening a sub-list.

**Every link in the menu resolves to a real destination** — one of the eight
routes, the resume PDF, or a real contact channel. `assertMegaMenuTargets()` is
called in development and logs an error for any target the router does not serve,
because a mega menu is exactly the component that accumulates plausible-sounding
entries with no page behind them. The Skills and Projects panels read from
`skills.js` and `projects.js` rather than restating them, so the menu cannot
drift from the pages it points at.

`pillLinks` in `src/data/nav.js` is the tab subset: Blogs and Resume are in the
drawer and the footer but not the bar, because eight tabs plus their carets made
the pill wider than the space between the name and the actions.

---

## UI primitives

**Theme control.** `ThemeToggle` is a single button that cycles light -> dark -> night -> light, not
a three-position segmented switch. What a cycling control normally costs — not knowing where you are
or what the next press does — is paid back explicitly: the current mode's glyph is shown, and the
`aria-label` and tooltip name both the current mode and the next one. There is deliberately no
`aria-live` region; the button's label already changes, and screen readers announce a focused
button's changed label on their own, so a live region would make every press speak twice.

Opt-in classes in `src/styles/ui.css`, paired with the hooks and components that drive them:

| Class | Paired with | Effect |
| --- | --- | --- |
| `.spot` | `usePointerGlow` / `GlowCard` | radial highlight tracking the pointer |
| `.edge-lit` | `GlowCard` | 1px gradient ring that fades in on hover |
| `.sheen` | `Pressable` | one-pass light sweep across a surface |
| `.ripple-host` | `useRipple` / `Pressable` | press ripple container |
| `.skeleton` | `Skeleton` | shimmering loading placeholder |
| `.empty` | `EmptyState` | empty-state block |
| `.check` | `SuccessCheck` | self-drawing success tick |
| `.drag-strip` | — | snap-scrolling swipeable row |

`.spot::before` and `.edge-lit::after` are painted at `z-index: -1` inside an `isolation: isolate`
context, so no child of a card needs a stacking fix — but it does mean **a card class must not also
define its own `::before` / `::after`**. Where one is wanted (see `.flow__card`), the decoration is
layered into `background-image` instead.

### CSS load order

`src/main.jsx` imports the base layers (`tokens` → `global` → `ui` → `effects`) **before** `App.jsx`.
That order matters: importing `App` first pulls in the eagerly-loaded component stylesheets
(`navbar.css`, `hero.css`) ahead of the base ones, which would make `global.css` / `ui.css` win every
specificity tie against the very components they are meant to sit underneath.

---

## Performance

- Below-the-fold sections are `React.lazy` + `Suspense` — the first paint ships only the navbar and
  hero, and CSS is split per section. Each `Suspense` fallback is a `SectionSkeleton` shaped like the
  section it stands in for, so the placeholder reserves a realistic height instead of shifting the
  page when the real chunk lands.
- `react`/`react-dom` and `framer-motion` are split into long-lived vendor chunks.
- Background effects are pure CSS with `transform`/`opacity` only — no per-frame JavaScript.
- Scroll listeners are passive and rAF-throttled; active-section tracking uses one
  IntersectionObserver rather than scroll maths.
- Images are lazy-loaded, `decoding="async"`, and dimension-locked to avoid layout shift.
- Device and browser mockups are CSS/SVG, so there are no raster screenshots to download.

Production build output: ~57 kB gzip React chunk, ~47 kB gzip Framer Motion chunk, ~14 kB gzip app
chunk, plus per-section chunks of 1–3 kB gzip.

---

## SEO

Title, meta description, keywords, canonical URL, `robots`, Open Graph and Twitter card metadata,
semantic landmarks, a single `h1` with an ordered heading hierarchy, favicon, web manifest and a
`<noscript>` fallback.

JSON-LD covers `Person`, `ProfessionalService` with one `Offer` per service, and `FAQPage` built
from the seven FAQ entries — so the services and questions are eligible to surface as rich results
rather than only as body copy.

`public/robots.txt`, `public/sitemap.xml` and the JSON-LD block are **generated**, not hand-written:

```bash
npm run seo     # regenerate from src/config/site.js + src/data/*
```

`prebuild` runs it automatically, so `npm run build` can never ship metadata that has drifted from
the data files. Set your real domain in `site.url` (`src/config/site.js`) and re-run it — the
canonical URL, `og:url`, sitemap and robots `Sitemap:` line all read from that one value.

## Accessibility

Semantic `header`/`nav`/`main`/`section`/`footer`, skip-to-content link, keyboard-operable navigation,
`aria-current` on the active link, `aria-expanded`/`aria-controls` on the menu button, a focus-trapped
`role="dialog"` project modal that restores focus and locks body scroll, labelled form fields with
`aria-invalid` and `aria-describedby` error messages, `role="status"` submit feedback, visible focus
rings, alt text on images, decorative art hidden from assistive tech, and reduced-motion support.

---

## Deployment

The build is a static bundle in `dist/`.

**`vite.config.js` uses `base: '/'` and the site MUST be served from a domain root.** This is not a
preference — the site has real nested routes, and with a relative base the asset tags in
`index.html` are emitted as `./assets/index.js`. A browser landing directly on `/about` resolves
that against the current path, requests `/about/assets/index.js`, and gets a 404: every deep link,
refresh and shared URL breaks while the home page keeps working. If you must deploy under a
sub-path, set `base` to that sub-path explicitly.

**A client-side router needs an SPA fallback** — unmatched paths must return `index.html` rather
than the host's 404, or a direct hit on `/about` never reaches React Router. Config for the three
common hosts is committed:

| Host | File | Mechanism |
| --- | --- | --- |
| Netlify / Cloudflare Pages | `public/_redirects` | `/* /index.html 200` |
| Vercel | `vercel.json` | rewrite all non-asset paths to `/index.html` |
| GitHub Pages | `public/404.html` | stashes the path in `?redirect=` and reloads the app, which replays it (`src/components/ScrollToTop.jsx`) |

**nginx** — add `try_files $uri $uri/ /index.html;` to the location block.

**Route / directory collisions.** Static assets live under `public/media/` specifically because
`/projects` and `/resume` are routes: a top-level `public/projects/` directory shadows the
`/projects` route on hosts that resolve a real directory before applying the SPA fallback, which
returns a 404 or a directory listing instead of the page. Do not add a `public/` directory whose
name matches a route.

**Vercel** — import the repo; Framework preset: Vite; Build `npm run build`; Output `dist`.
**Netlify** — Build `npm run build`; Publish `dist`.
**GitHub Pages** — `npm run build && npx gh-pages -d dist`.

Before deploying: replace the resume PDF if you want the original file, and update the canonical
and `og:url` values in `index.html`.

---

## Verification performed

Run against the **production build** (`dist/`, served over HTTP with an SPA fallback) unless noted,
using Playwright + headless Chromium.

**Build and static checks**
- `npm run build` — succeeds (`prebuild` regenerates robots, sitemap and JSON-LD first).
- `npm run lint` (oxlint) — clean, no warnings.
- Built `index.html` emits absolute `/assets/…` paths, so deep links resolve their assets.
- `sitemap.xml` lists all seven routes, generated from `src/data/nav.js`.

**Routing**
- All nine paths (`/`, `/about`, `/skills`, `/experience`, `/projects`, `/blogs`, `/contact`,
  `/resume`, and an unmatched path) return **200 from the production build** and render their page.
- Deep links, refresh and an unmatched path all resolve — including `/projects` and `/resume`, which
  previously 404'd against real directories of the same name (fixed by moving assets to
  `public/media/`).
- Client-side navigation confirmed to be a *real* SPA transition: a value set on `window` survives
  the navigation, so no full document reload occurs.
- Browser **back** and **forward** both restore the correct route and the correct active nav item.
- `/home` redirects to `/`.
- Scroll resets to top on forward navigation; `POP` (back/forward) is left to the browser.

**Responsive**
- Overflow sweep across **320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920 px** on every
  route: **no horizontal scrolling anywhere**, measured as `scrollWidth <= innerWidth`, with the
  offending element reported when it exceeded.
- Navbar checked at **981 / 1024 / 1100 / 1200 / 1280 / 1440 / 1920 px** with all eight links: no
  wrapping to a second line and no overlap between the logo, the link row and the actions.
- Project grid measured at 2 columns on desktop and 1 on mobile, as specified.
- Process steps capped at 3 columns (were 5 and cramped).

**Motion and interaction**
- Preloader: counts `00 → 100%` against real milestones and exits in ~2.5 s; body scroll lock is
  released afterwards. Guaranteed to exit by a 3.5 s cap in `useAppReady` plus a second timeout in
  `App.jsx`.
- Page transitions measured at **445-472 ms** end to end (brief asks for 450-650 ms), and exactly one
  `.page` element exists mid-transition — so `AnimatePresence mode="wait"` really is sequencing the
  exit before the enter rather than stacking two pages.
- Scroll reveals: every route scrolled end-to-end and checked for elements left at `opacity: 0` —
  **none stuck** on any of the seven pages.
- Card hover measured: image `scale(1.03)`, card lift, consistent `16 / 10` media ratio on all cards.
- Primary button hover measured: `#171717` → `#B65F45` with white text (4.6:1).
- `prefers-reduced-motion: reduce`: custom cursor does not mount, no element stranded at
  `opacity: 0`, no page errors.

**Navigation (mega menu)**
- All five panels open with the correct layout, real content and the accent
  information panel; no console errors.
- **Hover-gap protection confirmed**: the pointer can leave a tab, cross the gap
  and enter the panel without it closing.
- Tab switching swaps the panel; Escape closes; a click outside closes; focus
  leaving the header closes; a route change closes.
- The caret opens and closes by keyboard with `aria-expanded` tracking, and
  clicking a tab still navigates rather than trapping the visitor in a menu.
- Panel links and the CTA navigate correctly and close the menu.
- Header measured at **1024 / 1100 / 1200 / 1280 / 1366 / 1440 / 1600 / 1920 px**:
  no overlap between the name, the pill and the actions at any width, with the
  pill staying optically centred (equal gaps either side).
- Accordion verified at **375 / 768 / 900 px**: burger visible, drawer full
  height, 8 routes, 5 expanders, sub-links carry real hrefs, and the drawer closes
  on navigation.
- Contrast inside the accent panel measured in all three themes: title, standfirst,
  stat and CTA all clear AA. This needed a change — `--primary` as a *ground* is
  only 4.46:1 against white text (worse in dark/night, where the accent is
  lighter), so a `--primary-surface` token was added at the briefed
  `#964A34` hover value: white on it is 6.31:1.
- Tab order through the header is logical and every control has a visible focus
  ring. Under `prefers-reduced-motion` the panel appears with no transform and all
  items at full opacity, and the caret still rotates so the state stays legible.

**Theme**
- The single cycling button steps light -> dark -> night -> light and back round again, writing
  `data-theme` and `localStorage` on each press, with the `aria-label` naming both the current and
  the next mode at every step.
- All three themes (light / dark / night) render with the correct background token.
- Theme survives client-side navigation **and** a full reload; `localStorage` key intact.
- No flash of the wrong theme: the inline boot script in `index.html` sets `data-theme` before first
  paint and `useTheme` reads it rather than assuming a default.

**Contact form (unchanged behaviour, re-verified)**
- All seven fields present; empty submit raises 7 validation errors.
- A valid submission still produces the correct `mailto:` handoff — recipient, subject and a body
  containing every field. There is no backend and no form vendor, by design.

**Accessibility**
- **Contrast: 0 failures across 24 route x theme combinations** (~770 text nodes per theme,
  `/blogs` included). Every
  text node on all seven routes was measured in light, dark and night with backgrounds composited
  through the full ancestor chain (alpha washes included) and the 3:1 large-text threshold applied
  where it belongs. Decorative watermark numerals are excluded because they carry
  `aria-hidden="true"` and so are not in the accessibility tree.
  - This pass changed real values. `--text-dim` was the briefed "Muted Text" (#8A847B, 3.29:1 on
    the page) but the section stylesheets use that token for genuine small text, so it was darkened
    per theme until it cleared AA on every surface; the briefed value is retained as `--text-faint`
    for decorative use.
  - `--primary` (#B65F45) is 4.46:1 on white — marginally under AA. It is kept exactly as briefed
    for rules, icons, borders and display type, and `--primary-ink` (#964A34, the briefed hover
    value, 6.31:1) carries small accent *text*.
  - Several 9-10px labels were raised to 0.7rem: no colour choice rescues text that small.
- Exactly one `<h1>` per route (the preloader's name was an `<h1>` and is now a `<p>` — it is a
  transient overlay, not document structure).
- Tab order verified from the top of Home: skip-link first, then logo, the seven nav links, the
  theme control, then page actions. Every control shows a visible 2px focus ring.
- Keyboard operation of the interactive controls: FAQ accordion toggles on both Enter and Space and
  reflects state in `aria-expanded`; skills tabs select on Enter and update `aria-selected`; Escape
  closes the mobile drawer.
- No console errors or failed requests on any route at any tested width.
- No broken images on any route.

### Not verified

- **Real-device testing on iOS and Android.** Everything above is headless Chromium; touch
  behaviour, iOS Safari's viewport units and real scroll momentum are unconfirmed.
- **Focus trapping** inside the open mobile drawer — Tab is not confined to it, so focus can reach
  the page behind. Escape and route-change both close it, and the drawer is not modal, so this is a
  refinement rather than a defect.
- **Screen-reader passthrough** — heading counts, tab order and `aria` attributes were checked
  mechanically, not listened to.
- **Cross-browser**: Firefox and Safari not exercised. `aspect-ratio`, `color-mix()` and
  `text-wrap: balance` are all widely supported but unverified here.
- **Lighthouse / Core Web Vitals** not measured.
- The `github` URL in `src/config/site.js` is still marked `VERIFY` — it is inferred, not sourced
  from the resume. Confirm or delete it before launch.

---

© Rajesh Nitharwal. Site content sourced from his resume and his own project documentation.
