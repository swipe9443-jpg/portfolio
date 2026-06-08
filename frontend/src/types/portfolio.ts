// ─── Navigation ────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

export interface HeroHighlight {
  label: string
  icon: string
}

export interface HeroContent {
  greeting: string
  name: string
  role: string
  introduction: string
  ctas: {
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
    tertiary: { label: string; href: string }
  }
  highlights: HeroHighlight[]
}

// ─── About ─────────────────────────────────────────────────────────────────────

export interface PersonalInfo {
  label: string
  value: string
}

export interface AboutContent {
  heading: string
  paragraphs: string[]
  personalInfo: PersonalInfo[]
  careerGoals: string[]
  whyWorkWithMe: string[]
}

// ─── Skills ────────────────────────────────────────────────────────────────────

export interface SkillCategory {
  id: string
  category: string
  skills: string[]
}

// ─── Projects ──────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  category: string
  description: string
  technologies: string[]
  features: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  featured: boolean
}

// ─── Resume ────────────────────────────────────────────────────────────────────

export interface Education {
  institution: string
  degree: string
  period: string
  details?: string
}

export interface Certification {
  name: string
  issuer?: string
  year?: string
  status: 'completed' | 'in-progress' | 'planned'
}

export interface ResumeContent {
  summary: string
  education: Education[]
  certifications: Certification[]
  coreCompetencies: string[]
  experience: string
  downloadLabel: string
  downloadUrl: string
}

// ─── Contact ───────────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: string
  url: string
  label: string
}

export interface ContactContent {
  heading: string
  subheading: string
  email: string
  socialLinks: SocialLink[]
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// ─── Footer ────────────────────────────────────────────────────────────────────

export interface FooterContent {
  name: string
  tagline: string
  socialLinks: SocialLink[]
  copyright: string
}

// ─── Root Content ──────────────────────────────────────────────────────────────

export interface PortfolioContent {
  nav: NavItem[]
  hero: HeroContent
  about: AboutContent
  skills: SkillCategory[]
  projects: Project[]
  resume: ResumeContent
  contact: ContactContent
  footer: FooterContent
}
