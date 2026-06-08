import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { content } from '@/content/content'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [isScrolled,    setIsScrolled]    = useState(false)
  const [isMobileOpen,  setIsMobileOpen]  = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = content.nav.map(n => n.href.slice(1))
    const observers: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id) },
        { threshold: 0.25 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollTo = (href: string) => {
    setIsMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={isScrolled ? {
        background: 'rgba(5,8,22,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,229,255,0.06)',
      } : { background: 'transparent' }}
      role="banner"
    >
      <div className="container-main" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px',
      }}>
        {/* Logo */}
        <a
          href="#home"
          onClick={e => { e.preventDefault(); scrollTo('#home') }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          aria-label="Back to top"
        >
          {/* Cyan square accent */}
          <span style={{
            display: 'inline-block', width: '8px', height: '8px',
            background: 'var(--accent)', borderRadius: '2px', transform: 'rotate(45deg)',
          }} aria-hidden="true" />
          <span style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700, fontSize: '1rem',
          }}>
            <span className="text-gradient">Josh</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> Fallarcuna</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center" style={{ gap: '0.25rem' }}>
          {content.nav.map(item => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={e => { e.preventDefault(); scrollTo(item.href) }}
                style={{
                  position: 'relative', padding: '0.5rem 0.875rem',
                  fontSize: '0.875rem', fontWeight: isActive ? 500 : 400,
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  textDecoration: 'none', borderRadius: '6px',
                  transition: 'color 0.2s ease',
                }}
                aria-current={isActive ? 'page' : undefined}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                {item.label}
                {isActive && (
                  <span style={{
                    position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)',
                    width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)',
                  }} aria-hidden="true" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button variant="primary" size="sm" onClick={() => scrollTo('#resume')}>
            Download CV
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{ padding: '0.5rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setIsMobileOpen(v => !v)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav"
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span style={{ display: 'block', width: '20px', height: '16px', position: 'relative' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                position: 'absolute', width: '20px', height: '2px',
                background: 'currentColor', borderRadius: '2px',
                transition: 'all 0.2s ease',
                top: i === 0 ? (isMobileOpen ? '7px' : '0') : i === 1 ? '7px' : (isMobileOpen ? '7px' : '14px'),
                opacity: i === 1 && isMobileOpen ? 0 : 1,
                transform: i === 0 && isMobileOpen ? 'rotate(45deg)' : i === 2 && isMobileOpen ? 'rotate(-45deg)' : 'none',
              }} />
            ))}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-nav"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' as const }}
            style={{
              overflow: 'hidden',
              background: 'rgba(5,8,22,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0,229,255,0.06)',
            }}
          >
            <div className="container-main" style={{ paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {content.nav.map(item => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={e => { e.preventDefault(); scrollTo(item.href) }}
                    style={{
                      padding: '0.7rem 0.875rem', fontSize: '0.9rem', fontWeight: 500,
                      color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                      background: isActive ? 'rgba(0,229,255,0.05)' : 'transparent',
                      textDecoration: 'none', borderRadius: '8px',
                      border: isActive ? '1px solid rgba(0,229,255,0.10)' : '1px solid transparent',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                )
              })}
              <div style={{ marginTop: '0.75rem' }}>
                <Button variant="primary" size="sm" style={{ width: '100%' }} onClick={() => scrollTo('#resume')}>
                  Download CV
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
