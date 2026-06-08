import { motion } from 'framer-motion'

interface SectionTitleProps {
  title:      string
  subtitle?:  string
  align?:     'center' | 'left'
  className?: string
}

export function SectionTitle({ title, subtitle, align = 'center', className = '' }: SectionTitleProps) {
  const isCenter = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true as const, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' as const }}
      style={{
        marginBottom: '3rem',
        textAlign: isCenter ? 'center' : 'left',
      }}
      className={className}
    >
      {/* Section heading */}
      <h2 style={{
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        fontSize: 'clamp(1.875rem, 5vw, 3.25rem)',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        color: 'var(--text-primary)',
        marginBottom: '0',
      }}>
        {title}
      </h2>

      {/* Cyan accent line */}
      <div style={{
        width: '2.5rem', height: '2px',
        background: 'var(--accent)', borderRadius: '2px',
        margin: isCenter ? '0.75rem auto 0' : '0.75rem 0 0',
        opacity: 0.8,
      }} aria-hidden="true" />

      {subtitle && (
        <p style={{
          marginTop: '0.875rem',
          fontSize: '0.9375rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          maxWidth: isCenter ? '36rem' : '100%',
          marginLeft: isCenter ? 'auto' : undefined,
          marginRight: isCenter ? 'auto' : undefined,
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
