import { useNavigate } from 'react-router-dom'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
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
const EASE_CINEMATIC: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Hero entrance — items animate on mount */
const heroItem = (delay = 0, y = 28) => ({
  initial:    { opacity: 0, y },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE_CINEMATIC },
})

/** Hero name — slide up with slight blur */
const heroName = (delay = 0) => ({
  initial:    { opacity: 0, y: 40, filter: 'blur(4px)' },
  animate:    { opacity: 1, y: 0,  filter: 'blur(0px)' },
  transition: { duration: 0.8, delay, ease: EASE_CINEMATIC },
})

/** Role — fade in with glow */
const heroRole = (delay = 0) => ({
  initial:    { opacity: 0, y: 12 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.6, delay, ease: EASE_CINEMATIC },
})

/** Stats strip — slide from left */
const heroStats = {
  initial:    { opacity: 0, x: -24 },
  animate:    { opacity: 1, x: 0   },
  transition: { duration: 0.7, delay: 1.3, ease: EASE_CINEMATIC },
}

/** CTA buttons — scale + fade */
const heroCTA = {
  initial:    { opacity: 0, scale: 0.95 },
  animate:    { opacity: 1, scale: 1    },
  transition: { duration: 0.5, delay: 1.6, ease: EASE_CINEMATIC },
}

/** Scroll-triggered section reveal */
const inView = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.55, delay, ease: EASE_CINEMATIC },
})

/** Staggered chip reveal */
const chipReveal = (i: number) => ({
  initial:    { opacity: 0, y: 10 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.4, delay: 1.85 + i * 0.12, ease: EASE_CINEMATIC },
})

/* ── CountUp component ────────────────────────────────────────────────────── */
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref       = useRef<HTMLSpanElement>(null)
  const isVisible = useInView(ref, { once: true, margin: '-60px' })
  const motVal    = useMotionValue(0)
  const spring    = useSpring(motVal, { stiffness: 60, damping: 18, mass: 0.8 })

  useEffect(() => {
    if (!isVisible) return
    const ctrl = animate(motVal, target, { duration: 1.5, ease: 'easeOut' })
    return ctrl.stop
  }, [isVisible, target, motVal])

  useEffect(() => {
    return spring.on('change', v => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`
    })
  }, [spring, suffix])

  return <span ref={ref}>0{suffix}</span>
}

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
          width: '1000px', height: '560px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at top, rgba(0,149,255,0.13) 0%, rgba(0,229,255,0.05) 45%, transparent 72%)',
        }} />
        {/* Bottom-left ambient */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '-4rem', left: '-6rem',
          width: '480px', height: '480px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(0,149,255,0.07) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }} />

        <Container className="relative z-10" style={{ paddingTop: '9rem', paddingBottom: '7rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
            alignItems: 'center',
          }} className="hero-grid">

            {/* ── LEFT: Text content ── */}
            <div style={{ maxWidth: '580px' }}>

              {/* ① Available badge */}
              <motion.div {...heroItem(0.0)} style={{ marginBottom: '1.75rem' }}>
                <motion.span
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.4, delay: 0, ease: EASE_CINEMATIC }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.4375rem 1.125rem',
                    background: 'rgba(0,229,255,0.06)',
                    border: '1px solid rgba(0,229,255,0.15)',
                    borderRadius: '9999px',
                    fontSize: '0.8125rem', fontWeight: 500,
                    color: 'var(--accent)',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.7)',
                      flexShrink: 0, display: 'inline-block',
                    }}
                    aria-hidden="true"
                  />
                  Available for Work
                </motion.span>
              </motion.div>

              {/* ② HELLO, I'M — slide up + fade */}
              <motion.p {...heroItem(0.2, 20)} style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '0.875rem', fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: '0.5rem',
              }}>
                {hero.greeting}
              </motion.p>

              {/* ③ Large Name — line by line stagger */}
              <div style={{ marginBottom: '1.25rem', overflow: 'hidden' }}>
                <motion.h1 {...heroName(0.4)} style={{
                  fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
                  fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em',
                  margin: 0,
                }}>
                  <span className="text-gradient">{hero.name}</span>
                </motion.h1>
              </div>

              {/* ④ Role — fade in + glow */}
              <motion.h2 {...heroRole(0.7)} style={{
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', fontWeight: 500,
                color: 'var(--accent)', lineHeight: 1.4, marginBottom: '1.75rem',
                textShadow: '0 0 24px rgba(0,229,255,0.25)',
              }}>
                {hero.role}
              </motion.h2>

              {/* ⑤ Description — fade up */}
              <motion.p {...heroItem(1.0, 18)} style={{
                fontSize: '1rem', color: 'var(--text-secondary)',
                lineHeight: 1.8, maxWidth: '520px', marginBottom: '2rem',
              }}>
                {hero.introduction}
              </motion.p>

              {/* ⑥ Stats strip — slide from left + count-up */}
              <motion.div {...heroStats} style={{ marginBottom: '2rem' }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                  background: 'rgba(13,20,36,0.85)',
                  border: '1px solid rgba(0,229,255,0.12)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}>
                  {[
                    {
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                      target: 2, suffix: '+', label: 'Years Learning',
                    },
                    {
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="6" height="18" rx="1"/><rect x="9" y="8" width="6" height="13" rx="1"/><rect x="16" y="13" width="6" height="8" rx="1"/></svg>,
                      target: 3, suffix: '+', label: 'Projects Built',
                    },
                    {
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                      target: 8, suffix: '+', label: 'Learning',
                    },
                  ].map((s, i, arr) => (
                    <div key={s.label} style={{
                      display: 'flex', alignItems: 'center', gap: '0.625rem',
                      padding: '0.875rem 1.125rem',
                      borderRight: i < arr.length - 1 ? '1px solid rgba(0,229,255,0.08)' : 'none',
                    }}>
                      <span style={{
                        flexShrink: 0, width: '30px', height: '30px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,229,255,0.07)',
                        border: '1px solid rgba(0,229,255,0.13)',
                        borderRadius: '8px',
                      }}>
                        {s.icon}
                      </span>
                      <div>
                        <p style={{
                          fontFamily: "'Space Grotesk', system-ui, sans-serif",
                          fontSize: '1.125rem', fontWeight: 700, color: 'var(--accent)',
                          lineHeight: 1, letterSpacing: '-0.01em',
                        }}>
                          <CountUp target={s.target} suffix={s.suffix} />
                        </p>
                        <p style={{
                          fontSize: '0.6875rem', fontWeight: 500,
                          color: 'var(--text-muted)', lineHeight: 1.3,
                          marginTop: '2px',
                        }}>{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ⑦ CTA Buttons — fade in + scale */}
              <motion.div
                {...heroCTA}
                style={{
                  display: 'flex', flexDirection: 'row',
                  flexWrap: 'wrap', alignItems: 'center',
                  gap: '1rem', marginBottom: '2rem',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(0,229,255,0.30)' }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  style={{ borderRadius: '12px' }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate(hero.ctas.primary.href)}
                    aria-label="View my projects"
                  >
                    {hero.ctas.primary.label}
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, borderColor: 'rgba(0,229,255,0.40)', boxShadow: '0 0 18px rgba(0,229,255,0.15)' }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  style={{ borderRadius: '12px' }}
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={downloadResume}
                    aria-label="Download my resume PDF"
                  >
                    Download Resume
                  </Button>
                </motion.div>
              </motion.div>

              {/* ⑧ Skill credibility chips — one-by-one stagger */}
              <div
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}
                aria-label="Key skills"
              >
                {[
                  { label: 'Figma Expert',       dot: '#F24E1E' },
                  { label: 'React Developer',     dot: '#61DAFB' },
                  { label: 'UI Systems',          dot: '#00e5ff' },
                  { label: 'Learning Full-Stack', dot: '#a78bfa' },
                ].map((chip, i) => (
                  <motion.span
                    key={chip.label}
                    {...chipReveal(i)}
                    whileHover={{ y: -2, borderColor: 'rgba(0,229,255,0.30)', boxShadow: '0 0 0 1px rgba(0,229,255,0.10), 0 4px 16px rgba(0,0,0,0.4)' }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4375rem',
                      height: '32px', padding: '0 0.875rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      borderRadius: '8px',
                      fontSize: '0.8125rem', fontWeight: 500,
                      color: 'var(--text-secondary)',
                      cursor: 'default', userSelect: 'none',
                    }}
                  >
                    <span style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: chip.dot, flexShrink: 0,
                      boxShadow: `0 0 4px ${chip.dot}80`,
                    }} aria-hidden="true" />
                    {chip.label}
                  </motion.span>
                ))}
              </div>

              {/* ⑨ Availability statement — delayed fade */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.3, ease: 'easeOut' }}
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}
              >
                Currently open for{' '}
                <span style={{ color: 'var(--accent)', fontWeight: 500 }}>internships</span>
                {' '}&amp;{' '}
                <span style={{ color: 'var(--accent)', fontWeight: 500 }}>collaborations</span>.
              </motion.p>

            </div>
            {/* ── END LEFT ── */}

            {/* ── RIGHT: Photo ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_CINEMATIC }}
              style={{ display: 'flex', justifyContent: 'center' }}
              aria-hidden="true"
            >
              <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>

                {/* Breathing glow behind portrait */}
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', inset: '-40px',
                    background: 'radial-gradient(ellipse at 50% 60%, rgba(0,149,255,0.20) 0%, rgba(0,229,255,0.07) 45%, transparent 70%)',
                    borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
                  }}
                />

                {/* Subtle tech grid overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                  borderRadius: '20px',
                  pointerEvents: 'none', zIndex: 0, opacity: 0.6,
                }} />

                {/* Glass frame + portrait — float up/down */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <div
                    className="photo-frame-transparent"
                    style={{
                      height: '560px',
                      border: '1px solid rgba(0,229,255,0.18)',
                      boxShadow: '0 0 0 1px rgba(0,229,255,0.08), 0 0 48px rgba(0,229,255,0.08), 0 40px 96px rgba(0,0,0,0.6)',
                    }}
                  >
                    <img src={heroPhoto} alt="Josh Fallarcuna — UI/UX Designer" />
                  </div>
                </motion.div>

                {/* Floating card — top-left: Experience — subtle left/right drift */}
                <motion.div
                  initial={{ opacity: 0, x: -16, y: 16 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: EASE_CINEMATIC }}
                  style={{
                    position: 'absolute', top: '2.5rem', left: '-3rem',
                    zIndex: 3,
                    background: 'rgba(5,8,22,0.92)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,229,255,0.16)',
                    borderRadius: '12px',
                    padding: '0.875rem 1.125rem',
                    minWidth: '148px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  }}
                >
                  <motion.div
                    animate={{ x: [0, 3, 0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.18)', borderRadius: '8px', flexShrink: 0 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      </div>
                      <p style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Experience</p>
                    </div>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>2+ Years<br />Learning &amp; Building</p>
                  </motion.div>
                </motion.div>

                {/* Floating card — right: Available — pulse glow */}
                <motion.div
                  initial={{ opacity: 0, x: 16, y: -8 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5, ease: EASE_CINEMATIC }}
                  style={{
                    position: 'absolute', top: '35%', right: '-2.5rem',
                    zIndex: 3,
                    background: 'rgba(5,8,22,0.92)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '12px',
                    padding: '0.75rem 1rem',
                    minWidth: '120px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  }}
                >
                  <motion.div
                    animate={{
                      borderColor: ['rgba(34,197,94,0.22)', 'rgba(34,197,94,0.55)', 'rgba(34,197,94,0.22)'],
                      boxShadow: ['0 0 0 rgba(34,197,94,0)', '0 0 14px rgba(34,197,94,0.20)', '0 0 0 rgba(34,197,94,0)'],
                    }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                    style={{
                      border: '1px solid rgba(34,197,94,0.22)',
                      borderRadius: '10px',
                      padding: '0.375rem 0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.2rem' }}>
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                        style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.7)', flexShrink: 0, display: 'inline-block' }}
                      />
                      <p style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '0.75rem', fontWeight: 700, color: '#86efac' }}>Available</p>
                    </div>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>Open for work</p>
                  </motion.div>
                </motion.div>

                {/* Floating card — bottom-right: Tech Stack — float up/down */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5, ease: EASE_CINEMATIC }}
                  style={{
                    position: 'absolute', bottom: '5.5rem', right: '-2rem',
                    zIndex: 3,
                    background: 'rgba(5,8,22,0.92)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,229,255,0.13)',
                    borderRadius: '12px',
                    padding: '0.875rem 1.125rem',
                    minWidth: '130px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                  >
                    <p style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Tech Stack</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {['React', 'TypeScript', 'Figma', 'Tailwind'].map(t => (
                        <span key={t} style={{ padding: '0.15rem 0.5rem', background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.14)', borderRadius: '5px', fontSize: '0.625rem', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{t}</span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Identity card overlay — bottom of portrait */}
                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem', left: '1.5rem', right: '1.5rem',
                  zIndex: 2,
                  background: 'rgba(5,8,22,0.90)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
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
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.6)' }}
                    />
                    <span style={{ fontSize: '0.75rem', color: '#86efac', fontWeight: 500 }}>Available</span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

          {/* Responsive grid — activates 50/50 at lg+ */}
          <style>{`
            @media (min-width: 1024px) {
              .hero-grid {
                grid-template-columns: 1fr 1fr !important;
                gap: 4rem !important;
              }
            }
            @media (min-width: 768px) and (max-width: 1023px) {
              .hero-grid {
                grid-template-columns: 1fr !important;
                max-width: 640px;
                margin: 0 auto;
              }
            }
          `}</style>

          {/* Scroll cue — slow bounce + opacity pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            style={{
              position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem',
            }}
            aria-hidden="true"
          >
            <motion.span
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{
                fontSize: '0.6875rem', color: 'var(--text-muted)',
                letterSpacing: '0.12em', textTransform: 'uppercase',
              }}
            >
              Scroll
            </motion.span>
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{ color: 'var(--accent)' }}
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
            {home.stats.map((stat, i) => {
              const raw    = stat.value.replace(/[^0-9]/g, '')
              const target = parseInt(raw, 10) || 0
              const suffix = stat.value.replace(/[0-9]/g, '')
              return (
                <motion.div key={stat.label} {...inView(i * 0.1)}>
                  <motion.div
                    whileHover={{ y: -3, boxShadow: '0 0 0 1px rgba(0,229,255,0.14), 0 12px 32px rgba(0,0,0,0.45)' }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="stat-box"
                    style={{ cursor: 'default' }}
                  >
                    <span className="stat-value">
                      <CountUp target={target} suffix={suffix} />
                    </span>
                    <span className="stat-label">{stat.label}</span>
                    {stat.sublabel && (
                      <span style={{
                        fontSize: '0.75rem', color: 'var(--text-muted)',
                        marginTop: '3px', textAlign: 'center',
                      }}>
                        {stat.sublabel}
                      </span>
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FEATURED PROJECT — premium 50/50 case study card
      ════════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-wrapper section-divided relative overflow-hidden"
        aria-label="Featured project"
      >
        {/* Ambient glow — right */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', right: '-6rem', transform: 'translateY(-50%)',
          width: '600px', height: '600px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 65%)',
          filter: 'blur(72px)',
        }} />
        {/* Ambient glow — left */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '-4rem', transform: 'translateY(-50%)',
          width: '440px', height: '440px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(0,149,255,0.055) 0%, transparent 65%)',
          filter: 'blur(56px)',
        }} />

        <Container className="relative z-10">
          {/* Section header */}
          <SectionTitle
            title="Featured Project"
            subtitle="A premium showcase of my best work."
          />

          {(() => {
            const project = featuredProjects[0]
            if (!project) return null
            const isComingSoon = project.comingSoon === true

            const thumbBg: Record<string, string> = {
              portfolio:           'linear-gradient(135deg, #050c1a 0%, #071425 40%, #0a1f35 100%)',
              'ui-design-project': 'linear-gradient(135deg, #06091a 0%, #090e24 40%, #0e1535 100%)',
              'web-dev-project':   'linear-gradient(135deg, #050d1c 0%, #07111e 40%, #091828 100%)',
            }
            const bg = thumbBg[project.id] ?? 'linear-gradient(135deg, #060a1c 0%, #081020 40%, #0b1630 100%)'

            const catColors: Record<string, {bg:string;border:string;color:string}> = {
              'Frontend Development': { bg:'rgba(0,149,255,0.08)', border:'rgba(0,149,255,0.22)', color:'#7dd3fc' },
              'UI/UX Design':         { bg:'rgba(0,229,255,0.07)', border:'rgba(0,229,255,0.22)', color:'var(--accent-hover)' },
            }
            const cat = catColors[project.category] ?? { bg:'rgba(255,255,255,0.05)', border:'rgba(255,255,255,0.10)', color:'var(--text-secondary)' }

            const statusColor = isComingSoon
              ? { bg:'rgba(245,158,11,0.10)', border:'rgba(245,158,11,0.28)', color:'#fcd34d', dot:'#f59e0b' }
              : { bg:'rgba(34,197,94,0.10)',  border:'rgba(34,197,94,0.28)',  color:'#86efac',  dot:'#22c55e' }

            return (
              <motion.article
                {...inView(0)}
                aria-label={project.title}
                className="featured-project-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  background: 'rgba(13,20,36,0.94)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 32px 96px rgba(0,0,0,0.5)',
                  transition: 'border-color 0.22s ease, box-shadow 0.22s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(0,229,255,0.22)'
                  el.style.boxShadow   = '0 0 0 1px rgba(0,229,255,0.08), 0 32px 96px rgba(0,0,0,0.65), 0 0 64px rgba(0,229,255,0.06)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                  el.style.boxShadow   = '0 32px 96px rgba(0,0,0,0.5)'
                }}
              >
                {/* ══ LEFT: Image panel — slow zoom on scroll into view ══════ */}
                <motion.div
                  className="fp-image-panel"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: 1.03 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  style={{ background: bg, position: 'relative', overflow: 'hidden', minHeight: '320px' }}
                  aria-hidden="true"
                >
                  {/* Top accent line */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,#0095ff,#00e5ff)', opacity:0.8, zIndex:2 }} />

                  {/* Grid texture */}
                  <div style={{
                    position:'absolute', inset:0,
                    backgroundImage:
                      'linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px),' +
                      'linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px)',
                    backgroundSize:'32px 32px',
                  }} />

                  {/* Radial center glow */}
                  <div style={{
                    position:'absolute', inset:0,
                    background:'radial-gradient(ellipse at 50% 60%, rgba(0,149,255,0.22) 0%, transparent 68%)',
                  }} />

                  {/* Corner glow — bottom right */}
                  <div style={{
                    position:'absolute', bottom:'-2rem', right:'-2rem',
                    width:'280px', height:'280px',
                    background:'radial-gradient(circle, rgba(0,229,255,0.10) 0%, transparent 65%)',
                    filter:'blur(32px)',
                  }} />

                  {/* Decorative code-window SVG */}
                  <svg width="300" height="220" viewBox="0 0 300 220" fill="none"
                    style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', opacity:0.22 }}
                    aria-hidden="true">
                    {/* Browser chrome */}
                    <rect x="20" y="20" width="260" height="180" rx="10" stroke="#00e5ff" strokeWidth="1.4"/>
                    <rect x="20" y="20" width="260" height="32" rx="10" fill="rgba(0,229,255,0.06)" stroke="#00e5ff" strokeWidth="1.4"/>
                    <circle cx="42" cy="36" r="5" fill="rgba(255,80,80,0.5)"/>
                    <circle cx="58" cy="36" r="5" fill="rgba(255,180,40,0.5)"/>
                    <circle cx="74" cy="36" r="5" fill="rgba(40,210,100,0.5)"/>
                    <rect x="92" y="30" width="120" height="12" rx="4" fill="rgba(0,229,255,0.12)" stroke="rgba(0,229,255,0.25)" strokeWidth="1"/>
                    {/* Code lines */}
                    <rect x="36" y="68" width="60"  height="6" rx="3" fill="#00e5ff" opacity=".7"/>
                    <rect x="36" y="82" width="110" height="5" rx="2.5" fill="#00e5ff" opacity=".4"/>
                    <rect x="36" y="95" width="90"  height="5" rx="2.5" fill="#00e5ff" opacity=".3"/>
                    <rect x="36" y="116" width="40" height="6" rx="3" fill="#7dd3fc" opacity=".6"/>
                    <rect x="50" y="130" width="80" height="5" rx="2.5" fill="#00e5ff" opacity=".35"/>
                    <rect x="50" y="143" width="60" height="5" rx="2.5" fill="#00e5ff" opacity=".25"/>
                    <rect x="36" y="163" width="50" height="6" rx="3" fill="#a78bfa" opacity=".55"/>
                    <rect x="36" y="177" width="100" height="5" rx="2.5" fill="#00e5ff" opacity=".2"/>
                  </svg>

                  {/* Featured Work label — top-left */}
                  <div style={{ position:'absolute', top:'1.25rem', left:'1.25rem', zIndex:3, display:'flex', gap:'0.5rem', alignItems:'center' }}>
                    <span style={{
                      display:'inline-flex', alignItems:'center', gap:'0.4rem',
                      padding:'0.3rem 0.875rem',
                      background:'rgba(0,229,255,0.13)',
                      border:'1px solid rgba(0,229,255,0.35)',
                      borderRadius:'9999px',
                      fontSize:'0.6875rem', fontWeight:700,
                      color:'var(--accent)',
                      backdropFilter:'blur(10px)',
                      WebkitBackdropFilter:'blur(10px)',
                      letterSpacing:'0.08em', textTransform:'uppercase',
                    }}>
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <polygon points="6 1 7.5 4.5 11 5 8.5 7.5 9 11 6 9.5 3 11 3.5 7.5 1 5 4.5 4.5" fill="currentColor"/>
                      </svg>
                      Featured Work
                    </span>
                  </div>

                  {/* Project status — bottom-left */}
                  <div style={{ position:'absolute', bottom:'1.25rem', left:'1.25rem', zIndex:3 }}>
                    <span style={{
                      display:'inline-flex', alignItems:'center', gap:'0.4rem',
                      padding:'0.3rem 0.875rem',
                      background: statusColor.bg,
                      border:`1px solid ${statusColor.border}`,
                      borderRadius:'9999px',
                      fontSize:'0.6875rem', fontWeight:600,
                      color: statusColor.color,
                      backdropFilter:'blur(10px)',
                      WebkitBackdropFilter:'blur(10px)',
                    }}>
                      <motion.span
                        animate={{ opacity:[1,0.3,1] }}
                        transition={{ repeat:Infinity, duration:2, ease:'easeInOut' }}
                        style={{ width:'5px', height:'5px', borderRadius:'50%', background: statusColor.dot, boxShadow:`0 0 6px ${statusColor.dot}`, flexShrink:0 }}
                        aria-hidden="true"
                      />
                      {isComingSoon ? 'In Development' : 'Live Project'}
                    </span>
                  </div>
                </motion.div>

                {/* ══ RIGHT: Content panel — slide in from right ═════════════ */}
                <motion.div
                  className="fp-content-panel"
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65, delay: 0.1, ease: EASE_CINEMATIC }}
                  style={{ padding:'3rem 3.25rem', display:'flex', flexDirection:'column', justifyContent:'center', gap:'1.75rem' }}
                >

                  {/* Category pill + title */}
                  <div>
                    <span style={{
                      ...cat,
                      display:'inline-block', fontSize:'0.6875rem', fontWeight:600,
                      padding:'0.25rem 0.875rem', borderRadius:'9999px',
                      marginBottom:'1rem', letterSpacing:'0.05em',
                    }}>
                      {project.category}
                    </span>
                    <h3 style={{
                      fontFamily:"'Space Grotesk','Inter',system-ui,sans-serif",
                      fontSize:'clamp(1.5rem,3vw,2.25rem)',
                      fontWeight:700, lineHeight:1.15,
                      color:'var(--text-primary)',
                      letterSpacing:'-0.025em',
                      marginBottom:'1rem',
                    }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize:'1rem', color:'var(--text-secondary)', lineHeight:1.85, maxWidth:'52ch' }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <p style={{
                      fontFamily:"'Space Grotesk',system-ui,sans-serif",
                      fontSize:'0.6875rem', fontWeight:600,
                      color:'var(--text-muted)', letterSpacing:'0.12em',
                      textTransform:'uppercase', marginBottom:'0.75rem',
                    }}>
                      Tech Stack
                    </p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                      {project.technologies.map(t => (
                        <span key={t} style={{
                          fontSize:'0.8125rem', padding:'0.35rem 0.9rem',
                          background:'rgba(0,229,255,0.06)',
                          border:'1px solid rgba(0,229,255,0.16)',
                          borderRadius:'8px', color:'var(--text-secondary)',
                          fontWeight:500,
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key features */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem 1.5rem' }}>
                    {project.features.slice(0, 4).map(f => (
                      <span key={f} style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', fontSize:'0.875rem', color:'var(--text-muted)' }}>
                        <span style={{ width:'5px', height:'5px', background:'var(--accent)', borderRadius:'1px', transform:'rotate(45deg)', flexShrink:0, boxShadow:'0 0 4px rgba(0,229,255,0.5)' }} aria-hidden="true" />
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{ height:'1px', background:'rgba(255,255,255,0.06)' }} aria-hidden="true" />

                  {/* Actions */}
                  <div style={{ display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap' }}>
                    {isComingSoon ? (
                      <span style={{
                        display:'inline-flex', alignItems:'center', gap:'0.45rem',
                        height:'44px', padding:'0 1.5rem',
                        background:'rgba(245,158,11,0.07)',
                        border:'1px solid rgba(245,158,11,0.22)',
                        borderRadius:'10px', fontSize:'0.875rem', fontWeight:600,
                        color:'rgba(252,211,77,0.75)',
                        fontFamily:"'Space Grotesk',system-ui,sans-serif",
                        cursor:'default',
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        In Development
                      </span>
                    ) : (
                      <Button variant="primary" size="lg" onClick={() => navigate(`/projects/${project.id}`)} aria-label={`View full case study for ${project.title}`}>
                        View Full Case Study
                        <svg width="13" height="13" viewBox="0 0 12 12" fill="none" style={{ marginLeft:'0.5rem' }} aria-hidden="true"><path d="M1.5 10.5L10.5 1.5M10.5 1.5H5M10.5 1.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </Button>
                    )}
                    <Button variant="secondary" size="lg" onClick={() => navigate('/projects')} aria-label="Browse all projects">
                      All Projects
                    </Button>
                  </div>

                </motion.div>
              </motion.article>
            )
          })()}

          {/* 50/50 desktop split */}
          <style>{`
            @media (min-width: 900px) {
              .featured-project-card {
                grid-template-columns: 1fr 1fr !important;
              }
              .fp-image-panel {
                min-height: unset !important;
                border-right: 1px solid rgba(0,229,255,0.09) !important;
              }
            }
            @media (max-width: 899px) {
              .fp-content-panel {
                padding: 2rem 1.75rem !important;
              }
            }
          `}</style>
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
                  <motion.div key={area.title} {...inView(i * 0.12)} style={{ height: '100%' }}>
                    <motion.div
                      whileHover={{ y: -4, borderColor: `${accent}30`, boxShadow: `0 0 0 1px ${accent}12, 0 16px 48px rgba(0,0,0,0.5)` }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
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
                    </motion.div>
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
              <motion.div key={item.title} {...inView(i * 0.1)} style={{ height: '100%' }}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(0,229,255,0.22)', boxShadow: '0 0 0 1px rgba(0,229,255,0.08), 0 16px 48px rgba(0,0,0,0.5)' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="glass-card"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Light sweep on hover — subtle shimmer across top */}
                  <motion.div
                    initial={{ x: '-110%', opacity: 0 }}
                    whileHover={{ x: '110%', opacity: 1 }}
                    transition={{ duration: 0.55, ease: 'easeInOut' }}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '60%', height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)',
                      pointerEvents: 'none',
                      zIndex: 2,
                    }}
                  />

                  {/* Icon box + title row */}
                  <div style={{
                    display: 'flex', alignItems: 'flex-start',
                    gap: '1rem', marginBottom: '1.25rem',
                  }}>
                    {/* Icon box */}
                    <motion.div
                      whileHover={{ scale: 1.08, borderColor: 'rgba(0,229,255,0.35)', background: 'rgba(0,229,255,0.12)' }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      style={{
                        width: '48px', height: '48px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,229,255,0.07)',
                        border: '1px solid rgba(0,229,255,0.16)',
                        borderRadius: '12px',
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="var(--accent)" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true">
                        <path d={item.icon} />
                      </svg>
                    </motion.div>

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

                  {/* Description */}
                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                    flex: 1,
                  }}>
                    {item.description}
                  </p>
                </motion.div>
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
