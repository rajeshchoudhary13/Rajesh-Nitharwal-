import { motion } from 'framer-motion'
import { Award, Download, Eye, FileText } from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import Pressable from '../components/Pressable.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { certifications, profile } from '../data/profile.js'
import { EASE, fadeLeft, fadeRight, fadeUp, stagger, viewportOnce } from '../utils/motion.js'
import '../styles/resume.css'

/** Snapshot rows — a condensed view of the resume, no new claims. */
const SNAPSHOT = [
  { label: 'Title', value: 'Full-Stack Developer (React & Node.js)' },
  { label: 'Experience', value: 'Over 1.5 years across web and mobile' },
  { label: 'Current', value: 'React Native Developer, Emizen Tech Pvt. Ltd. (Jul 2025 – Present)' },
  { label: 'Platforms', value: 'Android and iOS' },
  { label: 'Core stack', value: 'React Native, React.js, JavaScript, Redux, Context API, REST APIs' },
  { label: 'Education', value: 'M.Sc Information Technology, University of Rajasthan (2022 – 2024)' },
]

export default function Resume() {
  return (
    <section className="section" id="resume" aria-labelledby="resume-title">
      <div className="container">
        <SectionHeading
          eyebrow="Resume"
          eyebrowIcon="file-text"
          center
          id="resume-title"
          title={
            <>
              My <span className="grad">Resume</span>
            </>
          }
          desc="Full-Stack Developer with over 1.5 years of experience across web and mobile — React.js and React Native on the client, Node.js, Express.js and MongoDB on the server, with REST API integration and performance optimization throughout."
        />

        <div className="resume__grid">
          <GlowCard
            className="resume__card glass"
            lift={false}
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.div className="resume__doc" variants={fadeLeft} aria-hidden="true">
              <span className="resume__doc-icon">
                <FileText size={26} strokeWidth={1.7} />
              </span>
              <div className="resume__doc-lines">
                {[92, 74, 84, 60, 78, 48].map((width, i) => (
                  <motion.span
                    key={i}
                    style={{ width: `${width}%` }}
                    initial={{ opacity: 0, scaleX: 0.4 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.42, delay: 0.12 + i * 0.06, ease: EASE }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.h3 className="resume__file mono" variants={fadeUp}>
              {profile.resumeFileName}
            </motion.h3>
            <motion.p className="resume__hint" variants={fadeUp}>
              One page, PDF. Full work history, technical skills, education and certifications.
            </motion.p>

            <motion.div className="resume__actions" variants={fadeUp}>
              <Pressable
                as="a"
                className="btn btn--primary"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Eye size={16} strokeWidth={2} aria-hidden="true" />
                View Resume
              </Pressable>
              <Pressable
                as="a"
                className="btn btn--outline"
                href={profile.resumeUrl}
                download={profile.resumeFileName}
              >
                <Download size={16} strokeWidth={2} aria-hidden="true" />
                Download Resume
              </Pressable>
            </motion.div>
          </GlowCard>

          <motion.div
            className="resume__side"
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <GlowCard className="resume__snapshot glass" lift={false} variants={fadeRight}>
              <h3>Snapshot</h3>
              <dl>
                {SNAPSHOT.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </GlowCard>

            <GlowCard className="resume__certs glass" lift={false} variants={fadeRight}>
              <h3>
                <Award size={16} strokeWidth={2} aria-hidden="true" />
                Certifications &amp; achievements
              </h3>
              <ul>
                {certifications.map((cert) => (
                  <li key={cert.id}>
                    <span className="resume__cert-title">{cert.title}</span>
                    <span className="resume__cert-meta">
                      {cert.issuer} · {cert.period}
                    </span>
                    {cert.note && <span className="resume__cert-note">{cert.note}</span>}
                  </li>
                ))}
              </ul>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
