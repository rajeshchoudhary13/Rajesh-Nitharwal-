/**
 * HOW I WORK — the seven steps of an engagement.
 *
 * Written from the client's side of the table: each step says what happens,
 * what they get out of it, and what it costs them in involvement. The last
 * point matters — "how much of my time will this take?" is the question behind
 * most process sections.
 */
export const processSteps = [
  {
    step: '01',
    id: 'understand',
    title: 'Understand',
    icon: 'search',
    desc: 'We talk about the business before the build — who uses this, what problem it removes, and what "done" looks like.',
    output: 'A written scope you can read and correct',
    involvement: 'One call, plus answering questions',
    accent: 'cyan',
  },
  {
    step: '02',
    id: 'plan',
    title: 'Plan',
    icon: 'map',
    desc: 'Features are prioritised, the architecture and stack are chosen, and the work is broken into a delivery roadmap.',
    output: 'Feature list, stack decision, timeline',
    involvement: 'Approve the plan',
    accent: 'blue',
  },
  {
    step: '03',
    id: 'design',
    title: 'Design',
    icon: 'pen-tool',
    desc: 'Screens and flows are designed — or your existing designs are reviewed — so the interface is agreed before code.',
    output: 'Screen designs and navigation flow',
    involvement: 'One review round',
    accent: 'violet',
  },
  {
    step: '04',
    id: 'develop',
    title: 'Develop',
    icon: 'code',
    desc: 'The application is built in working slices, with clean, reusable code and a state model that survives new features.',
    output: 'Working builds you can open, weekly',
    involvement: 'Weekly update, try the build',
    accent: 'blue',
  },
  {
    step: '05',
    id: 'test',
    title: 'Test',
    icon: 'flask',
    desc: 'Functionality, responsiveness, performance and the awkward edge cases are tested on real Android and iOS devices.',
    output: 'Tested build plus a known-issues list',
    involvement: 'Try it, report what feels wrong',
    accent: 'amber',
  },
  {
    step: '06',
    id: 'launch',
    title: 'Launch',
    icon: 'rocket',
    desc: 'Production builds are prepared, signed and submitted — Play Store, App Store or your own hosting.',
    output: 'A live app or deployed application',
    involvement: 'Store account access, approvals',
    accent: 'emerald',
  },
  {
    step: '07',
    id: 'support',
    title: 'Support',
    icon: 'life-buoy',
    desc: 'After launch I stay reachable for fixes, OS-change updates, performance work and the next version.',
    output: 'Ongoing fixes and version updates',
    involvement: 'Tell me what you need next',
    accent: 'cyan',
  },
]
