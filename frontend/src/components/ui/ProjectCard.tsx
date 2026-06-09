import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Project } from '@/types/portfolio'

// ── Cinematic gradient thumbnails ─────────────────────────────────────────────
const thumbnailStyles: Record<string, React.CSSProperties> = {
  portfolio:    { background: 'linear-gradient(135deg, #050c1a 0%, #071425 40%, #0a1f35 100%)' },
  'case-study': { background: 'linear-gradient(135deg, #060c1c 0%, #080f22 40%, #0d1530 100%)' },
  'task-manager': { background: 'linear-gradient(135deg, #050d1c 0%, #07111e 40%, #091828 100%)' },
}

function ThumbnailDecor({ id }: { id: string }) {
  if (id === 'portfolio') return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden="true"
      style={{ opacity: 0.18, position: 'absolute', bottom: 0, right: 0 }}>
      <rect x="60" y="20" width="80" height="6" rx="3" fill="#00e5ff"/>
      <rect x="60" y="32" width="60" height="4" rx="2" fill="#00e5ff"/>
      <rect x="60" y="44" width="70" height="4" rx="2" fill="#00e5ff"/>
      <rect x="20" y="20" width="32" height="80" rx="4" stroke="#00e5ff" strokeWidth="1.5"/>
      <circle cx="36" cy="36" r="8" stroke="#00e5ff" strokeWidth="1.5"/>
    </svg>
  )
  if (id === 'case-study') return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden="true"
      style={{ opacity: 0.16, position: 'absolute', bottom: 0, right: 0 }}>
      <rect x="20" y="20" width="120" height="80" rx="6" stroke="#00e5ff" strokeWidth="1.5"/>
      <path d="M20 42h120" stroke="#00e5ff" strokeWidth="1"/>
      <circle cx="32" cy="31" r="4" fill="#00e5ff"/>
      <circle cx="46" cy="31" r="4" fill="#5ef2ff"/>
      <circle cx="60" cy="31" r="4" fill="#94a3b8"/>
      <rect x="30" y="55" width="60" height="4" rx="2" fill="#00e5ff"/>
      <rect x="30" y="65" width="80" height="3" rx="1.5" fill="#00e5ff"/>
      <rect x="30" y="74" width="50" height="3" rx="1.5" fill="#00e5ff"/>
    </svg>
  )
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden="true"
      style={{ opacity: 0.16, position: 'absolute', bottom: 0, right: 0 }}>
      <rect x="20" y="20" width="120" height="16" rx="4" stroke="#00e5ff" strokeWidth="1.5"/>
      <rect x="20" y="44" width="120" height="16" rx="4" stroke="#00e5ff" strokeWidth="1.5"/>
      <rect x="20" y="68" width="120" height="16" rx="4" stroke="#00e5ff" strokeWidth="1.5"/>
      <rect x="24" y="24" width="24" height="8" rx="2" fill="#00e5ff"/>
      <rect x="24" y="48" width="32" height="8" rx="2" fill="#5ef2ff"/>
      <rect x="24" y="72" width="20" height="8" rx="2" fill="#0095ff"/>
    </svg>
  )
}

const categoryStyle = (cat: string): React.CSSProperties => {
  const map: Record<string, React.CSSProperties> = {
    'Frontend Development / Personal Brand': { background: 'rgba(0,149,255,0.08)', border: '1px solid rgba(0,149,255,0.22)', color: '#7dd3fc' },
    'UI/UX Design':       { background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.22)', color: 'var(--accent-hover)' },
    'Full-Stack Concept': { background: 'rgba(94,242,255,0.06)', border: '1px solid rgba(94,242,255,0.18)', color: 'var(--accent)' },
  }
  return map[cat] ?? { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: 'var(--text-secondary)' }
}

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1.5 10.5L10.5 1.5M10.5 1.5H5M10.5 1.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

interface ProjectCardProps {
  project: Project
  index:   number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const navigate = useNavigate()
  const thumb = thumbnailStyles[project.id] ?? thumbnailStyles['task-manager']

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true as const, margin: '-32px' }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' as const }}
      aria-label={project.title}
    >
      <Card padding="none" className="h-full" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Thumbnail */}
        <div style={{
          ...thumb, height: '176px', position: 'relative',
          overflow: 'hidden', flexShrink: 0,
          borderBottom: '1px solid rgba(0,229,255,0.08)',
        }} aria-hidden="true">
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />
          <ThumbnailDecor id={project.id} />
          {project.featured && (
            <span style={{
              position: 'absolute', top: '0.75rem', right: '0.75rem',
              padding: '0.2rem 0.6rem',
              background: 'rgba(0,229,255,0.12)', border: '1px solid rgba(0,229,255,0.28)',
              borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600,
              color: 'var(--accent-hover)',
            }}>
              Featured
            </span>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.875rem' }}>
          <span style={{
            ...categoryStyle(project.category),
            alignSelf: 'flex-start', fontSize: '0.7rem', fontWeight: 600,
            padding: '0.2rem 0.65rem', borderRadius: '9999px',
          }}>
            {project.category}
          </span>

          <div>
            <h3 style={{
              fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
              fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)',
              lineHeight: 1.3, marginBottom: '0.4rem',
            }}>
              {project.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {project.description}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }} aria-label="Technologies used">
            {project.technologies.map(tech => (
              <span key={tech} style={{
                fontSize: '0.75rem', padding: '0.15rem 0.5rem',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '4px', color: 'var(--text-muted)',
              }}>
                {tech}
              </span>
            ))}
          </div>

          <ul style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }} aria-label="Key features">
            {project.features.slice(0, 3).map(f => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span style={{
                  display: 'inline-block', width: '4px', height: '4px',
                  background: 'var(--accent)', borderRadius: '1px',
                  transform: 'rotate(45deg)', flexShrink: 0,
                }} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div style={{
            display: 'flex', gap: '0.5rem', paddingTop: '0.75rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
            {project.detail && (
              <Button
                variant="primary" size="sm" rightIcon={<ArrowIcon />}
                onClick={() => navigate(`/projects/${project.id}`)}
                aria-label={`View ${project.title} case study`}
              >
                Case Study
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="secondary" size="sm" leftIcon={<GitHubIcon />}
                onClick={() => window.open(project.githubUrl, '_blank', 'noopener')}
                aria-label={`View ${project.title} on GitHub`}
              >
                Code
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  )
}
