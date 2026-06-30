import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { PageMeta } from '@/components/ui/PageMeta'

export const NotFoundPage = memo(function NotFoundPage() {
  const navigate = useNavigate()
  const goHome     = useCallback(() => navigate('/'),         [navigate])
  const goProjects = useCallback(() => navigate('/projects'), [navigate])

  return (
    <>
      <PageMeta
        title="404 — Page Not Found | Josh Fallarcuna"
        description="The page you're looking for doesn't exist or has been moved."
      />
      <section
      className="relative overflow-hidden"
      style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}
      aria-label="Page not found"
    >
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px', pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at top, rgba(0,149,255,0.08) 0%, transparent 70%)',
      }} />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}
        >
          <p style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: '5rem', fontWeight: 700, lineHeight: 1,
            background: 'linear-gradient(135deg, rgba(0,229,255,0.25), rgba(0,149,255,0.15))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', marginBottom: '1.5rem',
          }} aria-hidden="true">
            404
          </p>

          <h1 style={{
            fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
            fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em',
            color: 'var(--text-primary)', marginBottom: '1rem',
          }}>
            Page not found
          </h1>

          <p style={{
            fontSize: '0.9375rem', color: 'var(--text-muted)',
            lineHeight: 1.75, marginBottom: '2.5rem',
          }}>
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" onClick={goHome}>
              Back to Home
            </Button>
            <Button variant="secondary" size="lg" onClick={goProjects}>
              View Projects
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
    </>
  )
})
