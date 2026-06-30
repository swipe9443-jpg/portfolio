import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Project } from '@/types/portfolio'

// ── Thumbnail gradients ───────────────────────────────────────────────────────
const thumbnailStyles: Record<string, React.CSSProperties> = {
  portfolio:            { background: 'linear-gradient(135deg, #050c1a 0%, #071425 40%, #0a1f35 100%)' },
  'ui-design-project':  { background: 'linear-gradient(135deg, #06091a 0%, #090e24 40%, #0e1535 100%)' },
  'web-dev-project':    { background: 'linear-gradient(135deg, #050d1c 0%, #07111e 40%, #091828 100%)' },
}
const fallbackThumbnail: React.CSSProperties = {
  background: 'linear-gradient(135deg, #060a1c 0%, #081020 40%, #0b1630 100%)',
}

// ── Decorative SVGs per card ──────────────────────────────────────────────────
function ThumbnailDecor({ id, comingSoon }: { id: string; comingSoon?: boolean }) {
  if (comingSoon) return (
    <svg
      width="180" height="140" viewBox="0 0 180 140" fill="none"
      aria-hidden="true"
      style={{ opacity: 0.10, position: 'absolute', bottom: '-8px', right: '-8px' }}
    >
      {/* Dashed outer orbit */}
      <circle cx="90" cy="70" r="52" stroke="#00e5ff" strokeWidth="1" strokeDasharray="5 5" />
      {/* Inner ring */}
      <circle cx="90" cy="70" r="32" stroke="#00e5ff" strokeWidth="1" strokeDasharray="2 4" />
      {/* Clock hands */}
      <path d="M90 42v28l18 18" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" />
      {/* Centre dot */}
      <circle cx="90" cy="70" r="4" fill="#00e5ff" />
      {/* Sparkle accents */}
      <path d="M134 26l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#00e5ff" opacity=".6" />
      <path d="M28 94l1.5 3.5L33 99l-3.5 1.5L28 104l-1.5-3.5L23 99l3.5-1.5z" fill="#5ef2ff" opacity=".4" />
    </svg>
  )
  if (id === 'portfolio') return (
    <svg
      width="160" height="120" viewBox="0 0 160 120" fill="none"
      aria-hidden="true"
      style={{ opacity: 0.16, position: 'absolute', bottom: 0, right: 0 }}
    >
      <rect x="60" y="20" width="80" height="6" rx="3" fill="#00e5ff" />
      <rect x="60" y="32" width="60" height="4" rx="2" fill="#00e5ff" />
      <rect x="60" y="44" width="70" height="4" rx="2" fill="#00e5ff" />
      <rect x="20" y="20" width="32" height="80" rx="4" stroke="#00e5ff" strokeWidth="1.5" />
      <circle cx="36" cy="36" r="8" stroke="#00e5ff" strokeWidth="1.5" />
    </svg>
  )
  return (
    <svg
      width="160" height="120" viewBox="0 0 160 120" fill="none"
      aria-hidden="true"
      style={{ opacity: 0.14, position: 'absolute', bottom: 0, right: 0 }}
    >
      <rect x="20" y="20" width="120" height="16" rx="4" stroke="#00e5ff" strokeWidth="1.5" />
      <rect x="20" y="44" width="120" height="16" rx="4" stroke="#00e5ff" strokeWidth="1.5" />
      <rect x="20" y="68" width="120" height="16" rx="4" stroke="#00e5ff" strokeWidth="1.5" />
      <rect x="24" y="24" width="24" height="8" rx="2" fill="#00e5ff" />
      <rect x="24" y="48" width="32" height="8" rx="2" fill="#5ef2ff" />
      <rect x="24" y="72" width="20" height="8" rx="2" fill="#0095ff" />
    </svg>
  )
}

// ── Category pill colours ─────────────────────────────────────────────────────
const categoryStyle = (cat: string): React.CSSProperties => {
  const map: Record<string, React.CSSProperties> = {
    'Frontend Development': { background: 'rgba(0,149,255,0.08)', border: '1px solid rgba(0,149,255,0.22)', color: '#7dd3fc' },
    'UI/UX Design':         { background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.22)', color: 'var(--accent-hover)' },
    'Full-Stack Concept':   { background: 'rgba(94,242,255,0.06)', border: '1px solid rgba(94,242,255,0.18)', color: 'var(--accent)' },
  }
  return map[cat] ?? { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: 'var(--text-secondary)' }
}

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1.5 10.5L10.5 1.5M10.5 1.5H5M10.5 1.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

interface ProjectCardProps {
  project: Project
  index:   number
}

export const ProjectCard = memo(function ProjectCard({ project, index }: ProjectCardProps) {
  const navigate = useNavigate()
  const thumb = thumbnailStyles[project.id] ?? fallbackThumbnail
  const isComingSoon = project.comingSoon === true
  const handleView = useCallback(() => navigate(`/projects/${project.id}`), [navigate, project.id])

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true as const, margin: '-32px' }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' as const }}
      aria-label={project.title}
      style={{ height: '100%' }}
    >
      <Card
        padding="none"
        className="project-card h-full"
        style={{
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          ...(isComingSoon ? { borderColor: 'rgba(0,229,255,0.07)' } : {}),
        }}
      >
        {/* ── Thumbnail ───────────────────────────────────────────────────── */}
        <div
          style={{
            ...thumb,
            height: '180px', position: 'relative', overflow: 'hidden',
            flexShrink: 0, borderBottom: '1px solid rgba(0,229,255,0.08)',
          }}
          aria-hidden="true"
        >
          {/* Grid texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,229,255,0.035) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(0,229,255,0.035) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Coming-soon dark vignette */}
          {isComingSoon && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.04) 0%, rgba(5,8,22,0.50) 100%)',
            }} />
          )}

          <ThumbnailDecor id={project.id} comingSoon={isComingSoon} />

          {/* Status badge */}
          {isComingSoon ? (
            <span
              style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.3rem 0.75rem',
                background: 'rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.32)',
                borderRadius: '9999px',
                fontSize: '0.7rem', fontWeight: 700,
                color: '#fcd34d', letterSpacing: '0.06em',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: '#f59e0b', boxShadow: '0 0 7px rgba(245,158,11,0.8)',
                flexShrink: 0,
              }} aria-hidden="true" />
              Coming Soon
            </span>
          ) : project.featured ? (
            <span style={{
              position: 'absolute', top: '0.75rem', right: '0.75rem',
              padding: '0.25rem 0.7rem',
              background: 'rgba(0,229,255,0.12)', border: '1px solid rgba(0,229,255,0.30)',
              borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700,
              color: 'var(--accent-hover)', backdropFilter: 'blur(8px)',
            }}>
              Featured
            </span>
          ) : null}
        </div>

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <div style={{
          padding: '1.5rem 1.75rem',
          display: 'flex', flexDirection: 'column', flex: 1, gap: '1rem',
          opacity: isComingSoon ? 0.88 : 1,
        }}>
          {/* Category pill */}
          <span style={{
            ...categoryStyle(project.category),
            alignSelf: 'flex-start', fontSize: '0.6875rem', fontWeight: 600,
            padding: '0.2rem 0.7rem', borderRadius: '9999px',
          }}>
            {project.category}
          </span>

          {/* Title + description */}
          <div>
            <h3 style={{
              fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
              fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)',
              lineHeight: 1.3, marginBottom: '0.5rem',
            }}>
              {project.title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {project.description}
            </p>
          </div>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }} aria-label="Technologies">
            {project.technologies.map(tech => (
              <span key={tech} style={{
                fontSize: '0.75rem', padding: '0.15rem 0.55rem',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '5px', color: 'var(--text-muted)',
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Feature list */}
          <ul
            style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
            aria-label="Key features"
          >
            {project.features.slice(0, 3).map(f => (
              <li key={f} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.8125rem', color: 'var(--text-muted)',
              }}>
                <span style={{
                  display: 'inline-block', width: '4px', height: '4px',
                  background: isComingSoon ? 'rgba(245,158,11,0.55)' : 'var(--accent)',
                  borderRadius: '1px', transform: 'rotate(45deg)', flexShrink: 0,
                }} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div style={{
            display: 'flex', gap: '0.5rem',
            paddingTop: '0.875rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
            {isComingSoon ? (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                height: '36px', padding: '0 1.125rem',
                background: 'rgba(245,158,11,0.07)',
                border: '1px solid rgba(245,158,11,0.20)',
                borderRadius: '10px',
                fontSize: '0.8125rem', fontWeight: 600,
                color: 'rgba(252,211,77,0.75)',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                letterSpacing: '0.01em',
                cursor: 'default', userSelect: 'none',
              }}
              aria-label="Project coming soon"
              >
                <ClockIcon />
                In Development
              </span>
            ) : (
              project.detail && (
                <Button
                  variant="primary" size="sm" rightIcon={<ArrowIcon />}
                  onClick={handleView}
                  aria-label={`View ${project.title} details`}
                >
                  View Project
                </Button>
              )
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  )
})
