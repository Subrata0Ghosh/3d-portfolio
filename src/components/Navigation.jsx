import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaCode } from 'react-icons/fa'

const Navigation = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/50 shadow-lg shadow-black/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 text-xl sm:text-3xl font-bold cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <FaCode className="text-primary-400 w-6 h-6 sm:w-8 sm:h-8" />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-400 hover:to-pink-400 transition-all duration-300">
              Subrata Ghosh
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm lg:text-base transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-primary-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-400"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200 border border-gray-700/50"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-700/50 bg-gray-900/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`text-left px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium ${
                      activeSection === item.id
                        ? 'text-primary-400 bg-primary-500/10 border border-primary-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navigation
