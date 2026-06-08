import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import heroPhoto from '@/assets/hero.png'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
})

export function Hero() {
  const { hero } = content

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      aria-label="Introduction"
    >
      {/* Top radial glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '500px', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at top, rgba(0,149,255,0.12) 0%, rgba(0,229,255,0.05) 35%, transparent 70%)',
      }} />

      <Container className="relative z-10" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT — text content ── */}
          <div style={{ maxWidth: '560px' }}>

            {/* Status chip */}
            <motion.div {...fadeUp(0.0)} style={{ marginBottom: '1.5rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.3rem 1rem',
                background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.15)',
                borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500,
                color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
              }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e',
                  boxShadow: '0 0 8px rgba(34,197,94,0.7)',
                }} aria-hidden="true" />
                Available for Work
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p {...fadeUp(0.05)} style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: '0.875rem', fontWeight: 400, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem',
            }}>
              {hero.greeting}
            </motion.p>

            {/* H1 Name */}
            <motion.h1 {...fadeUp(0.10)} style={{
              fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.03em',
              marginBottom: '1rem',
            }}>
              <span className="text-gradient">{hero.name}</span>
            </motion.h1>

            {/* Role */}
            <motion.h2 {...fadeUp(0.18)} style={{
              fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
              fontSize: 'clamp(0.95rem, 2vw, 1.25rem)', fontWeight: 500,
              color: 'var(--accent)', lineHeight: 1.4, marginBottom: '1.5rem',
            }}>
              {hero.role}
            </motion.h2>

            {/* Introduction */}
            <motion.p {...fadeUp(0.26)} style={{
              fontSize: '1rem', color: 'var(--text-secondary)',
              lineHeight: 1.8, maxWidth: '32rem', marginBottom: '2.25rem',
            }}>
              {hero.introduction}
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.34)} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Button variant="primary" size="lg" onClick={() => scrollTo(hero.ctas.primary.href)}>
                {hero.ctas.primary.label}
              </Button>
              <Button variant="secondary" size="lg" onClick={() => scrollTo(hero.ctas.secondary.href)}>
                {hero.ctas.secondary.label}
              </Button>
              <Button variant="secondary" size="lg" onClick={() => scrollTo(hero.ctas.tertiary.href)}>
                {hero.ctas.tertiary.label}
              </Button>
            </motion.div>

            {/* Highlights */}
            <motion.div {...fadeUp(0.42)} style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem',
            }} aria-label="Key strengths">
              {hero.highlights.map(h => (
                <span key={h.label} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)',
                }}>
                  <span style={{
                    width: '5px', height: '5px', background: 'var(--accent)',
                    borderRadius: '1px', transform: 'rotate(45deg)', flexShrink: 0,
                  }} aria-hidden="true" />
                  {h.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{ display: 'flex', justifyContent: 'center' }}
            aria-hidden="true"
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
              {/* Outer cyan glow ring */}
              <div style={{
                position: 'absolute', inset: '-24px',
                background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.10) 0%, transparent 70%)',
                borderRadius: '20px', pointerEvents: 'none', zIndex: 0,
              }} />

              {/* Photo frame */}
              <div className="photo-frame" style={{
                position: 'relative', zIndex: 1,
                height: '520px',
                boxShadow: '0 0 0 1px rgba(0,229,255,0.14), 0 32px 80px rgba(0,0,0,0.7)',
              }}>
                <img src={heroPhoto} alt="Josh Fallarcuna — UI/UX Designer" />
              </div>

              {/* Name badge overlay */}
              <div style={{
                position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem',
                zIndex: 2,
                background: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(0,229,255,0.14)',
                borderRadius: '10px', padding: '0.875rem 1rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <p style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)',
                  }}>
                    {hero.name}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    UI/UX Designer · Full-Stack Dev
                  </p>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.25rem 0.7rem',
                  background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.20)',
                  borderRadius: '9999px',
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e',
                  }} />
                  <span style={{ fontSize: '0.7rem', color: '#86efac', fontWeight: 500 }}>
                    Available
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem',
            cursor: 'pointer',
          }}
          onClick={() => scrollTo('#about')}
          aria-label="Scroll to About"
        >
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ color: 'var(--accent)', opacity: 0.55 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>

      </Container>
    </section>
  )
}
