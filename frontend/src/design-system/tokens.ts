// Design tokens — Dark Cinematic Portfolio Branding System v2.0
// These mirror the CSS variables in globals.css for use in JS/TS contexts.

export const colors = {
  background: {
    primary:   '#050816',
    secondary: '#0B1120',
  },
  surface: {
    default:  '#111827',
    elevated: '#1F2937',
  },
  accent: {
    primary: '#00E5FF',   // cyan — primary accent
    hover:   '#5EF2FF',   // lighter cyan for hover/glow
    deep:    '#0095FF',   // deep blue for gradients
  },
  text: {
    primary:   '#FFFFFF',
    secondary: '#CBD5E1',
    muted:     '#64748B',
  },
  border: 'rgba(255,255,255,0.07)',
  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    error:   '#EF4444',
  },
} as const

export const gradients = {
  // Atmospheric background for Hero section
  hero: 'linear-gradient(135deg, rgba(0,149,255,0.15), transparent, rgba(0,229,255,0.15))',
  // Primary button / highlight gradient
  accent: 'linear-gradient(135deg, #0095FF, #00E5FF)',
  // Hero name / major heading text gradient
  text: 'linear-gradient(135deg, #00E5FF 0%, #5EF2FF 100%)',
  // Ambient section glow
  glow: 'linear-gradient(135deg, rgba(0,149,255,0.35), rgba(0,229,255,0.35))',
} as const

// 8pt grid system per branding doc
export const spacing = {
  xs:  '8px',
  sm:  '16px',
  md:  '24px',
  lg:  '32px',
  xl:  '48px',
  xxl: '80px',
  sectionDesktop: '10rem',  // 160px
  sectionMobile:  '6rem',   // 96px
  containerWidth: '72rem',  // 1152px
  contentWidth:   '48rem',
  cardGap:        '2rem',
  gridGap:        '2.5rem',
} as const

export const typography = {
  // Inter — primary body font
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  // Space Grotesk — secondary / display font
  fontFamilyDisplay: "'Space Grotesk', 'Inter', system-ui, sans-serif",
  weights: {
    body:         400,
    bodyEmphasis: 500,
    semibold:     600,
    heading:      700,
  },
  // Type scale per branding doc (section 4)
  scale: {
    heroName:       '6rem',     // 96px
    heroTitle:      '2rem',     // 32px
    sectionHeading: '3.5rem',   // 56px
    cardTitle:      '1.5rem',   // 24px
    body:           '1.125rem', // 18px
    caption:        '0.875rem', // 14px
  },
  // Responsive clamp values used in components
  clamp: {
    heroName: 'clamp(3rem, 8vw, 6rem)',
    sectionHeading: 'clamp(2rem, 5vw, 3.5rem)',
  },
} as const

// Motion durations per branding doc (section 8)
export const motion = {
  fast:   0.15,  // 150ms
  normal: 0.25,  // 250ms
  large:  0.40,  // 400ms
} as const
