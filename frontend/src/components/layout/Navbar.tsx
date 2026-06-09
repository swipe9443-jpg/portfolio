import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { content } from '@/content/content'
import { Button } from '@/components/ui/Button'
import { downloadResume } from '@/config/resume'

export function Navbar() {
  const [isScrolled,   setIsScrolled]   = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

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

  const closeMenu = () => setIsMobileOpen(false)

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={isScrolled ? {
        background:          'rgba(5,8,22,0.93)',
        backdropFilter:      'blur(20px)',
        WebkitBackdropFilter:'blur(20px)',
        borderBottom:        '1px solid rgba(0,229,255,0.07)',
        boxShadow:           '0 1px 24px rgba(0,0,0,0.4)',
      } : { background: 'transparent' }}
      role="banner"
    >
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <div
        className="container-main"
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          height:         '72px',
          gap:            '1.5rem',
        }}
      >
        {/* Logo */}
        <NavLink
          to="/"
          onClick={closeMenu}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}
          aria-label="Josh Fallarcuna — Home"
        >
          <span
            style={{
              display:      'inline-block',
              width:        '9px',
              height:       '9px',
              background:   'var(--accent)',
              borderRadius: '2px',
              transform:    'rotate(45deg)',
              flexShrink:   0,
            }}
            aria-hidden="true"
          />
          <span style={{
            fontFamily:    "'Space Grotesk', system-ui, sans-serif",
            fontWeight:    700,
            fontSize:      '1.0625rem',
            letterSpacing: '-0.01em',
            whiteSpace:    'nowrap',
          }}>
            <span className="text-gradient">Josh</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> Fallarcuna</span>
          </span>
        </NavLink>

        {/* Desktop nav — centered */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center"
          style={{ gap: '0.125rem', flex: 1, justifyContent: 'center' }}
        >
          {content.nav.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              onClick={closeMenu}
              style={({ isActive }) => ({
                position:       'relative',
                padding:        '0.5rem 1rem',
                fontSize:       '0.9375rem',
                fontWeight:     isActive ? 600 : 400,
                color:          isActive ? 'var(--accent)' : 'var(--text-muted)',
                textDecoration: 'none',
                borderRadius:   '8px',
                transition:     'color 0.2s ease',
                whiteSpace:     'nowrap',
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
                <>
                  <span aria-current={isActive ? 'page' : undefined}>{item.label}</span>
                  {isActive && (
                    <span
                      style={{
                        position:  'absolute',
                        bottom:    '4px',
                        left:      '50%',
                        transform: 'translateX(-50%)',
                        width:     '4px',
                        height:    '4px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                      }}
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA — single button, 40px (nav size) */}
        <div className="hidden md:flex items-center" style={{ flexShrink: 0 }}>
          <Button
            variant="primary"
            size="nav"
            onClick={downloadResume}
            aria-label="Download resume PDF"
          >
            Download Resume
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{
            padding:    '0.5rem',
            color:      'var(--text-muted)',
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            flexShrink: 0,
          }}
          onClick={() => setIsMobileOpen(v => !v)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav"
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            style={{ display: 'block', width: '20px', height: '16px', position: 'relative' }}
            aria-hidden="true"
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  position:     'absolute',
                  width:        '20px',
                  height:       '2px',
                  background:   'currentColor',
                  borderRadius: '2px',
                  transition:   'all 0.22s ease',
                  top:
                    i === 0 ? (isMobileOpen ? '7px' : '0')
                    : i === 1 ? '7px'
                    : (isMobileOpen ? '7px' : '14px'),
                  opacity:   i === 1 && isMobileOpen ? 0 : 1,
                  transform:
                    i === 0 && isMobileOpen ? 'rotate(45deg)'
                    : i === 2 && isMobileOpen ? 'rotate(-45deg)'
                    : 'none',
                }}
              />
            ))}
          </span>
        </button>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-nav"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' as const }}
            style={{
              overflow:            'hidden',
              background:          'rgba(5,8,22,0.97)',
              backdropFilter:      'blur(20px)',
              WebkitBackdropFilter:'blur(20px)',
              borderBottom:        '1px solid rgba(0,229,255,0.07)',
            }}
          >
            <div
              className="container-main"
              style={{
                paddingTop:    '1.25rem',
                paddingBottom: '1.75rem',
                display:       'flex',
                flexDirection: 'column',
                gap:           '0.375rem',
              }}
            >
              {/* Nav links */}
              {content.nav.map(item => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  onClick={closeMenu}
                  style={({ isActive }) => ({
                    padding:        '0.8125rem 1rem',
                    fontSize:       '1rem',
                    fontWeight:     500,
                    color:          isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    background:     isActive ? 'rgba(0,229,255,0.05)' : 'transparent',
                    textDecoration: 'none',
                    borderRadius:   '10px',
                    border:         isActive ? '1px solid rgba(0,229,255,0.12)' : '1px solid transparent',
                    transition:     'all 0.15s ease',
                  })}
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Divider */}
              <div
                style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0.75rem 0' }}
                aria-hidden="true"
              />

              {/* Single mobile CTA — full width, 56px */}
              <Button
                variant="primary"
                size="lg"
                style={{ width: '100%' }}
                onClick={() => { downloadResume(); closeMenu() }}
                aria-label="Download resume PDF"
              >
                Download Resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
