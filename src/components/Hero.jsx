import { useEffect, useState } from 'react'

export default function Hero() {
  const [roleText, setRoleText] = useState('')
  const roles = ['Creative Web Developer', 'UI/UX Designer', 'Interaction Engineer']
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Typing effect logic
  useEffect(() => {
    const activeRole = roles[roleIndex]
    let typingSpeed = isDeleting ? 30 : 80

    if (!isDeleting && charIndex === activeRole.length) {
      typingSpeed = 2000 // Pause before deleting
      const timeout = setTimeout(() => setIsDeleting(true), typingSpeed)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
      return
    }

    const timer = setTimeout(() => {
      setRoleText(
        isDeleting 
          ? activeRole.substring(0, charIndex - 1) 
          : activeRole.substring(0, charIndex + 1)
      )
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1))
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, roleIndex])

  const scrollToSection = (id) => {
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
    <section id="home" className="hero-section container">
      <div className="hero-backdrop"></div>
      <div className="hero-backdrop-2"></div>
      
      <div className="hero-grid">
        <div className="hero-info animate-fade-in-up">
          <div className="hero-badge">
            <span className="logo-dot"></span>
            Available for new opportunities
          </div>
          <h1 className="hero-title">
            Crafting Digital Solutions That Feel <span className="gradient-text">Alive</span>
          </h1>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px', minHeight: '38px', color: 'var(--heading-color)' }}>
            I'm a <span style={{ borderRight: '2px solid var(--primary)', paddingRight: '4px' }}>{roleText}</span>
          </h2>
          <p className="hero-subtitle">
            Hi, I'm Olivia. I design and code highly polished web experiences, combining clean architecture with gorgeous, modern styling to build applications people love using.
          </p>
          
          <div className="hero-cta">
            <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
              View My Work
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">
              Let's Talk
            </button>
          </div>
        </div>

        <div className="hero-visual animate-fade-in">
          {/* Animated decorative orbit lines */}
          <div className="rotating-orbit">
            <div className="orbit-node"></div>
          </div>
          <div className="rotating-orbit" style={{ width: '440px', height: '440px', animationDirection: 'reverse', animationDuration: '40s' }}>
            <div className="orbit-node" style={{ background: 'var(--primary)', top: '10%', left: '90%', boxShadow: '0 0 10px var(--primary)' }}></div>
          </div>

          <div className="avatar-frame">
            <div className="avatar-inner">
              {/* Clean decorative graphic representing creative developer */}
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="40" r="22" stroke="url(#avatarGrad)" strokeWidth="3" fill="none" />
                <path d="M15 85 C 20 62, 80 62, 85 85" stroke="url(#avatarGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M35 37 L 42 42 L 35 47" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M65 37 L 58 42 L 65 47" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="50" y1="28" x2="50" y2="20" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="stats-bar animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="stat-item">
          <h3 className="gradient-text">4+</h3>
          <p>Years Experience</p>
        </div>
        <div className="stat-item">
          <h3 className="gradient-text">30+</h3>
          <p>Projects Shipped</p>
        </div>
        <div className="stat-item">
          <h3 className="gradient-text">15+</h3>
          <p>Open Source Tools</p>
        </div>
      </div>
    </section>
  )
}
