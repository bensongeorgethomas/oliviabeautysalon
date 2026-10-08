import { useState, useRef, useEffect } from 'react'

export default function About() {
  const [skills] = useState([
    { name: 'Frontend Engineering (React, Next.js, JS)', level: 92 },
    { name: 'UI & Motion Design (CSS, Canvas, Figma)', level: 88 },
    { name: 'Backend Integration (Node.js, REST, GraphQL)', level: 78 },
    { name: 'Performance & SEO Optimization', level: 85 }
  ])

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'welcome', content: 'OliviaOS v1.4.2 (guest-session)' },
    { type: 'welcome', content: "Type 'help' to view available commands, or explore my bio." },
    { type: 'welcome', content: '---------------------------------------------------' }
  ])
  const [terminalInput, setTerminalInput] = useState('')
  const terminalBodyRef = useRef(null)

  // Scroll to bottom of terminal whenever history updates
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [terminalHistory])

  // Skill meters fill on load
  const [skillsLoaded, setSkillsLoaded] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setSkillsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const handleTerminalSubmit = (e) => {
    e.preventDefault()
    const command = terminalInput.trim().toLowerCase()
    if (!command) return

    let response = ''
    switch (command) {
      case 'help':
        response = 'Supported commands: \n  • about    - Show biography\n  • skills   - List main tech stack\n  • projects - Display project highlights\n  • contact  - Get email & links\n  • clear    - Clear terminal logs'
        break
      case 'about':
        response = 'Olivia Chen is a creative front-end engineer based in San Francisco. She focuses on translating high-fidelity designer visions into performant React interfaces, maintaining pixel perfection, smooth responsiveness, and elegant micro-interactions.'
        break
      case 'skills':
        response = 'Technical Stack:\n  - Frontend: JavaScript (ES6+), React 19, TypeScript, Next.js, HTML5, CSS3/PostCSS\n  - Tools & Styling: TailwindCSS, Figma, Framer Motion, Git, Vite, Webpack\n  - Backend/APIs: Node.js, Express, RESTful APIs, GraphQL, Firebase, PostgreSQL'
        break
      case 'projects':
        response = 'Featured Projects:\n  1. Aura | Aesthetic Habit Tracker & Planner\n  2. Nexus | Real-time Kanban Collaboration Hub\n  3. Chronos | Vector Canvas Orbit Simulator\n  Type/scroll down to the Projects section to review them in-depth!'
        break
      case 'contact':
        response = 'Get in touch:\n  - Email: hello@oliviachen.dev\n  - GitHub: github.com/oliviachen-dev\n  - LinkedIn: linkedin.com/in/olivia-chen-creative'
        break
      case 'clear':
        setTerminalHistory([])
        setTerminalInput('')
        return
      default:
        response = `Command not found: "${command}". Type "help" to see available options.`
    }

    setTerminalHistory(prev => [
      ...prev,
      { type: 'input', content: command },
      { type: 'output', content: response }
    ])
    setTerminalInput('')
  }

  return (
    <section id="about" className="section glass-card" style={{ padding: '80px 0', borderInline: 'none', borderRadius: '0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Profile</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          {/* Bio and Skills Column */}
          <div className="about-details">
            <h3 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--heading-color)' }}>
              Engineering Beauty & Functionality
            </h3>
            <p className="bio-text">
              I am a developer who bridges the gap between engineering efficiency and aesthetic designs. I believe that digital platforms should not only operate seamlessly but also evoke emotional engagement through fluid UI transitions, sensible ergonomics, and elegant style design.
            </p>
            <p className="bio-text">
              Whether building accessible design systems, interactive graphs, or responsive interfaces, I maintain code cleanliness and focus on loading performance, accessible standards (WCAG), and search engine optimization.
            </p>

            <div className="skills-container">
              <h4 className="skills-title">Core Competencies</h4>
              {skills.map((skill, index) => (
                <div key={index} className="skill-bar">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-track">
                    <div
                      className="skill-fill"
                      style={{ width: skillsLoaded ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Terminal Column */}
          <div className="terminal-column">
            <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--heading-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              Interactive Console
            </h3>

            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <span className="terminal-btn t-red"></span>
                  <span className="terminal-btn t-yellow"></span>
                  <span className="terminal-btn t-green"></span>
                </div>
                <div className="terminal-title">guest@oliviachen.dev:~</div>
                <div style={{ width: '48px' }}></div> {/* Spacer */}
              </div>

              <div className="terminal-body" ref={terminalBodyRef}>
                {terminalHistory.map((line, index) => (
                  <div key={index} className="terminal-line">
                    {line.type === 'input' && (
                      <div className="terminal-input-row">
                        <span className="terminal-prompt">guest@olivia:~$</span>
                        <span>{line.content}</span>
                      </div>
                    )}
                    {line.type === 'output' && (
                      <div className="terminal-output" style={{ whiteSpace: 'pre-wrap' }}>
                        {line.content}
                      </div>
                    )}
                    {line.type === 'welcome' && (
                      <div className="system-welcome">{line.content}</div>
                    )}
                  </div>
                ))}

                <form onSubmit={handleTerminalSubmit} className="terminal-input-row">
                  <span className="terminal-prompt">guest@olivia:~$</span>
                  <input
                    type="text"
                    className="terminal-input"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="try 'help'..."
                    aria-label="Terminal input query"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <span className="cursor-blink">_</span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
