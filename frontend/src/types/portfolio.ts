// ─── Navigation ────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href:  string
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

export interface HeroHighlight {
  label: string
  icon:  string
}

export interface HeroContent {
  greeting: string
  name:     string
  role:     string
  introduction: string
  ctas: {
    primary:   { label: string; href: string }
    secondary: { label: string; href: string }
    tertiary:  { label: string; href: string }
  }
  highlights: HeroHighlight[]
}

// ─── Home ──────────────────────────────────────────────────────────────────────

export interface HomeStat {
  value:     string
  label:     string
  sublabel?: string
}

export interface HomeContent {
  stats:             HomeStat[]
  featuredProjectIds: string[]
  coreExpertise:     Array<{ title: string; skills: string[] }>
  whyWorkWithMe:     Array<{ icon: string; title: string; description: string }>
  cta: { heading: string; subheading: string; primary: string; secondary: string }
}

// ─── About ─────────────────────────────────────────────────────────────────────

export interface PersonalInfo {
  label: string
  value: string
}

export interface TimelineEntry {
  year:        string
  title:       string
  description: string
}

export interface CoreValue {
  title:       string
  description: string
}

export interface AboutContent {
  heading:      string
  paragraphs:   string[]
  personalInfo: PersonalInfo[]
  careerGoals:  string[]
  whyWorkWithMe: string[]
  timeline:     TimelineEntry[]
  coreValues:   CoreValue[]
  currentFocus: string[]
  education:    Education[]
}

// ─── Skills ────────────────────────────────────────────────────────────────────

export interface SkillCategory {
  id:       string
  category: string
  skills:   string[]
}

// ─── Projects ──────────────────────────────────────────────────────────────────

export interface ProjectDetail {
  overview:       string
  problem:        string
  research?:      string
  designProcess?: string[]
  development?:   string[]
  lessons?:       string[]
  nextSteps?:     string[]
  gallery?:       string[]
}

export interface Project {
  id:           string
  title:        string
  category:     string
  description:  string
  technologies: string[]
  features:     string[]
  detail?:      ProjectDetail
  githubUrl?:   string
  liveUrl?:     string
  imageUrl?:    string
  featured:     boolean
  comingSoon?:  boolean
}

// ─── Resume ────────────────────────────────────────────────────────────────────

export interface Education {
  institution: string
  degree:      string
  period:      string
  details?:    string
}

export interface Certification {
  name:     string
  issuer?:  string
  year?:    string
  status:   'completed' | 'in-progress' | 'planned'
}

export interface ResumeContent {
  summary:           string
  education:         Education[]
  certifications:    Certification[]
  coreCompetencies:  string[]
  experience:        string
  downloadLabel:     string
  downloadUrl:       string
}

// ─── Contact ───────────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: string
  url:      string
  label:    string
}

export interface ContactContent {
  heading:      string
  subheading:   string
  email:        string
  location:     string
  availability: string
  socialLinks:  SocialLink[]
}

export interface ContactFormData {
  name:    string
  email:   string
  subject: string
  message: string
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// ─── Footer ────────────────────────────────────────────────────────────────────

export interface FooterContent {
  name:        string
  tagline:     string
  socialLinks: SocialLink[]
  copyright:   string
}

// ─── Root Content ──────────────────────────────────────────────────────────────

export interface PortfolioContent {
  nav:      NavItem[]
  hero:     HeroContent
  home:     HomeContent
  about:    AboutContent
  skills:   SkillCategory[]
  projects: Project[]
  resume:   ResumeContent
  contact:  ContactContent
  footer:   FooterContent
}
