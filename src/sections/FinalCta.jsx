import { ArrowRight, FolderOpen, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import MagneticButton from '../components/MagneticButton.jsx'
import Pressable from '../components/Pressable.jsx'
import { contact, site } from '../config/site.js'
import { fadeUp, maskUp, stagger, viewportOnce } from '../utils/motion.js'
import { scrollToId } from '../utils/scroll.js'
import '../styles/finalcta.css'

/**
 * Closing call to action.
 *
 * The last thing on the page before the footer, and the only section with a
 * full-bleed tinted panel — a visitor who has scrolled this far should not have
 * to hunt for the next step. Three routes out: the form, the work, and a direct
 * email for anyone who would rather skip the form entirely.
 */
export default function FinalCta() {
  return (
    <section className="cta" id="cta" aria-labelledby="cta-title">
      <div className="container">
        <motion.div
          className="cta__panel"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* Decorative grid + bloom, drawn behind the copy. */}
          <span className="cta__grid" aria-hidden="true" />
          <span className="cta__bloom" aria-hidden="true" />

          <div className="cta__inner">
            <motion.p className="cta__eyebrow mono" variants={fadeUp}>
              <span className="cta__eyebrow-dot" aria-hidden="true" />
              {site.available ? site.availabilityLabel : site.availabilityBusyLabel}
            </motion.p>

            <motion.h2 className="cta__title" id="cta-title" variants={maskUp}>
              Have an idea? <span className="cta__title-grad">Let&apos;s turn it into a product.</span>
            </motion.h2>

            <motion.p className="cta__desc" variants={fadeUp}>
              Tell me what you&apos;re building, what problem you&apos;re solving, and where you want to go. I&apos;ll
              help you figure out the right technical approach.
            </motion.p>

            <motion.div className="cta__actions" variants={fadeUp}>
              <MagneticButton
                type="button"
                className="btn btn--primary btn--arrow"
                strength={12}
                onClick={() => scrollToId('contact')}
              >
                Start a Project
                <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
              </MagneticButton>

              <Pressable type="button" className="btn btn--outline" onClick={() => scrollToId('projects')}>
                <FolderOpen size={16} strokeWidth={2} aria-hidden="true" />
                View Projects
              </Pressable>
            </motion.div>

            <motion.p className="cta__direct" variants={fadeUp}>
              Or skip the form —{' '}
              <a href={contact.emailHref} className="cta__direct-link">
                <Mail size={13} strokeWidth={2} aria-hidden="true" />
                {contact.email}
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
