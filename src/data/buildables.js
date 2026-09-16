/**
 * "HAVE AN IDEA? I CAN BUILD IT."
 *
 * Product categories written for a non-technical reader. The job of this list
 * is recognition — a visitor should find the row that describes their own idea
 * and stop looking for reasons to leave.
 *
 * `evidence` marks the categories where something comparable has already been
 * built and links the claim to a project id in data/projects.js. Categories
 * without it are honest capability statements, not implied past work, and the
 * section labels them differently on purpose.
 */
export const buildables = [
  {
    id: 'mvp',
    icon: 'lightbulb',
    title: 'Startup MVP',
    desc: 'The smallest version of your idea that real users can actually use — built to be extended, not thrown away.',
    accent: 'blue',
  },
  {
    id: 'business',
    icon: 'briefcase',
    title: 'Business App',
    desc: 'An internal or customer-facing app that replaces the spreadsheets and phone calls your operation runs on today.',
    accent: 'violet',
    evidence: 'samriddhi-finance',
  },
  {
    id: 'ecommerce',
    icon: 'shopping-cart',
    title: 'E-commerce App',
    desc: 'Catalogue, cart, checkout and order tracking, with an admin panel to manage products, stock and payments.',
    accent: 'amber',
    evidence: 'curryhouse',
  },
  {
    id: 'booking',
    icon: 'calendar-check',
    title: 'Booking Platform',
    desc: 'Availability, scheduling, confirmations and reminders — for services, appointments, rooms or events.',
    accent: 'emerald',
    evidence: 'taaj-hotel',
  },
  {
    id: 'delivery',
    icon: 'truck',
    title: 'Driver / Delivery App',
    desc: 'Live location tracking, job dispatch, route navigation and status updates for the person on the road.',
    accent: 'cyan',
    evidence: 'evclass-driver',
  },
  {
    id: 'finance',
    icon: 'wallet',
    title: 'Finance App',
    desc: 'Accounts, schedules, payment history and KYC flows, with the authentication and care that financial data needs.',
    accent: 'emerald',
    evidence: 'samriddhi-finance',
  },
  {
    id: 'location',
    icon: 'fuel',
    title: 'Fuel / Location App',
    desc: 'Maps, nearby search, live pricing and turn-by-turn guidance — anything where "what is near me" is the product.',
    accent: 'amber',
    evidence: 'tank-topa',
  },
  {
    id: 'education',
    icon: 'graduation-cap',
    title: 'Education Platform',
    desc: 'Courses, modules, progress tracking, submissions and feedback, in one or several languages.',
    accent: 'violet',
    evidence: 'pit',
  },
  {
    id: 'dashboard',
    icon: 'layout-dashboard',
    title: 'Admin Dashboard',
    desc: 'The control room for your product: users, roles, content, orders and reporting in one place.',
    accent: 'blue',
    evidence: 'curryhouse',
  },
  {
    id: 'saas',
    icon: 'cloud',
    title: 'SaaS Product',
    desc: 'Sign-up, subscription tiers, per-account data and a web app that serves many customers from one deployment.',
    accent: 'cyan',
  },
  {
    id: 'custom-web',
    icon: 'globe',
    title: 'Custom Web Application',
    desc: 'A tool that does exactly what your business does, because nothing off the shelf quite fits it.',
    accent: 'violet',
    evidence: 'e-sign',
  },
  {
    id: 'api',
    icon: 'plug',
    title: 'API-Based Application',
    desc: 'A product built on top of other services — maps, payments, messaging, AI — stitched together reliably.',
    accent: 'emerald',
    evidence: 'tank-topa',
  },
]
