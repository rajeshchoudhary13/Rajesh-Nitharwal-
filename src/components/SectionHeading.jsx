import { motion } from 'framer-motion'
import Icon from './Icon.jsx'
import { drawX, fadeUp, maskUp, stagger, viewportOnce } from '../utils/motion.js'

/**
 * Shared section header: eyebrow chip, gradient title and supporting copy.
 *
 * The title uses the clip-path curtain reveal while the eyebrow and description
 * simply rise — a difference in treatment that puts the emphasis where the
 * hierarchy already does.
 *
 * @param {{ eyebrow?: string, eyebrowIcon?: string, title: React.ReactNode,
 *           desc?: React.ReactNode, center?: boolean, id?: string }} props
 */
export default function SectionHeading({ eyebrow, eyebrowIcon = 'sparkles', title, desc, center = false, id }) {
  return (
    <motion.header
      className={`section__head${center ? ' section__head--center' : ''}`}
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {eyebrow && (
        <motion.p className="eyebrow" variants={fadeUp}>
          <Icon name={eyebrowIcon} size={14} />
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 className="section__title" id={id} variants={maskUp}>
        {title}
      </motion.h2>
      {desc && (
        <motion.p className="section__desc" variants={fadeUp}>
          {desc}
        </motion.p>
      )}
      {/* The accent rule draws itself in last, closing the heading block. */}
      <motion.span className="section__rule" variants={drawX} aria-hidden="true" />
    </motion.header>
  )
}
