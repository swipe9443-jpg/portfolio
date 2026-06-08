import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2v9M5 8l3 3 3-3M2 13h12" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const icons = {
  education: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  certs: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  bolt: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  briefcase: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    </svg>
  ),
}

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true as const, margin: '-32px' },
  transition:  { duration: 0.4, delay, ease: 'easeOut' as const },
})

const statusCfg: Record<string, { label: string; color: string; bg: string; border: string }> = {
  completed:     { label: 'Completed',   color: '#22c55e', bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.20)' },
  'in-progress': { label: 'In Progress', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.20)' },
  planned:       { label: 'Planned',     color: 'var(--accent)', bg: 'rgba(0,229,255,0.07)', border: 'rgba(0,229,255,0.20)' },
}

function CardHead({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '28px', height: '28px', borderRadius: '6px',
        background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)',
        color: 'var(--accent)', flexShrink: 0,
      }}>
        {icon}
      </span>
      <h3 style={{
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontSize: '0.6875rem', fontWeight: 600,
        color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        {label}
      </h3>
    </div>
  )
}

export function Resume() {
  const { resume } = content

  return (
    <section id="resume" className="section-wrapper relative overflow-hidden" aria-label="Resume">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(10,15,30,0.25)' }} aria-hidden="true" />
      <div className="glow-blob opacity-[0.06]" style={{
        width: '360px', height: '360px', bottom: '-2rem', right: '-2rem',
        background: 'radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <Container className="relative z-10">
        <SectionTitle title="Resume" subtitle="Background, certifications, and core competencies." />

        {/* Summary + download */}
        <motion.div {...fadeUp(0.05)} style={{ marginBottom: '2rem' }}>
          <Card padding="lg">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem',
                  }}>
                    Professional Summary
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '40rem' }}>
                    {resume.summary}
                  </p>
                </div>
                <Button variant="primary" size="md" leftIcon={<DownloadIcon />}
                  onClick={() => window.open(resume.downloadUrl, '_blank', 'noopener')}
                  aria-label="Download resume PDF" style={{ flexShrink: 0 }}>
                  {resume.downloadLabel}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Education */}
          <motion.div {...fadeUp(0.12)}>
            <Card padding="md" className="h-full">
              <CardHead icon={icons.education} label="Education" />
              {resume.education.map((edu, i) => (
                <div key={i} style={{
                  position: 'relative', paddingLeft: '1rem', paddingBottom: i < resume.education.length - 1 ? '1.25rem' : 0,
                  borderLeft: '1px solid rgba(0,229,255,0.20)',
                }}>
                  <div style={{
                    position: 'absolute', left: '-5px', top: '5px',
                    width: '9px', height: '9px', borderRadius: '50%',
                    background: 'var(--accent)', boxShadow: '0 0 10px rgba(0,229,255,0.5)',
                  }} />
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {edu.institution}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--accent)', marginTop: '2px' }}>
                    {edu.degree}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {edu.period}
                  </p>
                  {edu.details && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div {...fadeUp(0.18)}>
            <Card padding="md" className="h-full">
              <CardHead icon={icons.certs} label="Certifications" />
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {resume.certifications.map((cert, i) => {
                  const s = statusCfg[cert.status]
                  return (
                    <li key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                      gap: '1rem', padding: '0.6rem 0',
                      borderBottom: i < resume.certifications.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {cert.name}
                        {cert.issuer && <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1px' }}>{cert.issuer}</span>}
                      </p>
                      <span style={{
                        flexShrink: 0, fontSize: '0.7rem', fontWeight: 600,
                        padding: '0.2rem 0.6rem', borderRadius: '9999px',
                        background: s.bg, border: `1px solid ${s.border}`, color: s.color,
                      }}>
                        {s.label}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Card>
          </motion.div>

          {/* Core Competencies */}
          <motion.div {...fadeUp(0.24)}>
            <Card padding="md" className="h-full">
              <CardHead icon={icons.bolt} label="Core Competencies" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
                role="list" aria-label="Core competencies">
                {resume.coreCompetencies.map(s => (
                  <span key={s} role="listitem" className="skill-badge">{s}</span>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Experience */}
          <motion.div {...fadeUp(0.30)}>
            <Card padding="md" className="h-full">
              <CardHead icon={icons.briefcase} label="Experience" />
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                {resume.experience}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', fontStyle: 'italic' }}>
                Professional experience will be added as it becomes available.
              </p>
            </Card>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
