import { memo } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { PageMeta } from '@/components/ui/PageMeta'
import { downloadResume, viewResume } from '@/config/resume'

/* ── Easing ─────────────────────────────────────────────────────────────── */
const E: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ── Animation variants ─────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true as const, margin: '-48px' },
  transition:  { duration: 0.56, delay, ease: E },
})
const fromLeft = (delay = 0) => ({
  initial:     { opacity: 0, x: -28 },
  whileInView: { opacity: 1, x: 0 },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.56, delay, ease: E },
})
const fromRight = (delay = 0) => ({
  initial:     { opacity: 0, x: 28 },
  whileInView: { opacity: 1, x: 0 },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.56, delay, ease: E },
})

/* ── Shared style helpers ───────────────────────────────────────────────── */
const GLASS: React.CSSProperties = {
  background: 'rgba(13,20,36,0.92)',
  border: '1px solid rgba(0,229,255,0.11)',
  borderRadius: '20px',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  boxShadow: '0 0 0 1px rgba(0,229,255,0.04), 0 24px 64px rgba(0,0,0,0.5)',
}
const SECTION_LABEL: React.CSSProperties = {
  fontFamily: "'Space Grotesk', system-ui, sans-serif",
  fontSize: '0.625rem',
  fontWeight: 700,
  color: 'var(--text-muted)',
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
}

/* ── Icons ──────────────────────────────────────────────────────────────── */
const IconGraduate = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
)
const IconBriefcase = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="12" />
    <path d="M2 12h20" />
  </svg>
)
const IconSummary = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)
const IconSkills = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
const IconTarget = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)
const IconDownload = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)
const IconEye = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)
const IconArrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)
const IconRocket = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)
const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

/* ── Data ───────────────────────────────────────────────────────────────── */
const educationTimeline = [
  {
    year: '2023 – Present',
    title: 'Bachelor of Science in Computer Science',
    org: 'Saint Columban College, Pagadian City',
    desc: 'Currently pursuing my degree and building strong foundations in programming, systems, and software development.',
    isCurrent: true,
  },
  {
    year: '2023',
    title: 'Senior High School',
    org: 'Saint Columban College, Pagadian City',
    desc: 'Strand: Science, Technology, Engineering and Mathematics',
    isCurrent: false,
  },
  {
    year: '2021',
    title: 'Junior High School',
    org: 'Igama Integrated School',
    desc: 'Completed Junior High School with honors.',
    isCurrent: false,
  },
]

const experienceTimeline = [
  {
    year: '2026',
    title: 'Incoming Intern – Frontend Developer',
    org: 'Upcoming',
    desc: 'Excited to apply my skills, learn in a real-world environment, and contribute to meaningful projects.',
    badge: 'Upcoming',
    isCurrent: true,
  },
  {
    year: '2025',
    title: 'Freelance UI/UX Designer',
    org: 'Self-Employed',
    desc: 'Designed modern interfaces, prototypes, and branding for clients and personal projects.',
    badge: null,
    isCurrent: false,
  },
  {
    year: '2024 – Present',
    title: 'Frontend Developer (Projects)',
    org: 'Personal Projects',
    desc: 'Building responsive, user-friendly web applications using modern technologies.',
    badge: null,
    isCurrent: false,
  },
]

const skills = [
  { label: 'HTML',       icon: '🌐' },
  { label: 'CSS',        icon: '🎨' },
  { label: 'JavaScript', icon: '⚡' },
  { label: 'TypeScript', icon: '🔷' },
  { label: 'React',      icon: '⚛️'  },
  { label: 'Tailwind CSS', icon: '💨' },
  { label: 'Figma',      icon: '✏️'  },
  { label: 'Git & GitHub', icon: '🐙' },
  { label: 'VS Code',    icon: '💻' },
  { label: 'UI/UX Design', icon: '🖼️' },
]

const highlights = [
  { value: '3+',   label: 'Projects Completed'    },
  { value: '2+',   label: 'Years Learning'         },
  { value: '6+',   label: 'Technologies Explored'  },
  { value: 'Open', label: 'To Internship'          },
]

const goals = [
  'Internship opportunities in Frontend or Full-Stack Development',
  'Real-world projects and challenges',
  'A collaborative and growth-focused environment',
  'Mentorship and continuous learning',
]

const trustItems = [
  { icon: '✦', label: 'Clean & Modern Code'  },
  { icon: '✦', label: 'Team Player'           },
  { icon: '✦', label: 'Willing to Learn'      },
  { icon: '✦', label: 'Passionate Developer'  },
]

/* ── Timeline entry component ───────────────────────────────────────────── */
const TimelineEntry = memo(function TimelineEntry({
  year, title, org, desc, badge, isCurrent, delay,
}: {
  year: string; title: string; org: string; desc: string;
  badge?: string | null; isCurrent: boolean; delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.42, delay, ease: E }}
      style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
    >
      {/* Dot */}
      <div style={{ flexShrink: 0, position: 'relative', zIndex: 1, marginTop: '13px' }}>
        <motion.div
          animate={isCurrent
            ? { boxShadow: ['0 0 0 0 rgba(0,229,255,0.55)', '0 0 0 7px rgba(0,229,255,0)', '0 0 0 0 rgba(0,229,255,0)'] }
            : undefined}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          style={{
            width: '16px', height: '16px', borderRadius: '50%',
            background: isCurrent ? 'radial-gradient(circle, #00e5ff 0%, #0095ff 100%)' : 'rgba(0,229,255,0.10)',
            border: isCurrent ? '2px solid rgba(0,229,255,0.9)' : '1px solid rgba(0,229,255,0.30)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: isCurrent ? '#fff' : 'rgba(0,229,255,0.5)' }} />
        </motion.div>
      </div>

      {/* Card */}
      <div
        className="resume-timeline-card"
        style={{
          flex: 1,
          padding: '0.75rem 1rem',
          background: isCurrent ? 'rgba(0,149,255,0.05)' : 'rgba(255,255,255,0.02)',
          border: isCurrent ? '1px solid rgba(0,229,255,0.18)' : '1px solid rgba(255,255,255,0.05)',
          borderRadius: '12px',
          transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
          <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
            {title}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
            {badge && (
              <span style={{ padding: '0.15rem 0.55rem', background: 'rgba(0,229,255,0.10)', border: '1px solid rgba(0,229,255,0.28)', borderRadius: '9999px', fontSize: '0.5625rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.06em' }}>
                {badge}
              </span>
            )}
            <span style={{ padding: '0.125rem 0.5rem', background: 'transparent', border: '1px solid rgba(0,229,255,0.22)', borderRadius: '9999px', fontSize: '0.5625rem', fontWeight: 600, color: 'var(--accent)', whiteSpace: 'nowrap' }}>
              {year}
            </span>
          </div>
        </div>
        <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--accent)', opacity: 0.75, marginBottom: '0.25rem' }}>{org}</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{desc}</p>
      </div>
    </motion.div>
  )
})

/* ═══════════════════════════════════════════════════════════════════════ */
export const ResumePage = memo(function ResumePage() {
  return (
    <>
      <PageMeta
        title="Resume | Josh Fallarcuna"
        description="Professional profile, education, skills, and career goals of Josh Fallarcuna."
        ogTitle="Resume — Josh Fallarcuna"
        ogDescription="Background and skills — available for download."
      />

      <section className="section-wrapper relative overflow-hidden" aria-label="Resume page">

        {/* ── Ambient glows ── */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '560px', pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse at top, rgba(0,149,255,0.08) 0%, rgba(0,229,255,0.03) 45%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '-4rem', right: '-6rem', width: '480px', height: '480px', pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 65%)', filter: 'blur(72px)' }} />

        <Container style={{ position: 'relative', zIndex: 1 }}>

          {/* ══ TOP HEADER — centered ═══════════════════════════════════════ */}
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '3rem' }}>

            {/* MY RESUME label with side dividers */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.875rem', marginBottom: '1.375rem' }}>
              <div style={{ flex: 1, maxWidth: '64px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.40))' }} aria-hidden="true" />
              <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.6875rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.20em', textTransform: 'uppercase' }}>
                My Resume
              </span>
              <div style={{ flex: 1, maxWidth: '64px', height: '1px', background: 'linear-gradient(90deg, rgba(0,229,255,0.40), transparent)' }} aria-hidden="true" />
            </div>

            {/* Main title */}
            <h1 style={{ fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif", fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              My Journey. My Skills.{' '}
              <span className="text-gradient">My Future.</span>
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto' }}>
              A summary of my education, experience, skills and achievements.
            </p>
          </motion.div>
          {/* ══ END HEADER ══ */}

          {/* ══ MAIN GRID — 50 / 50 ════════════════════════════════════════ */}
          <div className="resume-main-grid">

            {/* ════ LEFT COLUMN — Education + Experience ════════════════════ */}
            <motion.div {...fromLeft(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

              {/* ── EDUCATION BLOCK ── */}
              <div style={{ ...GLASS, padding: '1.75rem' }}>
                {/* Block header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
                  <span style={{ width: '30px', height: '30px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.18)', borderRadius: '8px', color: 'var(--accent)' }}>
                    <IconGraduate />
                  </span>
                  <p style={{ ...SECTION_LABEL }}>Education</p>
                </div>

                {/* Timeline */}
                <div style={{ position: 'relative' }}>
                  {/* Spine */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '7px', top: '14px', bottom: '14px', width: '1.5px', background: 'linear-gradient(180deg, rgba(0,229,255,0.55) 0%, rgba(0,229,255,0.08) 100%)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {educationTimeline.map((e, i) => (
                      <TimelineEntry key={e.title} {...e} badge={null} delay={0.12 + i * 0.1} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider between blocks */}
              <div aria-hidden="true" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.12), transparent)' }} />

              {/* ── EXPERIENCE BLOCK ── */}
              <div style={{ ...GLASS, padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem' }}>
                  <span style={{ width: '30px', height: '30px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.18)', borderRadius: '8px', color: 'var(--accent)' }}>
                    <IconBriefcase />
                  </span>
                  <p style={{ ...SECTION_LABEL }}>Experience</p>
                </div>

                <div style={{ position: 'relative' }}>
                  <div aria-hidden="true" style={{ position: 'absolute', left: '7px', top: '14px', bottom: '14px', width: '1.5px', background: 'linear-gradient(180deg, rgba(0,229,255,0.55) 0%, rgba(0,229,255,0.08) 100%)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {experienceTimeline.map((e, i) => (
                      <TimelineEntry key={e.title} {...e} delay={0.12 + i * 0.1} />
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
            {/* ════ END LEFT ════ */}

            {/* ════ RIGHT COLUMN — Summary + Skills + Highlights + Goals + CTA ══ */}
            <motion.div {...fromRight(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* ── 1. PROFESSIONAL SUMMARY ── */}
              <motion.div {...fromRight(0.16)} style={{ ...GLASS, padding: '1.625rem 1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                  <span style={{ width: '30px', height: '30px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.18)', borderRadius: '8px', color: 'var(--accent)' }}>
                    <IconSummary />
                  </span>
                  <p style={{ ...SECTION_LABEL }}>Professional Summary</p>
                </div>
                {/* Left accent line + body */}
                <div style={{ paddingLeft: '1rem', borderLeft: '2.5px solid rgba(0,229,255,0.50)' }}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                    Motivated BSCS student with a passion for building modern, user-friendly web applications.
                    Strong in UI/UX design, frontend development, and problem solving. Eager to learn, grow,
                    and contribute to real-world projects.
                  </p>
                </div>
              </motion.div>

              {/* ── 2. SKILLS & TECHNOLOGIES ── */}
              <motion.div {...fromRight(0.2)} style={{ ...GLASS, padding: '1.625rem 1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <span style={{ width: '30px', height: '30px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.18)', borderRadius: '8px', color: 'var(--accent)' }}>
                      <IconSkills />
                    </span>
                    <p style={{ ...SECTION_LABEL }}>Skills &amp; Technologies</p>
                  </div>
                  <motion.a
                    href="/skills"
                    whileHover={{ color: 'var(--accent)', x: 2 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                  >
                    View All Skills <IconArrow />
                  </motion.a>
                </div>

                {/* 2-row skills grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
                  {skills.map(skill => (
                    <motion.div
                      key={skill.label}
                      whileHover={{ y: -3, borderColor: 'rgba(0,229,255,0.32)', boxShadow: '0 0 14px rgba(0,229,255,0.12)', background: 'rgba(0,229,255,0.06)' }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', padding: '0.625rem 0.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', cursor: 'default' }}
                    >
                      <span style={{ fontSize: '1.0625rem', lineHeight: 1 }} aria-hidden="true">{skill.icon}</span>
                      <span style={{ fontSize: '0.5625rem', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.2 }}>{skill.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* ── 3. RESUME HIGHLIGHTS ── */}
              <motion.div {...fromRight(0.24)} style={{ ...GLASS, padding: '1.5rem 1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                  <span style={{ width: '30px', height: '30px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.18)', borderRadius: '8px', color: 'var(--accent)' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  </span>
                  <p style={{ ...SECTION_LABEL }}>Resume Highlights</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.625rem' }}>
                  {highlights.map(h => (
                    <motion.div
                      key={h.label}
                      whileHover={{ y: -3, borderColor: 'rgba(0,229,255,0.28)', boxShadow: '0 0 16px rgba(0,229,255,0.10)' }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 0.375rem', background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.09)', borderRadius: '12px', textAlign: 'center', cursor: 'default' }}
                    >
                      <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1, marginBottom: '0.25rem' }}>{h.value}</p>
                      <p style={{ fontSize: '0.5625rem', fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.3 }}>{h.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* ── 4. WHAT I'M LOOKING FOR ── */}
              <motion.div {...fromRight(0.28)} style={{ ...GLASS, padding: '1.5rem 1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                  <span style={{ width: '30px', height: '30px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.18)', borderRadius: '8px', color: 'var(--accent)' }}>
                    <IconTarget />
                  </span>
                  <p style={{ ...SECTION_LABEL }}>What I'm Looking For</p>
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  {/* Goals list */}
                  <ul style={{ flex: 1, listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {goals.map(g => (
                      <li key={g} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <span style={{ marginTop: '2px', flexShrink: 0, width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(0,229,255,0.09)', border: '1px solid rgba(0,229,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                          <IconCheck />
                        </span>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{g}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Rocket hologram illustration */}
                  <div style={{ flexShrink: 0, position: 'relative', width: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Outer glow ring */}
                    <motion.div
                      animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.12, 0.25] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      aria-hidden="true"
                      style={{ position: 'absolute', width: '72px', height: '72px', borderRadius: '50%', border: '1.5px solid rgba(0,229,255,0.30)', boxShadow: '0 0 20px rgba(0,229,255,0.15)' }}
                    />
                    {/* Inner ring */}
                    <motion.div
                      animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.18, 0.4] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                      aria-hidden="true"
                      style={{ position: 'absolute', width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(0,229,255,0.22)' }}
                    />
                    {/* Rocket icon — y + rotateZ are compositor-only (no layout) */}
                    <motion.div
                      animate={{ y: [0, -5, 0], rotateZ: [0, 4, 0, -4, 0] }}
                      transition={{ y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }, rotateZ: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
                      style={{ position: 'relative', zIndex: 1, width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', boxShadow: '0 0 16px rgba(0,229,255,0.18)' }}
                    >
                      <IconRocket />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* ── 5. CTA BUTTONS ── */}
              <motion.div {...fromRight(0.32)}>
                <div className="resume-cta-row">
                  {/* View Full Resume — outline glass */}
                  <motion.button
                    onClick={viewResume}
                    whileHover={{ borderColor: 'rgba(0,229,255,0.55)', color: 'var(--accent)', boxShadow: '0 0 24px rgba(0,229,255,0.15), 0 0 0 1px rgba(0,229,255,0.18)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    aria-label="View full resume PDF"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0 1.5rem', height: '52px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                  >
                    <IconEye /> View Full Resume
                  </motion.button>

                  {/* Download Resume — filled cyan */}
                  <motion.button
                    onClick={downloadResume}
                    whileHover={{ filter: 'brightness(1.1)', boxShadow: '0 0 32px rgba(0,229,255,0.35), 0 0 0 1px rgba(0,229,255,0.40)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    aria-label="Download resume PDF"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0 1.5rem', height: '52px', background: 'linear-gradient(135deg, #0095ff, #00e5ff)', border: '1px solid rgba(0,229,255,0.40)', borderRadius: '14px', color: '#050816', fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.9375rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 0 1px rgba(0,229,255,0.22), 0 4px 20px rgba(0,229,255,0.15)' }}
                  >
                    <IconDownload /> Download Resume (PDF)
                  </motion.button>
                </div>
              </motion.div>

            </motion.div>
            {/* ════ END RIGHT ════ */}

          </div>
          {/* ══ END MAIN GRID ══ */}

          {/* ══ BOTTOM TRUST STRIP ═════════════════════════════════════════ */}
          <motion.div
            {...fadeUp(0.18)}
            style={{ marginTop: '2.5rem' }}
          >
            <div style={{ background: 'rgba(13,20,36,0.85)', border: '1px solid rgba(0,229,255,0.10)', borderRadius: '16px', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '1.125rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', overflow: 'hidden' }}>
              {trustItems.map((item, i) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
                  <motion.div
                    whileHover={{ color: 'var(--accent)' }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1.25rem', cursor: 'default' }}
                  >
                    <span style={{ color: 'var(--accent)', fontSize: '0.5625rem', opacity: 0.7 }} aria-hidden="true">{item.icon}</span>
                    <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                  </motion.div>
                  {i < trustItems.length - 1 && (
                    <div aria-hidden="true" style={{ width: '1px', height: '20px', background: 'rgba(0,229,255,0.12)', flexShrink: 0 }} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
          {/* ══ END TRUST STRIP ══ */}

        </Container>
      </section>

      {/* Scoped layout styles are now in globals.css */}
    </>
  )
})
