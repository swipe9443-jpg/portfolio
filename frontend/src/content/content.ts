import type { PortfolioContent } from '@/types/portfolio'

export const content: PortfolioContent = {
  // ─── Navigation ──────────────────────────────────────────────────────────────
  nav: [
    { label: 'Home',     href: '#home'     },
    { label: 'About',    href: '#about'    },
    { label: 'Skills',   href: '#skills'   },
    { label: 'Projects', href: '#projects' },
    { label: 'Resume',   href: '#resume'   },
    { label: 'Contact',  href: '#contact'  },
  ],

  // ─── Hero ────────────────────────────────────────────────────────────────────
  hero: {
    greeting: "Hello, I'm",
    name: 'Josh Fallarcuna',
    role: 'Aspiring UI/UX Designer & Future Full-Stack Web Developer',
    introduction:
      'I design intuitive digital experiences while continuously expanding my skills in modern web development. My goal is to bridge design and technology to create meaningful, accessible, and polished digital products.',
    ctas: {
      primary:   { label: 'View Projects',    href: '#projects' },
      secondary: { label: 'Download Resume',  href: '#resume'   },
      tertiary:  { label: 'Contact Me',       href: '#contact'  },
    },
    highlights: [
      { label: 'UI/UX Design',        icon: '✦' },
      { label: 'Frontend Development',icon: '✦' },
      { label: 'Problem Solving',     icon: '✦' },
      { label: 'Continuous Learning', icon: '✦' },
    ],
  },

  // ─── About ───────────────────────────────────────────────────────────────────
  about: {
    heading: 'About Me',
    paragraphs: [
      'I am an aspiring UI/UX Designer and future Full-Stack Web Developer passionate about creating user-centered digital experiences.',
      'My journey started with visual design and gradually expanded into frontend development. This helps me think about both the user\'s experience and the technical details required to build it.',
      'I enjoy solving design problems, learning modern technologies, and building projects that combine clean visuals with practical functionality.',
    ],
    personalInfo: [
      { label: 'Full Name',  value: 'Josh Fallarcuna' },
      { label: 'Role',       value: 'Aspiring UI/UX Designer & Future Full-Stack Web Developer' },
      { label: 'Location',   value: 'Philippines' },
      { label: 'Education',  value: 'To be updated' },
    ],
    careerGoals: [
      'Become a professional UI/UX Designer',
      'Strengthen React and TypeScript skills',
      'Learn practical full-stack development',
      'Build polished and useful digital products',
    ],
    whyWorkWithMe: [
      'User-centered design approach',
      'Strong interest in design systems',
      'Growing frontend development foundation',
      'Creative and detail-oriented mindset',
      'Willingness to learn and improve',
      'Professional attitude toward collaboration',
    ],
  },

  // ─── Skills ──────────────────────────────────────────────────────────────────
  skills: [
    {
      id: 'design',
      category: 'UI/UX Design',
      skills: [
        'Figma',
        'Wireframing',
        'Prototyping',
        'User Research',
        'User Flows',
        'Information Architecture',
        'Responsive Design',
        'Accessibility Principles',
        'Design Systems',
      ],
    },
    {
      id: 'frontend',
      category: 'Frontend Development',
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
        'React',
        'Tailwind CSS',
        'Responsive Web Design',
      ],
    },
    {
      id: 'backend',
      category: 'Backend Development',
      skills: ['Node.js', 'Express.js', 'REST APIs'],
    },
    {
      id: 'database',
      category: 'Database',
      skills: ['Supabase', 'PostgreSQL'],
    },
    {
      id: 'tools',
      category: 'Tools',
      skills: ['Git', 'GitHub', 'VS Code', 'Notion'],
    },
    {
      id: 'soft',
      category: 'Soft Skills',
      skills: [
        'Problem Solving',
        'Communication',
        'Teamwork',
        'Creativity',
        'Adaptability',
        'Time Management',
      ],
    },
  ],

  // ─── Projects ────────────────────────────────────────────────────────────────
  projects: [
    {
      id: 'portfolio',
      title: 'Personal Portfolio Website',
      category: 'Frontend Development / Personal Brand',
      description:
        'A dark cinematic portfolio website built to present skills, projects, resume, and contact information through a polished content-driven interface.',
      technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      features: [
        'Responsive layout',
        'Content-driven sections',
        'Dark cinematic visual design',
        'Resume download action',
        'Contact form interface',
      ],
      featured: true,
    },
    {
      id: 'case-study',
      title: 'UI/UX Case Study',
      category: 'UI/UX Design',
      description:
        'A design case study documenting the process from problem understanding to wireframes, prototype decisions, and final interface direction.',
      technologies: ['Figma', 'Wireframing', 'Prototyping', 'User Research'],
      features: [
        'Problem statement',
        'User research summary',
        'User flow exploration',
        'Wireframe progression',
        'High-fidelity prototype',
      ],
      featured: true,
    },
    {
      id: 'task-manager',
      title: 'Task Management App',
      category: 'Full-Stack Concept',
      description:
        'A productivity application concept focused on organizing tasks, tracking priorities, and presenting information through a clean dashboard interface.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Express.js', 'Supabase'],
      features: [
        'Task creation flow',
        'Status and priority tracking',
        'Responsive dashboard layout',
        'API-ready data structure',
      ],
      featured: false,
    },
  ],

  // ─── Resume ──────────────────────────────────────────────────────────────────
  resume: {
    summary:
      'Aspiring UI/UX Designer and future Full-Stack Web Developer with a passion for building user-centered digital experiences. Committed to continuous learning and professional growth.',
    education: [
      {
        institution: 'To be updated',
        degree: 'To be updated',
        period: 'To be updated',
        details: 'Current school, course, and relevant details will be added here.',
      },
    ],
    certifications: [
      {
        name: 'UI/UX Design Certification',
        status: 'planned',
      },
      {
        name: 'Frontend Development Certification',
        status: 'planned',
      },
    ],
    coreCompetencies: [
      'UI/UX Design',
      'Wireframing',
      'Prototyping',
      'User-centered design',
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Responsive Design',
    ],
    experience:
      'Portfolio and self-directed projects. Internship, freelance, or professional experience to be added when available.',
    downloadLabel: 'Download Resume',
    downloadUrl: '/resume.pdf',
  },

  // ─── Contact ─────────────────────────────────────────────────────────────────
  contact: {
    heading: "Let's Connect",
    subheading:
      'I am open to internships, learning opportunities, collaborations, and creative web projects.',
    email: 'josh@example.com',
    socialLinks: [
      {
        platform: 'GitHub',
        url: 'https://github.com/joshfallarcuna',
        label: 'GitHub profile',
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/joshfallarcuna',
        label: 'LinkedIn profile',
      },
    ],
  },

  // ─── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    name: 'Josh Fallarcuna',
    tagline: 'Aspiring UI/UX Designer & Future Full-Stack Web Developer',
    socialLinks: [
      {
        platform: 'GitHub',
        url: 'https://github.com/joshfallarcuna',
        label: 'GitHub profile',
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/joshfallarcuna',
        label: 'LinkedIn profile',
      },
    ],
    copyright: '© 2026 Josh Fallarcuna. All rights reserved.',
  },
}
