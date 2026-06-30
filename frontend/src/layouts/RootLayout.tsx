import { memo, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

// Scroll to top on every route change — instant to avoid conflict with scroll-behavior:smooth
const ScrollToTop = memo(function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [pathname])
  return null
})

// Defined at module level — never re-allocated on each render
const pageVariants = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0  },
  exit:     { opacity: 0, y: -8  },
}

const pageTransition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
}

// Memoized — only re-renders when children identity changes (route switch)
const AnimatedPage = memo(function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
})

export function RootLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
        style={{ background: 'var(--accent)', color: '#050816' }}
      >
        Skip to main content
      </a>

      <Navbar />

      <AnimatePresence mode="wait">
        <AnimatedPage key={location.pathname}>
          <main id="main-content">
            <ScrollToTop />
            <Outlet />
          </main>
        </AnimatedPage>
      </AnimatePresence>

      <Footer />
    </div>
  )
}
