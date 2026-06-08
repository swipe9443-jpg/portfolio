import { Navbar }   from '@/components/layout/Navbar'
import { Footer }   from '@/components/layout/Footer'
import { HomePage } from '@/pages/HomePage'

function App() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:text-white"
        style={{ background: 'var(--accent)', color: '#050816' }}
      >
        Skip to main content
      </a>

      <Navbar />
      <HomePage />
      <Footer />
    </div>
  )
}

export default App
