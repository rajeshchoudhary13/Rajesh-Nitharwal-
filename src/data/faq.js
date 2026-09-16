/**
 * FAQ — the seven questions that actually arrive by email before a call.
 *
 * Two rules held deliberately:
 *  1. No price is quoted. Cost depends on scope, so the answer explains what
 *     drives it and routes to a conversation. Nothing here is a commitment.
 *  2. No timeline is promised as a guarantee. Ranges are described as typical,
 *     because that is what they are.
 */
export const faqs = [
  {
    id: 'cost',
    q: 'How much does a project cost?',
    a: 'It depends on scope, and any number given before we have talked would be guesswork. What drives the cost is the number of screens, whether you need one platform or both, how much backend and admin work sits behind the app, and which third-party services have to be integrated. Send a short description of what you want built and I will come back with a scope and a figure for that scope — not a generic rate card.',
  },
  {
    id: 'timeline',
    q: 'How long does development take?',
    a: 'A focused MVP is typically several weeks; a full application with an admin panel and multiple integrations is typically a few months. The honest answer is that the timeline follows the feature list, so the first thing I do is write the feature list down. You will get a milestone plan with the estimate, and an early warning if anything is going to move.',
  },
  {
    id: 'platforms',
    q: 'Can you build both Android and iOS apps?',
    a: 'Yes — that is the normal case. Apps are built in React Native from a single codebase and released to both Google Play and the App Store, so a feature lands on both platforms together. Where a platform needs genuinely native code, I write the native Android or iOS module rather than dropping the feature.',
  },
  {
    id: 'existing',
    q: 'Can you work with an existing project?',
    a: 'Yes, and it is a common ask. I start with a review of the codebase and the issue list, then come back with what is worth fixing, what is worth rewriting and what is fine as it is. Bug fixing, performance work, redesigns and new features on an inherited codebase are all part of the work I do.',
  },
  {
    id: 'apis',
    q: 'Can you integrate third-party APIs?',
    a: 'Yes. REST APIs, Firebase (authentication, Firestore, cloud messaging), Google Maps and Places, payment providers, push notifications and real-time Socket.IO events are all integrations I have built into production apps. If you have an existing backend or a specific provider in mind, the app will be wired to it.',
  },
  {
    id: 'support',
    q: 'Do you provide post-launch support?',
    a: 'Yes. Launch is not the end of the engagement — crash reports, OS updates that change a permission rule, and performance issues that only appear at real user volume all arrive afterwards. Support can be arranged per fix or as ongoing monthly capacity, whichever suits how much change your product expects.',
  },
  {
    id: 'publish',
    q: 'Can you help publish the application?',
    a: 'Yes. I prepare the signed release builds and handle Google Play and App Store submission — signing keys, provisioning, privacy declarations, screenshots and responses to review feedback. The store accounts stay in your name and under your control; I work inside them.',
  },
]
