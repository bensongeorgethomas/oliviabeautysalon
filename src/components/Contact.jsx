import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for that field on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({ name: '', email: '', message: '' })
    }, 1800)
  }

  const handleSendAnother = () => {
    setIsSuccess(false)
  }

  return (
    <section id="contact" className="section container">
      <div className="section-header">
        <span className="section-subtitle">Connect</span>
        <h2 className="section-title">Get In Touch</h2>
      </div>

      <div className="contact-grid">
        {/* Contact Info Card - Left */}
        <div className="contact-info-card">
          <h3 className="contact-info-title">Let's discuss your next project</h3>
          <p className="contact-info-desc">
            Have an exciting product idea, website project, or team position? Drop me a message, and let's explore how we can collaborate to make it a reality.
          </p>

          <div className="contact-details">
            <div className="contact-detail-item">
              <div className="contact-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <span className="contact-detail-label">Email Me</span>
                <p className="contact-detail-value">hello@oliviachen.dev</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="contact-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <span className="contact-detail-label">Current Location</span>
                <p className="contact-detail-value">San Francisco, California (Available Remote)</p>
              </div>
            </div>

            <div className="contact-detail-item">
              <div className="contact-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <span className="contact-detail-label">Average Response Time</span>
                <p className="contact-detail-value">Within 24 Hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Container - Right */}
        <div className="glass-card contact-form-container">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="form-name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="form-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`form-input ${formErrors.name ? 'input-error' : ''}`}
                  disabled={isSubmitting}
                  required
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="form-email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="form-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="johndoe@example.com"
                  className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                  disabled={isSubmitting}
                  required
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="form-message" className="form-label">Message</label>
                <textarea
                  id="form-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Hi Olivia, I would love to collaborate on..."
                  className={`form-input ${formErrors.message ? 'input-error' : ''}`}
                  disabled={isSubmitting}
                  required
                ></textarea>
                {formErrors.message && <span className="error-message">{formErrors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 38 38" stroke="#fff" style={{ animation: 'spin 1s linear infinite' }}>
                      <g fill="none" fillRule="evenodd">
                        <g transform="translate(1 1)" strokeWidth="3">
                          <circle strokeOpacity=".25" cx="18" cy="18" r="18" />
                          <path d="M36 18c0-9.94-8.06-18-18-18" />
                        </g>
                      </g>
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="success-view">
              <div className="success-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="success-title">Message Received!</h3>
              <p className="success-text">
                Thank you for reaching out. Your message has been sent successfully. Olivia will get back to you shortly!
              </p>
              <button onClick={handleSendAnother} className="btn btn-secondary">
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
