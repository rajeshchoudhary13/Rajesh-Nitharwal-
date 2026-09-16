/** Practical email shape check — deliberately permissive, no exotic edge cases. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export const DESCRIPTION_MAX = 2000

/**
 * Validates the project inquiry form.
 *
 * Only three fields are required — name, email and description. Company,
 * budget and timeline are optional on purpose: a client who does not yet know
 * their budget is exactly the client worth talking to, and a required dropdown
 * would either lose them or teach them to pick something untrue.
 *
 * @returns {Record<string, string>} field -> error message (empty object == valid)
 */
export function validateInquiry({ name, email, description }) {
  const errors = {}

  const trimmedName = name.trim()
  if (!trimmedName) errors.name = 'Please enter your name.'
  else if (trimmedName.length < 2) errors.name = 'Name must be at least 2 characters.'
  else if (trimmedName.length > 80) errors.name = 'Name must be under 80 characters.'

  const trimmedEmail = email.trim()
  if (!trimmedEmail) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(trimmedEmail)) errors.email = 'Enter a valid email address, e.g. name@company.com.'

  const trimmedDescription = description.trim()
  if (!trimmedDescription) errors.description = 'Please describe what you want built.'
  else if (trimmedDescription.length < 20)
    errors.description = 'A little more detail helps — at least 20 characters.'
  else if (trimmedDescription.length > DESCRIPTION_MAX)
    errors.description = `Please keep the description under ${DESCRIPTION_MAX} characters.`

  return errors
}

/**
 * Builds the `mailto:` URL for an inquiry.
 *
 * There is no backend, so the form hands a fully composed message to the
 * visitor's own mail client. Optional fields that were left blank are omitted
 * rather than sent as empty labels, so the mail reads like something a person
 * wrote.
 */
export function buildInquiryMailto(to, values) {
  const { name, email, company, projectType, budget, timeline, description } = values

  const subject = `Project inquiry — ${projectType || 'New project'} — ${name.trim()}`

  const lines = [
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    company.trim() && `Company / business: ${company.trim()}`,
    projectType && `Project type: ${projectType}`,
    budget && `Budget range: ${budget}`,
    timeline && `Expected timeline: ${timeline}`,
    '',
    'Project description:',
    description.trim(),
    '',
  ].filter(Boolean)

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}
