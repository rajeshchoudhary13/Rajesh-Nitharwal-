/**
 * Single source of truth for personal / contact content.
 *
 * Sourced from two places, both Rajesh's own: the resume, and the previous
 * portfolio at rajeshchoudhary13.github.io, whose bio describes him as "a
 * dedicated full-stack developer with a passion for crafting seamless web and
 * mobile experiences". The positioning below is full-stack on that basis.
 *
 * What has NOT changed is the evidence discipline: experience length, counts
 * and company names stay exactly as the resume states them. Repositioning
 * changes the emphasis of the copy, never the facts underneath it — mobile is
 * still described as the deep experience because that is what the record shows.
 */
export const profile = {
  brand: 'Rajesh_Nitharwal',
  name: 'Rajesh Nitharwal',
  firstName: 'Rajesh',
  role: 'Full-Stack Developer',
  headline: 'Full-Stack Developer — React & Node.js',
  tagline: 'Full-Stack Developer | React.js | React Native | Node.js | Express.js | MongoDB',
  location: 'Jaipur, Rajasthan',
  phone: '+91 8905883987',
  phoneHref: 'tel:+918905883987',
  email: 'rajeshchoudhary1318@gmail.com',
  emailHref: 'mailto:rajeshchoudhary1318@gmail.com',
  linkedin: 'https://linkedin.com/in/rajesh-nitharwal-b88291258',
  linkedinLabel: 'linkedin.com/in/rajesh-nitharwal-b88291258',
  currentCompany: 'Emizen Tech Pvt. Ltd.',

  /** Resume path served from /public. Replace the file to update both buttons. */
  resumeUrl: '/media/resume/Rajesh_Nitharwal.pdf',
  resumeFileName: 'Rajesh_Nitharwal_Resume.pdf',

  summary:
    'Full-Stack Developer with over 1.5 years of experience building and shipping production applications across web and mobile. Deepest experience is React Native on Android and iOS — five live client apps — backed by React.js on the web and Node.js, Express.js and MongoDB on the server. Skilled in JavaScript, Redux/Redux Toolkit, REST API integration and performance optimization, delivering features inside fast-paced, cross-functional Agile teams.',

  summarySecondary:
    'Comfortable owning a feature end-to-end — data model, API, client and release — debugging production issues, and writing clean, reusable, maintainable code for scalable products.',

  /** Short intro used in the hero. Derived from the resume summary. */
  heroIntro:
    'I build across the stack — React.js and React Native on the front, Node.js, Express and MongoDB behind it — and ship production mobile applications for Android and iOS, owning features end-to-end from API to store release.',
}

/** Only links actually present on the resume. GitHub / Bitbucket are not listed, so they are omitted. */
export const socials = [
  { id: 'linkedin', label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
  { id: 'email', label: 'Email', href: profile.emailHref, icon: 'mail' },
  { id: 'phone', label: 'Phone', href: profile.phoneHref, icon: 'phone' },
]

/**
 * Statistics that can be counted directly from the resume.
 * suffix/label wording stays conservative — no invented metrics.
 */
export const stats = [
  { value: 1.5, suffix: '+', decimals: 1, label: 'Years of experience', hint: 'Across web and mobile' },
  { value: 5, suffix: '', decimals: 0, label: 'Live production apps', hint: 'Delivered at Emizen Tech' },
  { value: 13, suffix: '', decimals: 0, label: 'Projects in portfolio', hint: 'Mobile, web and UI work' },
  { value: 4, suffix: '', decimals: 0, label: 'Professional roles', hint: 'Across four companies' },
]

export const education = [
  {
    id: 'msc',
    degree: 'M.Sc, Information Technology',
    institute: 'University of Rajasthan',
    period: '2022 – 2024',
    score: 'CGPA: 7.00/10',
  },
  {
    id: 'bca',
    degree: 'Bachelor of Computer Applications (BCA)',
    institute: 'Maharishi Arvind University, Jaipur',
    period: '2018 – 2021',
    score: 'CGPA: 6.30/9',
  },
  {
    id: 'xii',
    degree: 'Senior Secondary (XII), Science, BSER',
    institute: 'BR Memorial Sr. Sec. School, Jaipur, Rajasthan',
    period: '2018',
    score: 'Percentage: 64.00%',
  },
]

export const certifications = [
  {
    id: 'python',
    title: 'Python Programming',
    issuer: 'Great Learning',
    period: 'Mar 2024 – May 2024',
  },
  {
    id: 'appreciation',
    title: 'Certificate of Appreciation',
    issuer: 'B K Birla Institute of Engineering & Technology, Pilani',
    period: 'Dec 2017 – Jan 2018',
    note: 'Recognized for outstanding participation and dedication in a school-level competition.',
  },
  {
    id: 'emizen-fest',
    title: 'Emizen Fest Award',
    issuer: 'Emizen Tech Pvt. Ltd.',
    period: '2025',
    note: 'Recognized for outstanding contribution and dedication.',
  },
]
