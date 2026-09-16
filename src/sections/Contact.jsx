import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { ArrowRight, Check, Copy, Info, TriangleAlert } from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import Icon from '../components/Icon.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import Pressable from '../components/Pressable.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { SuccessCheck } from '../components/StateFeedback.jsx'
import { budgetRanges, channels, contact, projectTypes, site, timelines } from '../config/site.js'
import { buildInquiryMailto, DESCRIPTION_MAX, validateInquiry } from '../utils/validate.js'
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  popIn,
  shake,
  SPRING,
  stagger,
  statusVariants,
  viewportOnce,
} from '../utils/motion.js'
import '../styles/contact.css'

const EMPTY = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  description: '',
  timeline: '',
}

/** Field-level error message, animated in and announced. */
function FieldError({ id, message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          className="field__error"
          id={id}
          role="alert"
          variants={statusVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <TriangleAlert size={13} strokeWidth={2} aria-hidden="true" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

/**
 * Project inquiry form.
 *
 * There is no backend and, deliberately, no third-party form service: the brief
 * is handed to the visitor's own mail client with every field laid out. A
 * client's unreleased product idea should not pass through a form vendor on its
 * way to an inbox, and this way nothing about the project is stored anywhere.
 *
 * Only name, email, project type and description are required — see
 * utils/validate.js for why the rest stay optional.
 */
/**
 * @param {{ compact?: boolean }} props `compact` drops the heading and the
 *   channel column, for a page that already carries both. See ContactPage.
 */
export default function Contact({ compact = false }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef(null)
  /* Imperative controls, so a rejected submit can replay the shake without
     remounting the form (which would wipe what the visitor has typed) and
     without fighting the entrance variant. */
  const shakeControls = useAnimationControls()

  /* The section is lazy-loaded and can unmount, so a pending timer must not be
     left able to set state on a component that is gone. */
  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const onChange = useCallback((event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    /* Clear a field error as soon as the visitor starts fixing it. */
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
    setStatus(null)
  }, [])

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()
      const nextErrors = validateInquiry(values)
      setErrors(nextErrors)

      if (Object.keys(nextErrors).length > 0) {
        setStatus({ type: 'error', text: 'Please fix the highlighted fields and try again.' })
        shakeControls.start(shake)
        return
      }

      /* Assigning `location` stays synchronous inside the submit handler —
         deferring it behind a fake "sending" delay would risk losing the user
         activation the mail-client handoff relies on. */
      window.location.href = buildInquiryMailto(contact.email, values)
      setStatus({
        type: 'success',
        text: 'Opening your email app with the brief filled in. If nothing happens, email or WhatsApp me directly — both are listed here.',
      })
      setValues(EMPTY)
    },
    [values, shakeControls],
  )

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      setStatus({ type: 'error', text: `Copy failed — my email is ${contact.email}.` })
    }
  }, [])

  const descriptionLength = values.description.trim().length
  const descriptionRatio = Math.min(descriptionLength / DESCRIPTION_MAX, 1)
  const nearLimit = descriptionLength > DESCRIPTION_MAX * 0.9
  const sent = status?.type === 'success'

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        {/* The Contact *page* opens with its own conversion headline, the same
            availability signal and the same channel list, so on that route this
            heading and the column below it would be the third and fourth copy
            of both. `compact` is how the page says "I have already said this". */}
        {!compact && (
          <SectionHeading
            eyebrow="Start a project"
            eyebrowIcon="send"
            center
            id="contact-title"
            title={
              <>
                Tell me what you&apos;re <span className="grad">building</span>
              </>
            }
            desc="A few lines is enough to start. You do not need a specification, a design or the technical words for it — that is my job."
          />
        )}

        <div className={`contact__grid${compact ? ' contact__grid--compact' : ''}`}>
          {/* ---------------- Channels ---------------- */}
          {!compact && (
          <motion.div
            className="contact__info"
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.ul className="contact__channels" variants={fadeLeft}>
              {channels.map((channel) => {
                const external = channel.href?.startsWith('http')
                return (
                  <GlowCard
                    as="li"
                    className="channel glass"
                    key={channel.id}
                    variants={fadeLeft}
                    whileHover={{ y: -3, transition: SPRING }}
                  >
                    <a
                      href={channel.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer noopener' : undefined}
                      className="channel__inner"
                    >
                      <span className="channel__icon">
                        <Icon name={channel.icon} size={18} />
                      </span>
                      <span className="channel__text">
                        <span className="channel__label">{channel.label}</span>
                        <span className="channel__value">{channel.value}</span>
                        <span className="channel__hint">{channel.hint}</span>
                      </span>
                      <span className="channel__arrow" aria-hidden="true" />
                    </a>
                  </GlowCard>
                )
              })}
            </motion.ul>

            <GlowCard className="contact__quick glass" lift={false} variants={fadeLeft}>
              <p className="contact__quick-title">Prefer something direct?</p>
              <div className="contact__quick-actions">
                <Pressable as="a" className="btn btn--sm btn--primary" href={contact.whatsapp} target="_blank" rel="noreferrer noopener">
                  <Icon name="whatsapp" size={15} />
                  WhatsApp
                </Pressable>
                <Pressable as="a" className="btn btn--sm btn--outline" href={contact.emailHref}>
                  <Icon name="mail" size={15} />
                  Email
                </Pressable>
                <Pressable type="button" className="btn btn--sm btn--ghost" onClick={copyEmail}>
                  {/* The icon swap is animated so the confirmation registers even
                      though the label changes at the same moment. */}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? 'done' : 'copy'}
                      className="contact__copy-icon"
                      variants={popIn}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      {copied ? (
                        <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                      ) : (
                        <Copy size={15} strokeWidth={2} aria-hidden="true" />
                      )}
                    </motion.span>
                  </AnimatePresence>
                  {copied ? 'Copied' : 'Copy email'}
                </Pressable>
              </div>
              <dl className="contact__facts">
                <div>
                  <dt>Based in</dt>
                  <dd>
                    {site.location} · {site.timezone}
                  </dd>
                </div>
                <div>
                  <dt>Response</dt>
                  <dd>{site.responseTime}</dd>
                </div>
                <div>
                  <dt>Availability</dt>
                  <dd>{site.available ? site.availabilityLabel : site.availabilityBusyLabel}</dd>
                </div>
              </dl>
            </GlowCard>
          </motion.div>
          )}

          {/* ---------------- Inquiry form ---------------- */}
          {/* The entrance lives on the wrapper and the shake on the form, so the
              two animations never contend for the same element's transform. */}
          <motion.div
            className="contact__form-wrap"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.form
              className="contact__form glass"
              onSubmit={onSubmit}
              noValidate
              animate={shakeControls}
              aria-labelledby="contact-form-title"
            >
              <div className="contact__form-head">
                <h3 id="contact-form-title" className="contact__form-title">
                  Project inquiry
                </h3>
                <p className="contact__form-sub">Four fields are required. The rest help me answer properly.</p>
              </div>

              <div className="field-row">
                <div className={`field${errors.name ? ' has-error' : ''}`}>
                  <label htmlFor="if-name">
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="if-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={values.name}
                    onChange={onChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'if-name-error' : undefined}
                    required
                  />
                  <FieldError id="if-name-error" message={errors.name} />
                </div>

                <div className={`field${errors.email ? ' has-error' : ''}`}>
                  <label htmlFor="if-email">
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="if-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    value={values.email}
                    onChange={onChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'if-email-error' : undefined}
                    required
                  />
                  <FieldError id="if-email-error" message={errors.email} />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="if-company">Company / business</label>
                  <input
                    id="if-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Optional — or just your idea's name"
                    value={values.company}
                    onChange={onChange}
                  />
                </div>

                <div className={`field${errors.projectType ? ' has-error' : ''}`}>
                  <label htmlFor="if-type">
                    Project type <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="if-type"
                    name="projectType"
                    value={values.projectType}
                    onChange={onChange}
                    aria-invalid={Boolean(errors.projectType)}
                    aria-describedby={errors.projectType ? 'if-type-error' : undefined}
                    required
                  >
                    <option value="">Choose one…</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <FieldError id="if-type-error" message={errors.projectType} />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="if-budget">Budget range</label>
                  <select id="if-budget" name="budget" value={values.budget} onChange={onChange}>
                    <option value="">Prefer not to say</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  <p className="field__hint">A band, not a quote — it only tells me what scope is realistic.</p>
                </div>

                <div className="field">
                  <label htmlFor="if-timeline">Expected timeline</label>
                  <select id="if-timeline" name="timeline" value={values.timeline} onChange={onChange}>
                    <option value="">Not sure yet</option>
                    {timelines.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={`field${errors.description ? ' has-error' : ''}`}>
                <label htmlFor="if-description">
                  Project description <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="if-description"
                  name="description"
                  rows={5}
                  placeholder="What are you building, who is it for, and what should it do? Plain language is perfect."
                  value={values.description}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={errors.description ? 'if-description-error' : 'if-description-hint'}
                  required
                />

                {/* Counter with a fill bar: the limit becomes visible before it is
                    hit, rather than only in an error message afterwards. */}
                <div className="field__meter" aria-hidden="true">
                  <motion.span
                    className={`field__meter-fill${nearLimit ? ' is-warning' : ''}`}
                    style={{ scaleX: descriptionRatio }}
                    transition={SPRING}
                  />
                </div>
                <p className={`field__hint${nearLimit ? ' is-warning' : ''}`} id="if-description-hint">
                  {descriptionLength}/{DESCRIPTION_MAX} characters
                </p>

                <FieldError id="if-description-error" message={errors.description} />
              </div>

              <MagneticButton type="submit" className="btn btn--primary btn--block btn--arrow" strength={6}>
                Let&apos;s Discuss Your Project
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </MagneticButton>

              <AnimatePresence mode="wait">
                {status && (
                  <motion.div
                    key={status.text}
                    className={`form-status form-status--${status.type}`}
                    role="status"
                    variants={statusVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    {/* Success gets the drawn tick; an error keeps the warning
                        glyph, so the two states are distinguishable at a glance
                        as well as by colour. */}
                    {sent ? (
                      <SuccessCheck size={38} />
                    ) : (
                      <span className="form-status__icon" aria-hidden="true">
                        <TriangleAlert size={17} strokeWidth={2} />
                      </span>
                    )}
                    <span>{status.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.p className="note" variants={fadeUp}>
                <Info size={14} aria-hidden="true" />
                This form opens your own email client with the brief filled in. Nothing is stored, and no form service
                or analytics sees your project details.
              </motion.p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
