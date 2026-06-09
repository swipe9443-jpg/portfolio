import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { PageMeta } from '@/components/ui/PageMeta'
import { downloadResume, viewResume } from '@/config/resume'

/* ─────────────────────────────────────────────────────────────────────────────
   Animation preset
───────────────────────────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true as const, margin: '-32px' },
  transition:  { duration: 0.42, delay, ease: 'easeOut' as const },
})

/* ─────────────────────────────────────────────────────────────────────────────
   Icons
───────────────────────────────────────────────────────────────────────────── */
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2v9M5 8l3 3 3-3M2 13h12"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PreviewIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="8" r="2"
      stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const icons = {
  education: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  cert: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  skills: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  briefcase: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  ),
  check: (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="rgba(0,229,255,0.20)" />
      <path d="M4.5 7l1.75 1.75 3.25-3"
        stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

/* ─────────────────────────────────────────────────────────────────────────────
   Status badge config
───────────────────────────────────────────────────────────────────────────── */
const statusCfg: Record<string, { label: string; color: string; bg: string; border: string }> = {
  completed:     { label: 'Completed',   color: '#4ade80', bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.22)'  },
  'in-progress': { label: 'In Progress', color: '#fbbf24', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.22)' },
  planned:       { label: 'Planned',     color: 'var(--accent)', bg: 'rgba(0,229,255,0.07)', border: 'rgba(0,229,255,0.22)' },
}

/* ─────────────────────────────────────────────────────────────────────────────
   Card section header — icon box + label
───────────────────────────────────────────────────────────────────────────── */
function CardSection({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '36px', height: '36px', borderRadius: '9px', flexShrink: 0,
        background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.18)',
        color: 'var(--accent)',
      }}>
        {icon}
      </span>
      <h2 style={{
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontSize: '0.75rem', fontWeight: 700,
        color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        {label}
      </h2>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Core Competencies — grouped categories derived from flat array
───────────────────────────────────────────────────────────────────────────── */
const competencyGroups = [
  {
    label: 'UI/UX Design',
    color: 'rgba(0,149,255,0.9)',
    tint:  'rgba(0,149,255,0.07)',
    ring:  'rgba(0,149,255,0.20)',
    keys:  ['Figma', 'UI Design', 'Wireframing', 'Prototyping'],
  },
  {
    label: 'Frontend Development',
    color: 'var(--accent)',
    tint:  'rgba(0,229,255,0.06)',
    ring:  'rgba(0,229,255,0.16)',
    keys:  ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
  },
  {
    label: 'Tools & Productivity',
    color: 'rgba(167,139,250,0.9)',
    tint:  'rgba(167,139,250,0.07)',
    ring:  'rgba(167,139,250,0.20)',
    keys:  ['Microsoft Word', 'Microsoft PowerPoint'],
  },
  {
    label: 'Professional',
    color: 'rgba(52,211,153,0.9)',
    tint:  'rgba(52,211,153,0.06)',
    ring:  'rgba(52,211,153,0.18)',
    keys:  ['Attention to Detail'],
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   Shared card shell style
───────────────────────────────────────────────────────────────────────────── */
const cardStyle: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem 2rem 2.25rem',
  background: 'rgba(13,20,36,0.90)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px',
  backdropFilter: 'blur(20px)',
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */
export function ResumePage() {
  const { resume } = content

  return (
    <>
      <PageMeta
        title="Resume | Josh Fallarcuna"
        description="Professional profile, education, certifications, and core competencies of Josh Fallarcuna."
        ogTitle="Resume — Josh Fallarcuna"
        ogDescription="Background, certifications, and skills — available for download."
      />

      <section className="section-wrapper relative overflow-hidden" aria-label="Resume page">

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(10,15,30,0.25)' }} aria-hidden="true" />
        <div className="glow-blob opacity-[0.06]" style={{
          width: '360px', height: '360px', bottom: '-2rem', right: '-2rem',
          background: 'radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)',
        }} aria-hidden="true" />

        <Container className="relative z-10">

          {/* ── PAGE HEADER ───────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ marginBottom: '4rem' }}
          >
            <div style={{
              display: 'flex', flexWrap: 'wrap',
              alignItems: 'flex-end', justifyContent: 'space-between',
              gap: '1.5rem',
            }}>
              <div>
                <p className="page-hero-label">Professional Profile</p>
                <h1 className="page-hero-heading" style={{ marginBottom: 0 }}>
                  My <span className="text-gradient">Resume</span>
                </h1>
              </div>
              {/* Header action — opens PDF in a new tab, does not download */}
              <Button
                variant="primary" size="md"
                leftIcon={<PreviewIcon />}
                onClick={viewResume}
                aria-label="Preview resume PDF in a new tab"
                style={{ flexShrink: 0, alignSelf: 'flex-end' }}
              >
                Preview Resume
              </Button>
            </div>
          </motion.div>

          {/* ── PROFESSIONAL SUMMARY ─────────────────────────────────────────── */}
          <motion.div {...fadeUp(0.05)} style={{ marginBottom: '2rem' }}>
            <div style={{
              padding: '2.25rem 2.5rem',
              background: 'rgba(13,20,36,0.90)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderLeft: '3px solid var(--accent)',
              borderRadius: '0 16px 16px 0',
              backdropFilter: 'blur(20px)',
            }}>
              {/* Eyebrow */}
              <p style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '0.6875rem', fontWeight: 700,
                color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
                Professional Summary
              </p>
              {/* Summary prose — constrained for comfortable reading */}
              <p style={{
                fontSize: '1.0625rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.85,
                maxWidth: '62ch',
              }}>
                {resume.summary}
              </p>
            </div>
          </motion.div>

          {/* ── HORIZONTAL RULE ──────────────────────────────────────────────── */}
          <div style={{
            height: '1px',
            background: 'rgba(255,255,255,0.05)',
            marginBottom: '2rem',
          }} aria-hidden="true" />

          {/* ── 2-COLUMN CARD GRID ───────────────────────────────────────────── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 28rem), 1fr))',
            gap: '1.5rem',
          }}>

            {/* ── EDUCATION ──────────────────────────────────────────────────── */}
            <motion.div {...fadeUp(0.10)} style={{ height: '100%' }}>
              <div style={cardStyle} className="glass-card">
                <CardSection icon={icons.education} label="Education" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0', flex: 1 }}>
                  {resume.education.map((edu, i) => {
                    const isLast = i === resume.education.length - 1
                    return (
                      <div key={i} style={{
                        position: 'relative',
                        paddingLeft: '1.375rem',
                        paddingBottom: isLast ? 0 : '1.75rem',
                      }}>
                        {/* Timeline spine */}
                        <div style={{
                          position: 'absolute', left: 0, top: '6px',
                          width: '10px', height: '10px', borderRadius: '50%',
                          background: i === 0 ? 'var(--accent)' : 'rgba(0,229,255,0.25)',
                          boxShadow: i === 0 ? '0 0 10px rgba(0,229,255,0.5)' : 'none',
                          zIndex: 1,
                        }} />
                        {!isLast && (
                          <div style={{
                            position: 'absolute', left: '4px', top: '18px',
                            width: '1px',
                            bottom: '0',
                            background: 'linear-gradient(180deg, rgba(0,229,255,0.20) 0%, rgba(0,229,255,0.05) 100%)',
                          }} aria-hidden="true" />
                        )}

                        {/* Content */}
                        <p style={{
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          fontSize: '0.9375rem', fontWeight: 700,
                          color: 'var(--text-primary)', lineHeight: 1.3,
                          marginBottom: '0.3rem',
                        }}>
                          {edu.institution}
                        </p>
                        <p style={{
                          fontSize: '0.875rem', fontWeight: 500,
                          color: 'var(--accent)', lineHeight: 1.4,
                          marginBottom: '0.3rem',
                        }}>
                          {edu.degree}
                        </p>
                        <p style={{
                          display: 'inline-flex', alignItems: 'center',
                          fontSize: '0.75rem', fontWeight: 600,
                          color: 'var(--text-muted)',
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          letterSpacing: '0.03em',
                          marginBottom: edu.details ? '0.4rem' : 0,
                        }}>
                          {edu.period}
                        </p>
                        {edu.details && (
                          <p style={{
                            fontSize: '0.8125rem', color: 'var(--text-muted)',
                            lineHeight: 1.65, fontStyle: 'italic',
                          }}>
                            {edu.details}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* ── CERTIFICATIONS ─────────────────────────────────────────────── */}
            <motion.div {...fadeUp(0.16)} style={{ height: '100%' }}>
              <div style={cardStyle} className="glass-card">
                <CardSection icon={icons.cert} label="Certifications" />

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', flex: 1 }}>
                  {resume.certifications.map((cert, i) => {
                    const s = statusCfg[cert.status]
                    return (
                      <li key={i} style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', gap: '1.25rem',
                        padding: '1rem 1.25rem',
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '10px',
                      }}>
                        {/* Left: icon + name */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', minWidth: 0 }}>
                          <span style={{
                            flexShrink: 0, marginTop: '2px',
                            color: s.color, opacity: 0.8,
                          }}>
                            {icons.cert}
                          </span>
                          <div style={{ minWidth: 0 }}>
                            <p style={{
                              fontFamily: "'Space Grotesk', system-ui, sans-serif",
                              fontSize: '0.9rem', fontWeight: 600,
                              color: 'var(--text-primary)', lineHeight: 1.35,
                            }}>
                              {cert.name}
                            </p>
                            {(cert as { issuer?: string }).issuer && (
                              <p style={{
                                fontSize: '0.75rem', color: 'var(--text-muted)',
                                marginTop: '0.2rem',
                              }}>
                                {(cert as { issuer?: string }).issuer}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right: status badge */}
                        <span style={{
                          flexShrink: 0,
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem', fontWeight: 600,
                          background: s.bg, border: `1px solid ${s.border}`, color: s.color,
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          letterSpacing: '0.03em', whiteSpace: 'nowrap',
                        }}>
                          {s.label}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </motion.div>

            {/* ── CORE COMPETENCIES ──────────────────────────────────────────── */}
            <motion.div {...fadeUp(0.22)} style={{ height: '100%' }}>
              <div style={cardStyle} className="glass-card">
                <CardSection icon={icons.skills} label="Core Competencies" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                  {competencyGroups.map(group => {
                    // Only render groups whose keys appear in the content
                    const badges = group.keys.filter(k =>
                      resume.coreCompetencies.includes(k)
                    )
                    if (badges.length === 0) return null
                    return (
                      <div key={group.label}>
                        {/* Group label */}
                        <p style={{
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          fontSize: '0.6875rem', fontWeight: 700,
                          color: group.color,
                          letterSpacing: '0.10em', textTransform: 'uppercase',
                          marginBottom: '0.625rem',
                        }}>
                          {group.label}
                        </p>
                        {/* Badges */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
                          role="list" aria-label={group.label}>
                          {badges.map(badge => (
                            <span key={badge} role="listitem" style={{
                              display: 'inline-flex', alignItems: 'center',
                              height: '30px', padding: '0 0.875rem',
                              background: group.tint,
                              border: `1px solid ${group.ring}`,
                              borderRadius: '8px',
                              fontSize: '0.8125rem', fontWeight: 500,
                              color: 'var(--text-secondary)',
                              whiteSpace: 'nowrap',
                              transition: 'background 0.15s, color 0.15s',
                            }}>
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* ── EXPERIENCE ─────────────────────────────────────────────────── */}
            <motion.div {...fadeUp(0.28)} style={{ height: '100%' }}>
              <div style={cardStyle} className="glass-card">
                <CardSection icon={icons.briefcase} label="Experience" />

                {/* Capstone project — structured as a proper resume entry */}
                <div style={{ flex: 1 }}>
                  {/* Role header */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{
                      display: 'flex', flexWrap: 'wrap',
                      justifyContent: 'space-between', alignItems: 'flex-start',
                      gap: '0.625rem', marginBottom: '0.375rem',
                    }}>
                      <p style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '1rem', fontWeight: 700,
                        color: 'var(--text-primary)', lineHeight: 1.25,
                      }}>
                        UI Designer &amp; Technical Writer
                      </p>
                      <span style={{
                        flexShrink: 0,
                        padding: '0.2rem 0.75rem',
                        background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.20)',
                        borderRadius: '9999px',
                        fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)',
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        whiteSpace: 'nowrap',
                      }}>
                        2024 – 2025
                      </span>
                    </div>
                    <p style={{
                      fontSize: '0.875rem', fontWeight: 500,
                      color: 'var(--accent)', lineHeight: 1.3,
                    }}>
                      Student Counseling Tracker System — Capstone Project
                    </p>
                  </div>

                  {/* Divider */}
                  <div style={{
                    height: '1px', background: 'rgba(255,255,255,0.05)',
                    marginBottom: '1.25rem',
                  }} aria-hidden="true" />

                  {/* Responsibilities */}
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      'Designed the full system UI in Figma, including wireframes, component states, and interactive prototypes',
                      'Built a consistent visual language and component library for use across the application',
                      'Prepared technical documentation, project reports, and design specifications',
                      'Assisted in frontend implementation, translating Figma designs into working interfaces',
                    ].map(item => (
                      <li key={item} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
                      }}>
                        <span style={{ flexShrink: 0, marginTop: '2px' }}>{icons.check}</span>
                        <span style={{
                          fontSize: '0.875rem', color: 'var(--text-secondary)',
                          lineHeight: 1.7,
                        }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Note */}
                  <p style={{
                    fontSize: '0.75rem', color: 'var(--text-muted)',
                    marginTop: '1.25rem', fontStyle: 'italic', lineHeight: 1.6,
                  }}>
                    Additional professional experience will be added as it becomes available.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>{/* end grid */}

          {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true as const }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              textAlign: 'center', marginTop: '3rem',
              padding: '2.5rem 2rem',
              background: 'rgba(0,229,255,0.03)',
              border: '1px solid rgba(0,229,255,0.09)',
              borderRadius: '16px',
            }}
          >
            <p style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '1rem', fontWeight: 600,
              color: 'var(--text-primary)', marginBottom: '0.375rem',
            }}>
              Want the full document?
            </p>
            <p style={{
              fontSize: '0.875rem', color: 'var(--text-muted)',
              marginBottom: '1.5rem', lineHeight: 1.6,
            }}>
              Download the PDF for a complete, print-ready overview.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="primary" size="lg" leftIcon={<DownloadIcon />}
                onClick={downloadResume}
                aria-label="Download full resume PDF">
                {resume.downloadLabel}
              </Button>
            </div>
          </motion.div>

        </Container>
      </section>
    </>
  )
}
