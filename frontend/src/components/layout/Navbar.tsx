import { useState, useEffect, useCallback, memo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { content } from '@/content/content'

/* ─────────────────────────────────────────────────────────────────────────────
   CENTER DOCK NAVBAR — Cinematic Glassmorphism Style
   Layout: [Home icon] | [Nav links · JV logo centerpiece · Nav links] | [Mail icon]
───────────────────────────────────────────────────────────────────────────── */

// Split the nav links around the centre logo — computed once at module level
const NAV_LEFT  = content.nav.slice(0, 3)  // Home, About, Projects
const NAV_RIGHT = content.nav.slice(3)      // Skills, Resume, Contact

// Navbar animation — computed once at module level, not recreated per render
const navMotion = {
  initial:    { y: -24, opacity: 0 },
  animate:    { y: 0,   opacity: 1 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
}

// ── Hex / cyber container for the JV logo ──────────────────────────────────
const JVLogo = memo(function JVLogo() {
  return (
    <NavLink
      to="/"
      aria-label="Josh Fallarcuna — Home"
      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <motion.div
        whileHover={{ scale: 1.12 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{
          position:        'relative',
          width:           '48px',
          height:          '48px',
          background:      'linear-gradient(135deg, rgba(0,149,255,0.18), rgba(0,229,255,0.12))',
          border:          '1.5px solid rgba(0,229,255,0.60)',
          borderRadius:    '12px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          cursor:          'pointer',
          flexShrink:      0,
          clipPath:        'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
          backdropFilter:  'blur(8px)',
          boxShadow:       '0 0 14px 3px rgba(0,229,255,0.40), 0 0 0 1px rgba(0,229,255,0.55)',
          // CSS animation uses only opacity — compositor-only, no paint
          animation:       'logo-pulse 4s ease-in-out infinite',
        }}
      >
        <span
          style={{
            fontFamily:    "'Space Grotesk', system-ui, sans-serif",
            fontWeight:    800,
            fontSize:      '1.125rem',
            letterSpacing: '-0.03em',
            background:    'linear-gradient(135deg, #00e5ff 0%, #5ef2ff 55%, #a5f3fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            backgroundClip:       'text',
            lineHeight:    1,
            userSelect:    'none',
          }}
        >
          JV
        </span>
      </motion.div>
    </NavLink>
  )
})

// ── Single desktop nav link ────────────────────────────────────────────────
const DockNavLink = memo(function DockNavLink({
  item,
  onClick,
}: {
  item: { label: string; href: string }
  onClick?: () => void
}) {
  return (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      onClick={onClick}
      style={{ textDecoration: 'none', position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {({ isActive }) => (
        <motion.span
          whileHover={{ y: -2, color: '#ffffff' }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{
            display:       'inline-flex',
            flexDirection: 'column',
            alignItems:    'center',
            gap:           '4px',
            padding:       '0.375rem 0.75rem',
            fontSize:      '0.875rem',
            fontWeight:    isActive ? 600 : 400,
            color:         isActive ? '#00e5ff' : '#94a3b8',
            borderRadius:  '8px',
            whiteSpace:    'nowrap',
            cursor:        'pointer',
            transition:    'color 0.18s ease',
          }}
        >
          <span aria-current={isActive ? 'page' : undefined}>{item.label}</span>

          {/* Animated active dot indicator */}
          <AnimatePresence>
            {isActive && (
              <motion.span
                key="dot"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'backOut' }}
                style={{
                  width:        '4px',
                  height:       '4px',
                  borderRadius: '50%',
                  background:   '#00e5ff',
                  boxShadow:    '0 0 6px 2px rgba(0,229,255,0.7)',
                  flexShrink:   0,
                }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>
        </motion.span>
      )}
    </NavLink>
  )
})

// ── Icon button (Home left / Mail right) ───────────────────────────────────
const DockIconBtn = memo(function DockIconBtn({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: '0 0 14px 3px rgba(0,229,255,0.30)' }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onClick={onClick}
      aria-label={label}
      style={{
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        width:           '38px',
        height:          '38px',
        background:      'rgba(0,229,255,0.07)',
        border:          '1px solid rgba(0,229,255,0.20)',
        borderRadius:    '10px',
        color:           '#94a3b8',
        cursor:          'pointer',
        flexShrink:      0,
        transition:      'color 0.18s ease, border-color 0.18s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.color = '#00e5ff'
        el.style.borderColor = 'rgba(0,229,255,0.45)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.color = '#94a3b8'
        el.style.borderColor = 'rgba(0,229,255,0.20)'
      }}
    >
      {children}
    </motion.button>
  )
})

// ── Home icon SVG — static, memoized ──────────────────────────────────────
const HomeIcon = memo(function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  )
})

// ── Mail icon SVG — static, memoized ──────────────────────────────────────
const MailIcon = memo(function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  )
})

// ── Hamburger / X icon ─────────────────────────────────────────────────────
const HamburgerIcon = memo(function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span style={{ display: 'block', width: '20px', height: '16px', position: 'relative' }} aria-hidden="true">
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
            top:  i === 0 ? (open ? '7px' : '0') : i === 1 ? '7px' : (open ? '7px' : '14px'),
            opacity:   i === 1 && open ? 0 : 1,
            transform: i === 0 && open ? 'rotate(45deg)' : i === 2 && open ? 'rotate(-45deg)' : 'none',
          }}
        />
      ))}
    </span>
  )
})

// ── Mobile nav item ────────────────────────────────────────────────────────
const MobileNavItem = memo(function MobileNavItem({
  item,
  index,
  onClose,
}: {
  item: { label: string; href: string }
  index: number
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x:  0 }}
      transition={{ delay: index * 0.045, duration: 0.18 }}
    >
      <NavLink
        to={item.href}
        end={item.href === '/'}
        onClick={onClose}
        style={({ isActive }) => ({
          display:        'block',
          padding:        '0.75rem 1rem',
          fontSize:       '0.9375rem',
          fontWeight:     isActive ? 600 : 400,
          color:          isActive ? '#00e5ff' : '#94a3b8',
          background:     isActive ? 'rgba(0,229,255,0.08)' : 'transparent',
          textDecoration: 'none',
          borderRadius:   '10px',
          border:         isActive ? '1px solid rgba(0,229,255,0.18)' : '1px solid transparent',
          transition:     'all 0.15s ease',
        })}
      >
        {item.label}
      </NavLink>
    </motion.div>
  )
})

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN NAVBAR COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const navigate = useNavigate()

  // useCallback so these stable references don't trigger child re-renders
  const closeMenu      = useCallback(() => setIsMobileOpen(false), [])
  const toggleMenu     = useCallback(() => setIsMobileOpen(v => !v), [])
  const goHome         = useCallback(() => { navigate('/'); closeMenu() }, [navigate, closeMenu])
  const goContact      = useCallback(() => navigate('/contact'), [navigate])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      role="banner"
      style={{
        position:  'fixed',
        top:       0,
        left:      0,
        right:     0,
        zIndex:    50,
        display:   'flex',
        justifyContent: 'center',
        alignItems:     'flex-start',
        padding:   '14px 1rem 0',
        pointerEvents: 'none',
      }}
    >
      {/* ── Desktop dock ────────────────────────────────────────────────────── */}
      <motion.nav
        aria-label="Primary navigation"
        {...navMotion}
        style={{
          display:        'none',
          pointerEvents:  'auto',
          alignItems:     'center',
          gap:            '4px',
          padding:        '7px 10px',
          background:     'rgba(5,8,22,0.78)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border:         '1px solid rgba(0,229,255,0.22)',
          borderRadius:   '22px',
          boxShadow:      '0 0 0 1px rgba(0,229,255,0.06), 0 8px 40px rgba(0,0,0,0.55), 0 0 32px rgba(0,229,255,0.07)',
        }}
        className="md-dock"
      >
        {/* Left — Home icon */}
        <DockIconBtn label="Go to Home" onClick={goHome}>
          <HomeIcon />
        </DockIconBtn>

        {/* Divider */}
        <div aria-hidden="true" style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.07)', margin: '0 4px' }} />

        {/* Left nav links */}
        {NAV_LEFT.map(item => (
          <DockNavLink key={item.href} item={item} />
        ))}

        {/* JV Logo centerpiece */}
        <div style={{ margin: '0 6px', pointerEvents: 'auto' }}>
          <JVLogo />
        </div>

        {/* Right nav links */}
        {NAV_RIGHT.map(item => (
          <DockNavLink key={item.href} item={item} />
        ))}

        {/* Divider */}
        <div aria-hidden="true" style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.07)', margin: '0 4px' }} />

        {/* Right — Mail icon */}
        <DockIconBtn label="Go to Contact" onClick={goContact}>
          <MailIcon />
        </DockIconBtn>
      </motion.nav>

      {/* ── Mobile dock ─────────────────────────────────────────────────────── */}
      <div
        style={{
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '8px',
          pointerEvents: 'auto',
          width:         '100%',
          maxWidth:      '420px',
        }}
        className="mobile-dock"
      >
        {/* Mobile pill bar */}
        <motion.div
          {...navMotion}
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            width:          '100%',
            padding:        '7px 10px',
            background:     'rgba(5,8,22,0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border:         '1px solid rgba(0,229,255,0.22)',
            borderRadius:   '22px',
            boxShadow:      '0 0 0 1px rgba(0,229,255,0.06), 0 8px 40px rgba(0,0,0,0.55), 0 0 24px rgba(0,229,255,0.06)',
          }}
        >
          {/* Left — Home icon */}
          <DockIconBtn label="Go to Home" onClick={goHome}>
            <HomeIcon />
          </DockIconBtn>

          {/* JV Logo */}
          <JVLogo />

          {/* Right — hamburger */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            style={{
              display:    'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width:      '38px',
              height:     '38px',
              background: 'rgba(0,229,255,0.07)',
              border:     '1px solid rgba(0,229,255,0.20)',
              borderRadius: '10px',
              color:      '#94a3b8',
              cursor:     'pointer',
              flexShrink: 0,
            }}
            onClick={toggleMenu}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            <HamburgerIcon open={isMobileOpen} />
          </motion.button>
        </motion.div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              id="mobile-nav"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, scaleY: 0.85, y: -8 }}
              animate={{ opacity: 1, scaleY: 1,    y: 0  }}
              exit={{   opacity: 0, scaleY: 0.85,  y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              style={{
                transformOrigin: 'top center',
                width:           '100%',
                background:      'rgba(5,8,22,0.93)',
                backdropFilter:  'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border:          '1px solid rgba(0,229,255,0.18)',
                borderRadius:    '18px',
                padding:         '12px 10px',
                boxShadow:       '0 8px 40px rgba(0,0,0,0.60), 0 0 24px rgba(0,229,255,0.06)',
                display:         'flex',
                flexDirection:   'column',
                gap:             '4px',
              }}
            >
              {content.nav.map((item, i) => (
                <MobileNavItem key={item.href} item={item} index={i} onClose={closeMenu} />
              ))}

              {/* Mail shortcut at bottom */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '6px 0' }} aria-hidden="true" />
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x:  0 }}
                transition={{ delay: content.nav.length * 0.045, duration: 0.18 }}
              >
                <NavLink
                  to="/contact"
                  onClick={closeMenu}
                  style={({ isActive }) => ({
                    display:        'flex',
                    alignItems:     'center',
                    gap:            '0.625rem',
                    padding:        '0.75rem 1rem',
                    fontSize:       '0.9375rem',
                    fontWeight:     isActive ? 600 : 400,
                    color:          isActive ? '#00e5ff' : '#94a3b8',
                    background:     isActive ? 'rgba(0,229,255,0.08)' : 'rgba(0,229,255,0.04)',
                    textDecoration: 'none',
                    borderRadius:   '10px',
                    border:         '1px solid rgba(0,229,255,0.12)',
                    transition:     'all 0.15s ease',
                  })}
                >
                  <MailIcon />
                  <span>Send a Message</span>
                </NavLink>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dock visibility + logo-pulse keyframes are now in globals.css */}
    </header>
  )
}
