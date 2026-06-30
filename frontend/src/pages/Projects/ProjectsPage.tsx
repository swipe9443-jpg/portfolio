import { memo, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { PageMeta } from '@/components/ui/PageMeta'

const filters = ['All', 'UI/UX', 'Frontend', 'Full Stack', 'Personal'] as const
type Filter = typeof filters[number]

function matchesFilter(category: string, filter: Filter): boolean {
  if (filter === 'All') return true
  if (filter === 'UI/UX')      return category.toLowerCase().includes('ui/ux') || category.toLowerCase().includes('design')
  if (filter === 'Frontend')   return category.toLowerCase().includes('frontend')
  if (filter === 'Full Stack') return category.toLowerCase().includes('full-stack') || category.toLowerCase().includes('full stack')
  if (filter === 'Personal')   return category.toLowerCase().includes('personal')
  return true
}

export const ProjectsPage = memo(function ProjectsPage() {
  const { projects } = content
  const [activeFilter, setActiveFilter] = useState<Filter>('All')

  const filtered = useMemo(
    () => projects.filter(p => matchesFilter(p.category, activeFilter)),
    [activeFilter, projects],
  )
  const handleFilter = useCallback((f: Filter) => setActiveFilter(f), [])

  return (
    <>
      <PageMeta
        title="Projects | Josh Fallarcuna"
        description="Portfolio of UI/UX design, frontend, and full-stack projects by Josh Fallarcuna."
        ogTitle="Projects — Josh Fallarcuna"
        ogDescription="Explore case studies and development projects spanning design and full-stack web development."
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="section-wrapper relative overflow-hidden" aria-label="Projects page">
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '400px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at top, rgba(0,149,255,0.10) 0%, transparent 70%)',
        }} aria-hidden="true" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ maxWidth: '640px', marginBottom: '4rem' }}
          >
            <p className="page-hero-label">Portfolio</p>
            <h1 className="page-hero-heading">
              Selected <span className="text-gradient">Projects</span>
            </h1>
            <p className="page-hero-body">
              A collection of work spanning UI/UX design, frontend development, and full-stack concepts.
              Each project represents a step in the journey.
            </p>
          </motion.div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}
            role="group"
            aria-label="Filter projects by category"
          >
            {filters.map(f => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                aria-pressed={activeFilter === f}
                style={{
                  padding: '0.4375rem 1.125rem',   /* 7px 18px — 8pt grid */
                  fontSize: '0.8125rem', fontWeight: 500,
                  borderRadius: '9999px',
                  border: activeFilter === f ? '1px solid rgba(0,229,255,0.40)' : '1px solid rgba(255,255,255,0.08)',
                  background: activeFilter === f ? 'rgba(0,229,255,0.10)' : 'rgba(255,255,255,0.03)',
                  color: activeFilter === f ? 'var(--accent)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Projects grid */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem', color: 'var(--text-muted)' }}
            >
              No projects match this filter yet.
            </motion.div>
          )}
        </Container>
      </section>
    </>
  )
})
