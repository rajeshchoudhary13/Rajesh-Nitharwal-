/**
 * FREELANCE SITE CONFIG — one file to edit.
 *
 * Everything a client sees that is *about Rajesh rather than about the work*
 * lives here: availability, the numbers in the trust bar, every contact
 * channel, the engagement models, and the form's dropdown options. Sections
 * read from this file only, so changing a number or adding a channel never
 * means opening a component.
 *
 * EVIDENCE RULE (please keep it)
 * -----------------------------
 * The `stats` below are only things that can be counted from Rajesh's own
 * record — the resume and the five documented client applications. Nothing is
 * rounded up and nothing is invented. If a number changes in real life, change
 * it here; do not change it to look bigger.
 *
 * Two values are marked VERIFY: they were derived rather than read off the
 * resume, so confirm them before the site goes live.
 */

/* --------------------------------------------------------------------------
   IDENTITY
   -------------------------------------------------------------------------- */
export const site = {
  /** Canonical origin, used by the SEO tags, sitemap and JSON-LD. */
  url: 'https://rajeshnitharwal.dev',
  name: 'Rajesh Nitharwal',
  /** Client-facing role. This is the ten-second answer to "what is this?". */
  role: 'Full Stack & Mobile App Developer',
  /** Shown in the hero badge and the navbar dot. Set `available: false` when booked. */
  available: true,
  availabilityLabel: 'Available for Freelance Projects',
  availabilityBusyLabel: 'Currently booked — taking bookings for later',
  /** Where the work is done from. Clients ask; answering up front saves a mail. */
  location: 'Jaipur, India',
  timezone: 'IST (UTC+5:30)',
  /** Realistic first-reply promise. Do not shorten this below what you can keep. */
  responseTime: 'Replies within 24 hours',
}

/* --------------------------------------------------------------------------
   CONTACT CHANNELS
   Order matters: the first four render as the contact grid, and every one of
   them is also offered in the footer. `href` is what gets clicked; `value` is
   what gets shown.
   -------------------------------------------------------------------------- */
const PHONE_E164 = '918905883987'

export const contact = {
  email: 'rajeshchoudhary1318@gmail.com',
  emailHref: 'mailto:rajeshchoudhary1318@gmail.com',
  phone: '+91 8905883987',
  phoneHref: `tel:+${PHONE_E164}`,
  /** Prefilled WhatsApp deep link — opens the app on mobile, web client on desktop. */
  whatsapp: `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(
    "Hi Rajesh, I'd like to discuss a project.",
  )}`,
  whatsappLabel: 'Chat on WhatsApp',
  linkedin: 'https://linkedin.com/in/rajesh-nitharwal-b88291258',
  linkedinLabel: 'linkedin.com/in/rajesh-nitharwal',
  /** VERIFY — inferred from the previous portfolio host, rajeshchoudhary13.github.io. */
  github: 'https://github.com/rajeshchoudhary13',
  githubLabel: 'github.com/rajeshchoudhary13',
}

/** Rendered as the contact card grid, in this order. */
export const channels = [
  { id: 'email', icon: 'mail', label: 'Email', value: contact.email, href: contact.emailHref, hint: 'Best for detailed briefs' },
  { id: 'whatsapp', icon: 'message-circle', label: 'WhatsApp', value: contact.phone, href: contact.whatsapp, hint: 'Best for a quick question' },
  { id: 'linkedin', icon: 'linkedin', label: 'LinkedIn', value: contact.linkedinLabel, href: contact.linkedin, hint: 'Background and history' },
  { id: 'github', icon: 'github', label: 'GitHub', value: contact.githubLabel, href: contact.github, hint: 'Code and side projects' },
]

/* --------------------------------------------------------------------------
   TRUST BAR
   `value` + `suffix` animates as a counter; `text` renders as-is for the
   entries that are a capability rather than a number.
   -------------------------------------------------------------------------- */
export const stats = [
  {
    id: 'experience',
    value: 1.5,
    decimals: 1,
    suffix: '+',
    label: 'Years building software',
    hint: 'Professional, across web and mobile',
  },
  {
    id: 'production',
    value: 5,
    suffix: '',
    label: 'Live production apps',
    hint: 'Shipped on Android and iOS',
  },
  {
    id: 'projects',
    value: 13,
    suffix: '',
    label: 'Projects delivered',
    hint: 'Mobile, web, dashboards and UI',
  },
  {
    id: 'platforms',
    text: 'Web + Mobile',
    label: 'Both sides covered',
    hint: 'One developer, one codebase story',
  },
  {
    id: 'stores',
    text: 'Android + iOS',
    label: 'Store-ready delivery',
    hint: 'Builds, submissions and updates',
  },
]

/* --------------------------------------------------------------------------
   ENGAGEMENT MODELS
   -------------------------------------------------------------------------- */
export const engagements = [
  {
    id: 'scratch',
    icon: 'rocket',
    title: 'Build From Scratch',
    tag: 'New product / MVP',
    desc: 'You have an idea and no code yet. I take it from requirements to a working, launchable application.',
    points: ['Requirement and scope workshop', 'Architecture and stack decisions', 'MVP build, test and store release'],
    accent: 'blue',
  },
  {
    id: 'improve',
    icon: 'wrench',
    title: 'Improve Existing App',
    tag: 'Rescue / redesign',
    desc: 'You already have an app that needs fixing, speeding up, redesigning or extending with new features.',
    points: ['Codebase and issue review', 'Bug fixes and performance work', 'New features and UI refresh'],
    accent: 'emerald',
  },
  {
    id: 'longterm',
    icon: 'infinity',
    title: 'Long-Term Development',
    tag: 'Ongoing partner',
    desc: 'You need a developer who stays with the product across versions instead of handing over and disappearing.',
    points: ['Monthly or sprint-based capacity', 'Version updates and maintenance', 'Roadmap and release support'],
    accent: 'violet',
  },
]

/* --------------------------------------------------------------------------
   INQUIRY FORM OPTIONS
   Editing these arrays changes the dropdowns — no component change needed.
   -------------------------------------------------------------------------- */
export const projectTypes = [
  'Mobile App',
  'Web Application',
  'Full Stack Project',
  'UI/UX Development',
  'API Integration',
  'Existing App Improvements',
  'Other',
]

/**
 * Budget bands, not prices. They exist to route the conversation, and the copy
 * around them says so — a scope is quoted after a call, never off this list.
 */
export const budgetRanges = [
  'Not sure yet — advise me',
  'Under ₹50,000',
  '₹50,000 – ₹1,50,000',
  '₹1,50,000 – ₹4,00,000',
  '₹4,00,000+',
  'Hourly / monthly retainer',
]

export const timelines = [
  'As soon as possible',
  'Within 1 month',
  '1 – 3 months',
  '3 – 6 months',
  'Flexible / planning ahead',
]

/* --------------------------------------------------------------------------
   SEO
   Consumed by the build-time sitemap script and the JSON-LD block in
   index.html. Keep `keywords` honest — they describe services actually offered.
   -------------------------------------------------------------------------- */
export const seo = {
  title: 'Rajesh Nitharwal — Freelance Full Stack & React Native Developer',
  description:
    'Freelance Full Stack and Mobile App Developer. I design, build and launch React Native apps for Android and iOS, React.js web applications, Node.js APIs and admin dashboards for startups and businesses.',
  keywords: [
    'Freelance React Native Developer',
    'React Native Developer',
    'React.js Developer',
    'Full Stack Developer',
    'Mobile App Developer',
    'Freelance App Developer',
    'React Native Freelancer',
    'Web Application Developer',
    'Hire React Native Developer',
    'Android and iOS App Developer',
  ],
}
