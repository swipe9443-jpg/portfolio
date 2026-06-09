import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'
import { PageMeta } from '@/components/ui/PageMeta'

const categoryIcons: Record<string, string> = {
  'UI/UX Design':          'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  'Frontend Development':  'M8 9l3 3-3 3m5 0h3M3 4h18a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z',
  'Backend Development':   'M5 12h14M12 5l7 7-7 7',
  'Database':              'M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3v10c0 1.7-3.6 3-8 3s-8-1.3-8-3V7z M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  'Tools & Workflow':      'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  'Soft Skills':           'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
}

const roadmap = [
  { status: 'current',  label: 'HTML, CSS, JavaScript',         note: 'Core foundation'           },
  { status: 'current',  label: 'React + TypeScript',            note: 'Component architecture'    },
  { status: 'current',  label: 'Figma + UI/UX Design',         note: 'Design systems'            },
  { status: 'learning', label: 'Node.js + Express',            note: 'Backend fundamentals'      },
  { status: 'learning', label: 'PostgreSQL + Supabase',        note: 'Database layer'            },
  { status: 'planned',  label: 'Full-Stack Architecture',       note: 'End-to-end applications'  },
  { status: 'planned',  label: 'Testing & CI/CD',              note: 'Production quality'        },
]

const statusColors: Record<string, { dot: string; label: string; bg: string; border: string }> = {
  current:  { dot: '#22c55e', label: 'Active',    bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.20)'  },
  learning: { dot: '#f59e0b', label: 'Learning',  bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.20)' },
  planned:  { dot: 'var(--accent)', label: 'Planned', bg: 'rgba(0,229,255,0.07)', border: 'rgba(0,229,255,0.20)' },
}

export function SkillsPage() {
  const { skills } = content

  return (
    <>
      <PageMeta
        title="Skills | Josh Fallarcuna"
        description="Technical skills, tools, and capabilities — UI/UX Design, Frontend, Backend, and soft skills."
        ogTitle="Skills — Josh Fallarcuna"
        ogDescription="Explore the full stack of design and development skills including Figma, React, TypeScript, Node.js, and more."
      />
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="section-wrapper relative overflow-hidden" aria-label="Skills page">
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '400px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at top, rgba(0,149,255,0.08) 0%, transparent 70%)',
        }} aria-hidden="true" />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ maxWidth: '640px', marginBottom: '4rem' }}
          >
            <p style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)',
              letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              Technical Expertise
            </p>
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em',
              color: 'var(--text-primary)', marginBottom: '1rem',
            }}>
              Skills & <span className="text-gradient">Capabilities</span>
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              Tools, disciplines, and technologies I work with — organized by domain.
            </p>
          </motion.div>

          {/* Skill category cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true as const, margin: '-24px' }}
                transition={{ duration: 0.4, delay: idx * 0.07, ease: 'easeOut' as const }}
              >
                <Card padding="md" className="h-full" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '36px', height: '36px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)',
                      borderRadius: '8px',
                    }} aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={categoryIcons[cat.category] ?? 'M12 12h.01'} />
                      </svg>
                    </div>
                    <h2 style={{
                      fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                      fontSize: '0.9375rem', fontWeight: 600,
                      color: 'var(--text-primary)', lineHeight: 1.2,
                    }}>
                      {cat.category}
                    </h2>
                  </div>

                  <div style={{ height: '1px', background: 'rgba(0,229,255,0.08)' }} aria-hidden="true" />

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
                    role="list" aria-label={`${cat.category} skills`}>
                    {cat.skills.map(skill => (
                      <span key={skill} role="listitem" className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── LEARNING ROADMAP ──────────────────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Learning roadmap">
        <Container>
          <SectionTitle title="Learning Roadmap" subtitle="Where I am, what I'm building towards." />
          <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {roadmap.map((item, i) => {
              const s = statusColors[item.status]
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true as const, margin: '-16px' }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
                >
                  <Card padding="md">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: s.dot, flexShrink: 0,
                          boxShadow: `0 0 8px ${s.dot}60`,
                        }} aria-hidden="true" />
                        <div>
                          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {item.label}
                          </p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                            {item.note}
                          </p>
                        </div>
                      </div>
                      <span style={{
                        flexShrink: 0, fontSize: '0.7rem', fontWeight: 600,
                        padding: '0.2rem 0.65rem', borderRadius: '9999px',
                        background: s.bg, border: `1px solid ${s.border}`, color: s.dot,
                      }}>
                        {s.label}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}
