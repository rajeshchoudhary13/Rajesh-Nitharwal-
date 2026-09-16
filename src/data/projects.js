/**
 * PROJECTS
 *
 * Source of truth for the five live production applications supported at
 * Emizen Tech Pvt. Ltd.
 *
 * Two levels of detail are used deliberately:
 *  - Four apps (EVClass Driver, Samriddhi Finance, PI Entrepreneur, TankToppa)
 *    are described from Rajesh's own application-flow documentation, so their
 *    `spec`, `flow`, `deepDive` and `tech` values are concrete. Framework version
 *    numbers are deliberately left out — they date the work and say nothing
 *    about it.
 *  - Punjab Radio has no flow document yet, so it stays at the resume-level
 *    description. Nothing is invented to make it match the others.
 *
 * Field contract (every consumer treats the optional ones as optional):
 *   spec      – key/value stack facts rendered as a meta grid
 *   highlight – one-line "hardest part" shown on the card
 *   flow      – ordered end-to-end runtime flow, one step per entry
 *   deepDive  – { title, intro, points[], reliability? } engineering callout
 *
 * `links` is intentionally empty for every client project: no public store
 * listing or repository is published, so none is shown.
 */
const CLIENT_SCOPE = [
  'Delivered React Native features for the app on both Android and iOS.',
  'Diagnosed and resolved UI and functional bugs to improve stability and user experience.',
  'Integrated REST APIs for core functionality with reliable client–backend data flow.',
  'Worked with backend engineers, QA and designers to ship releases on schedule.',
]

const CLIENT_NOTE =
  'Client project delivered at Emizen Tech Pvt. Ltd. Public store and repository links are not published, so none are shown here.'

const CLIENT_TECH = ['React Native', 'JavaScript', 'REST APIs', 'Android', 'iOS']

export const projects = [
  {
    id: 'evclass-driver',
    name: 'EVClass Driver',
    domain: 'Ride-hailing / mobility',
    tagline: 'Driver-side app for an electric-vehicle ride-hailing platform.',
    highlight: 'Road-snapped live tracking animated at 60 fps',
    description:
      'A driver opens one map-centred screen to go on duty, receive dispatch offers, navigate a live route, complete the ride and collect payment. The dispatch backend sees the vehicle position the whole time, closing the loop between rider requests, driver location and ride/fare state.',
    role: 'React Native Developer',
    platform: 'Android & iOS',
    company: 'Emizen Tech Pvt. Ltd.',
    period: 'Jul 2025 – Present',
    icon: 'car',
    accent: 'cyan',
    type: 'mobile',
    featured: true,
    spec: [
      { label: 'Real-time', value: 'Socket.IO' },
      { label: 'State', value: 'Redux Toolkit' },
      { label: 'Maps', value: 'Google Maps SDK' },
      { label: 'Native', value: 'Kotlin / Swift' },
    ],
    contributions: [
      'Built the live-tracking layer: GPS fixes are projected onto the active route polyline and heading is taken from the road segment instead of noisy GPS heading.',
      'Implemented route trimming and a 60 fps marker animation from two cooperating animators, so the car moves smoothly between 3-second location polls.',
      'Wired 12 Socket.IO handlers through callback refs so dispatch, proximity and payment events never act on stale state.',
      'Rebuilt ride state from the server on every foreground transition, so a force-quit mid-ride costs a round trip rather than the ride.',
      'Added a native Kotlin FCM service that delivers exactly one push per message in every app state.',
    ],
    flow: [
      'App launch: splash reads the stored auth token and re-hydrates the API client.',
      'Session resolve: the profile is fetched silently and profile-completeness flags decide the landing screen.',
      'Authentication: phone number → OTP request → OTP verify → bearer token issued and persisted.',
      'Onboarding: profile setup with address autocomplete → vehicle registration → document upload → verification-pending gate.',
      'Home / live map: location permission requested, precise location enforced, first GPS fix animates the map into place.',
      'Go on duty: verification status is re-checked; on approval the socket connects and a 3-second location loop starts.',
      'Telemetry: each GPS fix is snapped to the road and emitted with heading, speed and accuracy over the socket.',
      'Ride offer: a socket event raises a global popup with sound and vibration from any screen; 40 seconds to respond or it auto-rejects.',
      'Accept: acceptance is emitted, the server returns the full ride and rider detail, and the route is drawn and trimmed live.',
      'Pickup → in progress: server proximity events (arriving → arrived) unlock the start-ride action and render the dropoff route.',
      'Complete: dropoff coordinates are posted and the server returns the fare breakdown for the bill screen.',
      'Payment & close-out: a payment-success socket event clears ride state, the driver rates the rider, and the ride lands in earnings and history.',
    ],
    deepDive: {
      title: 'Live tracking',
      intro:
        'Raw GPS drifts off the road and only arrives every few seconds, which makes a naive map look broken. The tracking layer solves this with hand-written geometry and animation.',
      points: [
        'Road snapping: each fix is projected onto the route polyline with cosine-corrected coordinates, and heading comes from the road segment rather than the GPS heading.',
        'Knowing when not to snap: fixes more than ~55 m off-route are rejected and raw GPS is used, so a driver on a detour is not dragged back onto a road they left.',
        'Route trimming: the drawn polyline keeps only the road still ahead, so the route visibly consumes itself as the driver progresses.',
        '60 fps marker animation: two cooperating animators — one interpolating between 3-second polls, one walking server geometry — move the car with shortest-arc rotation.',
      ],
      reliability:
        'Out-of-order route updates are dropped with per-ride version checks, socket handlers use callback refs to avoid stale state, and ride state is rebuilt from the server on every foreground transition.',
    },
    tech: [
      'React Native',
      'TypeScript',
      'Redux Toolkit',
      'Socket.IO',
      'react-native-maps',
      'Google Places',
      'Firebase (FCM, Firestore)',
      'Notifee',
      'React Navigation',
      'Kotlin',
      'Swift',
    ],
    integrations: ['Socket.IO dispatch events', 'Google Maps & Places', 'Firebase Cloud Messaging', 'Firestore chat', 'REST API'],
    note: CLIENT_NOTE,
    links: [],
  },
  {
    id: 'samriddhi-finance',
    name: 'Samriddhi Finance',
    domain: 'Fintech / lending',
    tagline: 'Loan and EMI customer app with native background location tracking.',
    highlight: 'Native Android tracking that survives app-kill and reboot',
    description:
      'A customer-facing app for loan borrowers — customer, co-borrower or guarantor — to view their loan portfolio, KYC checklist status and EMI schedule with full payment history. Loan data is read-only; a separate background module streams location and emergency contacts to the admin backend for the lender’s collection workflow.',
    role: 'React Native Developer',
    platform: 'Android & iOS',
    company: 'Emizen Tech Pvt. Ltd.',
    period: 'Jul 2025 – Present',
    icon: 'wallet',
    accent: 'emerald',
    type: 'mobile',
    featured: true,
    spec: [
      { label: 'Native', value: 'Android (Java)' },
      { label: 'Location', value: 'FusedLocationProvider' },
      { label: 'State', value: 'Redux Toolkit' },
      { label: 'Backend', value: 'REST (Laravel admin)' },
    ],
    contributions: [
      'Wrote a custom Android native module (Java) bridging saveUserId, startLocationWork and startForegroundService to JavaScript.',
      'Built a sticky foreground service that fetches location via FusedLocationProvider and posts JSON over native HTTP, independent of the JS runtime.',
      'Added a 15-minute WorkManager periodic task and a BootReceiver so tracking survives OS kills and device reboots.',
      'Implemented the two-step permission flow — fine location, contacts and notifications, then background location — behind a first-run consent modal.',
      'Built the loan and EMI screens with pagination, infinite scroll and Pending → Partial → Paid ordering, plus multipart profile-photo upload.',
    ],
    flow: [
      'Splash: a local splash renders first, then auth restore decides logged-in versus login.',
      'Login: email or 10-digit mobile with password and a user-type selector (customer / co-borrower / guarantor); forgot-password runs an OTP → reset flow.',
      'Auth persist: the bearer token is saved to AsyncStorage and mirrored into native storage for the background service to use later.',
      'Home / dashboard: loan summary cards, pending-EMI count, profile photo, and orchestration of location and contacts collection.',
      'Consent & permissions: a permission modal appears on first landing, then fine location, contacts and notifications are requested before background location.',
      'Location streaming: the app begins sending location to the server roughly every 10 seconds.',
      'Loan & EMI: loans resolve an active loan ID and the EMI schedule is fetched with pagination and infinite scroll, re-sorted Pending → Partial → Paid.',
      'KYC & profile: KYC checklist items render with status; the profile photo is captured with the camera and uploaded as multipart.',
      'CMS pages: Privacy Policy, T&C and About render from server HTML in a WebView, so content changes without an app release.',
      'Logout: the token is cleared locally and the native location mechanisms are stopped.',
    ],
    deepDive: {
      title: 'Background location (native Android)',
      intro:
        'JavaScript timers stop when the app process is terminated, so the collection feature was built natively on Android to keep reporting after the app is killed or swiped away.',
      points: [
        'Sticky foreground service (Java): START_STICKY plus onTaskRemoved and onDestroy restart logic, using FusedLocationProvider and posting JSON over native HTTP.',
        'WorkManager periodic task: a 15-minute fallback that keeps running even when the OS stops the service.',
        'BootReceiver: re-schedules tracking after a device reboot, reading the stored user ID and token from native SharedPreferences.',
        'Custom native module and JS bridge: JavaScript controls the native trackers and passes the auth token down so posting continues after the JS runtime is gone.',
      ],
      reliability:
        'On iOS, background location is OS-throttled and cannot match this cadence — the survives-kill behaviour is Android-specific and documented as such.',
    },
    tech: [
      'React Native',
      'TypeScript',
      'Redux Toolkit',
      'React Navigation',
      'Axios interceptors',
      'AsyncStorage',
      'Java native modules',
      'WorkManager',
      'FusedLocationProvider',
      'react-native-contacts',
      'react-native-webview',
    ],
    integrations: ['REST API (Laravel admin)', 'Native location service', 'Device contacts', 'WebView CMS pages'],
    note: CLIENT_NOTE,
    links: [],
  },
  {
    id: 'pit',
    name: 'PI Entrepreneur (PIT)',
    domain: 'EdTech / training',
    tagline: 'Bilingual, team-based entrepreneurship training platform.',
    highlight: 'Nine-module engine driven by shared renderers, EN/FR',
    description:
      'A structured entrepreneurship training course delivered as a mobile app. Users form or join teams, progress through nine training modules, submit answers to case studies and exercises, publish work to team boards and exchange peer feedback — with progress tracking and gamification throughout.',
    role: 'React Native Developer',
    platform: 'Android & iOS',
    company: 'Emizen Tech Pvt. Ltd.',
    period: 'Jul 2025 – Present',
    icon: 'blocks',
    accent: 'blue',
    type: 'mobile',
    featured: true,
    spec: [
      { label: 'Language', value: 'EN / FR (i18next)' },
      { label: 'State', value: 'Redux + redux-persist' },
      { label: 'Push', value: 'FCM + Notifee' },
      { label: 'Content', value: 'WebView CMS' },
    ],
    contributions: [
      'Built the module engine: nine near-identical lecture → exercise → publication-board → feedback flows rendered from one shared question renderer.',
      'Implemented the CommonRender variants — simple, checkbox, row/column, rating, feedback and home-plan question types.',
      'Delivered a full EN/FR localization layer of roughly 1,100 translation keys per language.',
      'Handled push notifications across foreground, background and killed states on both platforms with FCM and Notifee.',
      'Wired the data layer: thunk actions call a single API facade, reducers update the store, and the bearer token is re-injected on every cold start.',
    ],
    flow: [
      'Splash & language: the user picks English or French, sees a welcome slider, and the splash decides logged-in versus onboarding.',
      'Auth: register → OTP verify → login, plus OTP forgot-password; the bearer token is stored and re-injected on every cold start.',
      'Team formation: the user creates a team or joins one by search, share-link or AI-assisted join, and the team starts its journey.',
      'Module engine (1–9): lecture screens → case study and/or exercise → a publication board where a member’s answers become visible to the team → give, list, update and delete feedback on others’ submissions.',
      'Take-home plan: a questionnaire is filled in and persisted per user.',
      'Progress & gamification: module status is tracked per user and per team member, visualised as a mountain climb, with points and points history.',
      'Team collaboration: a pin board (questions, cheering and free-space sections with comments), polls, activity and message feeds, notifications, and an AI chat screen.',
      'Account & CMS: profile view/edit with image upload and signature capture, surveys and feedback, WebView Privacy Policy / T&C / Team Rules, and account deletion.',
    ],
    deepDive: {
      title: 'Module engine & data layer',
      intro:
        'Nine modules would be nine near-duplicate feature trees if each were built by hand, so the questions all render through one shared engine over a single API facade.',
      points: [
        'Screens dispatch Redux thunks → an API facade (one fetch-wrapper class) calls the backend → reducers update the store → screens re-render from selectors.',
        'A shared CommonRender engine covers simple, checkbox, row/column, rating, feedback and home-plan question variants across all nine modules.',
        'Authentication lives both in memory and in AsyncStorage, and the token is re-injected into the API client on every cold start.',
        'The bilingual layer carries roughly 1,100 translation keys per language, so EN and FR stay in step as modules change.',
      ],
    },
    tech: [
      'React Native',
      'Redux + redux-thunk',
      'redux-persist',
      'React Navigation',
      'i18next',
      'Firebase Cloud Messaging',
      'Notifee',
      'react-native-signature-canvas',
      'react-native-image-crop-picker',
      'react-native-webview',
    ],
    integrations: ['REST API', 'Firebase Cloud Messaging', 'Notifee', 'WebView CMS pages'],
    note: CLIENT_NOTE,
    links: [],
  },
  {
    id: 'tank-topa',
    name: 'TankToppa',
    domain: 'Travel / utility',
    tagline: 'Fuel-stop optimizer and trip planner.',
    highlight: 'Login-free trips: server cache split from client trip state',
    description:
      'A trip planner that suggests the most economical fuel stop along a route. The user enters a destination and vehicle details — tank size, efficiency, fuel type, current level — and the app surfaces the best station with pricing, savings and detour trade-offs, then guides them there on a live map. There is no login; an anonymous session ID is created on first launch.',
    role: 'React Native Developer',
    platform: 'Android & iOS',
    company: 'Emizen Tech Pvt. Ltd.',
    period: 'Jul 2025 – Present',
    icon: 'fuel',
    accent: 'amber',
    type: 'mobile',
    featured: true,
    spec: [
      { label: 'Client state', value: 'Zustand' },
      { label: 'Server state', value: 'TanStack Query' },
      { label: 'Maps', value: 'Google Maps & Places' },
      { label: 'Auth', value: 'Anonymous session' },
    ],
    contributions: [
      'Implemented the login-free session model: a client-generated UUID persisted in AsyncStorage and sent with every trip API so the server can attribute trips and savings to the device.',
      'Separated server state from client state — TanStack Query for caching and polling, Zustand for the cross-screen trip store.',
      'Built the map rendering: decoded polylines, origin/destination markers, fit-to-bounds and a live-position watcher.',
      'Wired route planning from live GPS and Google Places autocomplete into the backend route and optimize endpoints.',
      'Added offline and poor-connection handling, plus month-to-date savings on the entry screen.',
    ],
    flow: [
      'Splash: a fixed 3-second splash during which an anonymous session ID is created or restored — there is no login screen.',
      'Where To: FROM is live GPS, TO comes from Google Places autocomplete; Find Route calls the backend, which returns a polyline, bounds, distance and duration saved to the store.',
      'Home: the route is drawn on Google Maps from the decoded polyline with origin and destination markers; Continue opens the vehicle form.',
      'Vehicle details: vehicle type, tank size, efficiency, fuel type (API-driven list) and current fuel level (a percentage slider) are sent to the optimize endpoint.',
      'Best stop: the backend returns candidate stations with the best stop highlighted, shown on a map plus a bottom sheet of station cards.',
      'Station details: tapping a station fetches pricing, savings, why-this-stop reasons, quick stats, price comparison, amenities and contact.',
      'Destination: selecting a station fetches the origin → station route with polyline, distance and ETA.',
      'Navigation map: a final map view fits the route to bounds and watches the user’s live position.',
    ],
    deepDive: {
      title: 'State & caching model',
      intro:
        'All the business logic — best-stop scoring, savings and pricing — lives in the backend; the app only renders it. The interesting work is keeping server and client state cleanly separated.',
      points: [
        'TanStack Query owns server state: fuel-type lists cached for 24 hours, live fuel-data status polled every 5 minutes.',
        'A Zustand store owns cross-screen trip state — route, session ID and optimization result.',
        'The anonymous session ID is a client-generated UUID persisted in AsyncStorage and sent on every trip API call.',
        'Map work is done client-side: decoded polylines, fit-to-bounds framing and a live-position watcher during navigation.',
      ],
      reliability: 'Offline and poor-connection states are handled explicitly, and month-to-date savings render on the entry screen.',
    },
    tech: [
      'React Native',
      'TypeScript',
      'Zustand',
      'TanStack Query',
      'React Navigation',
      'Axios',
      'Google Maps SDK',
      'Google Places API',
      'react-native-config',
    ],
    integrations: ['Backend route & optimize APIs', 'Google Maps & Places', 'Geolocation'],
    note: CLIENT_NOTE,
    links: [],
  },
  {
    id: 'punjab-radio',
    name: 'Punjab Radio',
    domain: 'Streaming',
    tagline: 'Audio streaming application for Android and iOS.',
    description:
      'Punjab Radio is a live audio streaming application in the set of production apps supported at Emizen Tech, delivered across both mobile platforms with React Native.',
    role: 'React Native Developer',
    platform: 'Android & iOS',
    company: 'Emizen Tech Pvt. Ltd.',
    period: 'Jul 2025 – Present',
    icon: 'radio',
    accent: 'violet',
    type: 'mobile',
    featured: true,
    contributions: CLIENT_SCOPE,
    tech: CLIENT_TECH,
    integrations: ['REST API integration'],
    note: CLIENT_NOTE,
    links: [],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const mobileProjects = projects.filter((p) => p.type === 'mobile')

/**
 * WEB DEVELOPMENT WORK
 *
 * The resume does not name individual web products, so these entries describe
 * the web work it does state, attributed to the role it was performed in.
 * They are deliberately framed as work areas rather than invented product names.
 */
export const webWork = [
  {
    id: 'responsive-ui',
    name: 'Responsive UI Development',
    source: 'Mtoag Technology Pvt. Ltd.',
    period: 'Sep 2024 – Mar 2025',
    icon: 'monitor',
    accent: 'violet',
    summary:
      'Developed responsive user interfaces using React, React Native, Bootstrap, HTML and CSS, ensuring consistent UX across screen sizes.',
    highlights: [
      'Consistent layouts from small mobile widths up to desktop',
      'Component-driven markup with reusable styling',
      'Cross-browser compatibility verified across targets',
    ],
    tech: ['React', 'Bootstrap', 'HTML', 'CSS'],
  },
  {
    id: 'frontend-performance',
    name: 'Frontend Debugging & Performance',
    source: 'Mtoag Technology Pvt. Ltd.',
    period: 'Sep 2024 – Mar 2025',
    icon: 'gauge',
    accent: 'cyan',
    summary:
      'Identified and fixed frontend bugs, optimized rendering performance and ensured cross-browser compatibility.',
    highlights: [
      'Rendering performance improvements on existing interfaces',
      'Defect diagnosis and resolution in live frontends',
      'Version control with Git and GitHub',
    ],
    tech: ['React', 'JavaScript', 'CSS', 'Git', 'GitHub'],
  },
  {
    id: 'backend-basics',
    name: 'Backend Support Tasks',
    source: 'Mtoag Technology Pvt. Ltd.',
    period: 'Sep 2024 – Mar 2025',
    icon: 'server',
    accent: 'emerald',
    summary:
      'Applied working knowledge of Node.js, Express.js and MongoDB for basic backend tasks, and maintained WordPress plugins, themes and blog content.',
    highlights: [
      'Basic API and data tasks with Node.js and Express.js',
      'Document data handling with MongoDB',
      'WordPress plugin, theme and content maintenance',
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'WordPress'],
  },
  {
    id: 'web-foundations',
    name: 'Web Application Foundations',
    source: 'Vh Technology',
    period: 'Apr 2024 – Jul 2024',
    icon: 'braces',
    accent: 'amber',
    summary:
      'Built foundational skills in modern HTML/CSS, React.js, ASP.NET and JavaScript through hands-on project work, including core security practices and session management concepts.',
    highlights: [
      'Hands-on project work across HTML, CSS and JavaScript',
      'Introduction to React.js component patterns',
      'Core concepts: security practices and session management',
    ],
    tech: ['HTML', 'CSS', 'React.js', 'ASP.NET', 'JavaScript'],
  },
]

/* ==========================================================================
   FILTER TAGS
   Drive the projects-grid filter row. A project may carry several tags; the
   "all" pill is implicit and never stored on a project.
   ========================================================================== */
export const PROJECT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'react', label: 'React' },
  { id: 'react-native', label: 'React Native' },
  { id: 'uiux', label: 'UI/UX' },
]

/* --------------------------------------------------------------------------
   The five production apps above are all React Native on Android and iOS, so
   they share one tag set. Applied here rather than edited into each object, so
   the project literals stay exactly as they were written.
   -------------------------------------------------------------------------- */
const MOBILE_TAGS = ['mobile', 'react-native', 'react']

/* ==========================================================================
   EARLIER WEB & UI WORK
   Carried over from the previous portfolio at
   rajeshchoudhary13.github.io/rajesh.github.io/portfolio.html — names, images,
   descriptions, categories, dates and technology lists come from that site's
   project cards and their detail pages. Nothing here is invented.

   Two provenance notes kept deliberately visible:

   1. `SHARED_STACK` is reproduced verbatim from the source, where the *same*
      fifteen-item list appears on the pcatalog, starlanerecruitment and
      pet-tag detail pages. It reads as that site's global skills list dropped
      into a template slot rather than a per-project stack, so it is named as a
      shared list here instead of being presented as three separate findings.

   2. `link` is present only where the URL was verified to resolve over HTTPS
      with a valid certificate. Three source URLs did not:
        - curryhouse.orbitnapp.com    serves an Apache default page; its
                                      certificate is issued to an unrelated host
        - pcatalog.orbitnapp.com      resolves, nothing served
        - starlanerecruitment.co.uk   certificate is a parked *.one.com wildcard
      Those keep their project entry and lose only the link button, so no
      visitor is sent to a browser security warning.
   ========================================================================== */
const SHARED_STACK = [
  'React.js',
  'JavaScript',
  'HTML',
  'CSS',
  'Bootstrap',
  'Tailwind CSS',
  'TypeScript',
  'Redux',
  'Node.js',
  'Express.js',
  'MongoDB',
  'REST APIs',
  'Git',
  'GitHub',
  'Figma',
]

const MERN_STACK = [
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Tailwind CSS',
  'JavaScript',
  'Bootstrap',
  'Cloudinary',
  'JWT',
  'bcrypt',
]

export const webProjects = [
  {
    id: 'curryhouse',
    kind: 'web',
    name: 'CurryHouse',
    domain: 'Admin dashboard / CMS',
    tagline: 'Admin dashboard and CMS for a street-food brand.',
    highlight: 'Role-based admin: products, orders, payments and reporting',
    description:
      'A content-managed admin dashboard for a street-food business. The panel covers catalogue management, media, the order and payment lifecycle, user administration with roles and permissions, and sales reporting.',
    image: '/media/projects/curryhouse.jpg',
    imageAlt: 'CurryHouse admin dashboard interface',
    period: '01 February, 2025',
    icon: 'server',
    accent: 'blue',
    tags: ['fullstack', 'web'],
    /* The source lists these five capability areas for the panel. */
    contributions: [
      'Add, update, delete products, set prices, and manage categories.',
      'Upload product images, banners, and promotional graphics.',
      'View, track, and update order status, manage payments, and refunds.',
      'Add, edit, or delete users, assign roles (admin, seller, customer), and handle permissions.',
      'View sales reports, product performance, and customer insights.',
    ],
    /* The detail page states a category and date but no technology list, so
       none is shown rather than one being assumed from the screenshot. */
    tech: [],
    techNote: 'Stack not published on the source project page.',
    linkNote: 'The original deployment no longer serves the application.',
    links: [],
  },
  {
    id: 'e-sign',
    kind: 'web',
    name: 'E-Sign',
    domain: 'Document workflow',
    tagline: 'Design, collaborate, approve and sign documents.',
    highlight: 'Admin dashboard on React, Node, MongoDB and Tailwind',
    description:
      'A document signing and approval tool — "design, collaborate, approve and sign all your documents with blazing speed". Built around a full admin dashboard, with media handling through Cloudinary and token-based auth using JWT and bcrypt.',
    image: '/media/projects/e-sign.jpg',
    imageAlt: 'E-Sign document workflow interface',
    period: '01 February, 2025',
    icon: 'file-code',
    accent: 'violet',
    tags: ['fullstack', 'web', 'react'],
    tech: MERN_STACK,
    linkNote: 'The source page lists only template placeholder URLs, so no link is shown.',
    links: [],
  },
  {
    id: 'pet-tag',
    kind: 'web',
    name: 'Pet Tag',
    domain: 'Pet identification',
    tagline: 'Pet tag registration to keep a pet identifiable.',
    highlight: 'Owner registration keyed to a scannable tag ID',
    description:
      'A registration flow for pet identification tags. An owner sets up a tag, fills in the pet name, breed and their own contact details, and uploads a photo to personalise the tag. Each tag carries its own ID, so a found pet resolves to its owner record.',
    image: '/media/projects/pet-tag.jpg',
    imageAlt: 'Pet Tag owner registration screen',
    period: '01 March, 2020',
    icon: 'blocks',
    accent: 'emerald',
    tags: ['web', 'react'],
    contributions: [
      "Set up a new pet tag to keep your furry friend safe and identifiable.",
      "Fill in your pet's name, breed, and your contact details.",
      'Upload a cute photo to personalize the tag even more!',
    ],
    tech: SHARED_STACK,
    techNote: 'Stack as listed on the source project page.',
    links: [
      {
        label: 'Live site',
        href: 'https://pet-tag-dog.orbitnapp.com/register-owner?tag_id=72b32a1f754ba1c09b3695e0cb6cde7f',
      },
    ],
  },
  {
    id: 'starlane',
    kind: 'web',
    name: 'Starlane Recruitment',
    domain: 'Recruitment / frontend',
    tagline: 'Recruitment agency site covering temporary and permanent roles.',
    highlight: 'Client-facing marketing site for a UK recruitment agency',
    description:
      'A frontend build for a UK-wide recruitment agency specialising in both temporary and permanent placements — "we aim to lead the way in creating innovative and inclusive workforce solutions for our clients, candidates, staff, and myself."',
    image: '/media/projects/starlane.jpg',
    imageAlt: 'Starlane Recruitment website',
    period: '01 March, 2024',
    icon: 'monitor',
    accent: 'cyan',
    tags: ['web', 'react'],
    tech: SHARED_STACK,
    techNote: 'Stack as listed on the source project page.',
    linkNote: 'The domain currently answers with a parked certificate, so no link is shown.',
    links: [],
  },
  {
    id: 'pcatalog',
    kind: 'web',
    name: 'PCatalog',
    domain: 'Product catalogue',
    tagline: 'Responsive product catalogue interface.',
    description:
      'A product catalogue frontend, built as a responsive interface over structured HTML with Bootstrap component patterns for layout and responsiveness.',
    image: '/media/projects/pcatalog.jpg',
    imageAlt: 'PCatalog product catalogue interface',
    period: '01 March, 2024',
    icon: 'blocks',
    accent: 'amber',
    tags: ['web', 'react'],
    tech: SHARED_STACK,
    techNote: 'Stack as listed on the source project page.',
    linkNote: 'The original deployment no longer serves the application.',
    links: [],
  },
  {
    id: 'taaj-hotel',
    kind: 'web',
    name: 'Taaj Hotel',
    domain: 'Hospitality / clone build',
    tagline: 'Hotel booking website build.',
    highlight: 'Hotel site frontend with an admin dashboard behind it',
    description:
      'A hotel website build reproducing a hospitality booking layout, with an admin dashboard behind the public site for content and media management.',
    image: '/media/projects/taaj-hotel.jpg',
    imageAlt: 'Taaj hotel website',
    period: '01 February, 2025',
    icon: 'monitor',
    accent: 'violet',
    tags: ['fullstack', 'web', 'react'],
    tech: MERN_STACK,
    linkNote: 'The source page lists only template placeholder URLs, so no link is shown.',
    links: [],
  },
  {
    id: 'portfolio-site',
    kind: 'web',
    name: 'Portfolio Website',
    domain: 'Personal site',
    tagline: 'Personal portfolio showcasing skills, experience and projects.',
    description:
      'The previous personal portfolio — "a personal website where you showcase your skills, experience, projects, and achievements." It is the site this portfolio grew out of, and the source for the web and UI work listed here.',
    image: '/media/projects/portfolio-site.jpg',
    imageAlt: 'Previous personal portfolio website',
    period: '01 February, 2025',
    icon: 'braces',
    accent: 'blue',
    tags: ['web', 'react'],
    tech: MERN_STACK,
    links: [
      { label: 'Visit site', href: 'https://rajeshchoudhary13.github.io/rajesh.github.io/portfolio.html' },
    ],
  },
  {
    id: 'mobile-app-ui',
    kind: 'ui',
    name: 'Mobile App UI',
    domain: 'UI / visual design',
    tagline: 'Mobile application interface design.',
    description:
      'A mobile app interface design carried over from the previous portfolio, where it was the App-category entry. The source page carried no written description for it, so none is reproduced here and none has been written in its place — the screen itself is the work.',
    image: '/media/projects/mobile-app-ui.png',
    imageAlt: 'Mobile app user interface design',
    /* Portrait phone screenshot rather than a landscape browser capture. */
    portrait: true,
    icon: 'smartphone',
    accent: 'cyan',
    tags: ['uiux', 'mobile'],
    tech: [],
    techNote: 'No stack or description was published for this entry.',
    links: [],
  },
]

/* --------------------------------------------------------------------------
   The grid's data source: the five production apps first, then earlier web and
   UI work. Mobile metadata is layered on here so the objects above stay as
   originally authored.
   -------------------------------------------------------------------------- */
export const allProjects = [
  ...projects.map((p) => ({ kind: 'mobile', tags: MOBILE_TAGS, ...p })),
  ...webProjects,
]

/** Only the filters that actually match something are worth rendering. */
export const activeFilters = PROJECT_FILTERS.filter(
  (f) => f.id === 'all' || allProjects.some((p) => p.tags?.includes(f.id)),
)

export const countFor = (filterId) =>
  filterId === 'all' ? allProjects.length : allProjects.filter((p) => p.tags?.includes(filterId)).length

/* ==========================================================================
   READING & REFERENCES
   The previous portfolio carried a "Books" filter alongside its projects.
   These are books, not project work, so they are kept out of the projects grid
   and shown in their own strip instead — nothing is dropped, but a recruiter
   scanning the work grid never meets a book cover in it.
   ========================================================================== */
export const reading = [
  {
    id: 'good-parts',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    note: "A classic book highlighting JavaScript's best features.",
    image: '/media/projects/book-good-parts.jpg',
    topic: 'JavaScript',
  },
  {
    id: 'mern',
    title: 'Full Stack React Projects',
    author: 'MERN stack',
    note: 'MongoDB, Express.js, React and Node.js, end to end.',
    image: '/media/projects/book-mern.jpg',
    topic: 'Full Stack',
  },
  {
    id: 'lagom',
    title: 'Lagom',
    author: 'The Swedish Art of Balanced Living',
    note: 'Read outside the stack — balance, and the case for enough.',
    image: '/media/projects/book-lagom.jpg',
    topic: 'Non-technical',
  },
]
