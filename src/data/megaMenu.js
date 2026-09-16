/**
 * MEGA MENU
 *
 * The panel that opens under a nav tab. Four tabs carry one: About, Skills,
 * Experience and Projects; Home, Blogs and Contact are single destinations and
 * open nothing.
 *
 * EVERY LINK GOES SOMEWHERE REAL. The site has eight routes, and a mega menu is
 * exactly the sort of component that accumulates plausible-sounding entries
 * ("Achievements", "Career", "Responsibilities") with no page behind them. A
 * dead entry in a premium nav is worse than a shorter menu, so the `items`
 * below resolve only to: one of the eight routes, the resume PDF, or a real
 * contact channel. `assertMegaMenuTargets` at the bottom enforces that against
 * the route manifest.
 *
 * The Skills and Projects panels read from src/data/skills.js and
 * src/data/projects.js rather than restating them, so the menu cannot fall out
 * of step with the pages it points at.
 */
/* Icons are referenced by NAME, not imported as components.
   Keeping JSX-bearing imports out of a data module means this file stays plain
   data — importable by a test, a script or the sitemap generator without
   pulling in the icon library — and the names resolve through the project's
   existing <Icon> registry, which is the single place icon choices live. */
import { contact, site } from '../config/site.js'
import { experience } from './experience.js'
import { profile } from './profile.js'
import { featuredProjects } from './projects.js'
import { skillGroups } from './skills.js'

/* --------------------------------------------------------------------------
   ABOUT
   -------------------------------------------------------------------------- */
const aboutPanel = {
  id: 'about',
  /** Left information panel. */
  intro: {
    title: 'About',
    text: 'Full-stack developer building production web and mobile applications — clean architecture, considered UX, and code the next developer can read.',
    cta: { label: 'Explore About', to: '/about' },
    /* One factual stat, countable from the resume. */
    stat: { value: '1.5+', label: 'Years shipping software' },
  },
  /** Right content — a single column set of destinations. */
  layout: 'links',
  items: [
    { id: 'about', icon: 'users', title: 'About Me', desc: 'Background, and how I work', to: '/about' },
    { id: 'experience', icon: 'briefcase', title: 'Experience', desc: 'Four roles across mobile and web', to: '/experience' },
    { id: 'skills', icon: 'layers', title: 'Skills', desc: 'The stack I build in', to: '/skills' },
    { id: 'services', icon: 'briefcase', title: 'Services', desc: 'What I can be hired to build', to: '/services' },
    { id: 'resume', icon: 'file-text', title: 'Resume', desc: 'Education, certifications and the PDF', to: '/resume' },
    { id: 'contact', icon: 'mail', title: 'Contact', desc: "Let's work together", to: '/contact' },
  ],
}

/* --------------------------------------------------------------------------
   SKILLS
   Columns come straight from skillGroups. Each column heading is a real link to
   /skills; the technologies under it are plain text, because there is no page
   per technology and making them look clickable would be a lie.
   -------------------------------------------------------------------------- */
const SKILLS_PER_COLUMN = 5

const skillsPanel = {
  id: 'skills',
  intro: {
    title: 'Skills',
    text: 'The technologies I use to build web, mobile and backend applications — chosen so a product stays maintainable after I hand it over.',
    cta: { label: 'Explore Skills', to: '/skills' },
    stat: { value: String(skillGroups.length), label: 'Areas of the stack' },
  },
  layout: 'columns',
  /* Four of the five groups: five columns crowds the panel at 1024px, and
     `platform` is the one whose contents are least useful as a scan. */
  columns: skillGroups.slice(0, 4).map((group) => ({
    id: group.id,
    title: group.title,
    to: '/skills',
    /* Truncated on purpose — the panel is a signpost, not the full list. */
    items: group.skills.slice(0, SKILLS_PER_COLUMN).map((skill) => skill.name ?? skill),
    more: Math.max(0, group.skills.length - SKILLS_PER_COLUMN),
  })),
}

/* --------------------------------------------------------------------------
   EXPERIENCE
   The four real roles, newest first, each linking to /experience.
   -------------------------------------------------------------------------- */
const experiencePanel = {
  id: 'experience',
  intro: {
    title: 'Experience',
    text: 'Professional experience across four companies — what I owned, what shipped, and the stack behind it.',
    cta: { label: 'View Experience', to: '/experience' },
    stat: { value: String(experience.length), label: 'Professional roles' },
  },
  layout: 'links',
  items: [
    ...experience.slice(0, 3).map((role) => ({
      id: role.id,
      icon: role.current ? 'rocket' : 'briefcase',
      title: role.title,
      desc: `${role.company} · ${role.period}`,
      to: '/experience',
    })),
    { id: 'exp-resume', icon: 'file-text', title: 'Full Resume', desc: 'Every role, plus the PDF', to: '/resume' },
  ],
}

/* --------------------------------------------------------------------------
   PROJECTS
   The five featured client applications. `links: []` on all of them in the
   data, so each entry routes to /projects rather than to an invented URL.
   -------------------------------------------------------------------------- */
const projectsPanel = {
  id: 'projects',
  intro: {
    title: 'Projects',
    text: 'Selected applications I have designed and built — five live client products across Android and iOS, plus web work.',
    cta: { label: 'View All Projects', to: '/projects' },
    stat: { value: '13', label: 'Projects delivered' },
  },
  layout: 'cards',
  items: featuredProjects.slice(0, 4).map((project) => ({
    id: project.id,
    /* The project's own icon name, from its data record. */
    icon: project.icon,
    title: project.name,
    desc: project.domain,
    to: '/projects',
  })),
}

/* --------------------------------------------------------------------------
   CONTACT
   Real channels only. Every one of these is already published in
   config/site.js — nothing here is new information about Rajesh.
   -------------------------------------------------------------------------- */
const contactPanel = {
  id: 'contact',
  intro: {
    title: "Let's work together",
    text: 'Have a project in mind? Tell me what you want built and I will come back with a scope, a timeline and a figure.',
    cta: { label: 'Get In Touch', to: '/contact' },
    stat: { value: '24h', label: 'Typical first reply' },
  },
  layout: 'links',
  items: [
    { id: 'c-email', icon: 'mail', title: 'Email', desc: contact.email, href: contact.emailHref },
    { id: 'c-phone', icon: 'phone', title: 'Phone', desc: contact.phone, href: contact.phoneHref },
    { id: 'c-linkedin', icon: 'linkedin', title: 'LinkedIn', desc: contact.linkedinLabel, href: contact.linkedin },
    { id: 'c-github', icon: 'github', title: 'GitHub', desc: contact.githubLabel, href: contact.github },
    { id: 'c-location', icon: 'map-pin', title: 'Location', desc: `${site.location} · ${site.timezone}`, to: '/contact' },
    { id: 'c-form', icon: 'wrench', title: 'Project brief', desc: 'Send the details in one go', to: '/contact' },
  ],
}

/**
 * Tab id -> panel. A nav route absent from this map is a plain link, which is
 * what Home, Blogs and Resume are.
 */
export const megaPanels = {
  about: aboutPanel,
  skills: skillsPanel,
  experience: experiencePanel,
  projects: projectsPanel,
  contact: contactPanel,
}

export function panelFor(id) {
  return megaPanels[id] ?? null
}

export const RESUME_DOWNLOAD = {
  href: profile.resumeUrl,
  fileName: profile.resumeFileName,
}

/**
 * Development guard: every `to` in the menu must be a real route.
 *
 * The whole point of the "real destinations only" rule is that it holds as the
 * site changes, and a rule enforced by good intentions is not enforced. Called
 * from Navigation.jsx in dev only, so a mistyped path fails loudly in the
 * console the first time the menu renders instead of shipping as a dead link.
 *
 * @param {string[]} knownPaths every path the router actually serves
 */
export function assertMegaMenuTargets(knownPaths) {
  const bad = []
  for (const panel of Object.values(megaPanels)) {
    const targets = [
      panel.intro.cta.to,
      ...(panel.items ?? []).map((item) => item.to),
      ...(panel.columns ?? []).map((column) => column.to),
    ].filter(Boolean)

    for (const target of targets) {
      if (!knownPaths.includes(target)) bad.push(`${panel.id} -> ${target}`)
    }
  }
  if (bad.length > 0) {
    console.error(
      '[megaMenu] These links point at paths the router does not serve:\n  ' + bad.join('\n  '),
    )
  }
  return bad
}
