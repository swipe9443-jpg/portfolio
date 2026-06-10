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
    featuredProjectIds: ['portfolio', 'ui-design-project', 'web-dev-project'],
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
      "I'm Josh Fallarcuna, a Bachelor of Science in Computer Science (BSCS) student passionate about technology, design, and continuous learning. My journey combines technical problem-solving with creative design, allowing me to explore both software development and UI/UX design. I am currently focused on improving my skills, gaining real-world experience through internships, and building projects that showcase my growth as a future technology professional.",
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
      'Secure an internship in UI/UX Design or Software Development',
      'Build practical full-stack development skills',
      'Contribute to real-world projects and products',
      'Grow as a well-rounded technology professional',
    ],
    whyWorkWithMe: [
      'Combines technical and creative thinking',
      'Strong interest in UI/UX and design systems',
      'Actively building frontend development skills',
      'Detail-oriented and quality-focused',
      'Eager to learn and continuously improve',
      'Reliable, collaborative, and professional',
    ],
    timeline: [
      {
        year: '2023',
        title: 'Beginning of BSCS Journey',
        description: 'Started my Bachelor of Science in Computer Science (BSCS) degree and began exploring the foundations of programming, technology, and software development. Developed curiosity for building digital solutions and understanding how technology works.',
      },
      {
        year: '2024',
        title: 'Discovering the World of Computer Science',
        description: 'Deepened my understanding of Computer Science concepts, problem-solving, software development processes, and technology fundamentals. Explored different career paths within the tech industry while continuously improving technical knowledge.',
      },
      {
        year: '2025',
        title: 'Design & Creative Growth',
        description: 'Expanded my skills into digital design and creative tools including Figma and Adobe Photoshop. Focused on UI/UX principles, visual design, prototyping, and creating modern digital experiences while combining creativity with technical thinking.',
      },
      {
        year: '2026',
        title: 'Internship & Professional Development',
        description: 'Currently pursuing internship opportunities and continuously improving my technical and design skills. Building real-world projects, strengthening problem-solving abilities, and preparing for a professional career in technology.',
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
      'Pursuing internship opportunities in tech',
      'Growing UI/UX design skills with Figma',
      'Building frontend development proficiency',
      'Developing portfolio projects',
      'Gaining real-world project experience',
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
      id: 'design-ux',
      category: 'Design & UX',
      skills: [
        // Tools
        'Figma',
        'Adobe Photoshop',
        'Picsart',
        'PixelLab',
        // Skills
        'UI Design',
        'UX Fundamentals',
        'Wireframing',
        'Prototyping',
        'Design Systems',
      ],
    },
    {
      id: 'frontend',
      category: 'Frontend Development',
      skills: [
        // Technologies
        'HTML5',
        'CSS3',
        'JavaScript',
        'TypeScript (Learning)',
        'React (Learning)',
        // Skills
        'Responsive Design',
        'Modern Web Interfaces',
        'Component-Based Development',
      ],
    },
    {
      id: 'dev-tools',
      category: 'Development Tools',
      skills: [
        // Tools
        'Git',
        'GitHub',
        'VS Code',
        'Vercel',
        // Skills
        'Version Control',
        'Deployment',
        'Project Organization',
      ],
    },
    {
      id: 'cs-foundations',
      category: 'Computer Science Foundations',
      skills: [
        'Problem Solving',
        'Algorithmic Thinking',
        'Object-Oriented Programming',
        'Data Structures',
        'Software Engineering Principles',
      ],
    },
    {
      id: 'content-creation',
      category: 'Content Creation & Multimedia',
      skills: [
        // Tools
        'CapCut',
        'PowerDirector',
        // Skills
        'Video Editing',
        'Content Design',
        'Social Media Graphics',
      ],
    },
    {
      id: 'professional',
      category: 'Professional Skills',
      skills: [
        'Team Collaboration',
        'Communication',
        'Attention to Detail',
        'Project Planning',
        'Self-Learning',
      ],
    },
  ],

  // ─── Projects ────────────────────────────────────────────────────────────────
  projects: [
    {
      id: 'portfolio',
      title: 'Personal Portfolio Website',
      category: 'Frontend Development',
      description:
        'A dark cinematic portfolio website built with React and TypeScript to present my skills, background, and future projects as I grow as a developer and designer.',
      technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
      features: [
        'Responsive multi-page layout',
        'Dark cinematic visual design',
        'Component-based architecture',
        'Resume download',
        'Contact form interface',
      ],
      featured: true,
      comingSoon: false,
    },
    {
      id: 'ui-design-project',
      title: 'UI/UX Design Project',
      category: 'UI/UX Design',
      description:
        'This project is currently in development and will be added soon. It will showcase my growing skills in UI/UX design, Figma prototyping, and creating modern digital experiences.',
      technologies: ['Figma', 'Adobe Photoshop', 'UI Design', 'Prototyping'],
      features: [
        'User interface design',
        'Interactive prototyping',
        'Visual design system',
        'User experience flow',
      ],
      featured: true,
      comingSoon: true,
    },
    {
      id: 'web-dev-project',
      title: 'Web Development Project',
      category: 'Frontend Development',
      description:
        'This project is currently in development and will be added soon. It will demonstrate my frontend development skills, responsive design principles, and modern web technologies.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      features: [
        'Responsive web layout',
        'Modern interface design',
        'Clean code structure',
        'Cross-device compatibility',
      ],
      featured: false,
      comingSoon: true,
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
