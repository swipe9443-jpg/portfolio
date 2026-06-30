import { memo } from 'react'
import { motion } from 'framer-motion'

interface SectionTitleProps {
  title:      string
  subtitle?:  string
  align?:     'center' | 'left'
  className?: string
}

// Memoized — receives only primitive props, never needs to re-render
export const SectionTitle = memo(function SectionTitle({ title, subtitle, align = 'center', className = '' }: SectionTitleProps) {
  const isCenter = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true as const, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' as const }}
      style={{
        marginBottom: '3.5rem',      /* 56px — was 48px, more air before content */
        textAlign: isCenter ? 'center' : 'left',
      }}
      className={className}
    >
      {/* Section heading — clamp: 32px → 56px */}
      <h2 style={{
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
        fontWeight: 700,
        lineHeight: 1.08,
        letterSpacing: '-0.025em',
        color: 'var(--text-primary)',
        marginBottom: 0,
      }}>
        {title}
      </h2>

      {/* Cyan accent underline */}
      <div style={{
        width: '2.5rem',             /* 40px */
        height: '2px',
        background: 'var(--accent)',
        borderRadius: '2px',
        margin: isCenter ? '0.75rem auto 0' : '0.75rem 0 0',
        opacity: 0.75,
      }} aria-hidden="true" />

      {subtitle && (
        <p style={{
          marginTop: '1.25rem',      /* 20px — was 16px */
          fontSize: '1.0625rem',     /* 17px — was 16px, more presence */
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
          maxWidth: isCenter ? '42rem' : '100%',
          marginLeft:  isCenter ? 'auto' : undefined,
          marginRight: isCenter ? 'auto' : undefined,
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
})
