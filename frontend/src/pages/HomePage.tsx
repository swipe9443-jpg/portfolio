import { Hero }     from '@/sections/Hero/Hero'
import { About }    from '@/sections/About/About'
import { Skills }   from '@/sections/Skills/Skills'
import { Projects } from '@/sections/Projects/Projects'
import { Resume }   from '@/sections/Resume/Resume'
import { Contact }  from '@/sections/Contact/Contact'

export function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
    </main>
  )
}
