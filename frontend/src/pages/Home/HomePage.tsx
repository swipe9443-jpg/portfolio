import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { PageMeta } from '@/components/ui/PageMeta'
import heroPhoto from '@/assets/profile.png'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

const inView = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.45, delay, ease: 'easeOut' as const },
})

export function HomePage() {
  const navigate = useNavigate()
  const { hero, home, projects } = content

  const featuredProjects = home.featuredProjectIds
    .map(id => projects.find(p => p.id === id))
    .filter(Boolean) as typeof projects

  return (
    <>
      <PageMeta
        title="Josh Fallarcuna | UI/UX Designer & Full-Stack Developer"
        description="Aspiring UI/UX Designer and future Full-Stack Web Developer. Explore my projects, skills, and design work."
        ogTitle="Josh Fallarcuna | Portfolio"
        ogDescription="Dark cinematic portfolio — UI/UX Design, Frontend Development, Full-Stack concepts."
      />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section
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

            {/* LEFT — text */}
            <div style={{ maxWidth: '560px' }}>
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

              <motion.p {...fadeUp(0.05)} style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '0.875rem', fontWeight: 400, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem',
              }}>
                {hero.greeting}
              </motion.p>

              <motion.h1 {...fadeUp(0.10)} style={{
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '1rem',
              }}>
                <span className="text-gradient">{hero.name}</span>
              </motion.h1>

              <motion.h2 {...fadeUp(0.18)} style={{
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                fontSize: 'clamp(0.95rem, 2vw, 1.25rem)', fontWeight: 500,
                color: 'var(--accent)', lineHeight: 1.4, marginBottom: '1.5rem',
              }}>
                {hero.role}
              </motion.h2>

              <motion.p {...fadeUp(0.26)} style={{
                fontSize: '1rem', color: 'var(--text-secondary)',
                lineHeight: 1.8, maxWidth: '32rem', marginBottom: '2.25rem',
              }}>
                {hero.introduction}
              </motion.p>

              <motion.div {...fadeUp(0.34)} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <Button variant="primary" size="lg" onClick={() => navigate(hero.ctas.primary.href)}>
                  {hero.ctas.primary.label}
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate(hero.ctas.tertiary.href)}>
                  {hero.ctas.tertiary.label}
                </Button>
              </motion.div>

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

            {/* RIGHT — photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              style={{ display: 'flex', justifyContent: 'center' }}
              aria-hidden="true"
            >
              <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
                <div style={{
                  position: 'absolute', inset: '-24px',
                  background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.10) 0%, transparent 70%)',
                  borderRadius: '20px', pointerEvents: 'none', zIndex: 0,
                }} />
                <div className="photo-frame-transparent" style={{
                  position: 'relative', zIndex: 1, height: '520px',
                  boxShadow: '0 0 0 1px rgba(0,229,255,0.10), 0 32px 80px rgba(0,0,0,0.5)',
                }}>
                  <img src={heroPhoto} alt="Josh Fallarcuna — UI/UX Designer" />
                </div>
                <div style={{
                  position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem', zIndex: 2,
                  background: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(0,229,255,0.14)',
                  borderRadius: '10px', padding: '0.875rem 1rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
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
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                    <span style={{ fontSize: '0.7rem', color: '#86efac', fontWeight: 500 }}>Available</span>
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
            }}
            aria-hidden="true"
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
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section className="section-divided" style={{ paddingTop: '5rem', paddingBottom: '5rem' }} aria-label="Key statistics">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {home.stats.map((stat, i) => (
              <motion.div key={stat.label} {...inView(i * 0.08)}>
                <div className="stat-box" style={{ padding: '1.5rem 1rem', gap: '0.375rem', borderRadius: '12px' }}>
                  <span className="stat-value" style={{ fontSize: '2rem' }}>{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                  {stat.sublabel && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{stat.sublabel}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FEATURED PROJECTS ─────────────────────────────────────────────────── */}
      <section className="section-wrapper section-divided relative overflow-hidden" aria-label="Featured projects">
        <div className="glow-blob" style={{
          width: '500px', height: '500px', top: '50%', right: '-6rem', transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)',
          opacity: 0.06,
        }} aria-hidden="true" />
        <Container className="relative z-10">
          <SectionTitle
            title="Selected Projects"
            subtitle="Work showcasing design thinking and frontend development."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginBottom: '3rem' }}>
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
          <motion.div {...inView(0.2)} style={{ textAlign: 'center' }}>
            <Button variant="secondary" size="lg" onClick={() => navigate('/projects')}>
              View All Projects
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* ── CORE EXPERTISE ────────────────────────────────────────────────────── */}
      <section className="section-wrapper section-divided" aria-label="Core expertise">
        <Container>
          <SectionTitle title="Core Expertise" subtitle="The disciplines and tools I work with." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {home.coreExpertise.map((area, i) => (
              <motion.div key={area.title} {...inView(i * 0.1)}>
                <Card padding="lg" className="h-full">
                  <h3 style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)',
                    marginBottom: '1rem',
                  }}>
                    {area.title}
                  </h3>
                  <div style={{ height: '1px', background: 'rgba(0,229,255,0.08)', marginBottom: '1rem' }} aria-hidden="true" />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {area.skills.map(s => (
                      <span key={s} className="skill-badge">{s}</span>
                    ))}
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
          <SectionTitle title="Why Work With Me" subtitle="What I bring to every project and collaboration." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {home.whyWorkWithMe.map((item, i) => (
              <motion.div key={item.title} {...inView(i * 0.1)}>
                <Card padding="lg" className="h-full">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '44px', height: '44px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)',
                      borderRadius: '10px',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="var(--accent)" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.375rem',
                      }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="section-wrapper section-divided relative overflow-hidden" aria-label="Call to action">
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(0,149,255,0.07) 0%, transparent 70%)',
        }} aria-hidden="true" />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true as const }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}
          >
            <h2 style={{
              fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em',
              color: 'var(--text-primary)', marginBottom: '1rem',
            }}>
              {home.cta.heading}
            </h2>
            <p style={{
              fontSize: '1rem', color: 'var(--text-secondary)',
              lineHeight: 1.75, marginBottom: '2.5rem',
            }}>
              {home.cta.subheading}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <Button variant="primary" size="lg" onClick={() => navigate('/contact')}>
                {home.cta.primary}
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/projects')}>
                {home.cta.secondary}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
