import { memo } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { PageMeta } from '@/components/ui/PageMeta'
import { LearningRoadmap } from '@/components/ui/LearningRoadmap'

// ── Brand icons ───────────────────────────────────────────────────────────────
import {
  SiFigma, SiAdobephotoshop, SiHtml5, SiCss3, SiJavascript,
  SiTypescript, SiReact, SiGit, SiGithub, SiVercel, SiPicsart, SiOpenai,
} from 'react-icons/si'

// ── Tabler Icons ──────────────────────────────────────────────────────────────
import {
  TbBrush, TbDeviceDesktop, TbPencilBolt, TbVectorBezierArc,
  TbComponents, TbDeviceMobile, TbLayoutDashboard,
  TbBrandVscode, TbBrandVisualStudio, TbBrandOpenai,
  TbBrain, TbHierarchy, TbAtom, TbStack2, TbTerminal,
  TbVideo, TbScissors, TbPhoto,
  TbUsers, TbMessageCircle, TbEye, TbCalendarCheck, TbBooks,
} from 'react-icons/tb'

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────────────────── */
const CHIP_ICON_SIZE = 13   // badge chips
const TOOL_ICON_SIZE = 22   // tool showcase cards

/* ─────────────────────────────────────────────────────────────────────────────
   SKILL CHIP ICON MAP  (13 px, used inside skill chips)
───────────────────────────────────────────────────────────────────────────── */
const chipIconMap: Record<string, ReactNode> = {
  // Design & UX
  'UI Design':        <TbBrush           size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'UX Fundamentals':  <TbDeviceDesktop   size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Wireframing':      <TbPencilBolt      size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Prototyping':      <TbVectorBezierArc size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Design Systems':   <TbLayoutDashboard size={CHIP_ICON_SIZE} aria-hidden="true" />,
  // Frontend
  'HTML5':                       <SiHtml5         size={CHIP_ICON_SIZE} color="#E34F26" aria-hidden="true" />,
  'CSS3':                        <SiCss3          size={CHIP_ICON_SIZE} color="#1572B6" aria-hidden="true" />,
  'JavaScript':                  <SiJavascript    size={CHIP_ICON_SIZE} color="#F7DF1E" aria-hidden="true" />,
  'TypeScript (Learning)':       <SiTypescript    size={CHIP_ICON_SIZE} color="#3178C6" aria-hidden="true" />,
  'React (Learning)':            <SiReact         size={CHIP_ICON_SIZE} color="#61DAFB" aria-hidden="true" />,
  'Responsive Design':           <TbDeviceMobile  size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Modern Web Interfaces':       <TbDeviceDesktop size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Component-Based Development': <TbComponents    size={CHIP_ICON_SIZE} aria-hidden="true" />,
  // CS Foundations
  'Problem Solving':                <TbBrain     size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Algorithmic Thinking':           <TbHierarchy size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Object-Oriented Programming':    <TbAtom      size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Data Structures':                <TbStack2    size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Software Engineering Principles':<TbTerminal  size={CHIP_ICON_SIZE} aria-hidden="true" />,
  // Content Creation
  'Video Editing':        <TbVideo    size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Content Design':       <TbScissors size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Social Media Graphics':<TbPhoto    size={CHIP_ICON_SIZE} aria-hidden="true" />,
  // Professional
  'Team Collaboration': <TbUsers         size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Communication':      <TbMessageCircle size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Attention to Detail':<TbEye           size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Project Planning':   <TbCalendarCheck size={CHIP_ICON_SIZE} aria-hidden="true" />,
  'Self-Learning':      <TbBooks         size={CHIP_ICON_SIZE} aria-hidden="true" />,
}

/* ─────────────────────────────────────────────────────────────────────────────
   SKILL CATEGORY PANELS  (Section 1)
   Only 4 categories matching the reference: Design & UX, Frontend,
   CS Foundations, Professional Skills.
   Development Tools + Content Creation move exclusively to Section 2.
───────────────────────────────────────────────────────────────────────────── */
interface SkillPanel {
  id:          string
  title:       string
  accent:      string
  description: string
  emoji:       string          // decorative only, hidden from AT
  skills:      string[]
  icon:        ReactNode
}

const skillPanels: SkillPanel[] = [
  {
    id:          'design-ux',
    title:       'Design & UX',
    accent:      '#00e5ff',
    description: 'Crafting user-centered experiences through design and research.',
    emoji:       '🎨',
    skills:      ['UI Design', 'UX Fundamentals', 'Wireframing', 'Prototyping', 'Design Systems'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <circle cx="13.5" cy="6.5"  r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5"  cy="7.5"  r=".5" fill="currentColor" />
        <circle cx="6.5"  cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688
                 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125
                 A1.64 1.64 0 0 1 14.441 18h1.978c3.051 0 5.555-2.503 5.555-5.554
                 C21.974 6.012 17.491 2 12 2z" />
      </svg>
    ),
  },
  {
    id:          'frontend',
    title:       'Frontend Development',
    accent:      '#7dd3fc',
    description: 'Building responsive and interactive web experiences with modern technologies.',
    emoji:       '💻',
    skills:      ['HTML5', 'CSS3', 'JavaScript', 'TypeScript (Learning)', 'React (Learning)', 'Responsive Design', 'Modern Web Interfaces'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id:          'cs-foundations',
    title:       'Computer Science Foundations',
    accent:      '#a78bfa',
    description: 'Core CS concepts and problem-solving principles.',
    emoji:       '📚',
    skills:      ['Problem Solving', 'Algorithmic Thinking', 'Object-Oriented Programming', 'Data Structures', 'Software Engineering Principles'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6"  height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
      </svg>
    ),
  },
  {
    id:          'professional',
    title:       'Professional Skills',
    accent:      '#4ade80',
    description: 'Essential skills for effective collaboration and growth.',
    emoji:       '🤝',
    skills:      ['Communication', 'Team Collaboration', 'Attention to Detail', 'Project Planning', 'Self-Learning'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   TOOLS & TECHNOLOGIES  (Section 2)
   Grouped tool items with large icons + name labels.
───────────────────────────────────────────────────────────────────────────── */
interface ToolItem {
  name:    string
  icon:    ReactNode
  accent?: string
}
interface ToolGroup {
  label: string
  tools: ToolItem[]
}

// PixelLab SVG — no library entry, hand-traced brand mark
const PixelLabIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="#7B5CF0" />
    <text x="12" y="17" textAnchor="middle"
      fontFamily="system-ui,-apple-system,sans-serif"
      fontWeight="900" fontSize="15" fill="#fff">P</text>
  </svg>
)

// CapCut SVG
const CapCutIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    <circle cx="8"  cy="8"  r="3"   stroke="currentColor" strokeWidth="1.8" />
    <circle cx="8"  cy="16" r="3"   stroke="currentColor" strokeWidth="1.8" />
    <line x1="10.5" y1="9.5"  x2="20" y2="4"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="10.5" y1="14.5" x2="20" y2="20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

// PowerDirector SVG
const PowerDirectorIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="rgba(0,113,206,0.18)" />
    <path d="M8 5.5L19 12L8 18.5V5.5Z" fill="#0071CE" />
  </svg>
)

// Cursor — brand arrow/cursor mark; no library entry.
// Brand: black logomark on white, adapted for dark theme with glass bg + currentColor.
const CursorIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="rgba(255,255,255,0.07)"
      stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
    {/* Cursor arrow — simplified brand silhouette */}
    <path d="M6 4L6 17.5L9.5 14L12.5 20L14.5 19L11.5 13L16 13Z"
      fill="currentColor" fillOpacity="0.9" />
  </svg>
)

// Kiro — Amazon Kiro IDE; no library entry.
// Uses the "K" lettermark with Kiro's teal brand color.
const KiroIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="rgba(0,186,173,0.15)" />
    <text x="12" y="17" textAnchor="middle"
      fontFamily="system-ui,-apple-system,sans-serif"
      fontWeight="900" fontSize="14" fill="#00BAA0">K</text>
  </svg>
)

// Stitch AI — Google Stitch; no library entry.
// Uses a stylized "S" stitch needle motif.
const StitchIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="rgba(66,133,244,0.15)" />
    {/* Stitch-style thread path */}
    <path d="M7 8 C7 5 17 5 17 8 C17 11 7 11 7 14 C7 17 17 17 17 14"
      stroke="#4285F4" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="7"  cy="8"  r="1.5" fill="#4285F4" />
    <circle cx="17" cy="14" r="1.5" fill="#4285F4" />
  </svg>
)

const toolGroups: ToolGroup[] = [
  {
    label: 'Design Tools',
    tools: [
      { name: 'Figma',           icon: <SiFigma          size={TOOL_ICON_SIZE} color="#F24E1E" />,  accent: '#F24E1E' },
      { name: 'Adobe Photoshop', icon: <SiAdobephotoshop size={TOOL_ICON_SIZE} color="#31A8FF" />,  accent: '#31A8FF' },
      { name: 'Picsart',         icon: <SiPicsart        size={TOOL_ICON_SIZE} color="#FF4B4B" />,  accent: '#FF4B4B' },
      { name: 'PixelLab',        icon: <PixelLabIcon     size={TOOL_ICON_SIZE} />,                  accent: '#7B5CF0' },
    ],
  },
  {
    label: 'Development Technologies',
    tools: [
      { name: 'HTML5',      icon: <SiHtml5      size={TOOL_ICON_SIZE} color="#E34F26" />, accent: '#E34F26' },
      { name: 'CSS3',       icon: <SiCss3       size={TOOL_ICON_SIZE} color="#1572B6" />, accent: '#1572B6' },
      { name: 'JavaScript', icon: <SiJavascript size={TOOL_ICON_SIZE} color="#F7DF1E" />, accent: '#F7DF1E' },
      { name: 'TypeScript', icon: <SiTypescript size={TOOL_ICON_SIZE} color="#3178C6" />, accent: '#3178C6' },
      { name: 'React',      icon: <SiReact      size={TOOL_ICON_SIZE} color="#61DAFB" />, accent: '#61DAFB' },
    ],
  },
  {
    label: 'Development Tools',
    tools: [
      { name: 'Git',            icon: <SiGit                size={TOOL_ICON_SIZE} color="#F05032" />, accent: '#F05032' },
      { name: 'GitHub',         icon: <SiGithub             size={TOOL_ICON_SIZE} />,                 accent: '#ffffff' },
      { name: 'VS Code',        icon: <TbBrandVscode        size={TOOL_ICON_SIZE} color="#007ACC" />, accent: '#007ACC' },
      { name: 'Visual Studio',  icon: <TbBrandVisualStudio  size={TOOL_ICON_SIZE} color="#854CC7" />, accent: '#854CC7' },
      { name: 'Cursor',         icon: <CursorIcon           size={TOOL_ICON_SIZE} />,                 accent: '#ffffff' },
      { name: 'Kiro',           icon: <KiroIcon             size={TOOL_ICON_SIZE} />,                 accent: '#00BAA0' },
      { name: 'Vercel',         icon: <SiVercel             size={TOOL_ICON_SIZE} />,                 accent: '#ffffff' },
    ],
  },
  {
    label: 'AI Tools',
    tools: [
      { name: 'ChatGPT',  icon: <SiOpenai       size={TOOL_ICON_SIZE} color="#10a37f" />, accent: '#10a37f' },
      { name: 'Codex',    icon: <TbBrandOpenai  size={TOOL_ICON_SIZE} color="#00e5ff" />, accent: '#00e5ff' },
      { name: 'Stitch AI',icon: <StitchIcon     size={TOOL_ICON_SIZE} />,                 accent: '#4285F4' },
    ],
  },
  {
    label: 'Content Creation',
    tools: [
      { name: 'CapCut',        icon: <CapCutIcon        size={TOOL_ICON_SIZE} />, accent: '#00e5ff' },
      { name: 'PowerDirector', icon: <PowerDirectorIcon size={TOOL_ICON_SIZE} />, accent: '#0071CE' },
    ],
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION HELPERS
───────────────────────────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true as const, margin: '-32px' },
  transition:  { duration: 0.46, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
})

/* ─────────────────────────────────────────────────────────────────────────────
   ToolCard — interactive tool item
───────────────────────────────────────────────────────────────────────────── */
const ToolCard = memo(function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -3 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            '0.75rem',
        padding:        '0.875rem 1.125rem',
        background:     'rgba(13,20,36,0.92)',
        border:         '1px solid rgba(255,255,255,0.07)',
        borderRadius:   '12px',
        backdropFilter: 'blur(16px)',
        cursor:         'default',
        transition:     'border-color 0.2s ease, box-shadow 0.2s ease',
        minWidth:       0,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = `${tool.accent ?? '#00e5ff'}40`
        el.style.boxShadow   = `0 0 0 1px ${tool.accent ?? '#00e5ff'}18, 0 8px 28px rgba(0,0,0,0.4)`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.boxShadow   = 'none'
      }}
    >
      <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        {tool.icon}
      </span>
      <span style={{
        fontFamily:    "'Space Grotesk', system-ui, sans-serif",
        fontSize:      '0.875rem',
        fontWeight:    600,
        color:         'var(--text-primary)',
        whiteSpace:    'nowrap',
      }}>
        {tool.name}
      </span>
    </motion.div>
  )
})
export const SkillsPage = memo(function SkillsPage() {

  return (
    <>
      <PageMeta
        title="Skills | Josh Fallarcuna"
        description="Technical skills, tools, and capabilities — UI/UX Design, Frontend Development, and more."
        ogTitle="Skills — Josh Fallarcuna"
        ogDescription="Technologies, tools, and disciplines actively applied across design, development, and problem solving."
      />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — SKILLS & CAPABILITIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-wrapper relative overflow-hidden"
        aria-label="Skills and capabilities"
      >
        {/* Background glows */}
        <div style={{
          position: 'absolute', top: '-6rem', left: '-4rem',
          width: '560px', height: '560px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(0,149,255,0.09) 0%, transparent 65%)',
          filter: 'blur(48px)',
        }} aria-hidden="true" />
        <div style={{
          position: 'absolute', bottom: '-4rem', right: '-4rem',
          width: '480px', height: '480px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 65%)',
          filter: 'blur(48px)',
        }} aria-hidden="true" />
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '340px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at top, rgba(0,229,255,0.045) 0%, transparent 70%)',
        }} aria-hidden="true" />

        <Container className="relative z-10">

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ maxWidth: '640px', marginBottom: '4.5rem' }}
          >
            <p className="page-hero-label">Technical Expertise</p>
            <h1 className="page-hero-heading">
              Skills &amp; <span className="text-gradient">Capabilities</span>
            </h1>
            <p className="page-hero-body">
              Technologies, tools, and disciplines actively applied across design,
              development, and problem solving.
            </p>
          </motion.div>

          {/* ── Horizontal skill panels ─────────────────────────────────────── */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            role="list"
            aria-label="Skill categories"
          >
            {skillPanels.map((panel, idx) => (
              <motion.article
                key={panel.id}
                role="listitem"
                {...fadeUp(idx * 0.08)}
                aria-label={panel.title}
                style={{
                  position:       'relative',
                  overflow:       'hidden',
                  background:     'rgba(13,20,36,0.92)',
                  border:         '1px solid rgba(255,255,255,0.07)',
                  borderRadius:   '16px',
                  backdropFilter: 'blur(20px)',
                  transition:     'border-color 0.22s ease, box-shadow 0.22s ease, transform 0.25s ease',
                }}
                whileHover={{
                  y: -3,
                  transition: { duration: 0.22, ease: 'easeOut' },
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderColor = `${panel.accent}30`
                  el.style.boxShadow   = `0 0 0 1px ${panel.accent}12, 0 16px 48px rgba(0,0,0,0.45)`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                  el.style.boxShadow   = 'none'
                }}
              >
                {/* Left accent bar */}
                <div style={{
                  position:     'absolute',
                  top:          0,
                  left:         0,
                  width:        '3px',
                  height:       '100%',
                  background:   panel.accent,
                  opacity:      0.7,
                  borderRadius: '16px 0 0 16px',
                  transition:   'opacity 0.22s ease',
                }} aria-hidden="true" />

                {/*
                  Two-column layout:
                  Left: 260px fixed — icon + title + description
                  Right: flex-1 — chip grid
                  Collapses to single column on tablet/mobile via flex-wrap
                */}
                <div style={{
                  display:        'flex',
                  flexWrap:       'wrap',
                  gap:            '0',
                  paddingLeft:    '3px', // offset left bar
                }}>

                  {/* ── LEFT: identity ─────────────────────────────────────── */}
                  <div style={{
                    width:          '260px',
                    flexShrink:     0,
                    padding:        '2rem 2rem 2rem 2.25rem',
                    display:        'flex',
                    flexDirection:  'column',
                    gap:            '0.75rem',
                    // vertical divider on wide screens
                    borderRight:    '1px solid rgba(255,255,255,0.05)',
                  }}>
                    {/* Icon box */}
                    <div style={{
                      width:          '52px',
                      height:         '52px',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      background:     `${panel.accent}12`,
                      border:         `1px solid ${panel.accent}28`,
                      borderRadius:   '14px',
                      color:          panel.accent,
                      flexShrink:     0,
                    }} aria-hidden="true">
                      {panel.icon}
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontFamily:    "'Space Grotesk', 'Inter', system-ui, sans-serif",
                      fontSize:      '1rem',
                      fontWeight:    700,
                      color:         'var(--text-primary)',
                      lineHeight:    1.3,
                      letterSpacing: '-0.015em',
                      margin:        0,
                    }}>
                      {panel.title}
                    </h2>

                    {/* Description */}
                    <p style={{
                      fontSize:   '0.8125rem',
                      color:      'var(--text-muted)',
                      lineHeight: 1.65,
                      margin:     0,
                    }}>
                      {panel.description}
                    </p>
                  </div>

                  {/* ── RIGHT: skill chips ──────────────────────────────────── */}
                  <div style={{
                    flex:           '1 1 300px',
                    padding:        '2rem 2rem 2rem 2rem',
                    display:        'flex',
                    alignItems:     'center',
                  }}>
                    <div style={{
                      display:    'flex',
                      flexWrap:   'wrap',
                      gap:        '0.5rem',
                      alignContent:'flex-start',
                    }}
                      aria-label={`${panel.title} skills`}
                    >
                      {panel.skills.map(skill => (
                        <motion.span
                          key={skill}
                          className="skill-badge"
                          style={{
                            borderColor:  `${panel.accent}22`,
                            display:      'inline-flex',
                            alignItems:   'center',
                            gap:          '0.375rem',
                            cursor:       'default',
                          }}
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.14, ease: 'easeOut' }}
                        >
                          {chipIconMap[skill] ?? null}
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.article>
            ))}
          </div>

        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — TOOLS & TECHNOLOGIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-wrapper section-divided relative overflow-hidden"
        aria-label="Tools and technologies"
      >
        {/* Ambient glow — purple left, cyan right */}
        <div style={{
          position: 'absolute', top: '20%', left: '-8rem',
          width: '400px', height: '400px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 65%)',
          filter: 'blur(48px)',
        }} aria-hidden="true" />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-6rem',
          width: '360px', height: '360px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 65%)',
          filter: 'blur(48px)',
        }} aria-hidden="true" />

        <Container className="relative z-10">

          {/* Section header */}
          <motion.div {...fadeUp(0)} style={{ marginBottom: '3.5rem' }}>
            <p className="page-hero-label" style={{ marginBottom: '0.875rem' }}>
              Tools &amp; Technologies
            </p>
            <h2 style={{
              fontFamily:    "'Space Grotesk', 'Inter', system-ui, sans-serif",
              fontSize:      'clamp(2rem, 4.5vw, 3rem)',
              fontWeight:    700,
              lineHeight:    1.1,
              letterSpacing: '-0.025em',
              color:         'var(--text-primary)',
              marginBottom:  '0.875rem',
            }}>
              Tools &amp; <span className="text-gradient">Technologies</span>
            </h2>
            <p style={{
              fontSize:   '1.0625rem',
              color:      'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth:   '38rem',
            }}>
              A curated set of tools and technologies I use to bring ideas to life.
            </p>
          </motion.div>

          {/* Tool groups */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {toolGroups.map((group, gi) => (
              <motion.div key={group.label} {...fadeUp(gi * 0.07)}>

                {/* Group label */}
                <p style={{
                  fontFamily:    "'Space Grotesk', system-ui, sans-serif",
                  fontSize:      '0.6875rem',
                  fontWeight:    700,
                  color:         'var(--accent)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom:  '1rem',
                }}>
                  {group.label}
                </p>

                {/* Tool cards row */}
                <div style={{
                  display:       'flex',
                  flexWrap:      'wrap',
                  gap:           '0.75rem',
                }}>
                  {group.tools.map((tool, ti) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-16px' }}
                      transition={{ duration: 0.35, delay: gi * 0.06 + ti * 0.04, ease: 'easeOut' }}
                    >
                      <ToolCard tool={tool} />
                    </motion.div>
                  ))}
                </div>

                {/* Group divider — not after the last group */}
                {gi < toolGroups.length - 1 && (
                  <div style={{
                    height:     '1px',
                    background: 'rgba(255,255,255,0.04)',
                    marginTop:  '2.5rem',
                  }} aria-hidden="true" />
                )}
              </motion.div>
            ))}
          </div>

        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — LEARNING ROADMAP  (Step Progress Layout)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-wrapper section-divided" aria-label="Learning roadmap">
        <Container>
          <SectionTitle
            title="Learning Roadmap"
            subtitle="Where I am today and what I'm actively building towards."
          />
          <LearningRoadmap />
        </Container>
      </section>
    </>
  )
})
