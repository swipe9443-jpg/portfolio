import { createBrowserRouter } from 'react-router-dom'
import { RootLayout }      from '@/layouts/RootLayout'
import { HomePage }        from '@/pages/Home/HomePage'
import { AboutPage }       from '@/pages/About/AboutPage'
import { ProjectsPage }    from '@/pages/Projects/ProjectsPage'
import { ProjectDetail }   from '@/pages/ProjectDetail/ProjectDetail'
import { SkillsPage }      from '@/pages/Skills/SkillsPage'
import { ResumePage }      from '@/pages/Resume/ResumePage'
import { ContactPage }     from '@/pages/Contact/ContactPage'
import { NotFoundPage }    from '@/pages/NotFound/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,                element: <HomePage />      },
      { path: 'about',              element: <AboutPage />     },
      { path: 'projects',           element: <ProjectsPage />  },
      { path: 'projects/:slug',     element: <ProjectDetail /> },
      { path: 'skills',             element: <SkillsPage />    },
      { path: 'resume',             element: <ResumePage />    },
      { path: 'contact',            element: <ContactPage />   },
      { path: '*',                  element: <NotFoundPage />  },
    ],
  },
])
