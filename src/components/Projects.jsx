import { useState } from 'react'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const categories = ['All', 'Web Apps', 'UX Design', 'Creative Coding']

  const projectList = [
    {
      id: 1,
      title: 'Aura Planner & Habit Visualizer',
      category: 'Web Apps',
      summary: 'A clean, gorgeous daily planner featuring interactive grids, streak counters, and dynamic color customization.',
      tags: ['React 19', 'CSS Grid', 'localStorage'],
      client: 'Self-Directed Product',
      date: 'Feb 2026',
      role: 'Frontend Architect & UI Design',
      description: 'Aura is a minimalist daily planner built to reduce digital clutter. It lets users define habits on a grid interface that tracks completion streaks. Features HSL theme editing, allowing users to customize their visual workspace colors in real-time. Code structure relies on local data persistence and CSS custom properties for instant styling changes.',
      logoSymbol: '◈'
    },
    {
      id: 2,
      title: 'Nexus Real-Time Kanban Hub',
      category: 'Web Apps',
      summary: 'A collaborative board with fluid card transitions, sub-50ms synchronizations, and team activity feeds.',
      tags: ['React', 'WebSockets', 'CSS Flexbox'],
      client: 'SaaS Platform',
      date: 'Nov 2025',
      role: 'Full Stack Engineer',
      description: 'Nexus is a fast, responsive Kanban application built for agile software teams. It integrates WebSocket events to sync card edits and drag-and-drop operations across all active team members simultaneously. Optimized to limit React re-renders by decoupling state hubs, ensuring high frame rates during complex movements.',
      logoSymbol: '✦'
    },
    {
      id: 3,
      title: 'Chronos Canvas Orbit Simulator',
      category: 'Creative Coding',
      summary: 'An educational orbital physics math engine rendering gravity vector paths at a constant 60 FPS.',
      tags: ['HTML5 Canvas', 'Mathematics', 'UI Motion'],
      client: 'Open Source Community',
      date: 'Aug 2025',
      role: 'Sole Developer',
      description: 'Chronos is an interactive web simulation that models gravitational interactions between celestial bodies. Built using vanilla 2D Canvas APIs and classical mechanics algorithms. By bypassing bulky external engine rendering, it operates smoothly at 60 FPS on mobile browsers. Includes custom dashboards for configuring planetary density, mass, and velocity.',
      logoSymbol: '⚙'
    },
    {
      id: 4,
      title: 'Vesper Luxury E-Commerce Flow',
      category: 'UX Design',
      summary: 'A checkout UX prototype for a high-end watchmaker, optimizing micro-interactions and input speeds.',
      tags: ['Figma', 'Design System', 'User Testing'],
      client: 'Vesper Watch Co.',
      date: 'May 2025',
      role: 'Lead UX Designer',
      description: 'Vesper is a complete user experience redesign targeted at reducing card abandonment rates in luxury retail. Conducted multiple online user tests to redesign address fields, cart summaries, and payment flows. The resulting prototype yielded a 14% improvement in success rates during user trials. Fully documented as a modular Figma design library.',
      logoSymbol: '✹'
    }
  ]

  const filteredProjects = activeFilter === 'All'
    ? projectList
    : projectList.filter(p => p.category === activeFilter)

  const openProject = (project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden' // Lock background scrolling
  }

  const closeProject = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'auto' // Restore scrolling
  }

  return (
    <section id="projects" className="section container">
      <div className="section-header">
        <span className="section-subtitle">Portfolio</span>
        <h2 className="section-title">Selected Projects</h2>
      </div>

      {/* Categories Filter Tabs */}
      <div className="projects-filter">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(cat)}
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Cards Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-card project-card animate-fade-in-up"
            onClick={() => openProject(project)}
            role="button"
            tabIndex="0"
            aria-label={`View details of ${project.title}`}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openProject(project); }}
          >
            {/* Visual Header Grid with Abstract CSS Art */}
            <div className="project-image-container">
              <div className="project-abstract-design">
                <div className="project-abstract-shape shape-1"></div>
                <div className="project-abstract-shape shape-2"></div>
                <div className="project-abstract-logo">
                  <span style={{ fontSize: '48px', fontWeight: 'bold' }}>{project.logoSymbol}</span>
                </div>
              </div>
              <div className="project-image-overlay">
                <span className="view-project-btn">Explore Project</span>
              </div>
            </div>

            {/* Card Content Area */}
            <div className="project-content">
              <div className="project-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="project-tag">{tag}</span>
                ))}
              </div>
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.summary}</p>
              
              <span className="project-card-link">
                Read Details 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal Popup */}
      {selectedProject && (
        <div 
          className="modal-overlay" 
          onClick={closeProject}
          role="presentation"
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()} // Stop bubbling
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <button 
              className="modal-close" 
              onClick={closeProject} 
              aria-label="Close project modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal Top Banner */}
            <div className="modal-image">
              <div className="modal-image-glow"></div>
              <span style={{ fontSize: '96px', color: '#fff', zIndex: '5', textShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                {selectedProject.logoSymbol}
              </span>
            </div>

            {/* Modal Body Details */}
            <div className="modal-body">
              <div className="modal-tags">
                {selectedProject.tags.map((tag, idx) => (
                  <span key={idx} className="project-tag" style={{ padding: '4px 12px', fontSize: '12px' }}>{tag}</span>
                ))}
              </div>
              
              <h2 id="modal-project-title" className="modal-title">{selectedProject.title}</h2>

              {/* Technical Specifications Grid */}
              <div className="modal-meta-grid">
                <div className="meta-item">
                  <span>Client / Project</span>
                  <p>{selectedProject.client}</p>
                </div>
                <div className="meta-item">
                  <span>Date Released</span>
                  <p>{selectedProject.date}</p>
                </div>
                <div className="meta-item">
                  <span>My Role</span>
                  <p>{selectedProject.role}</p>
                </div>
              </div>

              {/* In-depth Brief Description */}
              <div className="modal-text">
                <h4 className="modal-section-title">Project Overview & Approach</h4>
                <p style={{ marginBottom: '20px' }}>{selectedProject.description}</p>
                
                <h4 className="modal-section-title">Core Problems Solved</h4>
                <p>
                  Special focus was directed on optimizing page assets, creating reactive animations with standard CSS parameters, and building clean interfaces aligned with usability guidelines. Responsive layouts ensure fluid sizing adjustments on any device footprint.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={() => alert('Demo interface launch: Project details loaded successfully.')}>
                  Launch Live Demo
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </button>
                <button className="btn btn-secondary" onClick={closeProject}>
                  Close Specifications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
