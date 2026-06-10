import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { PageMeta } from '@/components/ui/PageMeta'
import { downloadResume } from '@/config/resume'
import heroPhoto from '@/assets/profile.png'

// ── Icons for Core Expertise cards ───────────────────────────────────────────
import { SiFigma, SiAdobephotoshop, SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss, SiVite, SiTypescript, SiFramer } from 'react-icons/si'
import {
  TbBrush, TbPencilBolt, TbVectorBezierArc, TbDeviceDesktop,
  TbCode, TbDeviceMobile,
  TbHierarchy, TbAccessible,
} from 'react-icons/tb'

// ── Icon size token — matches SkillsPage ICON_SIZE ───────────────────────────
const BADGE_ICON_SIZE = 13

// ── Skill badge icon map (subset for Home page expertise badges) ──────────────
const badgeIconMap: Record<string, React.ReactNode> = {
  // UI/UX Design
  'Figma':                   <SiFigma          size={BADGE_ICON_SIZE} color="#F24E1E" aria-hidden="true" />,
  'Wireframing':             <TbPencilBolt     size={BADGE_ICON_SIZE} aria-hidden="true" />,
  'Prototyping':             <TbVectorBezierArc size={BADGE_ICON_SIZE} aria-hidden="true" />,
  'User Research':           <TbHierarchy      size={BADGE_ICON_SIZE} aria-hidden="true" />,
  'Design Systems':          <TbHierarchy      size={BADGE_ICON_SIZE} aria-hidden="true" />,
  // Frontend Development
  'React':                   <SiReact          size={BADGE_ICON_SIZE} color="#61DAFB" aria-hidden="true" />,
  'TypeScript':              <SiTypescript     size={BADGE_ICON_SIZE} color="#3178C6" aria-hidden="true" />,
  'Tailwind CSS':            <SiTailwindcss    size={BADGE_ICON_SIZE} color="#06B6D4" aria-hidden="true" />,
  'Vite':                    <SiVite           size={BADGE_ICON_SIZE} color="#646CFF" aria-hidden="true" />,
  'Framer Motion':           <SiFramer         size={BADGE_ICON_SIZE} color="#0055FF" aria-hidden="true" />,
  // Design Thinking
  'User Flows':              <TbHierarchy      size={BADGE_ICON_SIZE} aria-hidden="true" />,
  'Information Architecture':<TbHierarchy      size={BADGE_ICON_SIZE} aria-hidden="true" />,
  'Accessibility':           <TbAccessible     size={BADGE_ICON_SIZE} aria-hidden="true" />,
  'Responsive Design':       <TbDeviceMobile   size={BADGE_ICON_SIZE} aria-hidden="true" />,
  // Extras that may appear
  'Adobe Photoshop':         <SiAdobephotoshop size={BADGE_ICON_SIZE} color="#31A8FF" aria-hidden="true" />,
  'HTML':                    <SiHtml5          size={BADGE_ICON_SIZE} color="#E34F26" aria-hidden="true" />,
  'CSS':                     <SiCss3           size={BADGE_ICON_SIZE} color="#1572B6" aria-hidden="true" />,
  'JavaScript':              <SiJavascript     size={BADGE_ICON_SIZE} color="#F7DF1E" aria-hidden="true" />,
  'UI Design':               <TbBrush          size={BADGE_ICON_SIZE} aria-hidden="true" />,
  'UX Fundamentals':         <TbDeviceDesktop  size={BADGE_ICON_SIZE} aria-hidden="true" />,
  'Modern Web Interfaces':   <TbDeviceDesktop  size={BADGE_ICON_SIZE} aria-hidden="true" />,
  'Frontend Development':    <TbCode           size={BADGE_ICON_SIZE} aria-hidden="true" />,
}

// ── Card-level category icons for Core Expertise ──────────────────────────────
const expertiseCategoryIcon: Record<string, React.ReactNode> = {
  'UI/UX Design': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688
               0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125A1.64 1.64
               0 0 1 14.441 18h1.978c3.051 0 5.555-2.503 5.555-5.554C21.974 6.012
               17.491 2 12 2z"/>
      <circle cx="9"  cy="11" r=".6" fill="currentColor"/>
      <circle cx="12" cy="8"  r=".6" fill="currentColor"/>
      <circle cx="15" cy="11" r=".6" fill="currentColor"/>
    </svg>
  ),
  'Frontend Development': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  'Design Thinking': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10
               a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
      <line x1="10" y1="21" x2="14" y2="21"/>
    </svg>
  ),
}

// accent per category — mirrors the Design & Creativity token
const expertiseCategoryAccent: Record<string, string> = {
  'UI/UX Design':          '#00e5ff',
  'Frontend Development':  '#7dd3fc',
  'Design Thinking':       '#a78bfa',
}

/* ── Animation helpers ────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

const inView = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0  },
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

      {/* ════════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        aria-label="Introduction"
      >
        {/* Radial glow — top center */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '520px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at top, rgba(0,149,255,0.11) 0%, rgba(0,229,255,0.04) 40%, transparent 70%)',
        }} />

        <Container className="relative z-10" style={{ paddingTop: '9rem', paddingBottom: '7rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* ── LEFT: Text content ── */}
            <div style={{ maxWidth: '580px' }}>

              {/* Availability badge */}
              <motion.div {...fadeUp(0.0)} style={{ marginBottom: '2rem' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.4375rem 1.125rem',
                  background: 'rgba(0,229,255,0.06)',
                  border: '1px solid rgba(0,229,255,0.15)',
                  borderRadius: '9999px',
                  fontSize: '0.8125rem', fontWeight: 500,
                  color: 'var(--accent)',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                }}>
                  <span style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.7)',
                    flexShrink: 0,
                  }} aria-hidden="true" />
                  Available for Work
                </span>
              </motion.div>

              {/* Greeting */}
              <motion.p {...fadeUp(0.06)} style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '0.9375rem', fontWeight: 400,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: '0.625rem',
              }}>
                {hero.greeting}
              </motion.p>

              {/* Name */}
              <motion.h1 {...fadeUp(0.12)} style={{
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                fontSize: 'clamp(3rem, 6.5vw, 5.75rem)',
                fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
              }}>
                <span className="text-gradient">{hero.name}</span>
              </motion.h1>

              {/* Role */}
              <motion.h2 {...fadeUp(0.20)} style={{
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                fontSize: 'clamp(1.0625rem, 2vw, 1.375rem)', fontWeight: 500,
                color: 'var(--accent)', lineHeight: 1.4, marginBottom: '1.75rem',
              }}>
                {hero.role}
              </motion.h2>

              {/* Introduction */}
              <motion.p {...fadeUp(0.28)} style={{
                fontSize: '1.0625rem', color: 'var(--text-secondary)',
                lineHeight: 1.8, maxWidth: '34rem', marginBottom: '2.5rem',
              }}>
                {hero.introduction}
              </motion.p>

              {/* CTAs */}
              <motion.div
                {...fadeUp(0.36)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '3rem',
                }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate(hero.ctas.primary.href)}
                  aria-label="View my projects"
                >
                  {hero.ctas.primary.label}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={downloadResume}
                  aria-label="Download my resume PDF"
                >
                  Download Resume
                </Button>
              </motion.div>

              {/* Highlight pills */}
              <motion.div
                {...fadeUp(0.44)}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}
                aria-label="Key strengths"
              >
                {hero.highlights.map(h => (
                  <span key={h.label} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.4375rem 0.875rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    fontSize: '0.875rem', color: 'var(--text-muted)',
                  }}>
                    <span style={{
                      width: '5px', height: '5px',
                      background: 'var(--accent)',
                      borderRadius: '1px', transform: 'rotate(45deg)', flexShrink: 0,
                    }} aria-hidden="true" />
                    {h.label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Photo ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              style={{ display: 'flex', justifyContent: 'center' }}
              aria-hidden="true"
            >
              <div style={{ position: 'relative', width: '100%', maxWidth: '460px' }}>
                {/* Glow halo */}
                <div style={{
                  position: 'absolute', inset: '-32px',
                  background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.10) 0%, transparent 70%)',
                  borderRadius: '24px', pointerEvents: 'none', zIndex: 0,
                }} />

                {/* Photo */}
                <div
                  className="photo-frame-transparent"
                  style={{
                    position: 'relative', zIndex: 1,
                    height: '560px',
                    boxShadow: '0 0 0 1px rgba(0,229,255,0.12), 0 40px 96px rgba(0,0,0,0.55)',
                  }}
                >
                  <img src={heroPhoto} alt="Josh Fallarcuna — UI/UX Designer" />
                </div>

                {/* Identity card overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem', left: '1.5rem', right: '1.5rem',
                  zIndex: 2,
                  background: 'rgba(5,8,22,0.90)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0,229,255,0.16)',
                  borderRadius: '12px',
                  padding: '1.125rem 1.25rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <p style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontWeight: 700, fontSize: '1rem',
                      color: 'var(--text-primary)',
                    }}>
                      {hero.name}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                      UI/UX Designer · Full-Stack Dev
                    </p>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    padding: '0.3125rem 0.875rem',
                    background: 'rgba(34,197,94,0.10)',
                    border: '1px solid rgba(34,197,94,0.22)',
                    borderRadius: '9999px',
                  }}>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e',
                      boxShadow: '0 0 6px rgba(34,197,94,0.6)',
                    }} />
                    <span style={{ fontSize: '0.75rem', color: '#86efac', fontWeight: 500 }}>Available</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            style={{
              position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem',
            }}
            aria-hidden="true"
          >
            <span style={{
              fontSize: '0.6875rem', color: 'var(--text-muted)',
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{ color: 'var(--accent)', opacity: 0.5 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          STATS
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        className="stats-section section-divided"
        aria-label="Key statistics"
      >
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {home.stats.map((stat, i) => (
              <motion.div key={stat.label} {...inView(i * 0.08)}>
                <div className="stat-box">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                  {stat.sublabel && (
                    <span style={{
                      fontSize: '0.75rem', color: 'var(--text-muted)',
                      marginTop: '3px', textAlign: 'center',
                    }}>
                      {stat.sublabel}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FEATURED PROJECTS
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-wrapper section-divided relative overflow-hidden"
        aria-label="Featured projects"
      >
        {/* Subtle right glow */}
        <div className="glow-blob" style={{
          width: '480px', height: '480px',
          top: '50%', right: '-4rem', transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)',
          opacity: 0.05,
        }} aria-hidden="true" />

        <Container className="relative z-10">
          <SectionTitle
            title="Selected Projects"
            subtitle="Work showcasing design thinking and frontend development."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ marginBottom: '4rem' }}>
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

      {/* ════════════════════════════════════════════════════════════════════════
          CORE EXPERTISE
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="section-wrapper section-divided" aria-label="Core expertise">
        <Container>
          <SectionTitle title="Core Expertise" subtitle="The disciplines and tools I work with." />

          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {home.coreExpertise.map((area, i) => {
                const accent = expertiseCategoryAccent[area.title] ?? 'var(--accent)'
                const catIcon = expertiseCategoryIcon[area.title]
                return (
                  <motion.div key={area.title} {...inView(i * 0.1)} style={{ height: '100%' }}>
                    <div
                      className="glass-card"
                      style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Thin top accent bar — matches SkillsPage category card pattern */}
                      <div style={{
                        height: '3px',
                        background: accent,
                        opacity: 0.75,
                        flexShrink: 0,
                      }} aria-hidden="true" />

                      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>

                        {/* Card header: icon + title */}
                        <div style={{
                          display: 'flex', alignItems: 'flex-start',
                          gap: '0.875rem', marginBottom: '1rem',
                        }}>
                          {/* Category icon box */}
                          <div style={{
                            width: '46px', height: '46px', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: `${accent}12`,
                            border: `1px solid ${accent}28`,
                            borderRadius: '12px',
                            color: accent,
                          }} aria-hidden="true">
                            {catIcon ?? (
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.6"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32
                                         1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41
                                         M18.66 5.34l1.41-1.41" />
                              </svg>
                            )}
                          </div>

                          <div style={{ flex: 1, minWidth: 0, paddingTop: '3px' }}>
                            <h3 style={{
                              fontFamily: "'Space Grotesk', system-ui, sans-serif",
                              fontSize: '0.9375rem', fontWeight: 700,
                              color: 'var(--text-primary)', lineHeight: 1.3,
                              letterSpacing: '-0.01em', margin: 0,
                            }}>
                              {area.title}
                            </h3>
                            <p style={{
                              fontSize: '0.6875rem', color: 'var(--text-muted)',
                              fontWeight: 500, letterSpacing: '0.06em',
                              textTransform: 'uppercase', margin: '4px 0 0',
                            }}>
                              {area.skills.length} skill{area.skills.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>

                        {/* Divider */}
                        <div style={{
                          height: '1px',
                          background: 'rgba(255,255,255,0.06)',
                          marginBottom: '1.25rem',
                        }} aria-hidden="true" />

                        {/* Skill badges — with icons, matching SkillsPage style */}
                        <div style={{
                          display: 'flex', flexWrap: 'wrap',
                          gap: '0.5rem',
                          flex: 1, alignContent: 'flex-start',
                        }}>
                          {area.skills.map(s => (
                            <span
                              key={s}
                              className="skill-badge"
                              style={{
                                borderColor: `${accent}18`,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                              }}
                            >
                              {badgeIconMap[s] ?? null}
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          WHY WORK WITH ME
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="section-wrapper section-divided" aria-label="Why work with me">
        <Container>
          <SectionTitle title="Why Work With Me" subtitle="What I bring to every project and collaboration." />

          {/*
            2-col on md+, 1-col on mobile.
            gap-6 (24px) on mobile → gap-7 (28px) on md+ via responsive class.
            Each card is a flex column so the description grows to fill,
            making all cards equal height naturally.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {home.whyWorkWithMe.map((item, i) => (
              <motion.div key={item.title} {...inView(i * 0.09)} style={{ height: '100%' }}>
                <div
                  className="glass-card"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem',
                  }}
                >
                  {/* Icon box + title row */}
                  <div style={{
                    display: 'flex', alignItems: 'flex-start',
                    gap: '1rem', marginBottom: '1.25rem',
                  }}>
                    {/* Icon box */}
                    <div style={{
                      width: '48px', height: '48px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(0,229,255,0.07)',
                      border: '1px solid rgba(0,229,255,0.16)',
                      borderRadius: '12px',
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="var(--accent)" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true">
                        <path d={item.icon} />
                      </svg>
                    </div>

                    {/* Title — vertically centred with icon box */}
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', minHeight: '48px' }}>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '1.0625rem', fontWeight: 700,
                        color: 'var(--text-primary)',
                        lineHeight: 1.3,
                        margin: 0,
                      }}>
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Thin rule under header */}
                  <div style={{
                    height: '1px',
                    background: 'rgba(255,255,255,0.05)',
                    marginBottom: '1.25rem',
                    flexShrink: 0,
                  }} aria-hidden="true" />

                  {/* Description — flex: 1 so all cards stretch to equal height */}
                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                    flex: 1,
                  }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-wrapper section-divided relative overflow-hidden"
        aria-label="Call to action"
      >
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(0,149,255,0.06) 0%, transparent 70%)',
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
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.025em',
              color: 'var(--text-primary)', marginBottom: '1.25rem',
            }}>
              {home.cta.heading}
            </h2>
            <p style={{
              fontSize: '1.0625rem', color: 'var(--text-secondary)',
              lineHeight: 1.8, marginBottom: '3rem',
            }}>
              {home.cta.subheading}
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1.5rem',
              justifyContent: 'center',
            }}>
              <Button variant="primary"   size="lg" onClick={() => navigate('/contact')}>
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
