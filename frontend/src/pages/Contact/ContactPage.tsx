import { memo, useState, useCallback, type FC, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { PageMeta } from '@/components/ui/PageMeta'
import type { ContactFormData, FormStatus } from '@/types/portfolio'

/* ── Icons ──────────────────────────────────────────────────────────────────── */
const EmailIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 7l7 4.5L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const PhoneIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.62 3.33 2 2 0 013.6 1.33h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.91a16 16 0 006 6l.94-.94a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)
const LocationIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s-8-7.333-8-12a8 8 0 0116 0c0 4.667-8 12-8 12z"/>
    <circle cx="12" cy="10" r="2.5"/>
  </svg>
)
const AvailIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
    <line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
)
const ClockIcon: FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)
const GitHubIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)
const LinkedInIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const ArrowUpRight: FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1.5 10.5L10.5 1.5M10.5 1.5H5M10.5 1.5V7"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ── Form validation ────────────────────────────────────────────────────────── */
type FormErrors = Partial<Record<keyof ContactFormData, string>>

function validate(data: ContactFormData): FormErrors {
  const e: FormErrors = {}
  if (!data.name.trim())    e.name    = 'Name is required.'
  if (!data.email.trim())   e.email   = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email.'
  if (!data.subject.trim()) e.subject = 'Subject is required.'
  if (!data.message.trim()) e.message = 'Message is required.'
  else if (data.message.trim().length < 10) e.message = 'Message must be at least 10 characters.'
  return e
}

const empty: ContactFormData = { name: '', email: '', subject: '', message: '' }

/* ── Style tokens ───────────────────────────────────────────────────────────── */
const EASE: [number,number,number,number] = [0.22, 1, 0.36, 1]

const inView = (delay = 0) => ({
  initial:     { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true as const, margin: '-40px' },
  transition:  { duration: 0.52, delay, ease: EASE },
})

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8125rem', fontWeight: 500,
  color: 'var(--text-secondary)',
  marginBottom: '0.5rem',
}

const iconBox: React.CSSProperties = {
  width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.14)',
  color: 'var(--accent)',
}

/* ── Component ──────────────────────────────────────────────────────────────── */
export const ContactPage = memo(function ContactPage() {
  const { contact } = content
  const [formData, setFormData] = useState<ContactFormData>(empty)
  const [errors,   setErrors]   = useState<FormErrors>({})
  const [status,   setStatus]   = useState<FormStatus>('idle')
  const [touched,  setTouched]  = useState<Partial<Record<keyof ContactFormData, boolean>>>({})

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
    setTouched(prev => {
      if (!prev[name as keyof ContactFormData]) return prev
      setErrors(validate({ ...formData, [name]: value }))
      return prev
    })
  }, [formData])

  const handleBlur = useCallback((e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof ContactFormData
    setTouched(p => ({ ...p, [name]: true }))
    setErrors(errs => ({ ...errs, ...validate(formData) }))
  }, [formData])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(formData)
    setErrors(errs)
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(errs).length > 0) return
    setStatus('loading')
    try {
      const subject = encodeURIComponent(formData.subject)
      const body    = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
      setTimeout(() => { setStatus('success'); setFormData(empty); setTouched({}) }, 500)
    } catch { setStatus('error') }
  }, [formData, contact.email])

  const reset = useCallback(() => setStatus('idle'), [])

  return (
    <>
      <PageMeta
        title="Contact | Josh Fallarcuna"
        description="Get in touch with Josh Fallarcuna — open to internships, collaborations, and creative web projects."
        ogTitle="Contact Josh Fallarcuna"
        ogDescription="Open to internships, learning opportunities, and collaborations. Let's connect."
      />

      <section className="section-wrapper relative overflow-hidden" aria-label="Contact page">

        {/* Ambient glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '500px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at top, rgba(0,149,255,0.10) 0%, rgba(0,229,255,0.04) 45%, transparent 70%)',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '-4rem', right: '-6rem',
          width: '480px', height: '480px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 65%)',
          filter: 'blur(72px)',
        }} />

        <Container style={{ position: 'relative', zIndex: 1 }}>

          {/* ══ TOP INTRO ══════════════════════════════════════════════════════ */}
          <motion.div {...inView(0)} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>

            {/* LET'S CONNECT label with divider lines */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.35))' }} aria-hidden="true" />
              <span style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: '0.6875rem', fontWeight: 700,
                color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase',
              }}>
                Let's Connect
              </span>
              <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'linear-gradient(90deg, rgba(0,229,255,0.35), transparent)' }} aria-hidden="true" />
            </div>

            {/* Main title */}
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em',
              color: 'var(--text-primary)', marginBottom: '1.25rem',
            }}>
              Get In <span className="text-gradient">Touch</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '1.0625rem', color: 'var(--text-secondary)',
              lineHeight: 1.75, maxWidth: '540px', margin: '0 auto',
            }}>
              Have a project in mind or want to collaborate?<br />I'd love to hear from you.
            </p>
          </motion.div>

          {/* ══ MAIN CONTAINER ════════════════════════════════════════════════ */}
          <motion.div
            {...inView(0.1)}
            style={{
              background: 'rgba(13,20,36,0.92)',
              border: '1px solid rgba(0,229,255,0.14)',
              borderRadius: '24px',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 0 0 1px rgba(0,229,255,0.06), 0 0 64px rgba(0,229,255,0.06), 0 32px 96px rgba(0,0,0,0.55)',
              overflow: 'hidden',
              marginBottom: '2rem',
            }}
          >
            <div className="contact-split">

              {/* ══ LEFT: CONTACT INFO ══════════════════════════════════════ */}
              <motion.div
                {...inView(0.15)}
                className="contact-left"
                style={{
                  padding: '2.5rem 2.25rem',
                  borderRight: '1px solid rgba(0,229,255,0.08)',
                  display: 'flex', flexDirection: 'column', gap: '2rem',
                }}
              >
                {/* Header */}
                <div>
                  <p style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '0.6875rem', fontWeight: 700,
                    color: 'var(--accent)', letterSpacing: '0.16em', textTransform: 'uppercase',
                    marginBottom: '0.875rem',
                  }}>
                    Contact Info
                  </p>
                  <h2 style={{
                    fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                    fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
                    fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em',
                    color: 'var(--text-primary)', marginBottom: '0.875rem',
                  }}>
                    Let's Work Together
                  </h2>
                  <p style={{
                    fontSize: '0.9rem', color: 'var(--text-secondary)',
                    lineHeight: 1.8, maxWidth: '32ch',
                  }}>
                    I am currently open to new opportunities, collaborations, and exciting projects. Let's build something amazing together!
                  </p>
                </div>

                {/* Info items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {[
                    { icon: <EmailIcon />,    label: 'Email',        value: contact.email },
                    { icon: <PhoneIcon />,    label: 'Phone',        value: '09087389123' },
                    { icon: <LocationIcon />, label: 'Location',     value: contact.location },
                    { icon: <AvailIcon />,    label: 'Availability', value: contact.availability },
                  ].map(item => (
                    <motion.div
                      key={item.label}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}
                    >
                      <span style={iconBox}>{item.icon}</span>
                      <div>
                        <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.125rem' }}>
                          {item.label}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.4, wordBreak: 'break-all' }}>
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social section */}
                <div>
                  <p style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '0.6875rem', fontWeight: 700,
                    color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase',
                    marginBottom: '0.875rem',
                  }}>
                    Connect With Me
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {[
                      { platform: 'LinkedIn', Icon: LinkedInIcon, url: contact.socialLinks.find(s => s.platform === 'LinkedIn')?.url ?? '#' },
                      { platform: 'GitHub',   Icon: GitHubIcon,   url: contact.socialLinks.find(s => s.platform === 'GitHub')?.url ?? '#'   },
                      { platform: 'Email',    Icon: EmailIcon,    url: `mailto:${contact.email}` },
                    ].map(({ platform, Icon, url }) => (
                      <motion.a
                        key={platform}
                        href={url}
                        target={platform !== 'Email' ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        aria-label={`${platform} profile`}
                        whileHover={{ y: -2, borderColor: 'rgba(0,229,255,0.28)', boxShadow: '0 4px 20px rgba(0,229,255,0.08)' }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.75rem 1rem',
                          background: 'rgba(0,229,255,0.04)',
                          border: '1px solid rgba(0,229,255,0.10)',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <span style={iconBox}><Icon /></span>
                        <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: 500 }}>{platform}</span>
                        <span style={{ color: 'var(--accent)', opacity: 0.6 }}><ArrowUpRight /></span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Response badge */}
                <div style={{
                  padding: '1rem 1.125rem',
                  background: 'rgba(0,229,255,0.04)',
                  border: '1px solid rgba(0,229,255,0.10)',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                }}>
                  <span style={{ ...iconBox, width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0, marginTop: '2px' }}>
                    <ClockIcon />
                  </span>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    Usually replies within <span style={{ color: 'var(--accent)', fontWeight: 600 }}>24 hours</span>. Let's make something great together!
                  </p>
                </div>

              </motion.div>
              {/* ── END LEFT ── */}

              {/* ══ RIGHT: CONTACT FORM ═════════════════════════════════════ */}
              <motion.div
                {...inView(0.2)}
                className="contact-right"
                style={{ padding: '2.5rem 2.25rem', position: 'relative' }}
              >
                {/* Floating availability badge */}
                <div style={{
                  position: 'absolute', top: '1.5rem', right: '1.5rem',
                  display: 'flex', alignItems: 'center', gap: '0.4375rem',
                  padding: '0.3rem 0.875rem',
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.22)',
                  borderRadius: '9999px',
                  fontSize: '0.75rem', fontWeight: 600, color: '#86efac',
                }}>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 7px rgba(34,197,94,0.7)', flexShrink: 0, display: 'inline-block' }}
                    aria-hidden="true"
                  />
                  Available for Internship
                </div>

                {/* Form header */}
                <p style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '0.6875rem', fontWeight: 700,
                  color: 'var(--accent)', letterSpacing: '0.16em', textTransform: 'uppercase',
                  marginBottom: '1.75rem', marginTop: '0.25rem',
                }}>
                  Send a Message
                </p>

                {/* ── Success state ── */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '3rem 1rem' }}
                    role="status" aria-live="polite"
                  >
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      background: 'rgba(34,197,94,0.10)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1.25rem',
                    }}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                        <circle cx="14" cy="14" r="14" fill="rgba(34,197,94,0.15)"/>
                        <path d="M8 14l4 4 8-8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      Message Sent!
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.75rem', lineHeight: 1.65 }}>
                      Thanks for reaching out. I'll get back to you soon.
                    </p>
                    <Button variant="secondary" size="sm" onClick={reset}>Send Another</Button>
                  </motion.div>
                )}

                {/* ── Error banner ── */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ marginBottom: '1.5rem', padding: '0.875rem 1rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '10px', fontSize: '0.875rem', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    role="alert" aria-live="assertive"
                  >
                    <span style={{ flex: 1 }}>Something went wrong. Please try again or email me directly.</span>
                    <button onClick={reset} style={{ flexShrink: 0, color: 'rgba(239,68,68,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', lineHeight: 1 }} aria-label="Dismiss error">×</button>
                  </motion.div>
                )}

                {/* ── Form ── */}
                {status !== 'success' && (
                  <form onSubmit={handleSubmit} noValidate aria-label="Contact form">

                    {/* Row 1: Name + Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 11rem), 1fr))', gap: '1.125rem', marginBottom: '1.125rem' }}>
                      <div>
                        <label htmlFor="name" style={labelStyle}>Your Name <span style={{ color: 'var(--error)' }} aria-hidden="true">*</span></label>
                        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} onBlur={handleBlur}
                          placeholder="Your full name" autoComplete="name"
                          className={['form-input', errors.name && touched.name ? 'error' : ''].join(' ')}
                          aria-required="true" aria-invalid={!!(errors.name && touched.name)}
                          aria-describedby={errors.name && touched.name ? 'name-err' : undefined}
                        />
                        {errors.name && touched.name && <p id="name-err" role="alert" style={{ marginTop: '0.375rem', fontSize: '0.75rem', color: 'var(--error)' }}>{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" style={labelStyle}>Your Email <span style={{ color: 'var(--error)' }} aria-hidden="true">*</span></label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur}
                          placeholder="your@email.com" autoComplete="email"
                          className={['form-input', errors.email && touched.email ? 'error' : ''].join(' ')}
                          aria-required="true" aria-invalid={!!(errors.email && touched.email)}
                          aria-describedby={errors.email && touched.email ? 'email-err' : undefined}
                        />
                        {errors.email && touched.email && <p id="email-err" role="alert" style={{ marginTop: '0.375rem', fontSize: '0.75rem', color: 'var(--error)' }}>{errors.email}</p>}
                      </div>
                    </div>

                    {/* Row 2: Subject */}
                    <div style={{ marginBottom: '1.125rem' }}>
                      <label htmlFor="subject" style={labelStyle}>Subject <span style={{ color: 'var(--error)' }} aria-hidden="true">*</span></label>
                      <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} onBlur={handleBlur}
                        placeholder="What's this about?" autoComplete="off"
                        className={['form-input', errors.subject && touched.subject ? 'error' : ''].join(' ')}
                        aria-required="true" aria-invalid={!!(errors.subject && touched.subject)}
                        aria-describedby={errors.subject && touched.subject ? 'subject-err' : undefined}
                      />
                      {errors.subject && touched.subject && <p id="subject-err" role="alert" style={{ marginTop: '0.375rem', fontSize: '0.75rem', color: 'var(--error)' }}>{errors.subject}</p>}
                    </div>

                    {/* Row 3: Message */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label htmlFor="message" style={labelStyle}>Message <span style={{ color: 'var(--error)' }} aria-hidden="true">*</span></label>
                      <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} onBlur={handleBlur}
                        placeholder="Tell me about your project, opportunity, or idea..."
                        className={['form-input resize-none', errors.message && touched.message ? 'error' : ''].join(' ')}
                        aria-required="true" aria-invalid={!!(errors.message && touched.message)}
                        aria-describedby={errors.message && touched.message ? 'message-err' : undefined}
                        style={{ display: 'block' }}
                      />
                      {errors.message && touched.message && <p id="message-err" role="alert" style={{ marginTop: '0.375rem', fontSize: '0.75rem', color: 'var(--error)' }}>{errors.message}</p>}
                    </div>

                    {/* Send Button */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      style={{ marginBottom: '1.25rem' }}
                    >
                      <Button type="submit" variant="primary" size="lg" isLoading={status === 'loading'}
                        style={{ width: '100%', justifyContent: 'center' }} aria-label="Send contact message">
                        {status === 'loading' ? 'Sending…' : (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Send Message
                            <motion.span
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.18 }}
                              style={{ display: 'inline-flex' }}
                            >→</motion.span>
                          </span>
                        )}
                      </Button>
                    </motion.div>

                    {/* Bottom mini trust cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem' }}>
                      {[
                        { icon: '⚡', title: 'Fast Response', desc: 'I reply quickly' },
                        { icon: '🔒', title: '100% Reliable',  desc: 'Your info is safe' },
                        { icon: '✦',  title: 'Open to Work',   desc: "Let's collaborate" },
                      ].map(card => (
                        <motion.div
                          key={card.title}
                          whileHover={{ y: -2, borderColor: 'rgba(0,229,255,0.22)' }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          style={{
                            padding: '0.75rem 0.625rem', textAlign: 'center',
                            background: 'rgba(0,229,255,0.03)',
                            border: '1px solid rgba(0,229,255,0.09)',
                            borderRadius: '10px',
                          }}
                        >
                          <div style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{card.icon}</div>
                          <p style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.125rem' }}>{card.title}</p>
                          <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{card.desc}</p>
                        </motion.div>
                      ))}
                    </div>

                  </form>
                )}
              </motion.div>
              {/* ── END RIGHT ── */}

            </div>{/* end contact-split */}
          </motion.div>
          {/* ══ END MAIN CONTAINER ══ */}

          {/* ══ BOTTOM TRUST STRIP ════════════════════════════════════════════ */}
          <motion.div {...inView(0.25)}>
            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
              gap: '0',
              padding: '1.125rem 1.5rem',
              background: 'rgba(13,20,36,0.85)',
              border: '1px solid rgba(0,229,255,0.10)',
              borderRadius: '14px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}>
              {[
                { icon: '✦', label: 'Open for Internships' },
                { icon: '✦', label: 'Collaborations' },
                { icon: '✦', label: 'Freelance Projects' },
                { icon: '✦', label: "Let's Build Together" },
              ].map((item, i, arr) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4375rem', padding: '0.25rem 1rem' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '0.5rem', opacity: 0.7 }} aria-hidden="true">{item.icon}</span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{item.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: '1px', height: '16px', background: 'rgba(0,229,255,0.15)', flexShrink: 0 }} aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </Container>
      </section>
    </>
  )
})
