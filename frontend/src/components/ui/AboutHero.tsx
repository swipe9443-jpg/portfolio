/**
 * AboutHero — Reference-accurate rebuild
 *
 * Structure:
 *   Section Title + cyan accent line
 *   Main glass container (45 image | 55 content)
 *   Bottom grid (60 stats card | 40 quick-info card)
 */

import React from 'react'
import { motion } from 'framer-motion'
import { content } from '@/content/content'
import { Container } from '@/components/ui/Container'
import heroPhoto from '@/assets/profile.png'

type E4 = [number, number, number, number]
const E: E4 = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.52, delay, ease: E },
})

const inView = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true as const, margin: '-32px' },
  transition:  { duration: 0.45, delay, ease: 'easeOut' as const },
})

/* ─── Capability cards ───────────────────────────────────────────────────── */
const CAPS = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    title: 'BSCS Student', desc: 'Arellano University',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    title: 'Frontend Developer', desc: 'Building interactive UIs',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="9" cy="11" r=".5" fill="var(--accent)"/><circle cx="12" cy="8" r=".5" fill="var(--accent)"/><circle cx="15" cy="11" r=".5" fill="var(--accent)"/></svg>,
    title: 'UI/UX Designer', desc: 'Designing user-centered experiences',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    title: 'Continuous Learner', desc: 'Always improving skills',
  },
]

/* ─── Bottom stats items ─────────────────────────────────────────────────── */
const STATS = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="6" height="18" rx="1"/><rect x="9" y="8" width="6" height="13" rx="1"/><rect x="16" y="13" width="6" height="8" rx="1"/></svg>,
    value: '3+', label: 'Projects', sub: 'Portfolio & concept work',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    value: '5+', label: 'Technologies', sub: 'Design & dev stack',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
    value: 'Open', label: 'To Internship', sub: 'Available now',
  },
]

/* ─── Quick info rows ────────────────────────────────────────────────────── */
const INFO_ICON: Record<string, React.ReactElement> = {
  Location: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Email:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Contact:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.33A2 2 0 0 1 3.6 1.33h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/></svg>,
  Education:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
}

/* ─── Shared hover handlers ──────────────────────────────────────────────── */
const hOn  = (e: React.MouseEvent<HTMLDivElement>) => { const el = e.currentTarget; el.style.borderColor='rgba(0,229,255,0.22)'; el.style.boxShadow='0 0 0 1px rgba(0,229,255,0.06),0 16px 48px rgba(0,0,0,0.5)'; el.style.transform='translateY(-2px)' }
const hOff = (e: React.MouseEvent<HTMLDivElement>) => { const el = e.currentTarget; el.style.borderColor='rgba(255,255,255,0.07)'; el.style.boxShadow='none'; el.style.transform='translateY(0)' }

/* ─────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────── */
export function AboutHero() {
  const { about } = content
  const infoRows = about.personalInfo.filter(r => !['Full Name','Role'].includes(r.label))

  return (
    <section className="section-wrapper relative overflow-hidden" aria-label="About me">

      {/* ── Ambient glows ─────────────────────────────────────────────────── */}
      <div aria-hidden="true" style={{ position:'absolute', top:'5%', left:'-8rem', width:'540px', height:'540px', pointerEvents:'none', zIndex:0, background:'radial-gradient(circle, rgba(0,149,255,0.08) 0%, transparent 65%)', filter:'blur(72px)' }} />
      <div aria-hidden="true" style={{ position:'absolute', bottom:'-4rem', right:'-6rem', width:'420px', height:'420px', pointerEvents:'none', zIndex:0, background:'radial-gradient(circle, rgba(0,229,255,0.055) 0%, transparent 65%)', filter:'blur(64px)' }} />

      <Container style={{ position:'relative', zIndex:1, paddingTop:'5rem', paddingBottom:'5rem' }}>

        {/* ══ SECTION TITLE ════════════════════════════════════════════════ */}
        <motion.div {...fadeUp(0)} style={{ marginBottom:'2.5rem' }}>
          {/* Heading */}
          <h1 style={{
            fontFamily:"'Space Grotesk','Inter',system-ui,sans-serif",
            fontSize:'clamp(2.25rem,4.5vw,3.25rem)',
            fontWeight:700, lineHeight:1.1,
            letterSpacing:'-0.03em',
            color:'var(--text-primary)',
            marginBottom:'0.75rem',
          }}>
            About Me
          </h1>
          {/* Subtitle */}
          <p style={{
            fontSize:'1rem',
            color:'var(--text-muted)',
            lineHeight:1.6,
            marginBottom:'1.25rem',
          }}>
            The story behind the work.
          </p>
          {/* Cyan accent line */}
          <div style={{ width:'56px', height:'3px', background:'linear-gradient(90deg,#0095ff,#00e5ff)', borderRadius:'9999px' }} aria-hidden="true" />
        </motion.div>

        {/* ══ MAIN GLASS CONTAINER ═════════════════════════════════════════ */}
        <motion.div
          {...inView(0.06)}
          className="about-main-card"
          style={{
            background:'rgba(13,20,36,0.92)',
            border:'1px solid rgba(0,229,255,0.13)',
            borderRadius:'24px',
            overflow:'hidden',
            backdropFilter:'blur(24px)',
            WebkitBackdropFilter:'blur(24px)',
            boxShadow:'0 0 0 1px rgba(0,229,255,0.06), 0 32px 80px rgba(0,0,0,0.55)',
            marginBottom:'2rem',
            display:'grid',
            gridTemplateColumns:'1fr',
          }}
        >

          {/* ── LEFT: Image ─────────────────────────────────────────────── */}
          <div className="about-img-col" style={{ position:'relative', background:'rgba(5,10,24,0.6)', borderRight:'1px solid rgba(0,229,255,0.09)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2.5rem 2rem', minHeight:'480px', overflow:'hidden' }}>

            {/* Background decorative circle glow */}
            <div aria-hidden="true" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'340px', height:'340px', borderRadius:'50%', background:'radial-gradient(circle, rgba(0,149,255,0.18) 0%, rgba(0,229,255,0.06) 50%, transparent 72%)', filter:'blur(24px)', pointerEvents:'none', zIndex:0 }} />
            {/* Tech circle ring */}
            <div aria-hidden="true" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'360px', height:'360px', borderRadius:'50%', border:'1px solid rgba(0,229,255,0.10)', pointerEvents:'none', zIndex:0 }} />
            <div aria-hidden="true" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'420px', height:'420px', borderRadius:'50%', border:'1px dashed rgba(0,229,255,0.06)', pointerEvents:'none', zIndex:0 }} />

            {/* Grid texture overlay */}
            <div aria-hidden="true" style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)', backgroundSize:'32px 32px', pointerEvents:'none', zIndex:0 }} />

            {/* Floating image — keep original motion */}
            <motion.div
              animate={{ y:[0,-10,0] }}
              transition={{ repeat:Infinity, duration:5, ease:'easeInOut' }}
              style={{ position:'relative', zIndex:1, width:'100%', maxWidth:'300px' }}
            >
              <div style={{
                borderRadius:'18px', overflow:'hidden',
                border:'1px solid rgba(0,229,255,0.22)',
                boxShadow:'0 0 0 1px rgba(0,229,255,0.09), 0 0 52px rgba(0,229,255,0.12), 0 32px 72px rgba(0,0,0,0.65)',
                background:'rgba(5,8,22,0.4)',
                height:'clamp(320px,38vw,420px)',
              }}>
                <img src={heroPhoto} alt="Josh Fallarcuna — UI/UX Designer & Developer" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }} />
              </div>
            </motion.div>

            {/* Bottom stats strip — inside image col */}
            <motion.div
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.9, duration:0.5, ease:E }}
              style={{
                position:'relative', zIndex:2,
                width:'100%', maxWidth:'320px',
                marginTop:'1.25rem',
                background:'rgba(5,8,22,0.88)',
                backdropFilter:'blur(20px)',
                WebkitBackdropFilter:'blur(20px)',
                border:'1px solid rgba(0,229,255,0.16)',
                borderRadius:'14px',
                display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
                overflow:'hidden',
              }}
            >
              {[{v:'3+',l:'Projects'},{v:'5+',l:'Technologies'},{v:'Open',l:'Internship'}].map((s,i,arr)=>(
                <div key={s.l} style={{ padding:'0.875rem 0.5rem', textAlign:'center', borderRight: i<arr.length-1 ? '1px solid rgba(0,229,255,0.08)' : 'none' }}>
                  <p style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'1rem', fontWeight:700, color:'var(--accent)', lineHeight:1, letterSpacing:'-0.01em' }}>{s.v}</p>
                  <p style={{ fontSize:'0.625rem', fontWeight:500, color:'var(--text-muted)', lineHeight:1.3, marginTop:'3px' }}>{s.l}</p>
                </div>
              ))}
            </motion.div>

          </div>
          {/* ── END IMAGE COL ── */}

          {/* ── RIGHT: Content ──────────────────────────────────────────── */}
          <div className="about-content-col" style={{ padding:'3rem 2.75rem', display:'flex', flexDirection:'column', justifyContent:'center' }}>

            {/* HELLO, I'M — label with left cyan line */}
            <motion.div {...fadeUp(0.1)} style={{ display:'flex', alignItems:'center', gap:'0.625rem', marginBottom:'0.75rem' }}>
              <div style={{ width:'3px', height:'16px', background:'var(--accent)', borderRadius:'9999px', flexShrink:0 }} aria-hidden="true" />
              <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'0.75rem', fontWeight:700, color:'var(--accent)', letterSpacing:'0.18em', textTransform:'uppercase' }}>
                Hello, I'm
              </span>
            </motion.div>

            {/* Full name */}
            <motion.h2 {...fadeUp(0.15)} style={{ fontFamily:"'Space Grotesk','Inter',system-ui,sans-serif", fontSize:'clamp(1.625rem,3vw,2.25rem)', fontWeight:700, lineHeight:1.12, letterSpacing:'-0.025em', color:'var(--text-primary)', marginBottom:'1.25rem' }}>
              Josh Valeri D. Fallarcuna
            </motion.h2>

            {/* Role */}
            <motion.p {...fadeUp(0.20)} style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(0.9375rem,1.4vw,1.0625rem)', fontWeight:500, color:'var(--accent)', lineHeight:1.45, marginBottom:'1.75rem' }}>
              Aspiring UI/UX Designer &amp; Full-Stack Developer
            </motion.p>

            {/* Description */}
            <motion.p {...fadeUp(0.25)} style={{ fontSize:'0.9375rem', color:'var(--text-secondary)', lineHeight:1.85, maxWidth:'54ch', marginBottom:'2rem' }}>
              {about.paragraphs[0]}
            </motion.p>

            {/* Capability 2×2 grid */}
            <motion.div {...inView(0.28)} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem' }}>
              {CAPS.map(c => (
                <div
                  key={c.title}
                  style={{
                    background:'rgba(5,10,24,0.7)',
                    border:'1px solid rgba(255,255,255,0.07)',
                    borderRadius:'12px',
                    padding:'1.125rem 1.25rem',
                    display:'flex', flexDirection:'column', gap:'0.625rem',
                    transition:'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.22s ease',
                    cursor:'default',
                  }}
                  onMouseEnter={hOn}
                  onMouseLeave={hOff}
                >
                  <div style={{ width:'36px', height:'36px', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,229,255,0.07)', border:'1px solid rgba(0,229,255,0.16)', borderRadius:'9px', flexShrink:0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'0.9rem', fontWeight:700, color:'var(--text-primary)', lineHeight:1.3, marginBottom:'0.2rem' }}>{c.title}</p>
                    <p style={{ fontSize:'0.75rem', color:'var(--text-muted)', lineHeight:1.55 }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
          {/* ── END CONTENT COL ── */}

        </motion.div>
        {/* ══ END MAIN CONTAINER ══ */}

        {/* ══ BOTTOM INFO GRID (stats 60 | quick-info 40) ════════════════ */}
        <motion.div {...inView(0.12)} className="about-bottom-grid">

          {/* ── Left: Stats card ──────────────────────────────────────── */}
          <div
            style={{
              background:'rgba(13,20,36,0.92)',
              border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'18px',
              backdropFilter:'blur(20px)',
              WebkitBackdropFilter:'blur(20px)',
              overflow:'hidden',
              transition:'border-color 0.22s ease, box-shadow 0.22s ease, transform 0.25s ease',
            }}
            onMouseEnter={hOn}
            onMouseLeave={hOff}
          >
            {/* Top accent */}
            <div style={{ height:'2px', background:'linear-gradient(90deg,#0095ff,#00e5ff)', opacity:0.7 }} aria-hidden="true" />
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)' }}>
              {STATS.map((s,i)=>(
                <div key={s.label} style={{ padding:'1.5rem 1.125rem', textAlign:'center', borderRight: i<2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div style={{ display:'flex', justifyContent:'center', marginBottom:'0.625rem' }}>
                    <div style={{ width:'38px', height:'38px', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,229,255,0.07)', border:'1px solid rgba(0,229,255,0.14)', borderRadius:'10px' }}>{s.icon}</div>
                  </div>
                  <p style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'1.625rem', fontWeight:700, color:'var(--accent)', lineHeight:1, letterSpacing:'-0.02em', marginBottom:'0.25rem' }}>{s.value}</p>
                  <p style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'0.6875rem', fontWeight:600, color:'var(--text-primary)', letterSpacing:'0.04em', textTransform:'uppercase', marginBottom:'0.2rem' }}>{s.label}</p>
                  <p style={{ fontSize:'0.625rem', color:'var(--text-muted)', lineHeight:1.4 }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Quick Info card ─────────────────────────────────── */}
          <div
            style={{
              background:'rgba(13,20,36,0.92)',
              border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'18px',
              backdropFilter:'blur(20px)',
              WebkitBackdropFilter:'blur(20px)',
              padding:'1.75rem 2rem',
              transition:'border-color 0.22s ease, box-shadow 0.22s ease, transform 0.25s ease',
            }}
            onMouseEnter={hOn}
            onMouseLeave={hOff}
          >
            <p style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'0.6875rem', fontWeight:600, color:'var(--text-muted)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'1.25rem' }}>
              Quick Info
            </p>
            <dl style={{ display:'flex', flexDirection:'column' }}>
              {infoRows.map((row,i,arr)=>(
                <div key={row.label} style={{ display:'flex', alignItems:'flex-start', gap:'0.875rem', padding:'0.75rem 0', borderBottom: i<arr.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span style={{ flexShrink:0, width:'26px', height:'26px', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,229,255,0.07)', border:'1px solid rgba(0,229,255,0.14)', borderRadius:'7px', marginTop:'1px' }}>
                    {INFO_ICON[row.label] ?? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>}
                  </span>
                  <div style={{ minWidth:0 }}>
                    <dt style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'0.625rem', fontWeight:600, color:'var(--text-muted)', letterSpacing:'0.10em', textTransform:'uppercase', marginBottom:'0.1rem' }}>{row.label}</dt>
                    <dd style={{ fontSize:'0.875rem', color:'var(--text-primary)', lineHeight:1.5, wordBreak:'break-word' }}>{row.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

        </motion.div>
        {/* ══ END BOTTOM GRID ══ */}

      </Container>

      {/* ─── Responsive styles ──────────────────────────────────────────────── */}
      <style>{`
        /* Main card: stack vertically on mobile, 45/55 side-by-side on desktop */
        .about-main-card {
          grid-template-columns: 1fr !important;
        }
        .about-img-col {
          border-right: none !important;
          border-bottom: 1px solid rgba(0,229,255,0.09);
          min-height: 380px !important;
        }
        .about-content-col {
          padding: 2rem 1.75rem !important;
        }

        @media (min-width: 900px) {
          .about-main-card {
            grid-template-columns: 45fr 55fr !important;
          }
          .about-img-col {
            border-right: 1px solid rgba(0,229,255,0.09) !important;
            border-bottom: none !important;
            min-height: 560px !important;
          }
          .about-content-col {
            padding: 3rem 2.75rem !important;
          }
        }

        /* Bottom grid: stack on mobile, 60/40 on desktop */
        .about-bottom-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .about-bottom-grid {
            display: grid;
            grid-template-columns: 60fr 40fr;
            gap: 1.5rem;
            align-items: start;
          }
        }

        /* Capability cards: 1 col on tiny screens, 2 col otherwise */
        @media (max-width: 400px) {
          .about-content-col .cap-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </section>
  )
}
