import { useState, type FC, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PageMeta } from '@/components/ui/PageMeta'
import type { ContactFormData, FormStatus } from '@/types/portfolio'

// ── Icons ─────────────────────────────────────────────────────────────────────
const EmailIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 7l7 4.5L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
const LocationIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s-8-7.333-8-12a8 8 0 0116 0c0 4.667-8 12-8 12z"/>
    <circle cx="12" cy="10" r="2.5"/>
  </svg>
)

const platformIcons: Record<string, FC> = { GitHub: GitHubIcon, LinkedIn: LinkedInIcon }

// ── Form validation ───────────────────────────────────────────────────────────
type FormErrors = Partial<Record<keyof ContactFormData, string>>

function validate(data: ContactFormData): FormErrors {
  const e: FormErrors = {}
  if (!data.name.trim())    e.name    = 'Name is required.'
  if (!data.email.trim())   e.email   = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email address.'
  if (!data.subject.trim()) e.subject = 'Subject is required.'
  if (!data.message.trim()) e.message = 'Message is required.'
  else if (data.message.trim().length < 10) e.message = 'Message must be at least 10 characters.'
  return e
}

const empty: ContactFormData = { name: '', email: '', subject: '', message: '' }

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.8125rem', fontWeight: 500,
  color: 'var(--text-secondary)', marginBottom: '0.4rem',
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ContactPage() {
  const { contact } = content
  const [formData, setFormData] = useState<ContactFormData>(empty)
  const [errors,   setErrors]   = useState<FormErrors>({})
  const [status,   setStatus]   = useState<FormStatus>('idle')
  const [touched,  setTouched]  = useState<Partial<Record<keyof ContactFormData, boolean>>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
    if (touched[name as keyof ContactFormData])
      setErrors(validate({ ...formData, [name]: value }))
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof ContactFormData
    setTouched(p => ({ ...p, [name]: true }))
    setErrors(validate(formData))
  }

  const handleSubmit = async (e: FormEvent) => {
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
      setTimeout(() => {
        setStatus('success')
        setFormData(empty)
        setTouched({})
      }, 500)
    } catch {
      setStatus('error')
    }
  }

  const reset = () => setStatus('idle')

  return (
    <>
      <PageMeta
        title="Contact | Josh Fallarcuna"
        description="Get in touch with Josh Fallarcuna — open to internships, collaborations, and creative web projects."
        ogTitle="Contact Josh Fallarcuna"
        ogDescription="Open to internships, learning opportunities, and collaborations. Let's connect."
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="section-wrapper relative overflow-hidden" aria-label="Contact page">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(10,15,30,0.30)' }} aria-hidden="true" />
        <div className="glow-blob opacity-[0.07]" style={{
          width: '500px', height: '500px', top: '-4rem', left: '50%', transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)',
        }} aria-hidden="true" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ maxWidth: '640px', marginBottom: '4rem' }}
          >
            <p className="page-hero-label">Get In Touch</p>
            <h1 className="page-hero-heading">
              Let's <span className="text-gradient">Connect</span>
            </h1>
            <p className="page-hero-body">{contact.subheading}</p>
          </motion.div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            style={{ marginBottom: '3rem' }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.375rem 1rem',
              background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)',
              borderRadius: '9999px', fontSize: '0.8125rem', fontWeight: 500, color: '#86efac',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e',
                boxShadow: '0 0 8px rgba(34,197,94,0.7)',
              }} aria-hidden="true" />
              {contact.availability}
            </span>
          </motion.div>

          {/* Grid: info + form */}
          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

              {/* Contact info panel */}
              <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true as const }} transition={{ duration: 0.45 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <Card padding="md">
                  <h2 style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent)',
                    letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem',
                  }}>
                    Contact Info
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Email */}
                    <a href={`mailto:${contact.email}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      aria-label={`Email ${contact.email}`}>
                      <span style={{
                        width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.14)', color: 'var(--accent)',
                      }}>
                        <EmailIcon />
                      </span>
                      <span style={{ wordBreak: 'break-all' }}>{contact.email}</span>
                    </a>

                    {/* Location */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <span style={{
                        width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.14)', color: 'var(--accent)',
                      }}>
                        <LocationIcon />
                      </span>
                      {contact.location}
                    </div>

                    {/* Social links */}
                    {contact.socialLinks.map(link => {
                      const Icon = platformIcons[link.platform]
                      return (
                        <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                          aria-label={link.label}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                          <span style={{
                            width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.14)', color: 'var(--accent)',
                          }}>
                            {Icon ? <Icon /> : link.platform}
                          </span>
                          {link.platform}
                        </a>
                      )
                    })}
                  </div>
                </Card>

                <Card padding="md">
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                    Whether you have a project idea, an internship opportunity, or simply want to connect — feel free to reach out. I respond within 24–48 hours.
                  </p>
                </Card>
              </motion.div>

              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true as const }} transition={{ duration: 0.45, delay: 0.1 }}
              >
                <Card padding="lg">
                  {/* Success state */}
                  {status === 'success' && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      style={{ textAlign: 'center', padding: '2rem 0' }} role="status" aria-live="polite">
                      <div style={{
                        width: '60px', height: '60px', borderRadius: '50%',
                        background: 'rgba(34,197,94,0.10)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
                      }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                          <circle cx="14" cy="14" r="14" fill="rgba(34,197,94,0.15)"/>
                          <path d="M8 14l4 4 8-8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem',
                      }}>
                        Message Sent!
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Thanks for reaching out. I'll get back to you soon.
                      </p>
                      <Button variant="secondary" size="sm" onClick={reset}>Send Another</Button>
                    </motion.div>
                  )}

                  {/* Error banner */}
                  {status === 'error' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      style={{
                        marginBottom: '1.25rem', padding: '0.75rem 1rem',
                        background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)',
                        borderRadius: '8px', fontSize: '0.875rem', color: 'var(--error)',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                      }}
                      role="alert" aria-live="assertive">
                      Something went wrong. Please try again or email me directly.
                      <button onClick={reset} style={{ marginLeft: 'auto', color: 'rgba(239,68,68,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.125rem' }} aria-label="Dismiss">×</button>
                    </motion.div>
                  )}

                  {status !== 'success' && (
                    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                      {/* Grid: 2-col on sm+, 1-col on mobile to prevent overflow */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>

                        {/* Name */}
                        <div>
                          <label htmlFor="name" style={labelStyle}>
                            Name <span style={{ color: 'var(--error)' }} aria-hidden="true">*</span>
                          </label>
                          <input id="name" name="name" type="text" value={formData.name}
                            onChange={handleChange} onBlur={handleBlur}
                            placeholder="Your full name" autoComplete="name"
                            className={['form-input', errors.name && touched.name ? 'error' : ''].join(' ')}
                            aria-required="true"
                            aria-describedby={errors.name && touched.name ? 'name-err' : undefined}
                            aria-invalid={!!(errors.name && touched.name)} />
                          {errors.name && touched.name && (
                            <p id="name-err" role="alert" style={{ marginTop: '4px', fontSize: '0.75rem', color: 'var(--error)' }}>{errors.name}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="email" style={labelStyle}>
                            Email <span style={{ color: 'var(--error)' }} aria-hidden="true">*</span>
                          </label>
                          <input id="email" name="email" type="email" value={formData.email}
                            onChange={handleChange} onBlur={handleBlur}
                            placeholder="your@email.com" autoComplete="email"
                            className={['form-input', errors.email && touched.email ? 'error' : ''].join(' ')}
                            aria-required="true"
                            aria-describedby={errors.email && touched.email ? 'email-err' : undefined}
                            aria-invalid={!!(errors.email && touched.email)} />
                          {errors.email && touched.email && (
                            <p id="email-err" role="alert" style={{ marginTop: '4px', fontSize: '0.75rem', color: 'var(--error)' }}>{errors.email}</p>
                          )}
                        </div>

                        {/* Subject */}
                        <div style={{ gridColumn: '1 / -1' }}>
                          <label htmlFor="subject" style={labelStyle}>
                            Subject <span style={{ color: 'var(--error)' }} aria-hidden="true">*</span>
                          </label>
                          <input id="subject" name="subject" type="text" value={formData.subject}
                            onChange={handleChange} onBlur={handleBlur}
                            placeholder="What's this about?" autoComplete="off"
                            className={['form-input', errors.subject && touched.subject ? 'error' : ''].join(' ')}
                            aria-required="true"
                            aria-describedby={errors.subject && touched.subject ? 'subject-err' : undefined}
                            aria-invalid={!!(errors.subject && touched.subject)} />
                          {errors.subject && touched.subject && (
                            <p id="subject-err" role="alert" style={{ marginTop: '4px', fontSize: '0.75rem', color: 'var(--error)' }}>{errors.subject}</p>
                          )}
                        </div>

                        {/* Message */}
                        <div style={{ gridColumn: '1 / -1' }}>
                          <label htmlFor="message" style={labelStyle}>
                            Message <span style={{ color: 'var(--error)' }} aria-hidden="true">*</span>
                          </label>
                          <textarea id="message" name="message" rows={5} value={formData.message}
                            onChange={handleChange} onBlur={handleBlur}
                            placeholder="Tell me about your project, opportunity, or idea..."
                            className={['form-input resize-none', errors.message && touched.message ? 'error' : ''].join(' ')}
                            aria-required="true"
                            aria-describedby={errors.message && touched.message ? 'message-err' : undefined}
                            aria-invalid={!!(errors.message && touched.message)} />
                          {errors.message && touched.message && (
                            <p id="message-err" role="alert" style={{ marginTop: '4px', fontSize: '0.75rem', color: 'var(--error)' }}>{errors.message}</p>
                          )}
                        </div>
                      </div>

                      <div style={{ marginTop: '1.5rem' }}>
                        <Button type="submit" variant="primary" size="lg"
                          isLoading={status === 'loading'}
                          style={{ width: '100%' }}
                          aria-label="Send contact message">
                          {status === 'loading' ? 'Sending…' : 'Send Message'}
                        </Button>
                      </div>
                    </form>
                  )}
                </Card>
              </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
