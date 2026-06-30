import { memo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PageMeta } from '@/components/ui/PageMeta'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true as const, margin: '-32px' },
  transition:  { duration: 0.45, delay, ease: 'easeOut' as const },
})

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Cinematic thumbnail for detail hero
const thumbnailStyles: Record<string, React.CSSProperties> = {
  portfolio:      { background: 'linear-gradient(135deg, #050c1a 0%, #071425 50%, #0a1f35 100%)' },
  'case-study':   { background: 'linear-gradient(135deg, #060c1c 0%, #080f22 50%, #0d1530 100%)' },
  'task-manager': { background: 'linear-gradient(135deg, #050d1c 0%, #07111e 50%, #091828 100%)' },
}

const SectionBlock = memo(function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.div {...fadeUp(0.05)}>
      <Card padding="lg">
        <h2 style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent)',
          letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem',
        }}>
          {label}
        </h2>
        {children}
      </Card>
    </motion.div>
  )
})

const categoryStyle = (cat: string): React.CSSProperties => {
  const map: Record<string, React.CSSProperties> = {
    'Frontend Development / Personal Brand': { background: 'rgba(0,149,255,0.08)', border: '1px solid rgba(0,149,255,0.22)', color: '#7dd3fc' },
    'UI/UX Design':       { background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.22)', color: 'var(--accent-hover)' },
    'Full-Stack Concept': { background: 'rgba(94,242,255,0.06)', border: '1px solid rgba(94,242,255,0.18)', color: 'var(--accent)' },
  }
  return map[cat] ?? { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: 'var(--text-secondary)' }
}

export const ProjectDetail = memo(function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { projects } = content

  const project = projects.find(p => p.id === slug)
  const currentIndex = projects.findIndex(p => p.id === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  const goBack    = useCallback(() => navigate('/projects'), [navigate])

  if (!project) {
    return (
      <section className="section-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <Container>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              404
            </p>
            <h1 style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem',
            }}>
              Project not found
            </h1>
            <Button variant="primary" size="md" onClick={() => navigate('/projects')}>
              Back to Projects
            </Button>
          </div>
        </Container>
      </section>
    )
  }

  const detail = project.detail
  const thumb  = thumbnailStyles[project.id] ?? thumbnailStyles['task-manager']

  return (
    <>
      <PageMeta
        title={`${project.title} | Josh Fallarcuna`}
        description={project.description}
        ogTitle={project.title}
        ogDescription={`Case study: ${project.description}`}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ paddingTop: '7rem', paddingBottom: '0' }} aria-label={project.title}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '500px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at top, rgba(0,149,255,0.10) 0%, transparent 70%)',
        }} aria-hidden="true" />

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ marginBottom: '2.5rem' }}
          >
            <button
              onClick={goBack}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.8125rem', color: 'var(--text-muted)',
                background: 'none', border: 'none', cursor: 'pointer',
                transition: 'color 0.15s ease', padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <ArrowLeftIcon />
              All Projects
            </button>
          </motion.div>

          {/* Title block */}
          <div style={{ maxWidth: '720px', marginBottom: '3rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
              <span style={{
                ...categoryStyle(project.category),
                display: 'inline-block', fontSize: '0.75rem', fontWeight: 600,
                padding: '0.25rem 0.75rem', borderRadius: '9999px', marginBottom: '1.25rem',
              }}>
                {project.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              style={{
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em',
                color: 'var(--text-primary)', marginBottom: '1.25rem',
              }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16, ease: 'easeOut' }}
              style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}
            >
              {project.description}
            </motion.p>
          </div>

          {/* Tech tags */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22, ease: 'easeOut' }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}
            aria-label="Technologies used"
          >
            {project.technologies.map(tech => (
              <span key={tech} style={{
                fontSize: '0.8rem', padding: '0.2rem 0.7rem',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '6px', color: 'var(--text-secondary)',
              }}>
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Cinematic hero image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{
              ...thumb,
              height: 'clamp(260px, 40vw, 480px)',
              borderRadius: '16px',
              border: '1px solid rgba(0,229,255,0.10)',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 0 0 1px rgba(0,229,255,0.06), 0 32px 80px rgba(0,0,0,0.6)',
              marginBottom: '0',
            }}
            aria-hidden="true"
          >
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.06) 0%, transparent 60%)',
            }} />
          </motion.div>
        </Container>
      </section>

      {/* ── CASE STUDY BODY ───────────────────────────────────────────────────── */}
      {detail && (
        <section className="section-wrapper" aria-label="Project case study">
          <Container>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>

              {/* Overview */}
              <SectionBlock label="Overview">
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                  {detail.overview}
                </p>
              </SectionBlock>

              {/* Problem */}
              <SectionBlock label="The Problem">
                <div style={{
                  padding: '1.25rem 1.5rem',
                  background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.14)',
                  borderLeft: '3px solid var(--accent)', borderRadius: '0 8px 8px 0',
                }}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontStyle: 'italic' }}>
                    {detail.problem}
                  </p>
                </div>
              </SectionBlock>

              {/* Research */}
              {detail.research && (
                <SectionBlock label="Research">
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                    {detail.research}
                  </p>
                </SectionBlock>
              )}

              {/* Design Process */}
              {detail.designProcess && detail.designProcess.length > 0 && (
                <SectionBlock label="Design Process">
                  <ol style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', listStyle: 'none', padding: 0 }}>
                    {detail.designProcess.map((step, i) => (
                      <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <span style={{
                          flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%',
                          background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.20)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          fontSize: '0.6875rem', fontWeight: 700, color: 'var(--accent)',
                        }}>
                          {i + 1}
                        </span>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, paddingTop: '2px' }}>
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </SectionBlock>
              )}

              {/* Development */}
              {detail.development && detail.development.length > 0 && (
                <SectionBlock label="Development">
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0 }}>
                    {detail.development.map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <span style={{
                          flexShrink: 0, width: '6px', height: '6px', borderRadius: '1px',
                          background: 'var(--accent)', transform: 'rotate(45deg)', marginTop: '8px',
                        }} aria-hidden="true" />
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </SectionBlock>
              )}

              {/* Key Features */}
              <SectionBlock label="Key Features">
                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem', listStyle: 'none', padding: 0 }}>
                  {project.features.map(f => (
                    <li key={f} style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      padding: '0.6rem 0.875rem',
                      background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.10)',
                      borderRadius: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)',
                    }}>
                      <span style={{
                        width: '5px', height: '5px', background: 'var(--accent)',
                        borderRadius: '1px', transform: 'rotate(45deg)', flexShrink: 0,
                      }} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              {/* ── Gallery ── */}
              {detail.gallery && detail.gallery.length > 0 ? (
                <motion.div {...fadeUp(0.05)}>
                  <Card padding="lg">
                    <h2 style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent)',
                      letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem',
                    }}>
                      Gallery
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.875rem' }}>
                      {detail.gallery.map((src, i) => (
                        <div key={i} style={{
                          borderRadius: '8px', overflow: 'hidden',
                          border: '1px solid rgba(0,229,255,0.10)',
                          background: 'rgba(0,229,255,0.04)',
                          aspectRatio: '16/9',
                        }}>
                          <img src={src} alt={`${project.title} screenshot ${i + 1}`}
                            loading="lazy"
                            decoding="async"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ) : (
                /* Gallery placeholder — shows when no images are added yet */
                <motion.div {...fadeUp(0.05)}>
                  <Card padding="lg">
                    <h2 style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent)',
                      letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem',
                    }}>
                      Gallery
                    </h2>
                    <div style={{
                      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                      gap: '0.875rem',
                    }}>
                      {[1, 2, 3].map(n => (
                        <div key={n} style={{
                          borderRadius: '8px', aspectRatio: '16/9',
                          background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.09)',
                          display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                        }} aria-hidden="true">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="rgba(0,229,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="3"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <path d="M21 15l-5-5L5 21"/>
                          </svg>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            Screenshot {n}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      Project screenshots and design assets will be added here.
                    </p>
                  </Card>
                </motion.div>
              )}

              {/* Lessons Learned */}
              {detail.lessons && detail.lessons.length > 0 && (
                <SectionBlock label="Lessons Learned">
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0 }}>
                    {detail.lessons.map((lesson, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <span style={{
                          flexShrink: 0, width: '18px', height: '18px', borderRadius: '50%',
                          background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px',
                        }}>
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path d="M2 5l2.5 2.5 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                          {lesson}
                        </p>
                      </li>
                    ))}
                  </ul>
                </SectionBlock>
              )}

              {/* Next Steps */}
              {detail.nextSteps && detail.nextSteps.length > 0 && (
                <SectionBlock label="Next Steps">
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0 }}>
                    {detail.nextSteps.map((step, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <span style={{
                          flexShrink: 0, width: '6px', height: '6px',
                          background: 'rgba(0,229,255,0.5)', borderRadius: '50%', marginTop: '8px',
                        }} aria-hidden="true" />
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                          {step}
                        </p>
                      </li>
                    ))}
                  </ul>
                </SectionBlock>
              )}

            </div>

            {/* Project navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true as const }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                maxWidth: '800px', margin: '3rem auto 0',
                paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)',
                flexWrap: 'wrap', gap: '1rem',
              }}
            >
              {prevProject ? (
                <Button variant="secondary" size="md" leftIcon={<ArrowLeftIcon />}
                  onClick={() => navigate(`/projects/${prevProject.id}`)}>
                  {prevProject.title}
                </Button>
              ) : <div />}

              {nextProject ? (
                <Button variant="secondary" size="md" rightIcon={<ArrowRightIcon />}
                  onClick={() => navigate(`/projects/${nextProject.id}`)}>
                  {nextProject.title}
                </Button>
              ) : <div />}
            </motion.div>
          </Container>
        </section>
      )}
    </>
  )
})
