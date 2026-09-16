import AnimatedButton from '../components/AnimatedButton.jsx'
import Icon from '../components/Icon.jsx'
import Masthead from '../components/Masthead.jsx'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import RevealAnimation from '../components/RevealAnimation.jsx'
import { pageIndex, routes } from '../data/nav.js'
import { engagements } from '../config/site.js'
import { buildables } from '../data/buildables.js'
import { processSteps } from '../data/process.js'
import { services } from '../data/services.js'
import { allProjects } from '../data/projects.js'
import '../styles/servicespage.css'

const meta = routes.find((route) => route.id === 'services')

/**
 * SERVICES — the client solutions page.
 *
 * NEW ROUTE. Services previously had no page of its own: data/services.js was
 * rendered by the <Services> section mounted mid-way down /about, which is not
 * where anyone looks for "what can I hire you for". It now has a route, and
 * /about keeps the section as a preview — the two are at different depths, and
 * this page is the one that carries the process and the engagement models.
 *
 * COMPOSITION. The brief is explicit that this must not be a 3/4-column card
 * grid, and that services should be presented as a visual journey. So the page
 * is built around the process as its spine:
 *
 *   masthead     what this page is                          (split)
 *   journey      the seven steps, as a numbered spine        (spine)
 *   services     what I build, as an editorial ledger        (ledger)
 *   buildables   ten product categories, for recognition     (dense list)
 *   engagement   three ways to work together                 (rows)
 *   close        start a project
 *
 * The journey comes BEFORE the service list on purpose. "How does this work and
 * how much of my time does it cost" is the question that stops people enquiring,
 * and answering it first is what makes the service list below read as something
 * buyable rather than as a menu of nouns.
 *
 * Every service states the client problem it solves — the `detail` field in the
 * data, which the old card grid hid behind a "View Details" disclosure.
 */
export default function ServicesPage() {
  /* The evidence link per service. `proof` holds project ids; resolving them
     here means a renamed or removed project cannot leave a dead claim on the
     page — an unresolvable id simply drops out. */
  const proofFor = (service) =>
    (service.proof ?? [])
      .map((id) => allProjects.find((project) => project.id === id))
      .filter(Boolean)

  return (
    <PageTransition className="page services-page">
      <div className="container">
        <Masthead
          index={pageIndex('services')}
          title={['Services']}
          lead={meta.blurb}
          id="services-page-title"
          facts={[
            { key: 'Services', value: services.length },
            { key: 'Process', value: `${processSteps.length} steps` },
            { key: 'Engagements', value: engagements.length },
            { key: 'Response', value: 'Within 24h' },
          ]}
        />

        {/* ================= 1. THE JOURNEY ================= */}
        {/* The seven steps as a single continuous spine. Not seven cards: a
            process is a sequence, and a grid of equal boxes is the one shape
            that actively hides sequence. */}
        <section className="jrny" aria-labelledby="jrny-title">
          <Reveal className="jrny__head">
            <p className="band__eyebrow">
              <span className="band__num" aria-hidden="true">
                01
              </span>
              <span>How an engagement runs</span>
            </p>
            <h2 className="band__title" id="jrny-title">
              Seven steps, and what each one costs you.
            </h2>
            <p className="band__lead">
              Every step says what happens, what you get out of it, and how much of your time it
              takes. That last column is the one most process sections leave out.
            </p>
          </Reveal>

          <ol className="jrny__list">
            {processSteps.map((step, index) => (
              <RevealAnimation
                as="li"
                className="jrny__step"
                key={step.id}
                delay={Math.min(index, 4) * 0.05}
                data-accent={step.accent}
              >
                {/* The spine marker. The connecting line is drawn on the list,
                    so it is continuous rather than seven separate segments. */}
                <span className="jrny__marker" aria-hidden="true">
                  <span className="jrny__node">
                    <Icon name={step.icon} size={15} />
                  </span>
                </span>

                <div className="jrny__body">
                  <p className="jrny__step-num" aria-hidden="true">
                    {step.step}
                  </p>
                  <h3 className="jrny__step-title">{step.title}</h3>
                  <p className="jrny__desc">{step.desc}</p>

                  <dl className="jrny__meta">
                    <div>
                      <dt>You get</dt>
                      <dd>{step.output}</dd>
                    </div>
                    <div>
                      <dt>Your time</dt>
                      <dd>{step.involvement}</dd>
                    </div>
                  </dl>
                </div>
              </RevealAnimation>
            ))}
          </ol>
        </section>

        {/* ================= 2. WHAT I BUILD ================= */}
        {/* The six services, as an editorial ledger. Each one leads with the
            client problem it solves rather than with the technology, and the
            `detail` copy is on the page instead of behind a disclosure. */}
        <section className="svcl" aria-labelledby="svcl-title">
          <Reveal className="svcl__head split split--editorial">
            <div>
              <p className="band__eyebrow">
                <span className="band__num" aria-hidden="true">
                  02
                </span>
                <span>What I build</span>
              </p>
              <h2 className="band__title" id="svcl-title">
                Six things you can hire me for.
              </h2>
            </div>
            <p className="svcl__lead">
              Every one of them maps to work that is evidenced elsewhere on this site. Nothing is
              offered here that has not actually been built.
            </p>
          </Reveal>

          <ol className="svcl__list">
            {services.map((service, index) => {
              const proof = proofFor(service)
              const headingId = `svc-${service.id}-title`

              return (
                <RevealAnimation
                  as="li"
                  className="svcl__item"
                  key={service.id}
                  delay={Math.min(index, 3) * 0.05}
                  data-accent={service.accent}
                  aria-labelledby={headingId}
                >
                  <div className="svcl__item-grid split" style={{ '--ratio': '1.45fr' }}>
                    <div className="svcl__main">
                      <div className="svcl__title-row">
                        <span className="svcl__num" aria-hidden="true">
                          {service.num}
                        </span>
                        <div>
                          <h3 className="svcl__title" id={headingId}>
                            <Icon name={service.icon} size={17} />
                            {service.title}
                          </h3>
                          {/* The one-line promise. */}
                          <p className="svcl__promise">{service.lead}</p>
                        </div>
                      </div>

                      <p className="svcl__desc">{service.desc}</p>
                      {/* Formerly hidden behind "View Details" — this is the
                          copy that explains what problem the service actually
                          removes for the client, so it belongs on the page. */}
                      <p className="svcl__detail">{service.detail}</p>
                    </div>

                    <div className="svcl__aside">
                      <h4 className="svcl__aside-title">What you get</h4>
                      <ul className="svcl__deliverables">
                        {service.deliverables.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>

                      {service.tech?.length > 0 && (
                        <ul className="svcl__tech" aria-label={`${service.title} stack`}>
                          {service.tech.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                      )}

                      {proof.length > 0 && (
                        <p className="svcl__proof">
                          <Icon name="check" size={13} />
                          <span>
                            Built in {proof.map((project) => project.name).join(', ')}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </RevealAnimation>
              )
            })}
          </ol>
        </section>

        {/* ================= 3. WHAT COULD BE BUILT =================
            data/buildables.js — product categories written for a non-technical
            reader, whose job is recognition: a visitor finds the row that
            describes their own idea and stops looking for reasons to leave.

            It lived in the <Buildables> section on /about, which is the wrong
            page for it — "have an idea? I can build it" is a services question.
            Rendered here as a dense two-column list rather than the ten-card
            grid that section used, so it stays distinct from the ledger above.

            `evidence` marks the categories where something comparable has
            already been built. Categories without it are honest capability
            statements, not implied past work, and they are labelled differently
            on purpose — see the data file's own note. */}
        <section className="bld" aria-labelledby="bld-title">
          <Reveal className="bld__head split split--editorial">
            <div>
              <p className="band__eyebrow">
                <span className="band__num" aria-hidden="true">
                  03
                </span>
                <span>Have an idea?</span>
              </p>
              <h2 className="band__title" id="bld-title">
                Find the one that sounds like yours.
              </h2>
            </div>
            <p className="bld__lead">
              Ten kinds of product I can build. A tick marks the ones where something comparable is
              already shipped and on this site.
            </p>
          </Reveal>

          <ul className="bld__list">
            {buildables.map((item, index) => {
              const proof = item.evidence
                ? allProjects.find((project) => project.id === item.evidence)
                : null

              return (
                <RevealAnimation
                  as="li"
                  className="bld__item"
                  key={item.id}
                  delay={Math.min(index, 5) * 0.04}
                  data-accent={item.accent}
                >
                  <span className="bld__icon" aria-hidden="true">
                    <Icon name={item.icon} size={17} />
                  </span>
                  <div className="bld__body">
                    <h3 className="bld__title">{item.title}</h3>
                    <p className="bld__desc">{item.desc}</p>
                    {proof && (
                      <p className="bld__proof">
                        <Icon name="check" size={12} />
                        Built: {proof.name}
                      </p>
                    )}
                  </div>
                </RevealAnimation>
              )
            })}
          </ul>
        </section>

        {/* ================= 4. ENGAGEMENT MODELS ================= */}
        {/* Three ways to work together. A short row each — this is the last
            question before contact, not a section that needs a full treatment. */}
        <section className="engm" aria-labelledby="engm-title">
          <Reveal className="engm__head">
            <p className="band__eyebrow">
              <span className="band__num" aria-hidden="true">
                04
              </span>
              <span>Ways to work together</span>
            </p>
            <h2 className="band__title" id="engm-title">
              Whichever of these you are.
            </h2>
          </Reveal>

          <ul className="engm__list">
            {engagements.map((model, index) => (
              <RevealAnimation
                as="li"
                className="engm__item"
                key={model.id}
                delay={index * 0.07}
                data-accent={model.accent}
              >
                <span className="engm__icon" aria-hidden="true">
                  <Icon name={model.icon} size={19} />
                </span>
                <p className="engm__tag">{model.tag}</p>
                <h3 className="engm__title">{model.title}</h3>
                <p className="engm__desc">{model.desc}</p>
                <ul className="engm__points">
                  {model.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </RevealAnimation>
            ))}
          </ul>
        </section>

        <Reveal className="pagecta">
          <h2 className="pagecta__title">Which of these is yours?</h2>
          <p className="pagecta__text">
            Tell me what the product should do — not how to build it — and I will come back with a
            scope, a timeline and a figure.
          </p>
          <div className="pagecta__actions">
            <AnimatedButton to="/contact" variant="primary">
              Start a Project
            </AnimatedButton>
            <AnimatedButton to="/projects" variant="outline">
              See the Work
            </AnimatedButton>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  )
}
