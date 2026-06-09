import type { PortfolioContent } from '@/types/portfolio'
import { RESUME_PATH } from '@/config/resume'

export const content: PortfolioContent = {
  // ─── Navigation ──────────────────────────────────────────────────────────────
  nav: [
    { label: 'Home',     href: '/'         },
    { label: 'About',    href: '/about'    },
    { label: 'Projects', href: '/projects' },
    { label: 'Skills',   href: '/skills'   },
    { label: 'Resume',   href: '/resume'   },
    { label: 'Contact',  href: '/contact'  },
  ],

  // ─── Hero ────────────────────────────────────────────────────────────────────
  hero: {
    greeting: "Hello, I'm",
    name: 'Josh Fallarcuna',
    role: 'Aspiring UI/UX Designer & Future Full-Stack Web Developer',
    introduction:
      'I design intuitive digital experiences while continuously expanding my skills in modern web development. My goal is to bridge design and technology to create meaningful, accessible, and polished digital products.',
    ctas: {
      primary:   { label: 'View Projects',   href: '/projects' },
      secondary: { label: 'Download Resume', href: '/resume'   },
      tertiary:  { label: 'Contact Me',      href: '/contact'  },
    },
    highlights: [
      { label: 'UI/UX Design',        icon: '✦' },
      { label: 'Frontend Development', icon: '✦' },
      { label: 'Problem Solving',     icon: '✦' },
      { label: 'Continuous Learning', icon: '✦' },
    ],
  },

  // ─── Home page ───────────────────────────────────────────────────────────────
  home: {
    stats: [
      { value: '3+',   label: 'Projects Built',    sublabel: 'Personal & concept work' },
      { value: '6+',   label: 'Technologies',      sublabel: 'Design & dev stack'      },
      { value: '2+',   label: 'Years Learning',    sublabel: 'Continuous growth'       },
      { value: '100%', label: 'Dedication',        sublabel: 'To every project'        },
    ],
    featuredProjectIds: ['portfolio', 'case-study', 'task-manager'],
    coreExpertise: [
      {
        title: 'UI/UX Design',
        skills: ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems'],
      },
      {
        title: 'Frontend Development',
        skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
      },
      {
        title: 'Design Thinking',
        skills: ['User Flows', 'Information Architecture', 'Accessibility', 'Responsive Design'],
      },
    ],
    whyWorkWithMe: [
      {
        icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
        title: 'User-Centered Approach',
        description: 'Every design decision starts with the user. I prioritize clarity, accessibility, and meaningful interactions.',
      },
      {
        icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
        title: 'Design Meets Code',
        description: 'I bridge design and development — translating Figma concepts into clean, production-ready React components.',
      },
      {
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        title: 'Fast Learner',
        description: 'Continuously learning and applying new tools, frameworks, and design patterns to every project I take on.',
      },
      {
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
        title: 'Collaborative Mindset',
        description: 'Open to feedback, adaptable to team workflows, and committed to delivering quality work on time.',
      },
    ],
    cta: {
      heading: "Ready to Build Something Together?",
      subheading: "I'm open to internships, collaborations, and learning opportunities. Let's connect.",
      primary: 'Get In Touch',
      secondary: 'View My Work',
    },
  },

  // ─── About ───────────────────────────────────────────────────────────────────
  about: {
    heading: 'About Me',
    paragraphs: [
      'I am an aspiring UI/UX Designer and future Full-Stack Web Developer passionate about creating user-centered digital experiences.',
      "My journey started with visual design and gradually expanded into frontend development. This helps me think about both the user's experience and the technical details required to build it.",
      'I enjoy solving design problems, learning modern technologies, and building projects that combine clean visuals with practical functionality.',
    ],
    personalInfo: [
      { label: 'Full Name',  value: 'Josh Valeri D. Fallarcuna' },
      { label: 'Role',       value: 'Aspiring UI/UX Designer & Full-Stack Developer' },
      { label: 'Location',   value: 'Santa Mesa, Philippines' },
      { label: 'Email',      value: 'joshfallarcuna@gmail.com' },
      { label: 'Contact',    value: '09087389123' },
      { label: 'Education',  value: 'BSCS — Arellano University' },
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
    timeline: [
      {
        year: '2022',
        title: 'The Beginning',
        description: 'Started exploring digital design and technology. Discovered a passion for creating interfaces that people actually enjoy using.',
      },
      {
        year: '2023',
        title: 'Learning UI/UX Design',
        description: 'Deep-dived into Figma, user research, wireframing, and prototyping. Built first design concepts and learned the fundamentals of user experience.',
      },
      {
        year: '2023',
        title: 'Frontend Development',
        description: 'Began learning HTML, CSS, and JavaScript. Expanded into React and TypeScript — bridging the gap between design vision and coded reality.',
      },
      {
        year: '2024',
        title: 'Full-Stack Exploration',
        description: 'Started exploring backend fundamentals with Node.js, Express, and databases. Built the first full-stack project concepts.',
      },
      {
        year: '2025+',
        title: 'Future Goals',
        description: 'Aiming to join a product team, contribute to meaningful digital products, and continue growing as both a designer and developer.',
      },
    ],
    coreValues: [
      {
        title: 'Clarity Over Complexity',
        description: 'Good design removes friction. I always aim for the simplest solution that solves the real problem.',
      },
      {
        title: 'Continuous Improvement',
        description: 'Every project is a learning opportunity. I actively seek feedback and iterate constantly.',
      },
      {
        title: 'Empathy First',
        description: 'Understanding the user is the foundation of every decision — in both design and code.',
      },
      {
        title: 'Craft & Attention to Detail',
        description: 'The small details make the difference between good and great. I sweat the details that matter.',
      },
    ],
    currentFocus: [
      'Deepening React & TypeScript expertise',
      'Building real-world full-stack projects',
      'Contributing to design systems',
      'Learning backend architecture',
      'Improving accessibility practices',
    ],
    education: [
      {
        institution: 'Arellano University Jose Abad Santos',
        degree: 'Bachelor of Science in Computer Science (BSCS)',
        period: '2023 – Present',
        details: 'Currently enrolled. Focusing on software development, UI/UX design, and web technologies.',
      },
      {
        institution: 'School of Saint Joseph (SSJ)',
        degree: 'Senior High School — STEM',
        period: '2019 – 2021',
        details: 'Science, Technology, Engineering, and Mathematics track.',
      },
      {
        institution: 'School of Saint Joseph (SSJ)',
        degree: 'Junior High School',
        period: '2015 – 2019',
        details: '',
      },
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
        'User Personas',
        'User Flows',
        'Information Architecture',
        'Low-Fidelity Prototyping',
        'High-Fidelity Prototyping',
        'Responsive Design',
        'Accessibility Principles',
        'Design Systems',
      ],
    },
    {
      id: 'frontend',
      category: 'Frontend Development',
      skills: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'TypeScript',
        'React',
        'Tailwind CSS',
        'Framer Motion',
        'Responsive Web Design',
        'Mobile-First Design',
        'Vite',
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
      category: 'Tools & Workflow',
      skills: ['Git', 'GitHub', 'VS Code', 'Notion', 'Vercel'],
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
        'Responsive multi-page layout',
        'Content-driven architecture',
        'Dark cinematic visual design',
        'Resume download action',
        'Contact form interface',
      ],
      featured: true,
      detail: {
        overview:
          'A premium portfolio website built from scratch to showcase UI/UX design skills and frontend development capabilities. The project demonstrates a full design-to-code workflow.',
        problem:
          'Needed a professional online presence that reflects both design sensibility and technical ability — without relying on templates. The site had to feel premium, load fast, and communicate clearly.',
        research:
          'Studied architect portfolios, design agency websites, and luxury tech brand sites. Identified editorial layout, generous whitespace, and cinematic dark aesthetics as the right direction for a premium feel.',
        designProcess: [
          'Defined a dark cinematic visual identity with cyan accent color',
          'Created a component-based design system with consistent tokens',
          'Wireframed all pages with focus on hierarchy and storytelling',
          'Prototyped navigation and page transitions in Figma',
          'Iterated on typography scale and spacing system',
        ],
        development: [
          'Built with React 19 + TypeScript for type safety and DX',
          'Vite for fast development and optimized production builds',
          'Tailwind CSS v4 for utility-first styling',
          'Framer Motion for page transitions and scroll animations',
          'React Router v6 for multi-page SPA routing',
          'Deployed to Vercel with SPA rewrite rules',
        ],
        lessons: [
          'Design systems save time — token-based CSS variables made theming consistent',
          'Peer dependency management in npm requires careful version pinning',
          'Multi-page SPA routing requires vercel.json rewrites for correct deployment',
        ],
        nextSteps: [
          'Add real project case studies with full images',
          'Integrate a CMS for content management',
          'Add blog section for design and code articles',
          'Improve performance with image optimization',
        ],
      },
    },
    {
      id: 'case-study',
      title: 'UI/UX Case Study',
      category: 'UI/UX Design',
      description:
        'A design case study documenting the full process from problem discovery through wireframes, prototype decisions, and final interface direction.',
      technologies: ['Figma', 'Wireframing', 'Prototyping', 'User Research'],
      features: [
        'Problem statement definition',
        'User research summary',
        'User flow exploration',
        'Wireframe progression',
        'High-fidelity prototype',
      ],
      featured: true,
      detail: {
        overview:
          'A structured design case study that documents the complete UX process from problem understanding to final high-fidelity prototype. Demonstrates design thinking and methodology.',
        problem:
          'Identify a real user problem, define it clearly, and design a solution that addresses it through a user-centered process.',
        research:
          'Conducted user interviews, competitive analysis, and created user personas. Mapped out user journeys to identify pain points and opportunities.',
        designProcess: [
          'Problem definition and scope alignment',
          'User interviews and research synthesis',
          'Persona creation and user journey mapping',
          'Low-fidelity wireframing and flow exploration',
          'Component-level design decisions',
          'High-fidelity prototype in Figma',
        ],
        lessons: [
          'Early research prevents expensive late-stage redesigns',
          'Wireframing forces clarity before visual design begins',
          'User testing reveals assumptions that research misses',
        ],
        nextSteps: [
          'Conduct usability testing on the prototype',
          'Implement the design in code',
          'Iterate based on user feedback',
        ],
      },
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
      detail: {
        overview:
          'A full-stack productivity application concept that demonstrates both frontend UI skills and backend architecture thinking. Designed with a clean dashboard-first approach.',
        problem:
          'Most task management tools are either too complex or too simple. This concept explores the middle ground — powerful enough to be useful, simple enough to not overwhelm.',
        designProcess: [
          'Defined core user workflows: create, organize, track, complete',
          'Designed a dashboard layout prioritizing task visibility',
          'Created consistent status and priority visual language',
          'Prototyped the create/edit task flow',
        ],
        development: [
          'React with TypeScript for the frontend dashboard',
          'Node.js + Express for the REST API layer',
          'Supabase for database and authentication',
          'Component-based architecture for reusability',
        ],
        lessons: [
          'API design decisions at the start save refactoring time later',
          'Dashboard layouts require careful information hierarchy',
          'State management complexity grows fast — keep it simple',
        ],
        nextSteps: [
          'Build out the full working prototype',
          'Add drag-and-drop task reordering',
          'Implement user authentication',
          'Add team collaboration features',
        ],
      },
    },
  ],

  // ─── Resume ──────────────────────────────────────────────────────────────────
  resume: {
    summary:
      'Aspiring UI/UX Designer and future Full-Stack Web Developer seeking an On-the-Job Training opportunity to apply academic knowledge, enhance skills, and gain hands-on experience. Committed to continuous learning with the goal of becoming a proficient UI/UX designer and web developer.',
    education: [
      {
        institution: 'Arellano University Jose Abad Santos',
        degree: 'Bachelor of Science in Computer Science (BSCS)',
        period: '2023 – Present',
        details: 'Currently enrolled. Focusing on software development, UI/UX design, and web technologies.',
      },
      {
        institution: 'School of Saint Joseph (SSJ)',
        degree: 'Senior High School — Science, Technology, Engineering, and Mathematics (STEM)',
        period: '2019 – 2021',
        details: '',
      },
      {
        institution: 'School of Saint Joseph (SSJ)',
        degree: 'Junior High School',
        period: '2015 – 2019',
        details: '',
      },
    ],
    certifications: [
      { name: 'UI/UX Design Certification',        status: 'planned' },
      { name: 'Frontend Development Certification', status: 'planned' },
    ],
    coreCompetencies: [
      'Figma',
      'UI Design',
      'Wireframing',
      'Prototyping',
      'HTML5',
      'CSS3',
      'JavaScript',
      'Responsive Design',
      'Attention to Detail',
      'Microsoft Word',
      'Microsoft PowerPoint',
    ],
    experience:
      'Student Counseling Tracker System (Capstone Project) — Role: Figma UI Design & Documentation. Designed system interface using Figma, created wireframes and prototypes, prepared project documentation and reports, and assisted in frontend design implementation.',
    downloadLabel: 'Download Resume',
    downloadUrl: RESUME_PATH,
  },

  // ─── Contact ─────────────────────────────────────────────────────────────────
  contact: {
    heading: "Let's Connect",
    subheading:
      'I am open to internships, learning opportunities, collaborations, and creative web projects.',
    email: 'joshfallarcuna@gmail.com',
    location: 'Santa Mesa, Manila, Philippines',
    availability: 'Available for work',
    socialLinks: [
      { platform: 'GitHub',   url: 'https://github.com/joshfallarcuna',   label: 'GitHub profile'   },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/joshfallarcuna', label: 'LinkedIn profile' },
    ],
  },

  // ─── Footer ──────────────────────────────────────────────────────────────────
  footer: {
    name: 'Josh Fallarcuna',
    tagline: 'Aspiring UI/UX Designer & Future Full-Stack Web Developer',
    socialLinks: [
      { platform: 'GitHub',   url: 'https://github.com/joshfallarcuna',   label: 'GitHub profile'   },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/joshfallarcuna', label: 'LinkedIn profile' },
    ],
    copyright: '© 2026 Josh Fallarcuna. All rights reserved.',
  },
}
