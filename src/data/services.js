/**
 * SERVICES — the six things a client can hire Rajesh for.
 *
 * Each entry is written to answer a buying question, not to describe a skill:
 * `desc` says what the client gets, `deliverables` says what lands in their
 * hands, `tech` says what it is built with, and `detail` is the expanded
 * explanation shown when "View Details" is opened.
 *
 * Every service maps to work that is evidenced elsewhere on the site — the five
 * production applications in data/projects.js and the roles in
 * data/experience.js. Nothing is offered here that has not actually been built.
 *
 * Adding a service: append an object. The grid, the numbering and the detail
 * panel all derive from this array.
 */
export const services = [
  {
    id: 'mobile',
    num: '01',
    icon: 'smartphone',
    title: 'Mobile App Development',
    lead: 'React Native apps for Android and iOS from one codebase.',
    desc: 'Cross-platform mobile applications built once and shipped to both stores — customer apps, business apps, driver apps, booking flows and location-aware products.',
    detail:
      'One React Native codebase serves Android and iOS, so you pay for one build instead of two and every feature lands on both platforms at the same time. Where a platform genuinely needs native code — background location that survives an app kill, or push delivery that has to fire in every app state — I write the native Android or iOS module and bridge it back to JavaScript rather than accepting a workaround.',
    deliverables: [
      'Cross-platform Android + iOS application',
      'Business, customer and driver-side apps',
      'Booking and scheduling flows',
      'Location-based and map-driven features',
      'Native modules where the platform needs them',
    ],
    tech: ['React Native', 'TypeScript', 'Redux Toolkit', 'React Navigation', 'Kotlin', 'Swift'],
    accent: 'blue',
    proof: ['evclass-driver', 'samriddhi-finance', 'tank-topa'],
  },
  {
    id: 'web',
    num: '02',
    icon: 'monitor',
    title: 'Web Application Development',
    lead: 'React.js interfaces that stay fast as the product grows.',
    desc: 'Modern web applications and dashboards — admin panels, business portals, SaaS interfaces and custom platforms — responsive from small phones up to wide desktops.',
    detail:
      'Component-driven React with a clear state model, so the tenth screen costs about what the third one did. Layouts are built mobile-first and verified across breakpoints and browsers, and the data layer is separated from the views, which is what keeps an admin panel maintainable once it has grown to fifty screens.',
    deliverables: [
      'Admin dashboards and internal tools',
      'Business portals and customer areas',
      'SaaS product interfaces',
      'Custom web platforms',
      'Responsive layouts, mobile to desktop',
    ],
    tech: ['React.js', 'JavaScript', 'Redux', 'Tailwind CSS', 'HTML', 'CSS'],
    accent: 'violet',
    proof: ['curryhouse', 'pcatalog'],
  },
  {
    id: 'fullstack',
    num: '03',
    icon: 'layers',
    title: 'Full Stack Development',
    lead: 'Frontend, backend and database, owned end to end.',
    desc: 'Complete product delivery — the interface, the API behind it, the data model underneath and the admin panel that runs it.',
    detail:
      'One person owning both sides removes the most expensive delay in a small project: waiting for the other half of the stack. I design the data model, build the API, wire the client to it and hand over a working system, including the authentication, roles and admin screens the business actually needs to operate it.',
    deliverables: [
      'REST API design and implementation',
      'Authentication, roles and permissions',
      'Database schema and data modelling',
      'Admin panels and business logic',
      'Third-party service integration',
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'SQL', 'REST APIs', 'JWT'],
    accent: 'emerald',
    proof: ['mern', 'e-sign'],
  },
  {
    id: 'integrations',
    num: '04',
    icon: 'waypoints',
    title: 'API & Backend Integration',
    lead: 'Your app talking reliably to everything else.',
    desc: 'REST APIs, Firebase, payments, maps, notifications, real-time sockets and third-party services integrated so the data flow is predictable instead of flaky.',
    detail:
      'Integration work is where most apps quietly break: a token expires mid-session, a socket event arrives twice, a webhook fires out of order. I build these paths defensively — token refresh in an interceptor, event handlers that cannot act on stale state, version checks that drop out-of-order updates — so the feature keeps working on a bad network rather than only on a demo.',
    deliverables: [
      'REST API integration with error and retry handling',
      'Firebase — auth, Firestore, cloud messaging',
      'Payment and authentication providers',
      'Google Maps, Places and geolocation',
      'Push notifications and Socket.IO real-time events',
    ],
    tech: ['REST APIs', 'Firebase', 'Socket.IO', 'Google Maps', 'FCM', 'Axios'],
    accent: 'cyan',
    proof: ['evclass-driver', 'pit'],
  },
  {
    id: 'uiux',
    num: '05',
    icon: 'palette',
    title: 'UI/UX Implementation',
    lead: 'Designs turned into the interface you approved.',
    desc: 'Figma files built out as pixel-accurate, responsive, production-ready screens — with the animation and interaction detail that separates a polished product from a rough one.',
    detail:
      'A design handed over as a component library rather than a pile of screens: shared spacing, type and colour tokens, reusable components, and states for loading, empty and error that designs often leave out. Interaction and motion are implemented with a light touch and respect the visitor\'s reduced-motion setting.',
    deliverables: [
      'Pixel-accurate screens from Figma',
      'Responsive behaviour at every breakpoint',
      'Reusable component library',
      'Loading, empty and error states',
      'Smooth, accessible micro-interactions',
    ],
    tech: ['React', 'React Native', 'CSS', 'Tailwind CSS', 'Framer Motion', 'Figma'],
    accent: 'amber',
    proof: ['mobile-app-ui', 'portfolio-site'],
  },
  {
    id: 'launch',
    num: '06',
    icon: 'rocket',
    title: 'App Launch & Maintenance',
    lead: 'Getting it live — and keeping it live.',
    desc: 'Release builds, Play Store and App Store submission, production fixes, version updates and performance work after launch.',
    detail:
      'Store submission is its own small project: signing keys, provisioning profiles, privacy declarations, screenshots and review responses. I prepare and submit the builds, then stay available for what comes after — the crash reports, the OS upgrade that changes a permission rule, the performance issue that only shows up at real user volume.',
    deliverables: [
      'Signed Android and iOS release builds',
      'Google Play and App Store submission',
      'Production bug fixes and crash triage',
      'Version updates and OS-change fixes',
      'Performance and stability improvements',
    ],
    tech: ['Android Studio', 'Xcode', 'Gradle', 'CocoaPods', 'Google Play', 'App Store'],
    accent: 'blue',
    proof: ['evclass-driver', 'punjab-radio'],
  },
]
