import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top when scrolled down
      const hasScrolledDown = window.scrollY > 300
      setShowBackToTop(hasScrolledDown)

      const sections = ['hero', 'about', 'services', 'projects', 'testimonials', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen" onContextMenu={(e) => e.preventDefault()}>
      <Navigation activeSection={activeSection} />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />

      {/* Back to Top Button */}
      {showBackToTop && activeSection !== 'hero' && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}
    </div>
  )
}

export default App
