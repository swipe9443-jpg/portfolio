import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'
import heroPhoto from '@/assets/hero.png'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.45, delay, ease: 'easeOut' as const },
})

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
    style={{ flexShrink: 0, marginTop: '3px' }}>
    <circle cx="7" cy="7" r="6" stroke="rgba(0,229,255,0.25)" />
    <path d="M4.5 7l1.75 1.75 3.25-3" stroke="var(--accent)"
      strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function About() {
  const { about } = content

  return (
    <section id="about" className="section-wrapper section-divided relative overflow-hidden" aria-label="About">
      <div className="glow-blob opacity-[0.05]" style={{
        width: '400px', height: '400px',
        top: '50%', left: '-5rem', transform: 'translateY(-50%)',
        background: 'radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)',
      }} aria-hidden="true" />

      <Container className="relative z-10">
        <SectionTitle title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── LEFT — photo + stats ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true as const }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Photo */}
            <div className="photo-frame" style={{
              height: '480px', marginBottom: '1rem',
              boxShadow: '0 0 0 1px rgba(0,229,255,0.12), 0 24px 64px rgba(0,0,0,0.6)',
            }}>
              <img src={heroPhoto} alt="Josh Fallarcuna" />
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {[
                { value: '3+', label: 'Projects' },
                { value: '2+', label: 'Yrs Learning' },
                { value: '100%', label: 'Dedication' },
              ].map(s => (
                <div key={s.label} className="stat-box">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT — text content ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Paragraphs */}
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

            {/* Design philosophy quote — cyan highlighted block from reference */}
            <motion.div {...fadeUp(0.12)} style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(0,229,255,0.07)',
              border: '1px solid rgba(0,229,255,0.18)',
              borderLeft: '3px solid var(--accent)',
              borderRadius: '0 10px 10px 0',
            }}>
              <p style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '0.9375rem', fontStyle: 'italic',
                color: 'var(--text-secondary)', lineHeight: 1.75,
              }}>
                "I design intuitive digital experiences and build modern web applications that
                transform ideas into polished products."
              </p>
              <p style={{
                marginTop: '0.5rem', fontSize: '0.8125rem',
                color: 'var(--accent)', fontWeight: 600,
              }}>
                — Design Philosophy
              </p>
            </motion.div>

            {/* Personal info */}
            <motion.div {...fadeUp(0.18)}>
              <Card padding="md">
                <dl>
                  {about.personalInfo.map((info, i) => (
                    <div key={info.label} style={{
                      display: 'flex', gap: '1rem', padding: '0.6rem 0',
                      borderBottom: i < about.personalInfo.length - 1
                        ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}>
                      <dt style={{
                        width: '6.5rem', flexShrink: 0,
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '0.6875rem', fontWeight: 600,
                        color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase',
                      }}>
                        {info.label}
                      </dt>
                      <dd style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {info.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </motion.div>

            {/* Career Goals */}
            <motion.div {...fadeUp(0.24)}>
              <Card padding="md">
                <h3 style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent)',
                  letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem',
                }}>
                  Career Goals
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {about.careerGoals.map(goal => (
                    <li key={goal} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                      fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5,
                    }}>
                      <CheckIcon />
                      {goal}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Open to */}
            <motion.div {...fadeUp(0.30)}>
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
  )
}
