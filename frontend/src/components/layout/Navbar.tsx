import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { content } from '@/content/content'
import { Button } from '@/components/ui/Button'
import { downloadResume } from '@/config/resume'

export function Navbar() {
  const [isScrolled,   setIsScrolled]   = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Close mobile menu on route change
  const handleNavClick = () => setIsMobileOpen(false)

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
        <NavLink
          to="/"
          onClick={handleNavClick}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          aria-label="Josh Fallarcuna — Home"
        >
          <span style={{
            display: 'inline-block', width: '8px', height: '8px',
            background: 'var(--accent)', borderRadius: '2px', transform: 'rotate(45deg)',
          }} aria-hidden="true" />
          <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: '1rem' }}>
            <span className="text-gradient">Josh</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> Fallarcuna</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center" style={{ gap: '0.25rem' }}>
          {content.nav.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              onClick={handleNavClick}
              style={({ isActive }) => ({
                position: 'relative',
                padding: '0.5rem 0.875rem',
                fontSize: '0.875rem',
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                textDecoration: 'none',
                borderRadius: '6px',
                transition: 'color 0.2s ease',
              })}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                if (el.getAttribute('aria-current') !== 'page') el.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                if (el.getAttribute('aria-current') !== 'page') el.style.color = 'var(--text-muted)'
              }}
            >
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined} style={{ display: 'contents' }}>
                  {item.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)',
                      width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)',
                    }} aria-hidden="true" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button variant="primary" size="sm" onClick={downloadResume}>
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
              {content.nav.map(item => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  onClick={handleNavClick}
                  style={({ isActive }) => ({
                    padding: '0.7rem 0.875rem',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(0,229,255,0.05)' : 'transparent',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    border: isActive ? '1px solid rgba(0,229,255,0.10)' : '1px solid transparent',
                  })}
                >
                  {item.label}
                </NavLink>
              ))}
              <div style={{ marginTop: '0.75rem' }}>
                <Button
                  variant="primary" size="sm"
                  style={{ width: '100%' }}
                  onClick={() => { downloadResume(); setIsMobileOpen(false) }}
                >
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
