/**
 * Skill groups — full-stack, presented as a technology stack.
 *
 * Grouped by the layer of the product they serve, so the list reads as a stack
 * rather than an alphabetical dump: client, mobile, server, data, then the
 * platform tooling that turns a branch into a store release.
 *
 * One technology per entry. Compound entries ("Git, GitHub & Bitbucket") were
 * split so each tile can carry its own brand mark, which is what makes a logo
 * grid readable — but splitting only redistributed existing claims, it did not
 * add any.
 *
 * `brand` is a simple-icons slug resolved by TechIcon.jsx. Where a technology
 * has no real brand mark (REST APIs, native modules, SQL as a general skill),
 * `icon` names a lucide glyph instead — better an honest generic glyph than a
 * logo that implies a product that was never used.
 *
 * Evidence discipline: where a technology backs work described elsewhere in
 * this repo, the description says what it was used *for* and the project data
 * supports it (Socket.IO and the Maps SDK in EVClass Driver, Firestore and FCM
 * there too, Java native modules in Samriddhi Finance, redux-persist in PIT,
 * Node/Express/MongoDB in the Mtoag web work and the admin dashboards). Where a
 * technology is a listed skill with no project here behind it, the description
 * stays plain and claims nothing about depth. Nothing asserts a metric.
 */
export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: 'globe',
    accent: 'violet',
    blurb:
      'Component-driven interfaces that hold their shape on every screen size — typed where it earns its keep, and styled from a single system rather than per page.',
    skills: [
      {
        name: 'React.js',
        brand: 'react',
        level: 'Core',
        desc: 'Component-based UI with hooks and reusable modules — the web half of the stack.',
      },
      {
        name: 'JavaScript',
        brand: 'javascript',
        level: 'Core',
        desc: 'Primary language across web, mobile and server work.',
      },
      {
        name: 'TypeScript',
        brand: 'typescript',
        desc: 'Typed components and API contracts; the newer client apps are TypeScript throughout.',
      },
      {
        name: 'Redux Toolkit',
        brand: 'redux',
        level: 'Core',
        desc: 'Centralised state across screens, with redux-persist where state has to survive a cold start.',
      },
      { name: 'HTML5', brand: 'html5', desc: 'Semantic markup and accessible document structure.' },
      { name: 'CSS3', brand: 'css', desc: 'Responsive layouts and consistent UX from mobile widths up.' },
      {
        name: 'Tailwind CSS',
        brand: 'tailwindcss',
        desc: 'Utility-first styling on the admin dashboards and the newer web builds.',
      },
      { name: 'Bootstrap', brand: 'bootstrap', desc: 'Component framework for fast, consistent responsive build-out.' },
      {
        name: 'Context API',
        icon: 'component',
        desc: 'Lightweight shared state where a full store is not warranted.',
      },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    icon: 'smartphone',
    accent: 'cyan',
    blurb:
      'Cross-platform apps from a single React Native codebase — five live in production on both stores, including the places the two platforms have to diverge.',
    skills: [
      {
        name: 'React Native',
        brand: 'react',
        level: 'Core',
        desc: 'Primary mobile framework — production features across five live client apps.',
      },
      {
        name: 'Android',
        brand: 'android',
        level: 'Core',
        desc: 'Native Android delivery, including a Java foreground service that outlives the JS runtime.',
      },
      {
        name: 'iOS',
        brand: 'ios',
        level: 'Core',
        desc: 'Native iOS delivery, including Swift modules and signed store builds.',
      },
      {
        name: 'Native modules',
        icon: 'package',
        desc: 'Kotlin, Swift and Java bridges for the work JavaScript cannot reach.',
      },
      { name: 'React Navigation', icon: 'route', desc: 'Stack and tab navigation for multi-screen apps.' },
      {
        name: 'Push notifications',
        icon: 'bell',
        desc: 'FCM and Notifee across foreground, background and killed states.',
      },
      { name: 'AsyncStorage', icon: 'database', desc: 'On-device persistence for session and app state.' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: 'server',
    accent: 'emerald',
    blurb:
      'The server side of the stack, and the contracts every client here depends on — REST for the data path, sockets where the data cannot wait for a request.',
    skills: [
      {
        name: 'Node.js',
        brand: 'nodedotjs',
        level: 'Core',
        desc: 'Server-side JavaScript behind the APIs and admin dashboards.',
      },
      {
        name: 'Express.js',
        brand: 'express',
        level: 'Core',
        desc: 'Routing and middleware layer for REST services.',
      },
      {
        name: 'REST APIs',
        icon: 'waypoints',
        level: 'Core',
        desc: 'Designing and integrating endpoints — the data path every app here runs on.',
      },
      {
        name: 'Socket.IO',
        brand: 'socketdotio',
        desc: 'Realtime events — dispatch, proximity and payment handlers on the ride-hailing driver app.',
      },
      {
        name: 'JWT',
        brand: 'jsonwebtokens',
        desc: 'Token auth with JWT and bcrypt, plus OTP flows and role and permission models.',
      },
      {
        name: 'Google Maps',
        brand: 'googlemaps',
        desc: 'Routing, polyline decoding, Places autocomplete and road-snapped live tracking.',
      },
    ],
  },
  {
    id: 'data',
    title: 'Database & Cloud',
    icon: 'database',
    accent: 'blue',
    blurb:
      'Where the data lives and the managed services around it — document stores for the app backends, relational where the shape is fixed.',
    skills: [
      {
        name: 'MongoDB',
        brand: 'mongodb',
        level: 'Core',
        desc: 'Document storage behind the Node and Express services.',
      },
      { name: 'SQL', icon: 'table', desc: 'Relational schemas and queries for structured data.' },
      {
        name: 'Firebase',
        brand: 'firebase',
        desc: 'Cloud Messaging for push, plus the wider SDK for app-side services.',
      },
      {
        name: 'Firestore',
        brand: 'firebase',
        desc: 'Realtime document store — in-app chat on the driver application.',
      },
      {
        name: 'Cloudinary',
        brand: 'cloudinary',
        desc: 'Media upload and delivery for the image-heavy admin panels.',
      },
    ],
  },
  {
    id: 'platform',
    title: 'Platform, Build & Release',
    icon: 'rocket',
    accent: 'amber',
    blurb:
      'Turning a branch into a signed build on a store listing — the native toolchains, the dependency managers and the review workflow around them.',
    skills: [
      { name: 'Xcode', brand: 'xcode', desc: 'iOS builds, debugging and on-device profiling.' },
      { name: 'Android Studio', brand: 'androidstudio', desc: 'Android builds, debugging and profiling.' },
      { name: 'Gradle', brand: 'gradle', desc: 'Android build configuration and dependency resolution.' },
      { name: 'CocoaPods', brand: 'cocoapods', desc: 'iOS dependency management and native module linking.' },
      { name: 'Google Play', brand: 'googleplay', desc: 'Release builds, versioning and store submission for Android.' },
      { name: 'App Store', brand: 'appstore', desc: 'Release builds, versioning and store submission for iOS.' },
      {
        name: 'Git',
        brand: 'git',
        level: 'Core',
        desc: 'Branching and version control across every project here.',
      },
      { name: 'GitHub', brand: 'github', desc: 'Pull requests and code review.' },
      { name: 'Bitbucket', brand: 'bitbucket', desc: 'Repository hosting and pull requests on client projects.' },
      { name: 'Figma', brand: 'figma', desc: 'Design hand-off and pixel-accurate implementation.' },
      {
        name: 'AI-assisted dev',
        icon: 'sparkles',
        desc: 'ChatGPT, Claude, GitHub Copilot and Cursor for faster debugging and review.',
      },
    ],
  },
]

/** Marquee row for the hero — flattened technology names, full-stack order. */
export const techMarquee = [
  'React.js',
  'React Native',
  'Node.js',
  'Express.js',
  'MongoDB',
  'SQL',
  'REST APIs',
  'Redux Toolkit',
  'JavaScript',
  'TypeScript',
  'Firebase',
  'Firestore',
  'Socket.IO',
  'Google Maps',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'Android',
  'iOS',
  'Xcode',
  'Android Studio',
  'Gradle',
  'CocoaPods',
  'Git',
  'GitHub',
  'Bitbucket',
  'Figma',
]
