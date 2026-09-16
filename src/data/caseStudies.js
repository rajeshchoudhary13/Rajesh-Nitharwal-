/**
 * CASE STUDIES
 *
 * A client-readable layer over data/projects.js. The engineering record already
 * lives there; this file adds only what a non-technical reader needs and cannot
 * get from a tech list: what the business problem was, what was built to solve
 * it, what was hard about it, and what the finished product does.
 *
 * PROVENANCE
 * ----------
 * `problem`, `solution`, `features` and `result` are re-framings of facts
 * already recorded in projects.js — the documented application flows, the
 * contributions and the deep-dive notes. Nothing new is asserted about any
 * client. In particular `result` describes *what the product does*, never a
 * business metric: no download counts, revenue figures or percentage
 * improvements are claimed, because none were measured or shared.
 *
 * `challenges` and `technology` are read straight from the project record, so
 * they cannot drift out of step with it.
 *
 * Adding a case study: add an entry keyed by the project id, then make sure the
 * project itself exists in data/projects.js. Anything missing is simply not
 * rendered.
 */
import { projects } from './projects.js'

/** The client-facing narrative for each documented application. */
const NARRATIVE = {
  'evclass-driver': {
    order: 1,
    audience: 'Drivers on an electric-vehicle ride-hailing platform',
    problem:
      'The platform could take rider bookings, but the driver side was the weak link. A driver needs to go on duty, be offered the right ride, find the rider, follow a route that updates as they move, finish the trip and get paid — and the dispatch system needs to know where that vehicle is the entire time. Anything less and rides get missed, riders wait, and fares are disputed.',
    solution:
      'A single map-centred driver app that carries the whole shift. Going on duty opens a live connection to dispatch and starts reporting position; ride offers arrive as a full-screen prompt with sound from anywhere in the app; accepting draws the route and keeps trimming it as the driver progresses; arrival, trip start, completion and payment each move the ride to its next state on their own. If the app is force-quit mid-ride, the ride is rebuilt from the server on the next launch instead of being lost.',
    features: [
      'Go on duty / off duty with live position reporting to dispatch',
      'Full-screen ride offers with sound, vibration and a response timer',
      'Live map navigation with a route that consumes itself as you drive',
      'Automatic ride stages — arriving, arrived, in progress, completed',
      'Fare breakdown, payment confirmation and rider rating',
      'Earnings and ride history',
      'In-app chat and push notifications that arrive in every app state',
    ],
    result:
      'Drivers run an entire shift inside one screen, and dispatch has a continuous, road-accurate view of every vehicle. The tracking stays smooth between location updates rather than jumping, the route reflects where the driver actually is, and a crash or force-quit mid-ride costs a moment of loading instead of the ride itself.',
  },
  'samriddhi-finance': {
    order: 2,
    audience: 'Loan borrowers, co-borrowers and guarantors of a lending business',
    problem:
      'Borrowers had no way to see their own loan. Every question — how much is left, when is the next EMI due, did my last payment register, what documents are still missing — became a phone call to the office. The lender also needed a reliable, consented way to reach borrowers as part of its collection workflow, which a normal app cannot do once the phone puts it to sleep.',
    solution:
      'A customer app that shows the loan portfolio, the KYC checklist and the full EMI schedule with payment history, all read-only so nothing can be altered from the phone. Alongside it, a separate consented module reports location to the lender\'s admin system. Because JavaScript stops when an app is killed, that module was written as a native Android service with a scheduled fallback and a restart-after-reboot receiver, so it keeps working instead of quietly stopping.',
    features: [
      'Login by email or mobile, with a role selector for customer, co-borrower or guarantor',
      'Loan portfolio summary with pending EMI count',
      'Full EMI schedule, ordered pending → partial → paid, with payment history',
      'KYC checklist with live status per document',
      'Profile with camera photo upload',
      'Consent screen before any permission is requested',
      'Policy and terms pages served from the CMS, so they change without an app release',
    ],
    result:
      'Borrowers answer their own questions inside the app instead of calling the branch, and the lender gets a location feed that survives the phone killing the app or being restarted — the behaviour it was actually asking for. The consent step is explicit and comes before any permission prompt.',
  },
  pit: {
    order: 3,
    audience: 'Entrepreneurship trainees working in teams, in English and French',
    problem:
      'A nine-module entrepreneurship course had to work as a mobile app for teams, in two languages, with exercises, peer review and progress tracking. Built the obvious way, that is nine near-identical feature trees to construct and then maintain — and every content change or bug fix would have to be applied nine times, in two languages.',
    solution:
      'One module engine instead of nine modules. All the question types — plain answers, checkboxes, grids, ratings, peer feedback and the take-home plan — render through a single shared renderer over one API layer, so a fix or a new question type applies everywhere at once. On top of that sits the team layer: teams form by search or share link, a member\'s answers publish to a team board, and teammates give feedback on each other\'s work. Roughly 1,100 translation keys per language keep English and French in step.',
    features: [
      'Nine training modules: lecture → exercise → publication board → peer feedback',
      'Team formation by search, share link or assisted join',
      'Progress tracking per member, visualised as a mountain climb',
      'Points, points history and gamification',
      'Team pin board, polls, activity feed and messaging',
      'Full English / French localisation',
      'Push notifications in foreground, background and killed states',
    ],
    result:
      'Nine modules behave consistently because they are literally the same engine, a new question type is added in one place, and the bilingual experience stays in step as content changes. Teams can run the whole course — learning, submitting, publishing and reviewing each other — inside the app.',
  },
  'tank-topa': {
    order: 4,
    audience: 'Drivers planning a route who want the cheapest sensible fuel stop',
    problem:
      'Fuel is priced differently at every station, and the cheapest one is often not worth the detour. Working that out by hand — price against distance against how much room is left in the tank — is exactly the sort of arithmetic nobody does at the wheel. And asking a driver to create an account before they can even try it would lose most of them at the first screen.',
    solution:
      'Enter where you are going and a few facts about your vehicle, and the app returns the best stop on your route with the price, the saving and the detour it costs, then guides you there on a live map. There is no login at all: an anonymous session ID is generated on first launch and travels with every request, so trips and savings still add up per device. Server data and screen state are kept deliberately separate — cached and polled on one side, a small trip store on the other — which is what keeps the flow responsive on a weak signal.',
    features: [
      'No account required — anonymous session created on first launch',
      'Destination search with address autocomplete, origin from live GPS',
      'Vehicle profile: type, tank size, efficiency, fuel type and current level',
      'Best-stop recommendation with price, saving and detour trade-off',
      'Station detail: pricing, reasons, amenities and contact',
      'Live navigation map with route framing and position tracking',
      'Month-to-date savings on the entry screen',
      'Explicit offline and poor-connection handling',
    ],
    result:
      'A driver gets from "where am I going" to "stop here, this is what it saves you" in a few taps, with no sign-up in the way, and the map keeps working sensibly when the connection does not.',
  },
}

/**
 * Project record + narrative, merged. Only projects that have both are
 * included, and the order is explicit rather than incidental.
 */
export const caseStudies = Object.entries(NARRATIVE)
  .map(([id, narrative]) => {
    const project = projects.find((p) => p.id === id)
    if (!project) return null
    return {
      id,
      name: project.name,
      domain: project.domain,
      tagline: project.tagline,
      platform: project.platform,
      period: project.period,
      icon: project.icon,
      accent: project.accent,
      note: project.note,
      /* Read from the project record so they cannot drift out of step. */
      technology: project.tech ?? [],
      integrations: project.integrations ?? [],
      challenges: project.deepDive
        ? { title: project.deepDive.title, intro: project.deepDive.intro, points: project.deepDive.points, reliability: project.deepDive.reliability }
        : null,
      ...narrative,
    }
  })
  .filter(Boolean)
  .sort((a, b) => a.order - b.order)

/** The stages of the case-study timeline, in reading order. */
export const CASE_STAGES = [
  { id: 'problem', label: 'Client Problem', icon: 'target' },
  { id: 'solution', label: 'My Solution', icon: 'lightbulb' },
  { id: 'features', label: 'Features', icon: 'clipboard-list' },
  { id: 'technology', label: 'Technology', icon: 'code' },
  { id: 'integrations', label: 'Integrations', icon: 'plug' },
  { id: 'challenges', label: 'Challenges Solved', icon: 'puzzle' },
  { id: 'result', label: 'Result', icon: 'trending-up' },
]
