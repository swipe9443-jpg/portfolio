import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { PageMeta } from '@/components/ui/PageMeta'

// ── Category metadata: icon, accent colour, description ───────────────────────
const categoryMeta: Record<string, {
  icon: JSX.Element
  accent: string
  description: string
}> = {
  'Design & Creativity': {
    accent: '#00e5ff',
    description: 'Visual design, prototyping tools, and creative problem-solving.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5"  cy="7.5"  r=".5" fill="currentColor" />
        <circle cx="6.5"  cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125A1.64 1.64 0 0 1 14.441 18h1.978c3.051 0 5.555-2.503 5.555-5.554C21.974 6.012 17.491 2 12 2z" />
      </svg>
    ),
  },
  'Frontend Development': {
    accent: '#7dd3fc',
    description: 'Building responsive interfaces and modern web experiences.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  'Computer Science Fundamentals': {
    accent: '#a78bfa',
    description: 'Core CS concepts, algorithms, and software engineering principles.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
      </svg>
    ),
  },
  'Professional Skills': {
    accent: '#4ade80',
    description: 'Soft skills and professional attributes for team environments.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  'Current Focus': {
    accent: '#fb923c',
    description: 'Active areas of growth and professional development goals.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
}

const fallbackMeta = {
  accent: '#00e5ff',
  description: 'Skills and capabilities in this area.',
  icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M18.66 5.34l1.41-1.41" />
    </svg>
  ),
}

// ── Animation variants ────────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' as const },
  }),
}

// ── Learning roadmap ──────────────────────────────────────────────────────────
const roadmap = [
  { status: 'current',  label: 'HTML, CSS, JavaScript',  note: 'Core web foundation'       },
  { status: 'current',  label: 'Figma + UI/UX Design',   note: 'Design systems & prototypes' },
  { status: 'current',  label: 'Adobe Photoshop',        note: 'Visual editing & assets'   },
  { status: 'learning', label: 'React + TypeScript',     note: 'Component architecture'    },
  { status: 'learning', label: 'Responsive Design',      note: 'Mobile-first interfaces'   },
  { status: 'planned',  label: 'Node.js + Express',      note: 'Backend fundamentals'      },
  { status: 'planned',  label: 'Full-Stack Projects',    note: 'End-to-end applications'   },
]

const statusConfig: Record<string, { dot: string; label: string; bg: string; border: string }> = {
  current:  { dot: '#22c55e', label: 'Active',   bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.22)'  },
  learning: { dot: '#f59e0b', label: 'Learning', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.22)' },
  planned:  { dot: '#00e5ff', label: 'Planned',  bg: 'rgba(0,229,255,0.07)',  border: 'rgba(0,229,255,0.20)'  },
}

export function SkillsPage() {
  const { skills } = content

  return (
    <>
      <PageMeta
        title="Skills | Josh Fallarcuna"
        description="Technical skills, tools, and capabilities — UI/UX Design, Frontend Development, and Computer Science fundamentals."
        ogTitle="Skills — Josh Fallarcuna"
        ogDescription="Explore the full range of design and development skills including Figma, HTML, CSS, JavaScript, and more."
      />

      {/* ══════════════════════════════════════════════════════════════════════
          PAGE HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-wrapper relative overflow-hidden" aria-label="Skills overview">
        {/* Ambient top glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '860px', height: '420px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at top, rgba(0,149,255,0.08) 0%, rgba(0,229,255,0.03) 50%, transparent 75%)',
        }} aria-hidden="true" />

        <Container className="relative z-10">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ maxWidth: '600px', marginBottom: '5rem' }}
          >
            <p className="page-hero-label">Technical Expertise</p>
            <h1 className="page-hero-heading">
              Skills &amp; <span className="text-gradient">Capabilities</span>
            </h1>
            <p className="page-hero-body">
              Tools, disciplines, and technologies I work with — organised by domain.
              Each category reflects real skills I'm actively building and applying.
            </p>
          </motion.div>

          {/* ── Skill category cards ─────────────────────────────────────────── */}
          <div
            className="skills-grid"
            role="list"
            aria-label="Skill categories"
          >
            {skills.map((cat, idx) => {
              const meta = categoryMeta[cat.category] ?? fallbackMeta
              return (
                <motion.div
                  key={cat.id}
                  role="listitem"
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-24px' }}
                  variants={cardVariants}
                  className="skill-category-card"
                >
                  {/* Top accent bar */}
                  <div
                    className="skill-cat-accent-bar"
                    style={{ background: meta.accent }}
                    aria-hidden="true"
                  />

                  <div style={{ padding: '1.75rem' }}>
                    {/* ── Card header ────────────────────────── */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                      {/* Icon circle */}
                      <div
                        className="skill-cat-icon"
                        style={{
                          color: meta.accent,
                          background: `${meta.accent}12`,
                          border: `1px solid ${meta.accent}28`,
                        }}
                        aria-hidden="true"
                      >
                        {meta.icon}
                      </div>

                      <div style={{ flex: 1, minWidth: 0, paddingTop: '2px' }}>
                        <h2 style={{
                          fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                          fontSize: '0.9375rem', fontWeight: 700,
                          color: '#ffffff', lineHeight: 1.3,
                          letterSpacing: '-0.01em', margin: 0,
                        }}>
                          {cat.category}
                        </h2>
                        <p style={{
                          fontSize: '0.6875rem', color: 'var(--text-muted)',
                          fontWeight: 500, letterSpacing: '0.06em',
                          textTransform: 'uppercase', margin: '4px 0 0',
                        }}>
                          {cat.skills.length} skill{cat.skills.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: '0.8125rem', color: 'var(--text-muted)',
                      lineHeight: 1.6, marginBottom: '1.25rem',
                    }}>
                      {meta.description}
                    </p>

                    {/* Divider */}
                    <div style={{
                      height: '1px', background: 'rgba(255,255,255,0.06)',
                      marginBottom: '1.25rem',
                    }} aria-hidden="true" />

                    {/* ── Skill badges ─────────────────────────── */}
                    <div
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
                      aria-label={`${cat.category} skills`}
                    >
                      {cat.skills.map(skill => (
                        <span
                          key={skill}
                          className="skill-badge"
                          style={{
                            borderColor: `${meta.accent}18`,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          LEARNING ROADMAP
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-wrapper section-divided" aria-label="Learning roadmap">
        <Container>
          <SectionTitle
            title="Learning Roadmap"
            subtitle="Where I am today and what I'm actively building towards."
          />

          <div style={{
            maxWidth: '720px', margin: '0 auto',
            display: 'flex', flexDirection: 'column', gap: '0.75rem',
          }}>
            {roadmap.map((item, i) => {
              const s = statusConfig[item.status]
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-16px' }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
                >
                  <div className="glass-card roadmap-row">
                    {/* Left: dot + content */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span
                        style={{
                          width: '9px', height: '9px', borderRadius: '50%',
                          background: s.dot, flexShrink: 0,
                          boxShadow: `0 0 8px ${s.dot}70`,
                        }}
                        aria-hidden="true"
                      />
                      <div>
                        <p style={{
                          fontSize: '0.9375rem', fontWeight: 600,
                          color: 'var(--text-primary)', lineHeight: 1.3,
                        }}>
                          {item.label}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {item.note}
                        </p>
                      </div>
                    </div>

                    {/* Right: status pill */}
                    <span style={{
                      flexShrink: 0, fontSize: '0.6875rem', fontWeight: 600,
                      padding: '0.25rem 0.75rem', borderRadius: '9999px',
                      background: s.bg, border: `1px solid ${s.border}`,
                      color: s.dot, whiteSpace: 'nowrap',
                      letterSpacing: '0.05em', textTransform: 'uppercase',
                    }}>
                      {s.label}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}
