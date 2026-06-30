import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'

/**
 * Route-level code splitting.
 * Each page is a separate JS chunk — browsers only download what the user visits.
 * The fallback is a lightweight spinner that matches the dark palette.
 */

const HomePage      = lazy(() => import('@/pages/Home/HomePage').then(m => ({ default: m.HomePage })))
const AboutPage     = lazy(() => import('@/pages/About/AboutPage').then(m => ({ default: m.AboutPage })))
const ProjectsPage  = lazy(() => import('@/pages/Projects/ProjectsPage').then(m => ({ default: m.ProjectsPage })))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail/ProjectDetail').then(m => ({ default: m.ProjectDetail })))
const SkillsPage    = lazy(() => import('@/pages/Skills/SkillsPage').then(m => ({ default: m.SkillsPage })))
const ResumePage    = lazy(() => import('@/pages/Resume/ResumePage').then(m => ({ default: m.ResumePage })))
const ContactPage   = lazy(() => import('@/pages/Contact/ContactPage').then(m => ({ default: m.ContactPage })))
const NotFoundPage  = lazy(() => import('@/pages/NotFound/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

/** Minimal page-transition fallback — invisible to users on fast connections */
function PageFallback() {
  return (
    <div
      aria-label="Loading page"
      aria-live="polite"
      style={{
        minHeight:      '60vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }}
    >
      {/* @keyframes spin is defined in globals.css — no inline style needed */}
      <span
        style={{
          width:       '32px',
          height:      '32px',
          border:      '2px solid rgba(0,229,255,0.12)',
          borderTop:   '2px solid rgba(0,229,255,0.7)',
          borderRadius:'50%',
          display:     'inline-block',
          animation:   'spin 0.7s linear infinite',
        }}
        aria-hidden="true"
      />
    </div>
  )
}

function Wrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,            element: <Wrap><HomePage /></Wrap>      },
      { path: 'about',          element: <Wrap><AboutPage /></Wrap>     },
      { path: 'projects',       element: <Wrap><ProjectsPage /></Wrap>  },
      { path: 'projects/:slug', element: <Wrap><ProjectDetail /></Wrap> },
      { path: 'skills',         element: <Wrap><SkillsPage /></Wrap>    },
      { path: 'resume',         element: <Wrap><ResumePage /></Wrap>    },
      { path: 'contact',        element: <Wrap><ContactPage /></Wrap>   },
      { path: '*',              element: <Wrap><NotFoundPage /></Wrap>   },
    ],
  },
])
