import { motion } from 'framer-motion'
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

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }}>
    <circle cx="7" cy="7" r="6" stroke="rgba(0,229,255,0.25)" />
    <path d="M4.5 7l1.75 1.75 3.25-3" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

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
      {/* ── ABOUT HERO ────────────────────────────────────────────────────────── */}
      <section className="section-wrapper relative overflow-hidden" aria-label="About">
        <div className="glow-blob opacity-[0.05]" style={{
          width: '400px', height: '400px', top: '50%', left: '-5rem', transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)',
        }} aria-hidden="true" />

        <Container className="relative z-10">
          <SectionTitle title="About Me" align="left" subtitle="The story behind the work." />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* LEFT — photo + stats */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true as const }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="photo-frame-transparent" style={{
                height: '480px', marginBottom: '1rem',
                boxShadow: '0 0 0 1px rgba(0,229,255,0.10), 0 24px 64px rgba(0,0,0,0.5)',
              }}>
                <img src={heroPhoto} alt="Josh Fallarcuna" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <motion.div {...fadeUp(0.05)}>
                {about.paragraphs.map((p, i) => (
                  <p key={i} style={{
                    fontSize: '1rem', color: 'var(--text-secondary)',
                    lineHeight: 1.8, marginBottom: i < about.paragraphs.length - 1 ? '1rem' : 0,
                  }}>
                    {p}
                  </p>
                ))}
              </motion.div>

              <motion.div {...fadeUp(0.12)} style={{
                padding: '1.25rem 1.5rem',
                background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.18)',
                borderLeft: '3px solid var(--accent)', borderRadius: '0 10px 10px 0',
              }}>
                <p style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '0.9375rem', fontStyle: 'italic',
                  color: 'var(--text-secondary)', lineHeight: 1.75,
                }}>
                  "I design intuitive digital experiences and build modern web applications that transform ideas into polished products."
                </p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 600 }}>
                  — Design Philosophy
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.18)}>
                <Card padding="md">
                  <dl>
                    {about.personalInfo.map((info, i) => (
                      <div key={info.label} style={{
                        display: 'flex', gap: '1rem', padding: '0.6rem 0',
                        borderBottom: i < about.personalInfo.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      }}>
                        <dt style={{
                          width: '6.5rem', flexShrink: 0,
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          fontSize: '0.6875rem', fontWeight: 600,
                          color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase',
                        }}>
                          {info.label}
                        </dt>
                        <dd style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{info.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Card>
              </motion.div>

              <motion.div {...fadeUp(0.24)}>
                <div style={{
                  padding: '1rem 1.25rem',
                  background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.12)',
                  borderRadius: '10px',
                }}>
                  <p style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent)',
                    letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: '0.6rem',
                  }}>
                    Open to
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {['Internships', 'Collaborations', 'Freelance', 'Learning Opportunities'].map(tag => (
                      <span key={tag} style={{
                        padding: '0.25rem 0.7rem',
                        background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.14)',
                        borderRadius: '9999px', fontSize: '0.8125rem', color: 'var(--text-secondary)',
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

      {/* ── TIMELINE ──────────────────────────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Journey timeline">
        <Container>
          <SectionTitle title="My Journey" subtitle="From curiosity to craft — the story so far." />
          <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {about.timeline.map((entry, i) => (
              <motion.div
                key={entry.year + entry.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true as const, margin: '-20px' }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
                style={{ display: 'flex', gap: '1.5rem', paddingBottom: i < about.timeline.length - 1 ? '2rem' : 0 }}
              >
                {/* Timeline spine */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '0.6875rem', fontWeight: 700, color: 'var(--accent)',
                  }}>
                    {entry.year.slice(2)}
                  </div>
                  {i < about.timeline.length - 1 && (
                    <div style={{ flex: 1, width: '1px', background: 'rgba(0,229,255,0.12)', marginTop: '8px' }} aria-hidden="true" />
                  )}
                </div>

                {/* Content */}
                <Card padding="md" style={{ flex: 1, marginBottom: i < about.timeline.length - 1 ? '0' : '0' }}>
                  <p style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent)',
                    letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: '0.375rem',
                  }}>
                    {entry.year}
                  </p>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem',
                  }}>
                    {entry.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {entry.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CORE VALUES ───────────────────────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Core values">
        <Container>
          <SectionTitle title="Core Values" subtitle="The principles that guide how I work." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {about.coreValues.map((val, i) => (
              <motion.div key={val.title} {...fadeUp(i * 0.1)}>
                <Card padding="lg" className="h-full">
                  <h3 style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '1rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.625rem',
                  }}>
                    {val.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                    {val.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CAREER GOALS + CURRENT FOCUS ─────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Career goals and current focus">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeUp(0.05)}>
              <Card padding="lg" className="h-full">
                <h2 style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem',
                }}>
                  Career Goals
                </h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {about.careerGoals.map(goal => (
                    <li key={goal} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <CheckIcon />
                      {goal}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div {...fadeUp(0.12)}>
              <Card padding="lg" className="h-full">
                <h2 style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem',
                }}>
                  Current Focus
                </h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {about.currentFocus.map(focus => (
                    <li key={focus} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)',
                        flexShrink: 0, marginTop: '7px',
                      }} aria-hidden="true" />
                      {focus}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── EDUCATION ─────────────────────────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Education">
        <Container>
          <SectionTitle title="Education" subtitle="Academic background and learning institutions." align="left" />
          <div style={{ maxWidth: '720px' }}>
            {about.education.map((edu, i) => (
              <motion.div
                key={`${edu.institution}-${i}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true as const, margin: '-24px' }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                style={{ marginBottom: i < about.education.length - 1 ? '1.25rem' : 0 }}
              >
                <Card padding="lg">
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div>
                      <p style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem',
                      }}>
                        {edu.institution}
                      </p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 500, marginBottom: '0.25rem' }}>
                        {edu.degree}
                      </p>
                      {edu.details && (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                          {edu.details}
                        </p>
                      )}
                    </div>
                    <span style={{
                      flexShrink: 0, padding: '0.25rem 0.75rem',
                      background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.18)',
                      borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600,
                      color: 'var(--accent)',
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    }}>
                      {edu.period}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── WHY WORK WITH ME ──────────────────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Why work with me">
        <Container>
          <SectionTitle title="Why Work With Me" subtitle="What I bring to every collaboration." align="left" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ maxWidth: '900px' }}>
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
                  background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.10)',
                  borderRadius: '10px',
                }}>
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '2px',
                    background: 'var(--accent)', transform: 'rotate(45deg)',
                    flexShrink: 0,
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
