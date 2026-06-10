import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'
import { PageMeta } from '@/components/ui/PageMeta'
import heroPhoto from '@/assets/profile.png'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.45, delay, ease: 'easeOut' as const },
})

/* ── Icon components ──────────────────────────────────────────────────────── */

/** Animated pulsing dot for "Current" badges */
const PulseDot = () => (
  <span style={{
    width: '6px', height: '6px', borderRadius: '50%',
    background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.9)',
    flexShrink: 0, display: 'inline-block',
  }} aria-hidden="true" />
)

/** Checkmark for Career Goals list */
const CheckIcon = () => (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    aria-hidden="true"
    style={{ flexShrink: 0, marginTop: '2px' }}
  >
    <circle cx="8" cy="8" r="7" stroke="rgba(0,229,255,0.20)" strokeWidth="1" />
    <path
      d="M5 8l2.2 2.2 3.8-3.8"
      stroke="var(--accent)" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

/** Diamond bullet for Current Focus list */
const DiamondDot = () => (
  <span style={{
    width: '7px', height: '7px', borderRadius: '2px',
    background: 'var(--accent)', transform: 'rotate(45deg)',
    flexShrink: 0, marginTop: '6px', opacity: 0.85,
  }} aria-hidden="true" />
)

/* ── Value card icon glyphs ───────────────────────────────────────────────── */
const valueIcons: Record<string, ReactNode> = {
  'Clarity Over Complexity': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  'Continuous Improvement': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  'Empathy First': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  'Craft & Attention to Detail': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
}

/* ── Education level badge colours ───────────────────────────────────────── */
const eduLevelColor: Record<number, { bg: string; border: string; text: string }> = {
  0: { bg: 'rgba(0,149,255,0.10)', border: 'rgba(0,149,255,0.30)', text: 'rgba(0,200,255,1)'  },
  1: { bg: 'rgba(0,229,255,0.07)', border: 'rgba(0,229,255,0.20)', text: 'var(--accent)'       },
  2: { bg: 'rgba(100,116,139,0.08)', border: 'rgba(100,116,139,0.22)', text: 'var(--text-muted)' },
}

export function AboutPage() {
  const { about } = content

  return (
    <>
      <PageMeta
        title="About | Josh Fallarcuna"
        description="Learn about Josh Fallarcuna — aspiring UI/UX Designer and Full-Stack Developer. My story, journey, values, and current focus."
        ogTitle="About Josh Fallarcuna"
        ogDescription="The story behind the work — journey, values, education, and career goals."
      />

      {/* ── ABOUT HERO ─────────────────────────────────────────────────────────── */}
      <section className="section-wrapper relative overflow-hidden" aria-label="About">
        <div className="glow-blob opacity-[0.05]" style={{
          width: '400px', height: '400px', top: '50%', left: '-5rem', transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)',
        }} aria-hidden="true" />

        <Container className="relative z-10">
          <SectionTitle title="About Me" align="left" subtitle="The story behind the work." />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* LEFT — photo + stats */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true as const }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="photo-frame-transparent" style={{
                height: '520px', marginBottom: '1.5rem',
                boxShadow: '0 0 0 1px rgba(0,229,255,0.12), 0 32px 72px rgba(0,0,0,0.55)',
              }}>
                <img src={heroPhoto} alt="Josh Fallarcuna" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.875rem' }}>
                {[
                  { value: '3+',   label: 'Projects'    },
                  { value: '2+',   label: 'Yrs Learning' },
                  { value: '100%', label: 'Dedication'  },
                ].map(s => (
                  <div key={s.label} className="stat-box">
                    <span className="stat-value">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* Name + Title */}
              <motion.div {...fadeUp(0)}>
                <p style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '0.6875rem', fontWeight: 600,
                  color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase',
                  marginBottom: '0.625rem',
                }}>
                  Full Name
                </p>
                <h1 style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 'clamp(1.625rem, 3.5vw, 2.125rem)',
                  fontWeight: 700, lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}>
                  Josh Valeri D. Fallarcuna
                </h1>
                <p style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '0.9375rem', fontWeight: 500,
                  color: 'var(--accent)', lineHeight: 1.4,
                }}>
                  Aspiring UI/UX Designer &amp; Full-Stack Developer
                </p>
              </motion.div>

              {/* Biography */}
              <motion.div {...fadeUp(0.06)}>
                <p style={{
                  fontSize: '0.6875rem', fontWeight: 600,
                  color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase',
                  marginBottom: '0.875rem',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                }}>
                  Biography
                </p>
                {about.paragraphs.map((p, i) => (
                  <p key={i} style={{
                    fontSize: '1rem', color: 'var(--text-secondary)',
                    lineHeight: 1.85,
                    marginBottom: i < about.paragraphs.length - 1 ? '1.125rem' : 0,
                  }}>
                    {p}
                  </p>
                ))}
              </motion.div>

              {/* Design Philosophy */}
              <motion.div {...fadeUp(0.12)} style={{
                padding: '1.375rem 1.625rem',
                background: 'rgba(0,229,255,0.05)',
                border: '1px solid rgba(0,229,255,0.14)',
                borderLeft: '3px solid var(--accent)',
                borderRadius: '0 12px 12px 0',
              }}>
                <p style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '0.9375rem', fontStyle: 'italic',
                  color: 'var(--text-secondary)', lineHeight: 1.8,
                }}>
                  "I design intuitive digital experiences and build modern web applications that transform ideas into polished products."
                </p>
                <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 600 }}>
                  — Design Philosophy
                </p>
              </motion.div>

              {/* Personal info table */}
              <motion.div {...fadeUp(0.18)}>
                <Card padding="lg">
                  <dl>
                    {about.personalInfo
                      .filter(info => !['Full Name', 'Role'].includes(info.label))
                      .map((info, i, arr) => (
                        <div key={info.label} style={{
                          display: 'flex', gap: '1.25rem',
                          padding: '0.75rem 0',
                          borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                          alignItems: 'baseline',
                        }}>
                          <dt style={{
                            width: '6.5rem', flexShrink: 0,
                            fontFamily: "'Space Grotesk', system-ui, sans-serif",
                            fontSize: '0.6875rem', fontWeight: 600,
                            color: 'var(--text-muted)',
                            letterSpacing: '0.09em', textTransform: 'uppercase',
                          }}>
                            {info.label}
                          </dt>
                          <dd style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                            {info.value}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </Card>
              </motion.div>

              {/* Open to */}
              <motion.div {...fadeUp(0.24)}>
                <div style={{
                  padding: '1.25rem 1.5rem',
                  background: 'rgba(0,229,255,0.04)',
                  border: '1px solid rgba(0,229,255,0.12)',
                  borderRadius: '12px',
                }}>
                  <p style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '0.6875rem', fontWeight: 600,
                    color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase',
                    marginBottom: '0.875rem',
                  }}>
                    Open to
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {['Internships', 'Collaborations', 'Freelance', 'Learning Opportunities'].map(tag => (
                      <span key={tag} style={{
                        padding: '0.3125rem 0.875rem',
                        background: 'rgba(0,229,255,0.06)',
                        border: '1px solid rgba(0,229,255,0.14)',
                        borderRadius: '9999px',
                        fontSize: '0.8125rem', color: 'var(--text-secondary)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </Container>
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Journey timeline">
        <Container>
          <SectionTitle title="My Journey" subtitle="From curiosity to craft — the story so far." />
          <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {about.timeline.map((entry, i) => {
              const isLast    = i === about.timeline.length - 1
              const isCurrent = entry.year === '2026'
              const tools     = entry.year === '2025' ? ['Figma', 'Adobe Photoshop'] : null

              return (
                <motion.div
                  key={entry.year + entry.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true as const, margin: '-20px' }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
                  style={{ display: 'flex', gap: '1.5rem' }}
                >
                  {/* Spine */}
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    flexShrink: 0, width: '56px',
                  }}>
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '14px', flexShrink: 0,
                      background: isCurrent
                        ? 'linear-gradient(135deg, rgba(0,149,255,0.22), rgba(0,229,255,0.14))'
                        : 'rgba(0,229,255,0.07)',
                      border: isCurrent
                        ? '1px solid rgba(0,229,255,0.40)'
                        : '1px solid rgba(0,229,255,0.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      boxShadow: isCurrent ? '0 0 24px rgba(0,229,255,0.12)' : 'none',
                    }}>
                      <span style={{
                        fontSize: '0.8125rem', fontWeight: 700,
                        color: isCurrent ? 'var(--accent)' : 'var(--text-secondary)',
                        letterSpacing: '0.02em',
                      }}>
                        {entry.year}
                      </span>
                    </div>
                    {!isLast && (
                      <div style={{
                        flex: 1, width: '1px', minHeight: '1.5rem',
                        background: 'linear-gradient(180deg, rgba(0,229,255,0.18) 0%, rgba(0,229,255,0.05) 100%)',
                        margin: '6px 0',
                      }} aria-hidden="true" />
                    )}
                  </div>

                  {/* Content card */}
                  <div style={{ flex: 1 }}>
                    <div className="timeline-card" style={{
                      padding: '1.25rem 1.5rem',
                      background: isCurrent ? 'rgba(0,149,255,0.05)' : 'rgba(13,20,36,0.90)',
                      border: isCurrent ? '1px solid rgba(0,229,255,0.20)' : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '14px', backdropFilter: 'blur(20px)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '0.625rem' }}>
                        <h3 style={{
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)',
                          lineHeight: 1.3, margin: 0,
                        }}>
                          {entry.title}
                        </h3>
                        {isCurrent && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                            padding: '0.175rem 0.6rem',
                            background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.25)',
                            borderRadius: '9999px', fontSize: '0.6875rem', fontWeight: 600,
                            color: '#86efac', letterSpacing: '0.04em',
                          }}>
                            <PulseDot />
                            Current
                          </span>
                        )}
                      </div>
                      <p style={{
                        fontSize: '0.875rem', color: 'var(--text-secondary)',
                        lineHeight: 1.75, marginBottom: tools ? '0.875rem' : 0,
                      }}>
                        {entry.description}
                      </p>
                      {tools && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                          <span style={{
                            fontSize: '0.6875rem', color: 'var(--text-muted)',
                            fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
                            marginRight: '0.125rem',
                          }}>
                            Tools:
                          </span>
                          {tools.map(t => (
                            <span key={t} style={{
                              padding: '0.2rem 0.625rem',
                              background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.18)',
                              borderRadius: '6px', fontSize: '0.75rem', fontWeight: 500, color: 'var(--accent)',
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── CORE VALUES ─────────────────────────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Core values">
        <Container>
          <SectionTitle title="Core Values" subtitle="The principles that guide how I work." />

          {/*
            2-column grid. gap-7 (28px) gives enough gutter between cards
            at this content density without wasting space.
          */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
            gap: '1.75rem',
          }}>
            {about.coreValues.map((val, i) => (
              <motion.div key={val.title} {...fadeUp(i * 0.09)} style={{ height: '100%' }}>
                <div style={{
                  height: '100%',
                  display: 'flex', flexDirection: 'column',
                  padding: '2rem 2rem 2.25rem',
                  background: 'rgba(13,20,36,0.90)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(20px)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.25s ease',
                }}
                  className="glass-card"
                >
                  {/* Icon container */}
                  <div style={{
                    width: '48px', height: '48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,229,255,0.07)',
                    border: '1px solid rgba(0,229,255,0.16)',
                    borderRadius: '12px',
                    marginBottom: '1.375rem',
                    flexShrink: 0,
                  }}>
                    {valueIcons[val.title] ?? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    )}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '1.0625rem', fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.25,
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {val.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    flex: 1,
                  }}>
                    {val.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CAREER GOALS + CURRENT FOCUS ─────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Career goals and current focus">
        <Container>
          <SectionTitle title="Goals &amp; Focus" subtitle="Where I'm headed and what I'm working on right now." />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 26rem), 1fr))',
            gap: '1.75rem',
          }}>

            {/* Career Goals */}
            <motion.div {...fadeUp(0.05)} style={{ height: '100%' }}>
              <div style={{
                height: '100%',
                display: 'flex', flexDirection: 'column',
                padding: '2rem 2rem 2.25rem',
                background: 'rgba(13,20,36,0.90)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                backdropFilter: 'blur(20px)',
              }}
                className="glass-card"
              >
                {/* Card header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.75rem' }}>
                  <div style={{
                    width: '40px', height: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,149,255,0.10)', border: '1px solid rgba(0,149,255,0.25)',
                    borderRadius: '10px', flexShrink: 0,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,200,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <h2 style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '1.0625rem', fontWeight: 700,
                      color: 'var(--text-primary)', lineHeight: 1.2,
                      marginBottom: '0.125rem',
                    }}>
                      Career Goals
                    </h2>
                    <p style={{
                      fontSize: '0.75rem', color: 'var(--text-muted)',
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      letterSpacing: '0.04em',
                    }}>
                      What I'm building toward
                    </p>
                  </div>
                </div>

                {/* List */}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                  {about.careerGoals.map(goal => (
                    <li key={goal} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                    }}>
                      <CheckIcon />
                      <span style={{
                        fontSize: '0.9375rem', color: 'var(--text-secondary)',
                        lineHeight: 1.65,
                      }}>
                        {goal}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Current Focus */}
            <motion.div {...fadeUp(0.12)} style={{ height: '100%' }}>
              <div style={{
                height: '100%',
                display: 'flex', flexDirection: 'column',
                padding: '2rem 2rem 2.25rem',
                background: 'rgba(13,20,36,0.90)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                backdropFilter: 'blur(20px)',
              }}
                className="glass-card"
              >
                {/* Card header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.75rem' }}>
                  <div style={{
                    width: '40px', height: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.22)',
                    borderRadius: '10px', flexShrink: 0,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                    </svg>
                  </div>
                  <div>
                    <h2 style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '1.0625rem', fontWeight: 700,
                      color: 'var(--text-primary)', lineHeight: 1.2,
                      marginBottom: '0.125rem',
                    }}>
                      Current Focus
                    </h2>
                    <p style={{
                      fontSize: '0.75rem', color: 'var(--text-muted)',
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      letterSpacing: '0.04em',
                    }}>
                      Right now, actively working on
                    </p>
                  </div>
                </div>

                {/* List */}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                  {about.currentFocus.map(focus => (
                    <li key={focus} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                    }}>
                      <DiamondDot />
                      <span style={{
                        fontSize: '0.9375rem', color: 'var(--text-secondary)',
                        lineHeight: 1.65,
                      }}>
                        {focus}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* ── EDUCATION ───────────────────────────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Education">
        <Container>
          <SectionTitle title="Education" subtitle="Academic background and learning institutions." align="left" />

          {/*
            Education cards constrained to 760px — resume-width reading column.
            Each card is structured as a distinct academic record with strong
            three-level hierarchy: institution → degree → detail + period badge.
          */}
          <div style={{ maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {about.education.map((edu, i) => {
              const level = eduLevelColor[i] ?? eduLevelColor[2]
              return (
                <motion.div
                  key={`${edu.institution}-${i}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true as const, margin: '-24px' }}
                  transition={{ duration: 0.4, delay: i * 0.09, ease: 'easeOut' }}
                >
                  <div style={{
                    display: 'flex', flexDirection: 'column',
                    padding: '1.75rem 2rem',
                    background: 'rgba(13,20,36,0.90)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '16px',
                    backdropFilter: 'blur(20px)',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.25s ease',
                  }}
                    className="glass-card"
                  >
                    {/* Top row: institution name + period badge */}
                    <div style={{
                      display: 'flex', flexWrap: 'wrap',
                      justifyContent: 'space-between', alignItems: 'flex-start',
                      gap: '0.75rem',
                      marginBottom: '0.75rem',
                    }}>
                      <p style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '1.0625rem', fontWeight: 700,
                        color: 'var(--text-primary)',
                        lineHeight: 1.25, flex: 1, minWidth: 0,
                      }}>
                        {edu.institution}
                      </p>

                      {/* Period badge — level-tinted */}
                      <span style={{
                        flexShrink: 0,
                        padding: '0.3125rem 0.875rem',
                        background: level.bg,
                        border: `1px solid ${level.border}`,
                        borderRadius: '9999px',
                        fontSize: '0.75rem', fontWeight: 600,
                        color: level.text,
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        letterSpacing: '0.03em', whiteSpace: 'nowrap',
                      }}>
                        {edu.period}
                      </span>
                    </div>

                    {/* Divider between institution row and degree/detail */}
                    <div style={{
                      height: '1px',
                      background: 'rgba(255,255,255,0.05)',
                      marginBottom: '0.875rem',
                    }} aria-hidden="true" />

                    {/* Degree */}
                    <p style={{
                      fontSize: '0.9375rem', fontWeight: 600,
                      color: level.text,
                      lineHeight: 1.45,
                      marginBottom: edu.details ? '0.5rem' : 0,
                    }}>
                      {edu.degree}
                    </p>

                    {/* Details */}
                    {edu.details && (
                      <p style={{
                        fontSize: '0.8125rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.7,
                      }}>
                        {edu.details}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── WHY WORK WITH ME ────────────────────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Why work with me">
        <Container>
          <SectionTitle title="Why Work With Me" subtitle="What I bring to every collaboration." align="left" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ maxWidth: '900px' }}>
            {about.whyWorkWithMe.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true as const, margin: '-16px' }}
                transition={{ duration: 0.38, delay: i * 0.07, ease: 'easeOut' }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.875rem 1.125rem',
                  background: 'rgba(0,229,255,0.04)',
                  border: '1px solid rgba(0,229,255,0.10)',
                  borderRadius: '10px',
                }}>
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '2px',
                    background: 'var(--accent)', transform: 'rotate(45deg)', flexShrink: 0,
                  }} aria-hidden="true" />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
