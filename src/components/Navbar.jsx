import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }
    return 'light'
  })

  // Track scrolling to apply compact/shadow state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Apply theme class to HTML root
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className={`header glass ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="logo" onClick={(e) => handleLinkClick(e, 'home')}>
          OLIVIA<span className="logo-dot"></span>
        </a>

        {/* Desktop & Mobile Navigation Links */}
        <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#home" className="nav-link" onClick={(e) => handleLinkClick(e, 'home')}>Home</a>
          <a href="#about" className="nav-link" onClick={(e) => handleLinkClick(e, 'about')}>About</a>
          <a href="#projects" className="nav-link" onClick={(e) => handleLinkClick(e, 'projects')}>Projects</a>
          <a href="#contact" className="nav-link" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a>
        </nav>

        <div className="nav-actions">
          {/* Theme Toggler */}
          <button 
            onClick={toggleTheme} 
            className="theme-toggle" 
            aria-label="Toggle dark/light theme"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          {/* Hamburger Menu Icon for Mobile */}
          <button 
            className="menu-btn" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <line 
                x1="3" y1="6" x2="21" y2="6" 
                style={{
                  transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                  transformOrigin: 'top left'
                }}
              />
              <line 
                x1="3" y1="12" x2="21" y2="12" 
                style={{
                  opacity: isMobileMenuOpen ? 0 : 1
                }}
              />
              <line 
                x1="3" y1="18" x2="21" y2="18" 
                style={{
                  transform: isMobileMenuOpen ? 'rotate(-45deg) translate(4px, -6px)' : 'none',
                  transformOrigin: 'bottom left'
                }}
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
