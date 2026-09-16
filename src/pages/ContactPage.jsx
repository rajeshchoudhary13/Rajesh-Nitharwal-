import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import BackgroundFX from '../components/BackgroundFX.jsx'
import Icon from '../components/Icon.jsx'
import PageTransition from '../components/PageTransition.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionSkeleton from '../components/Skeleton.jsx'
import { channels, contact, site } from '../config/site.js'
import { pageChild, pageStagger } from '../utils/motion.js'
import '../styles/contactpage.css'

/* The existing Contact section keeps its working behaviour untouched: the form
   validates client-side and hands the completed brief to the visitor's own mail
   client via a mailto: built in utils/validate.js. There is no backend and no
   third-party form vendor by design, so there is no API here to preserve or
   replace — only the handoff, which still works exactly as it did.

   Faq follows it because the questions people ask before writing are the ones
   that stop them writing. */
const Contact = lazy(() => import('../sections/Contact.jsx'))
const Faq = lazy(() => import('../sections/Faq.jsx'))

/**
 * CONTACT — the conversion page.
 *
 * COMPOSITION. This is the only route that does not open with a masthead. A
 * masthead is an editorial device — it introduces an article — and this page is
 * not an article, it is a form with a reason to fill it in. So it opens with a
 * conversion block instead: a headline, one short paragraph, the availability
 * signal, and the two direct channels for people who would rather not use a
 * form at all.
 *
 *   hero        headline, message, availability, direct channels
 *   form        the existing Contact section, behaviour untouched
 *   faq         what stops people writing
 *
 * THE BACKGROUND. <BackgroundFX> already existed in the codebase — fully
 * styled, pointer-events:none, CSS-only animation, and already disabled under
 * prefers-reduced-motion — but was mounted nowhere. It is exactly the "subtle
 * animated background so the page does not feel empty" the brief asks for, so
 * it is mounted here and only here: a drifting grid behind every route would be
 * the over-animation the brief also warns against.
 */
export default function ContactPage() {
  return (
    <PageTransition className="page contact-page">
      {/* Fixed, behind everything, and inert. Scoped to this route by being
          mounted here rather than in the app shell. */}
      <BackgroundFX />

      <div className="container">
        <motion.header
          className="chero"
          variants={pageStagger(0.08, 0.05)}
          initial="hidden"
          animate="show"
        >
          <div className="chero__main">
            {/* The availability signal comes first, because "are you free" is
                the question that decides whether the rest is worth reading. */}
            <motion.p className="chero__status" variants={pageChild}>
              <span
                className={`chero__dot${site.available ? '' : ' is-busy'}`}
                aria-hidden="true"
              />
              {site.available ? site.availabilityLabel : site.availabilityBusyLabel}
            </motion.p>

            <motion.h1 className="chero__title" variants={pageChild}>
              Let&apos;s build the thing you keep describing to people.
            </motion.h1>

            <motion.p className="chero__lead" variants={pageChild}>
              A few lines is enough to start. You do not need a specification, a design, or the
              technical words for it — working that out is my job. Tell me what the product should
              do and I will come back with a scope, a timeline and a figure.
            </motion.p>

            <motion.dl className="chero__terms" variants={pageChild}>
              <div>
                <dt>Response</dt>
                <dd>{site.responseTime.replace('Replies within ', 'Within ')}</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>
                  {site.location} · {site.timezone}
                </dd>
              </div>
              <div>
                <dt>Working with</dt>
                <dd>Founders, agencies, product teams</dd>
              </div>
            </motion.dl>
          </div>

          {/* The direct channels, for people who would rather not use a form.
              A form is the default path, not the only one — and burying the
              email address below a seven-field form loses the visitor who just
              wants to send two sentences. */}
          <motion.aside className="chero__direct" variants={pageChild} aria-label="Direct contact">
            <p className="chero__direct-label">Or reach me directly</p>

            <ul className="chero__channels">
              {channels.map((channel) => {
                const external = channel.href?.startsWith('http')
                return (
                  <li key={channel.id}>
                    <a
                      className="chero__channel"
                      href={channel.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer noopener' : undefined}
                    >
                      <span className="chero__channel-icon" aria-hidden="true">
                        <Icon name={channel.icon} size={17} />
                      </span>
                      <span className="chero__channel-body">
                        <span className="chero__channel-label">{channel.label}</span>
                        <span className="chero__channel-value">{channel.value}</span>
                        <span className="chero__channel-hint">{channel.hint}</span>
                      </span>
                      <span className="chero__channel-arrow" aria-hidden="true">
                        &rarr;
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <p className="chero__note">
              <Icon name="shield" size={13} />
              The form opens your own mail client — nothing about your project is stored here or
              sent through a third party.
            </p>
          </motion.aside>
        </motion.header>
      </div>

      <Suspense fallback={<SectionSkeleton label="contact" cards={2} />}>
        <Contact compact />
      </Suspense>

      <Suspense fallback={<SectionSkeleton label="questions" cards={3} />}>
        <Faq />
      </Suspense>

      {/* A last, quiet prompt. Not a `.pagecta` — the whole page is a call to
          action, and a second one at the bottom would be shouting. */}
      <div className="container">
        <Reveal className="cclose">
          <p className="cclose__text">
            Still deciding? Send two sentences to{' '}
            <a href={contact.emailHref}>{contact.email}</a> and I will tell you honestly whether it
            is something I can help with.
          </p>
        </Reveal>
      </div>
    </PageTransition>
  )
}
