/**
 * LearningRoadmap — Step Progress Roadmap
 * Replaces the old vertical list in Section 3 of SkillsPage.
 * Fully self-contained: zero changes to any other section or page.
 *
 * Design rules:
 *  - Preserves the existing dark cinematic palette & token set
 *  - No glassmorphism
 *  - Framer Motion for all transitions (fade-up on enter, step switch, line fill)
 *  - Keyboard-accessible, ARIA-labelled, focus-visible rings
 */

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
interface RoadmapStep {
  id:          string
  label:       string
  status:      'completed' | 'active' | 'future'
  title:       string
  subtitle:    string
  skills:      string[]
  description: string
}

const STEPS: RoadmapStep[] = [
  {
    id:          'foundation',
    label:       'Foundation',
    status:      'completed',
    title:       'Web Foundation',
    subtitle:    'Completed',
    skills:      ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub'],
    description:
      'Built a solid foundation in core web technologies and version control. Developed a strong understanding of how the web works and how to manage code professionally.',
  },
  {
    id:          'design',
    label:       'Design',
    status:      'completed',
    title:       'UI/UX Design',
    subtitle:    'Completed',
    skills:      ['Figma', 'UI Design', 'UX Fundamentals', 'Wireframing', 'Adobe Photoshop'],
    description:
      'Learned to craft user-centered digital experiences using Figma and Adobe Photoshop. Studied design systems, prototyping, and visual hierarchy to bridge design and development.',
  },
  {
    id:          'frontend',
    label:       'Frontend',
    status:      'active',
    title:       'Frontend Development',
    subtitle:    'Currently Learning',
    skills:      ['React', 'TypeScript', 'Responsive Design', 'Component Architecture', 'Vite'],
    description:
      'Currently building responsive interfaces and improving frontend architecture through real-world portfolio projects. Focused on translating design concepts into clean, production-ready code.',
  },
  {
    id:          'backend',
    label:       'Backend',
    status:      'future',
    title:       'Backend Development',
    subtitle:    'Planned',
    skills:      ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Authentication'],
    description:
      'Next milestone: learning server-side development to become a full-stack developer. Will focus on building scalable APIs and integrating frontend with backend systems.',
  },
  {
    id:          'future',
    label:       'Future',
    status:      'future',
    title:       'Future Goals',
    subtitle:    'Planned',
    skills:      ['Full-Stack Projects', 'Cloud Deployment', 'System Design', 'Open Source'],
    description:
      'Long-term vision: deploying complete full-stack applications, contributing to open source, and mastering cloud infrastructure to build robust, scalable digital products.',
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2.5 7.5L5.5 10.5L11.5 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ActivePulse = () => (
  <span
    style={{
      position:   'absolute',
      inset:      '-4px',
      borderRadius: '50%',
      border:     '2px solid rgba(0,229,255,0.35)',
      animation:  'roadmap-pulse 2s ease-in-out infinite',
    }}
    aria-hidden="true"
  />
)

/* ─────────────────────────────────────────────────────────────────────────────
   CONNECTING LINE
───────────────────────────────────────────────────────────────────────────── */
interface LineProps {
  filled: boolean
  partial: boolean   // partial = line after the active step (transitioning)
}

function ConnectorLine({ filled, partial }: LineProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        flex:           1,
        height:         '2px',
        position:       'relative',
        background:     'rgba(255,255,255,0.07)',
        borderRadius:   '2px',
        overflow:       'hidden',
      }}
    >
      {/* Filled portion */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: filled ? 1 : partial ? 0.5 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:     'absolute',
          inset:        0,
          transformOrigin: 'left',
          background:   filled
            ? 'linear-gradient(90deg, #0095ff, #00e5ff)'
            : 'linear-gradient(90deg, #00e5ff, rgba(0,229,255,0.3))',
          borderRadius: '2px',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   STEP NODE
───────────────────────────────────────────────────────────────────────────── */
interface StepNodeProps {
  step:      RoadmapStep
  index:     number
  isActive:  boolean
  onClick:   () => void
  labelId:   string
}

function StepNode({ step, isActive, onClick, labelId }: StepNodeProps) {
  const isCompleted = step.status === 'completed'
  const isFuture    = step.status === 'future'

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-labelledby={labelId}
      onClick={onClick}
      style={{
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        gap:             '0.625rem',
        background:      'none',
        border:          'none',
        cursor:          'pointer',
        padding:         '0.25rem',
        outline:         'none',
        WebkitTapHighlightColor: 'transparent',
        flexShrink:      0,
      }}
    >
      {/* Circle */}
      <motion.div
        whileHover={!isActive ? { scale: 1.12, y: -2 } : {}}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{ position: 'relative' }}
      >
        {/* Outer glow ring — only on active */}
        {isActive && <ActivePulse />}

        <motion.div
          animate={
            isActive
              ? {
                  background:   'linear-gradient(135deg, rgba(0,149,255,0.3), rgba(0,229,255,0.2))',
                  borderColor:  '#00e5ff',
                  boxShadow:    '0 0 16px rgba(0,229,255,0.4), 0 0 4px rgba(0,229,255,0.6)',
                  scale:        1.1,
                }
              : isCompleted
              ? {
                  background:   'linear-gradient(135deg, rgba(0,149,255,0.2), rgba(0,229,255,0.12))',
                  borderColor:  'rgba(0,229,255,0.55)',
                  boxShadow:    '0 0 8px rgba(0,229,255,0.15)',
                  scale:        1,
                }
              : {
                  background:   'rgba(13,20,36,0.9)',
                  borderColor:  'rgba(255,255,255,0.12)',
                  boxShadow:    'none',
                  scale:        1,
                }
          }
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            width:          '38px',
            height:         '38px',
            borderRadius:   '50%',
            border:         '2px solid',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            position:       'relative',
            zIndex:         1,
          }}
        >
          {isCompleted ? (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ color: '#00e5ff', display: 'flex' }}
            >
              <CheckIcon />
            </motion.span>
          ) : isActive ? (
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '9px', height: '9px', borderRadius: '50%',
                background: '#00e5ff',
                boxShadow:  '0 0 8px rgba(0,229,255,0.9)',
              }}
            />
          ) : (
            <span style={{
              width:     '7px', height: '7px', borderRadius: '50%',
              background: isFuture ? 'rgba(255,255,255,0.18)' : 'rgba(0,229,255,0.3)',
            }} />
          )}
        </motion.div>
      </motion.div>

      {/* Label */}
      <motion.span
        id={labelId}
        animate={{
          color: isActive
            ? '#00e5ff'
            : isCompleted
            ? 'rgba(0,229,255,0.7)'
            : 'rgba(255,255,255,0.3)',
          fontWeight: isActive ? 700 : 600,
        }}
        transition={{ duration: 0.25 }}
        style={{
          fontFamily:    "'Space Grotesk', system-ui, sans-serif",
          fontSize:      '0.6875rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          whiteSpace:    'nowrap',
          userSelect:    'none',
        }}
      >
        {step.label}
      </motion.span>
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTENT CARD
───────────────────────────────────────────────────────────────────────────── */
interface CardProps {
  step:      RoadmapStep
  direction: number   // +1 right→left, -1 left→right
}

const cardVariants = {
  enter:  (d: number) => ({ opacity: 0, x: d * 32, y: 8  }),
  center:                 ({ opacity: 1, x: 0,      y: 0  }),
  exit:   (d: number) => ({ opacity: 0, x: d * -24, y: -6 }),
}

function RoadmapCard({ step, direction }: CardProps) {
  const isCompleted = step.status === 'completed'
  const isActive    = step.status === 'active'
  const isFuture    = step.status === 'future'

  const accentColor = isActive
    ? '#00e5ff'
    : isCompleted
    ? 'rgba(0,229,255,0.65)'
    : 'rgba(255,255,255,0.25)'

  const statusLabel   = step.subtitle
  const statusDot     = isActive ? '#22c55e' : isCompleted ? '#00e5ff' : 'rgba(255,255,255,0.25)'
  const statusBg      = isActive ? 'rgba(34,197,94,0.10)' : isCompleted ? 'rgba(0,229,255,0.08)' : 'rgba(255,255,255,0.04)'
  const statusBorder  = isActive ? 'rgba(34,197,94,0.25)' : isCompleted ? 'rgba(0,229,255,0.22)' : 'rgba(255,255,255,0.10)'

  return (
    <motion.div
      custom={direction}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding:      '2.5rem 2.75rem',
        background:   'rgba(13,20,36,0.92)',
        border:       `1px solid ${isActive ? 'rgba(0,229,255,0.18)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '20px',
        boxShadow:    isActive
          ? '0 0 0 1px rgba(0,229,255,0.06), 0 24px 64px rgba(0,0,0,0.55), 0 4px 16px rgba(0,229,255,0.04)'
          : '0 16px 48px rgba(0,0,0,0.45)',
        position:     'relative',
        overflow:     'hidden',
      }}
    >
      {/* Top accent bar */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          top:        0, left: 0, right: 0,
          height:     '3px',
          background: isActive
            ? 'linear-gradient(90deg, #0095ff, #00e5ff)'
            : isCompleted
            ? 'linear-gradient(90deg, rgba(0,149,255,0.5), rgba(0,229,255,0.5))'
            : 'rgba(255,255,255,0.06)',
          borderRadius: '20px 20px 0 0',
        }}
      />

      {/* Ambient glow — active only */}
      {isActive && (
        <div
          aria-hidden="true"
          style={{
            position:  'absolute',
            top:       '-60px', right: '-60px',
            width:     '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Card header */}
      <div style={{
        display:       'flex',
        alignItems:    'flex-start',
        justifyContent:'space-between',
        gap:           '1.5rem',
        marginBottom:  '1.75rem',
        flexWrap:      'wrap',
      }}>
        <div>
          <p style={{
            fontFamily:    "'Space Grotesk', system-ui, sans-serif",
            fontSize:      '0.6875rem',
            fontWeight:    600,
            color:         accentColor,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            marginBottom:  '0.5rem',
          }}>
            {step.label}
          </p>
          <h3 style={{
            fontFamily:    "'Space Grotesk', system-ui, sans-serif",
            fontSize:      'clamp(1.375rem, 3vw, 1.75rem)',
            fontWeight:    700,
            color:         isFuture ? 'rgba(255,255,255,0.5)' : 'var(--text-primary)',
            lineHeight:    1.2,
            letterSpacing: '-0.02em',
            margin:        0,
          }}>
            {step.title}
          </h3>
        </div>

        {/* Status badge */}
        <span style={{
          display:    'inline-flex',
          alignItems: 'center',
          gap:        '0.375rem',
          padding:    '0.3125rem 0.875rem',
          background: statusBg,
          border:     `1px solid ${statusBorder}`,
          borderRadius: '9999px',
          fontSize:   '0.75rem',
          fontWeight: 600,
          color:      statusDot,
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
        }}>
          <span style={{
            width:     '6px', height: '6px', borderRadius: '50%',
            background: statusDot,
            flexShrink: 0,
            boxShadow:  isActive ? '0 0 6px rgba(34,197,94,0.8)' : 'none',
          }} aria-hidden="true" />
          {statusLabel}
        </span>
      </div>

      {/* Skills chips */}
      <div style={{ marginBottom: '1.75rem' }}>
        <p style={{
          fontFamily:    "'Space Grotesk', system-ui, sans-serif",
          fontSize:      '0.6875rem',
          fontWeight:    600,
          color:         'var(--text-muted)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom:  '0.875rem',
        }}>
          {isActive ? 'Currently Learning' : isCompleted ? 'Covered' : 'Upcoming'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {step.skills.map(skill => (
            <motion.span
              key={skill}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.14 }}
              style={{
                padding:    '0.3125rem 0.875rem',
                background: isActive
                  ? 'rgba(0,229,255,0.07)'
                  : isCompleted
                  ? 'rgba(0,229,255,0.05)'
                  : 'rgba(255,255,255,0.03)',
                border:     `1px solid ${
                  isActive
                    ? 'rgba(0,229,255,0.20)'
                    : isCompleted
                    ? 'rgba(0,229,255,0.14)'
                    : 'rgba(255,255,255,0.08)'
                }`,
                borderRadius: '8px',
                fontSize:   '0.8125rem',
                fontWeight: 500,
                color:      isActive
                  ? 'var(--text-secondary)'
                  : isCompleted
                  ? 'rgba(148,163,184,0.85)'
                  : 'rgba(255,255,255,0.28)',
                cursor:     'default',
                userSelect: 'none',
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div style={{
        padding:      '1.25rem 1.5rem',
        background:   isActive
          ? 'rgba(0,229,255,0.04)'
          : 'rgba(255,255,255,0.025)',
        border:       `1px solid ${isActive ? 'rgba(0,229,255,0.10)' : 'rgba(255,255,255,0.05)'}`,
        borderLeft:   `3px solid ${accentColor}`,
        borderRadius: '0 10px 10px 0',
      }}>
        <p style={{
          fontSize:   '0.9375rem',
          color:      isFuture ? 'rgba(148,163,184,0.55)' : 'var(--text-secondary)',
          lineHeight: 1.8,
          margin:     0,
        }}>
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export function LearningRoadmap() {
  const activeIndex     = STEPS.findIndex(s => s.status === 'active')
  const [current, setCurrent] = useState(activeIndex >= 0 ? activeIndex : 0)
  const [direction, setDirection]  = useState(0)
  const tablistId = useId()

  function goTo(index: number) {
    if (index === current) return
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight' && index < STEPS.length - 1) {
      e.preventDefault()
      goTo(index + 1)
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      goTo(index - 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      goTo(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      goTo(STEPS.length - 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Step Indicator ─────────────────────────────────────────────────── */}
      <div
        role="tablist"
        id={tablistId}
        aria-label="Learning roadmap stages"
        onKeyDown={e => handleKeyDown(e, current)}
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            0,
          marginBottom:   '2.5rem',
          overflowX:      'auto',
          overflowY:      'visible',
          padding:        '0.75rem 0.5rem 1rem',  // extra bottom for pulse ring
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}
      >
        {STEPS.map((step, i) => {
          const labelId = `roadmap-step-label-${i}`
          const isActive = i === current

          // Line after this node: filled if both this and next are completed,
          // partial if this is active, empty if future
          const nextCompleted = i < STEPS.length - 1 &&
            (current > i)
          const isCurrentLine = current === i && i < STEPS.length - 1

          return (
            <div
              key={step.id}
              style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? '1 1 auto' : '0 0 auto' }}
            >
              <StepNode
                step={step}
                index={i}
                isActive={isActive}
                onClick={() => goTo(i)}
                labelId={labelId}
              />
              {i < STEPS.length - 1 && (
                <ConnectorLine
                  filled={nextCompleted && !isCurrentLine}
                  partial={isCurrentLine}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* ── Content Card ───────────────────────────────────────────────────── */}
      <div
        role="tabpanel"
        aria-labelledby={`roadmap-step-label-${current}`}
        style={{ position: 'relative', minHeight: '280px' }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <RoadmapCard
            key={STEPS[current].id}
            step={STEPS[current]}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      {/* ── Keyboard hint ──────────────────────────────────────────────────── */}
      <p style={{
        textAlign:     'center',
        marginTop:     '1.25rem',
        fontSize:      '0.75rem',
        color:         'rgba(100,116,139,0.6)',
        fontFamily:    "'Space Grotesk', system-ui, sans-serif",
        letterSpacing: '0.04em',
        userSelect:    'none',
      }}>
        Click any step to explore · ← → keyboard navigation
      </p>

      {/* Pulse keyframe is now in globals.css */}
    </motion.div>
  )
}
