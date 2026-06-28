import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { PageMeta } from '@/components/ui/PageMeta'
import { AboutHero } from '@/components/ui/AboutHero'

/* ── fadeUp helper (used by lower sections only) ─────────────────────────── */
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
// (removed — replaced by vertical timeline)

/* ── Why Work With Me — dashboard card data ──────────────────────────────── */
const whyWorkCards = [
  {
    title: 'Creative Thinking',
    description: 'Combines technical and creative problem solving to build solutions that are both functional and visually compelling.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    title: 'UI/UX Systems',
    description: 'Strong interest in user-centered design systems — from wireframing to polished, accessible interfaces.',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
  },
  {
    title: 'Frontend Growth',
    description: 'Actively building frontend development skills with React, TypeScript, and modern tooling every day.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
  {
    title: 'Quality Focused',
    description: 'Detail-oriented and committed to clean execution — the small things make the difference between good and great.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    title: 'Fast Learner',
    description: 'Always improving and adapting to new tools, frameworks, and design patterns to stay current and effective.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Collaborative',
    description: 'Reliable, professional, and easy to work with — open to feedback and committed to delivering quality on time.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
]

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
      <AboutHero />

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
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, flex: 1 }}>
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
                height: '100%', display: 'flex', flexDirection: 'column',
                padding: '2rem 2rem 2.25rem',
                background: 'rgba(13,20,36,0.90)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', backdropFilter: 'blur(20px)',
              }} className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.75rem' }}>
                  <div style={{
                    width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,149,255,0.10)', border: '1px solid rgba(0,149,255,0.25)',
                    borderRadius: '10px', flexShrink: 0,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,200,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '0.125rem' }}>Career Goals</h2>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', system-ui, sans-serif", letterSpacing: '0.04em' }}>What I'm building toward</p>
                  </div>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                  {about.careerGoals.map(goal => (
                    <li key={goal} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <CheckIcon />
                      <span style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Current Focus */}
            <motion.div {...fadeUp(0.12)} style={{ height: '100%' }}>
              <div style={{
                height: '100%', display: 'flex', flexDirection: 'column',
                padding: '2rem 2rem 2.25rem',
                background: 'rgba(13,20,36,0.90)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', backdropFilter: 'blur(20px)',
              }} className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.75rem' }}>
                  <div style={{
                    width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.22)',
                    borderRadius: '10px', flexShrink: 0,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                    </svg>
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '0.125rem' }}>Current Focus</h2>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', system-ui, sans-serif", letterSpacing: '0.04em' }}>Right now, actively working on</p>
                  </div>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                  {about.currentFocus.map(focus => (
                    <li key={focus} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <DiamondDot />
                      <span style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── EDUCATION — Vertical Timeline ──────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Education">
        <Container>
          <SectionTitle title="Education" subtitle="Academic background and learning institutions." align="left" />

          {/* Timeline wrapper */}
          <div style={{ maxWidth: '760px', position: 'relative', marginTop: '2.5rem' }}>

            {/* Vertical spine line */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '11px',
                top: '12px',
                bottom: '12px',
                width: '2px',
                background: 'linear-gradient(180deg, rgba(0,229,255,0.55) 0%, rgba(0,229,255,0.12) 100%)',
                borderRadius: '2px',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {about.education.map((edu, i) => {
                const isFirst = i === 0
                return (
                  <motion.div
                    key={`${edu.institution}-${i}`}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true as const, margin: '-24px' }}
                    transition={{ duration: 0.42, delay: i * 0.1, ease: 'easeOut' }}
                    style={{ display: 'flex', gap: '1.75rem', alignItems: 'flex-start' }}
                  >
                    {/* Timeline dot */}
                    <div style={{ flexShrink: 0, position: 'relative', zIndex: 1, marginTop: '22px' }}>
                      <motion.div
                        animate={{ boxShadow: isFirst
                          ? ['0 0 0 0 rgba(0,229,255,0.45)', '0 0 0 7px rgba(0,229,255,0)', '0 0 0 0 rgba(0,229,255,0)']
                          : undefined
                        }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                        style={{
                          width: '24px', height: '24px', borderRadius: '50%',
                          background: isFirst
                            ? 'radial-gradient(circle, #00e5ff 0%, #0095ff 100%)'
                            : 'rgba(0,229,255,0.12)',
                          border: isFirst
                            ? '2px solid rgba(0,229,255,0.9)'
                            : '2px solid rgba(0,229,255,0.35)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        {/* Inner dot */}
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: isFirst ? '#fff' : 'rgba(0,229,255,0.7)',
                        }} />
                      </motion.div>
                    </div>

                    {/* Card */}
                    <div
                      className="edu-timeline-card"
                      style={{
                        flex: 1,
                        padding: '1.5rem',
                        background: isFirst
                          ? 'rgba(0,149,255,0.05)'
                          : 'rgba(13,20,36,0.90)',
                        border: isFirst
                          ? '1px solid rgba(0,229,255,0.22)'
                          : '1px solid rgba(0,229,255,0.10)',
                        borderRadius: '18px',
                        backdropFilter: 'blur(20px)',
                        boxShadow: isFirst ? '0 0 28px rgba(0,229,255,0.07)' : 'none',
                        transition: 'border-color 0.22s ease, box-shadow 0.22s ease, transform 0.25s ease',
                        cursor: 'default',
                      }}
                    >
                      {/* Card top row: school name + date badge */}
                      <div style={{
                        display: 'flex', flexWrap: 'wrap',
                        justifyContent: 'space-between', alignItems: 'flex-start',
                        gap: '0.625rem', marginBottom: '0.625rem',
                      }}>
                        <p style={{
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          fontSize: '1rem', fontWeight: 700,
                          color: 'var(--text-primary)', lineHeight: 1.3,
                          flex: 1, minWidth: 0,
                        }}>
                          {edu.institution}
                        </p>

                        {/* Date badge — pill, right side */}
                        <span style={{
                          flexShrink: 0,
                          padding: '0.25rem 0.75rem',
                          background: 'transparent',
                          border: '1px solid rgba(0,229,255,0.35)',
                          borderRadius: '9999px',
                          fontSize: '0.6875rem', fontWeight: 600,
                          color: 'var(--accent)',
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                        }}>
                          {edu.period}
                        </span>
                      </div>

                      {/* Divider */}
                      <div style={{ height: '1px', background: 'rgba(0,229,255,0.08)', marginBottom: '0.625rem' }} aria-hidden="true" />

                      {/* Degree / level */}
                      <p style={{
                        fontSize: '0.9rem', fontWeight: 600,
                        color: isFirst ? 'var(--accent)' : 'var(--text-secondary)',
                        lineHeight: 1.45,
                        marginBottom: edu.details ? '0.5rem' : 0,
                      }}>
                        {edu.degree}
                      </p>

                      {/* Description */}
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
          </div>
        </Container>
      </section>

      {/* ── WHY WORK WITH ME — Dashboard Cards ──────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Why work with me">
        <Container>
          <SectionTitle title="Why Work With Me" subtitle="What I bring to every collaboration." align="left" />

          <div className="why-work-grid" style={{ maxWidth: '900px', marginTop: '2rem' }}>
            {whyWorkCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true as const, margin: '-16px' }}
                transition={{ duration: 0.42, delay: i * 0.08, ease: 'easeOut' }}
                style={{ height: '100%' }}
              >
                <div
                  className="why-work-card"
                  style={{
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                    padding: '1.5rem',
                    background: 'rgba(13,20,36,0.90)',
                    border: '1px solid rgba(0,229,255,0.12)',
                    borderRadius: '18px',
                    backdropFilter: 'blur(20px)',
                    transition: 'border-color 0.22s ease, box-shadow 0.22s ease, transform 0.25s ease',
                    cursor: 'default',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '44px', height: '44px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,229,255,0.07)',
                    border: '1px solid rgba(0,229,255,0.18)',
                    borderRadius: '12px',
                    marginBottom: '1rem',
                    flexShrink: 0,
                  }}>
                    <svg
                      width="20" height="20" viewBox="0 0 24 24"
                      fill="none" stroke="var(--accent)"
                      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={card.icon} />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '1rem', fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.25,
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                    flex: 1,
                  }}>
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
