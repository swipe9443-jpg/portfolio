import { memo, type FC } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { downloadResume } from '@/config/resume'

/* ─────────────────────────────────────────────────────────────────────────────
   Social icons — static, no hover state needed here (handled by CSS)
───────────────────────────────────────────────────────────────────────────── */
const GitHubIcon: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
      0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
      -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
      .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
      -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004
      1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7
      1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855
      0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484
      17.522 2 12 2z" />
  </svg>
)

const LinkedInIcon: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136
      1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85
      3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065
      0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064
      2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542
      C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0
      22.222 0h.003z" />
  </svg>
)

const platformIcons: Record<string, FC> = { GitHub: GitHubIcon, LinkedIn: LinkedInIcon }

/* ─────────────────────────────────────────────────────────────────────────────
   Social icon button — pure CSS hover, no useState
───────────────────────────────────────────────────────────────────────────── */
const SocialButton = memo(function SocialButton({
  link,
}: {
  link: { platform: string; url: string; label: string }
}) {
  const Icon = platformIcons[link.platform]
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      className="footer-social-btn"
    >
      {Icon ? <Icon /> : link.platform}
    </a>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   Nav link — pure CSS hover
───────────────────────────────────────────────────────────────────────────── */
const FooterNavLink = memo(function FooterNavLink({
  item,
}: {
  item: { label: string; href: string }
}) {
  return (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      className="footer-nav-link"
      style={({ isActive }) => ({
        fontWeight: isActive ? 500 : 400,
        color: isActive ? 'var(--text-primary)' : undefined,
      })}
    >
      {item.label}
    </NavLink>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   Resume button — pure CSS hover
───────────────────────────────────────────────────────────────────────────── */
const ResumeButton = memo(function ResumeButton() {
  return (
    <button
      onClick={downloadResume}
      aria-label="Download resume PDF"
      className="footer-resume-btn"
    >
      Download Resume ↓
    </button>
  )
})

/* ─────────────────────────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────────────────────────── */
export const Footer = memo(function Footer() {
  const { footer, nav } = content

  return (
    <footer
      aria-label="Site footer"
      style={{
        position:   'relative',
        overflow:   'hidden',
        background: 'linear-gradient(180deg, var(--bg) 0%, #030611 100%)',
      }}
    >

      {/* Faint top border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.18) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      {/* Ambient center glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '320px', pointerEvents: 'none',
        background: 'radial-gradient(ellipse at top, rgba(0,149,255,0.06) 0%, rgba(0,229,255,0.02) 40%, transparent 70%)',
      }} aria-hidden="true" />

      {/* Subtle vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 120% 80% at 50% 100%, rgba(0,0,0,0.45) 0%, transparent 70%)',
      }} aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="container-main footer-section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid">

          {/* Left: identity + social */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <p style={{
                fontFamily:    "'Space Grotesk', system-ui, sans-serif",
                fontSize:      '1.125rem',
                fontWeight:    700,
                letterSpacing: '-0.02em',
                lineHeight:    1.2,
                marginBottom:  '0.5rem',
              }}>
                <span className="text-gradient">{footer.name}</span>
              </p>
              <p style={{
                fontSize:   '0.8125rem',
                color:      'var(--text-muted)',
                lineHeight: 1.65,
                maxWidth:   '20rem',
              }}>
                {footer.tagline}
              </p>
            </div>

            <div style={{
              width: '2rem', height: '1px',
              background: 'var(--accent)', opacity: 0.4, borderRadius: '1px',
            }} aria-hidden="true" />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {footer.socialLinks.map(link => (
                <SocialButton key={link.platform} link={link} />
              ))}
            </div>
          </div>

          {/* Center: navigation */}
          <nav aria-label="Footer navigation">
            <p style={{
              fontFamily:    "'Space Grotesk', system-ui, sans-serif",
              fontSize:      '0.6875rem',
              fontWeight:    700,
              color:         'rgba(100,116,139,0.7)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom:  '1.25rem',
            }}>
              Navigation
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {nav.map(item => (
                <li key={item.href}>
                  <FooterNavLink item={item} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: resume */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <p style={{
              fontFamily:    "'Space Grotesk', system-ui, sans-serif",
              fontSize:      '0.6875rem',
              fontWeight:    700,
              color:         'rgba(100,116,139,0.7)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom:  '1.25rem',
            }}>
              Resume
            </p>
            <ResumeButton />
          </div>
        </div>
      </div>

      {/* Bottom bar: copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="container-main"
        style={{
          position:        'relative',
          zIndex:          1,
          paddingTop:      '1.25rem',
          paddingBottom:   '1.75rem',
          borderTop:       '1px solid rgba(255,255,255,0.04)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          gap:             '0.5rem',
        }}
      >
        <span style={{
          display: 'inline-block', width: '5px', height: '5px',
          borderRadius: '1px', background: 'var(--accent)',
          opacity: 0.3, transform: 'rotate(45deg)', flexShrink: 0,
        }} aria-hidden="true" />
        <p style={{
          fontSize: '0.75rem', color: 'rgba(100,116,139,0.55)',
          textAlign: 'center', letterSpacing: '0.02em',
        }}>
          {footer.copyright}
        </p>
        <span style={{
          display: 'inline-block', width: '5px', height: '5px',
          borderRadius: '1px', background: 'var(--accent)',
          opacity: 0.3, transform: 'rotate(45deg)', flexShrink: 0,
        }} aria-hidden="true" />
      </motion.div>

      {/* CSS-only hover styles are now in globals.css */}
    </footer>
  )
})
