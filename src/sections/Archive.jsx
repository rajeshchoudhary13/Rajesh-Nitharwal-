import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Info } from 'lucide-react'
import LazyImage from '../components/LazyImage.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectFilters from '../components/ProjectFilters.jsx'
import ProjectModal from '../components/ProjectModal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { activeFilters, allProjects, countFor, reading } from '../data/projects.js'
import { stagger, viewportOnce } from '../utils/motion.js'
import '../styles/projects.css'

export default function Archive() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const close = useCallback(() => setSelected(null), [])

  const shown = useMemo(
    () => (filter === 'all' ? allProjects : allProjects.filter((p) => p.tags?.includes(filter))),
    [filter],
  )

  return (
    <section className="section" id="archive" aria-labelledby="archive-title">
      <div className="container">
        <SectionHeading
          eyebrow="Full archive"
          eyebrowIcon="table"
          center
          id="archive-title"
          title={
            <>
              Every project, <span className="grad">in one place</span>
            </>
          }
          desc="The complete record — five production client applications plus earlier web, dashboard and UI work. Filter by discipline, or open any card for its end-to-end flow and the hardest engineering problem inside it."
        />

        <ProjectFilters filters={activeFilters} active={filter} onChange={setFilter} countFor={countFor} />

        {/* `layout` on the grid lets Framer animate the reflow when a filter
            removes cards, instead of the remaining ones snapping into place. */}
        <motion.div
          className="projects__grid"
          id="projects-grid"
          layout
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                className="projects__cell"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.16 } }}
                transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              >
                <ProjectCard project={project} index={index} onOpen={setSelected} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="note projects__note">
          <Info size={14} aria-hidden="true" />
          The five client applications are delivered through Emizen Tech Pvt. Ltd. No public store listing or repository is
          published for them, so their previews are schematic rather than screenshots. Earlier web and UI work shows its
          real screenshots, and carries a live link only where the URL still resolves over valid HTTPS.
        </p>

        {/* ---- Reading strip -------------------------------------------------
            The previous portfolio listed these under a "Books" filter beside its
            projects. They are books rather than project work, so they keep their
            place on the site but stay out of the work grid. */}
        <div className="reading">
          <h3 className="reading__title">
            <BookOpen size={15} strokeWidth={2} aria-hidden="true" />
            Reading &amp; references
          </h3>
          <ul className="reading__list">
            {reading.map((book) => (
              <li className="reading__item" key={book.id}>
                <span className="reading__cover">
                  <LazyImage src={book.image} alt={`${book.title} cover`} className="reading__img" />
                </span>
                <span className="reading__meta">
                  <span className="reading__name">{book.title}</span>
                  <span className="reading__author">{book.author}</span>
                  <span className="reading__note">{book.note}</span>
                  <span className="reading__topic mono">{book.topic}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ProjectModal project={selected} onClose={close} />
    </section>
  )
}
