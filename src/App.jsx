import { useState, useEffect, useRef } from 'react'
import './App.css'
import { trackEvent } from './analytics'

const WHATSAPP_BOOKING_URL = 'https://wa.me/91XXXXXXXXXX?text=Hi%20Olivia%20Beauty%20Salon,%20I%20would%20like%20to%20check%20availability%20for%20an%20appointment.'

const trackNavigationClick = (section, navigationLocation) => {
  trackEvent('navigation_click', {
    section,
    navigation_location: navigationLocation,
  })
}

/* ─────────────────────────────────────────────
   SVG Icon Helpers
   ───────────────────────────────────────────── */
const Icon = {
  Scissors: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/>
      <line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  ),
  Hand: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
    </svg>
  ),
  Sparkles: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>
      <path d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75z"/>
      <path d="M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75z"/>
    </svg>
  ),
  Drop: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </svg>
  ),
  Leaf: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  ),
  Eye: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Pinterest: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-13.58 5.48a11.24 11.24 0 0 0-.22 4.28l1.2 4.27"/>
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  // Olive branch SVG for decorative use
  OliveBranch: ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 50 Q 20 30 30 20 Q 40 10 50 5" />
      <ellipse cx="22" cy="35" rx="8" ry="5" transform="rotate(-30 22 35)" fill="currentColor" stroke="none" opacity="0.8"/>
      <ellipse cx="30" cy="26" rx="8" ry="5" transform="rotate(-45 30 26)" fill="currentColor" stroke="none" opacity="0.8"/>
      <ellipse cx="38" cy="17" rx="7" ry="4" transform="rotate(-55 38 17)" fill="currentColor" stroke="none" opacity="0.8"/>
      <ellipse cx="44" cy="10" rx="6" ry="4" transform="rotate(-65 44 10)" fill="currentColor" stroke="none" opacity="0.7"/>
      <circle cx="18" cy="40" r="3.5" fill="currentColor" stroke="none" opacity="0.7"/>
      <circle cx="14" cy="46" r="3" fill="currentColor" stroke="none" opacity="0.6"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.37C16.31 14.25 15.09 13.65 14.86 13.56C14.64 13.48 14.47 13.44 14.31 13.69C14.14 13.94 13.67 14.49 13.53 14.65C13.38 14.82 13.24 14.84 12.99 14.71C12.74 14.59 11.94 14.33 11 13.49C10.26 12.83 9.77 12.02 9.62 11.77C9.48 11.52 9.61 11.38 9.73 11.26C9.84 11.15 9.98 10.97 10.11 10.82C10.23 10.67 10.27 10.57 10.35 10.4C10.43 10.24 10.39 10.1 10.33 9.97C10.27 9.85 9.77 8.62 9.56 8.12C9.36 7.63 9.15 7.7 9 7.69C8.86 7.69 8.69 7.68 8.52 7.68C8.36 7.68 8.09 7.74 7.86 7.99C7.63 8.24 7 8.83 7 10.03C7 11.23 7.88 12.39 8 12.55C8.13 12.72 9.71 15.16 12.15 16.21C12.73 16.46 13.18 16.61 13.53 16.72C14.11 16.91 14.64 16.88 15.06 16.82C15.53 16.75 16.5 16.23 16.7 15.66C16.91 15.09 16.91 14.6 16.85 14.5C16.78 14.41 16.64 14.35 16.56 14.37Z"/>
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  GoogleCalendar: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z"/>
    </svg>
  ),
  PhoneCall: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

/* ─────────────────────────────────────────────
   BOOKING TILES (6 SIGNATURE EXPERIENCES)
   ───────────────────────────────────────────── */
const bookingTiles = [
  {
    id: 'hair-styling',
    name: 'Hair Styling & Blowout',
    category: 'Hair Artistry',
    image: '/Glossy Waves and Sleek Hair Dryer.jpg',
    desc: 'From precision cuts to voluminous glossy blowouts and bespoke color treatments tailored to elevate your natural beauty.',
    tag: 'Signature Ritual',
  },
  {
    id: 'manicure-pedicure',
    name: 'Nail Artistry & Manicure',
    category: 'Nail Care',
    image: '/Professional Manicure in Progress.jpg',
    desc: 'Meticulous cuticle care, Russian manicure, builder gel overlays, and bespoke luxury artisan nail designs.',
    tag: 'Artisan Polish',
  },
  {
    id: 'blue-led-facial',
    name: 'Blue LED Facial Therapy',
    category: 'Advanced Skincare',
    image: '/Blue LED Facial Therapy.jpg',
    desc: 'Clinical-grade light therapy paired with botanical cleansers to calm inflammation, detoxify, and renew dermal vitality.',
    tag: 'Clinical Glow',
  },
  {
    id: 'spa-massage',
    name: 'Tranquil Spa Facial Massage',
    category: 'Spa & Wellness',
    image: '/Tranquil Spa Facial Massage.jpg',
    desc: 'Deep tension-melting aromatherapy massage combined with restorative acupressure to lift, soothe, and recharge.',
    tag: 'Pure Relaxation',
  },
  {
    id: 'eye-makeup',
    name: 'Macro Eye & Brow Artistry',
    category: 'Eyes & Makeup',
    image: '/Macro Eye Makeup Application.jpg',
    desc: 'Architectural brow sculpting, lash lift tinting, and high-precision event eye makeup for captivating expression.',
    tag: 'High Definition',
  },
  {
    id: 'bridal-glow',
    name: 'Bridal Glow Ritual',
    category: 'Bridal Packages',
    image: '/Bridal Glow by the Window.jpg',
    desc: 'Complete couture bridal packages including skin prep, bespoke hair styling, and radiant camera-ready makeup.',
    tag: 'Bespoke Couture',
  },
]

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const services = [
  {
    icon: <Icon.Scissors />,
    name: 'Hair Styling',
    desc: 'From precision cuts to bespoke color treatments, our expert stylists craft looks that perfectly frame your features.',
  },
  {
    icon: <Icon.Hand />,
    name: 'Nail Artistry',
    desc: 'Gel, acrylic, or natural — indulge in meticulous nail care with premium products and stunning artisan designs.',
    
  },
  {
    icon: <Icon.Sparkles />,
    name: 'Skincare & Facials',
    desc: 'Revitalise your skin with our curated facial treatments using luxury botanical ingredients and advanced techniques.',
    
  },
  {
    icon: <Icon.Drop />,
    name: 'Spa Treatments',
    desc: 'Escape into tranquility with full-body massages, aromatherapy wraps, and rejuvenating body treatments.',
   
  },
  {
    icon: <Icon.Eye />,
    name: 'Brow & Lash',
    desc: 'Perfectly arched brows, lash lifts, and tinting services to open up and define your eyes with elegance.',
   
  },
  {
    icon: <Icon.Leaf />,
    name: 'Bridal Packages',
    desc: 'Your most beautiful day deserves the finest touch. Luxurious bespoke packages for brides and their wedding parties.',
   
  }
]

const testimonials = [
  {
    text: "Found this gem on Google Maps and the reviews were right! The staff is incredibly skilled and the ambiance is so relaxing. I got a balayage and it's the best my hair has ever looked. Definitely coming back!",
    name: "Sarah Jenkins",
    role: "Local Guide",
    initial: "S"
  },
  {
    text: "Absolutely stunning salon! I booked a facial and manicure based on their online ratings, and it exceeded all expectations. It's clean, luxurious, and they use top-tier products. 5 stars all the way.",
    name: "Priya M.",
    role: "New Client",
    initial: "P"
  },
  {
    text: "I've been a regular at Olivia Beauty Salon for over a year now. The consistency in their service is amazing. From the warm welcome to the perfect styling, they never miss. Highly recommended if you want a premium experience.",
    name: "Emily R.",
    role: "Regular Client",
    initial: "E"
  }
]

const galleryColors = [
  { img: '/layer-cutting.jpg', label: 'Layer Cutting' },
  { img: '/manicure-pedicure.jpg', label: 'Manicure & Pedicure' },
  { img: '/spa.jpg', label: 'Spa Treatments' },
  { img: '/main.JPG', label: 'Our Sanctuary' },
  { img: '/brow-lash.jpg', label: 'Brow & Lash' },
]

const marqueeItems = [
  'Hair Styling', 'Nail Artistry', 'Skin Rejuvenation', 'Brow & Lash',
  'Spa Treatments', 'Bridal Beauty', 'Hair Colouring', 'Body Treatments'
]

/* ─────────────────────────────────────────────
   INTERACTIVE ELEMENTS
   ───────────────────────────────────────────── */
function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return
    }

    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let cursorX = mouseX
    let cursorY = mouseY
    let isHovering = false

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`

      // Magnetic pull for buttons
      const btn = e.target.closest('.btn')
      if (btn) {
        const rect = btn.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const pullX = (mouseX - centerX) * 0.2
        const pullY = (mouseY - centerY) * 0.2
        btn.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`
        btn.dataset.magnetized = 'true'
      } else {
        document.querySelectorAll('.btn[data-magnetized="true"]').forEach(b => {
          b.style.transform = 'translate3d(0, 0, 0)'
          b.dataset.magnetized = 'false'
        })
      }
    }

    const onMouseOver = (e) => {
      const target = e.target.closest('button, a, .magnetic-target, input, select, textarea, .gallery-item')
      if (target) {
        isHovering = true
        cursor.classList.add('hover')
      } else {
        isHovering = false
        cursor.classList.remove('hover')
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)

    let animationFrameId
    const render = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(${isHovering ? 1.5 : 1})`
      animationFrameId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(animationFrameId)
      document.querySelectorAll('.btn[data-magnetized="true"]').forEach(b => {
        b.style.transform = 'translate3d(0, 0, 0)'
        b.dataset.magnetized = 'false'
      })
    }
  }, [])

  return (
    <>
      <div className="custom-cursor-dot" ref={dotRef}></div>
      <div className="custom-cursor-ring" ref={cursorRef}></div>
    </>
  )
}

/* ─────────────────────────────────────────────
   PRELOADER
   ───────────────────────────────────────────── */
function Preloader({ onComplete, videoReady }) {
  const [fadeOut, setFadeOut] = useState(false)
  const [minTimePassed, setMinTimePassed] = useState(false)

  // Minimum animation time (2s for the ring + brand to play)
  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), 2000)
    return () => clearTimeout(t)
  }, [])

  // Dismiss when BOTH minimum time has passed AND video is ready
  useEffect(() => {
    if (minTimePassed && videoReady && !fadeOut) {
      setFadeOut(true)
      setTimeout(onComplete, 800)
    }
  }, [minTimePassed, videoReady, fadeOut, onComplete])

  return (
    <div className={`preloader ${fadeOut ? 'fade-out' : ''}`} role="status" aria-label="Loading Olivia Beauty Salon">
      <div className="preloader-logo-wrapper">
        <svg className="preloader-ring" viewBox="0 0 100 100">
          <circle className="preloader-ring-bg" cx="50" cy="50" r="46" />
          <circle className="preloader-ring-circle" cx="50" cy="50" r="46" />
        </svg>
        <img src="/olivia.jpg" alt="Olivia Beauty Salon" className="preloader-logo" />
      </div>
      <div className="preloader-brand">
        <h1>OLIVIA</h1>
        <p>Beauty Salon</p>
      </div>
      <div className="preloader-bar"></div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   HEADER
   ───────────────────────────────────────────── */
function Header({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id, navigationLocation = 'header') => {
    setMobileOpen(false)
    trackNavigationClick(id, navigationLocation)
    const el = document.getElementById(id)
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 90
      window.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#" className="header-logo" onClick={(e) => { e.preventDefault(); trackNavigationClick('home', 'header_logo'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <img src="/olivia.jpg" alt="Olivia Beauty Salon Logo" />
          <div className="header-logo-text">
            <span>Olivia</span>
            <span>Beauty Salon</span>
          </div>
        </a>

        <nav className="site-nav">
          {['services', 'about', 'gallery', 'contact'].map((s) => (
            <button key={s} className="nav-link" onClick={() => scrollTo(s, 'header_desktop')} style={{ background: 'none', border: 'none' }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <button className="btn btn-gold btn-book" onClick={() => onBook('header_desktop_book')}>
            Book Appointment
          </button>
        </nav>

        <button
          className={`hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="mobile-nav open">
          {['services', 'about', 'gallery', 'contact'].map((s) => (
            <button key={s} className="nav-link" onClick={() => scrollTo(s, 'header_mobile')} style={{ background: 'none', border: 'none' }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <button className="btn btn-gold" onClick={() => { setMobileOpen(false); onBook('header_mobile_book') }}>
            Book Appointment
          </button>
        </div>
      )}
    </header>
  )
}

/* ─────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────── */
function Hero({ onBook, onVideoReady }) {
  const videoRef = useRef(null)

  // Notify parent when video can play
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      video.play().catch(() => {})
      if (onVideoReady) onVideoReady()
    }

    // If video is already ready (cached)
    if (video.readyState >= 3) {
      handleCanPlay()
    } else {
      video.addEventListener('canplay', handleCanPlay, { once: true })
    }

    // Fallback: if video takes too long (e.g. slow network), dismiss after 6s
    const fallbackTimer = setTimeout(() => {
      if (onVideoReady) onVideoReady()
    }, 6000)

    // Mobile interaction listeners to force play
    const handleInteraction = () => {
      video.play()
        .then(() => {
          window.removeEventListener('touchstart', handleInteraction)
          window.removeEventListener('scroll', handleInteraction)
          window.removeEventListener('click', handleInteraction)
        })
        .catch(() => {})
    }

    window.addEventListener('touchstart', handleInteraction, { passive: true })
    window.addEventListener('scroll', handleInteraction, { passive: true })
    window.addEventListener('click', handleInteraction, { passive: true })

    return () => {
      clearTimeout(fallbackTimer)
      video.removeEventListener('canplay', handleCanPlay)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('click', handleInteraction)
    }
  }, [onVideoReady])

  return (
    <section className="hero" id="home">
      <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/hero_salon.jpg" className="hero-video">
        <source src="/home.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-split">
          <div className="hero-split-left">
            <div className="hero-content">
              <span className="hero-label">Welcome to Olivia Beauty Salon</span>
              <h1 className="hero-heading">
                OLIVIA BEAUTY SALON
              </h1>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'var(--gold-light)',
                marginBottom: '24px',
                lineHeight: 1.3
              }}>
                Discover the Art of Timeless Beauty
              </h2>
              <p className="hero-sub">
                A sanctuary of elegance where expert artistry meets pure luxury. We craft bespoke beauty experiences tailored to reveal your most radiant self.
              </p>
              <div className="hero-cta">
                <button className="btn btn-gold" onClick={() => onBook('hero_book_button')}>
                  Book an Appointment
                  <Icon.ArrowRight />
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    trackNavigationClick('services', 'hero_explore_services')
                    const el = document.getElementById('services')
                    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 90, behavior: 'smooth' })
                  }}
                >
                  Explore Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll" role="presentation">
        <span>Scroll</span>
        <div className="scroll-mouse"></div>
      </div>
    </section>
  )
}



/* ─────────────────────────────────────────────
   MARQUEE
   ───────────────────────────────────────────── */
function MarqueeStrip() {
  const quadrupled = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {quadrupled.map((item, i) => (
          <span key={i} className="marquee-item">
            <Icon.OliveBranch size={16} />
            {item}
            <span className="marquee-dot"></span>
          </span>
        ))}
      </div>
    </div>
  )
}


/* ─────────────────────────────────────────────
   SERVICES
   ───────────────────────────────────────────── */
function TiltCard({ children, className }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card || ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (card) {
      card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)`
    }
  }

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

function Services({ onBook }) {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services-header">
          <span className="section-label">Our Services</span>
          <h2 className="section-title">Curated for <em>Your Radiance</em></h2>
          <div className="olive-divider">
            <div className="olive-divider-line"></div>
            <Icon.OliveBranch />
            <div className="olive-divider-line right"></div>
          </div>
          <p style={{ maxWidth: '520px', margin: '16px auto 0', fontSize: '15px', fontWeight: 300, color: 'var(--charcoal-light)', lineHeight: 1.8 }}>
            Each service is a carefully crafted ritual, designed to restore balance and illuminate your natural beauty.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <TiltCard key={i} className="service-card">
              <div className="service-icon" aria-hidden="true">{s.icon}</div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              {s.price && <span className="service-price">{s.price}</span>}
            </TiltCard>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <button className="btn btn-gold" onClick={() => onBook('services_book_treatment')}>
            Book Your Treatment
            <Icon.ArrowRight />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   ABOUT
   ───────────────────────────────────────────── */
function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Image side */}
          <div className="about-image-frame">
            <img src="/main.JPG" alt="Olivia, founder of Olivia Beauty Salon" />
            <div className="about-badge">
              <div className="about-badge-number">12+</div>
              <div className="about-badge-text">Years of Excellence</div>
            </div>
          </div>

          {/* Content side */}
          <div className="about-content">
            <span className="section-label">Our Story</span>
            <h2 className="section-title">
              Beauty Rooted in<br /><em>Passion & Artistry</em>
            </h2>
            <div className="gold-line left" style={{ marginBottom: '32px', marginTop: '16px' }}></div>

            <blockquote className="about-quote">
              "True beauty is not about perfection it is about confidence, care, and the feeling of being absolutely yourself."
            </blockquote>

            <p className="about-body">
              Founded with a vision to create a haven of luxury and refinement, Olivia Beauty Salon has been a trusted destination for discerning clients seeking the very finest in beauty services. We believe that beauty is a deeply personal journey, and our expert team is dedicated to celebrating your unique essence.
            </p>
            <p className="about-body">
              Every detail of our salon from the hand-selected botanical products to our highly trained specialists  reflects our unwavering commitment to excellence. Inspired by the olive branch, a timeless symbol of beauty and vitality, we nourish not just your appearance, but your spirit.
            </p>

            <div className="about-stats">
              <div>
                <div className="about-stat-number">100+</div>
                <div className="about-stat-label">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   TESTIMONIALS
   ───────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">Voices of <em>Our Clients</em></h2>
          <div className="olive-divider">
            <div className="olive-divider-line"></div>
            <Icon.OliveBranch />
            <div className="olive-divider-line right"></div>
          </div>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <span className="testimonial-quote-mark">"</span>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, si) => <span key={si} className="star" aria-hidden="true">★</span>)}
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar" aria-hidden="true">{t.initial}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   GALLERY
   ───────────────────────────────────────────── */
function Gallery() {
  return (
    <section className="gallery-strip" id="gallery">
      <div className="container">
        <div className="gallery-header">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">A Glimpse of <em>Elegance</em></h2>
          <div className="olive-divider">
            <div className="olive-divider-line"></div>
            <Icon.OliveBranch />
            <div className="olive-divider-line right"></div>
          </div>
        </div>

        <div className="gallery-grid">
          {galleryColors.map((g, i) => (
            <div key={i} className="gallery-item">
              <div
                className="gallery-item-inner"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.45)), url('${g.img}')`
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '24px',
                  fontStyle: 'italic',
                  color: 'var(--white)',
                  textAlign: 'center',
                  padding: '20px',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)'
                }}>
                  {g.label}
                </div>
              </div>
              <div className="gallery-overlay">
                <Icon.Eye />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   BOOKING BANNER
   ───────────────────────────────────────────── */
function BookingBanner({ onBook }) {
  return (
    <section className="booking-banner">
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <p className="booking-banner-label">Reserve Your Experience</p>
        <h2 className="booking-banner-title">
          Elevate Your Beauty<br />
          <em>Begin Your Journey Today</em>
        </h2>
        <div className="booking-banner-divider">
          <span className="divider-leaf"><Icon.OliveBranch size={22} /></span>
        </div>
        <p className="booking-banner-sub">
          Secure your appointment with our expert team. We look forward to welcoming you into our world of refined luxury.
        </p>
        <button className="btn btn-gold" onClick={() => onBook('booking_banner')}>
          Book Your Appointment
          <Icon.ArrowRight />
        </button>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────── */
function Footer({ onBook }) {
  const scrollTo = (id) => {
    trackNavigationClick(id, 'footer_navigation')
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 90, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <img src="/olivia.jpg" alt="Olivia Beauty Salon" />
            <div className="footer-brand-name">Olivia</div>
            <div className="footer-brand-tagline">Beauty Salon</div>
            <p className="footer-brand-desc">
              A sanctuary of refined elegance where expert artistry meets pure luxury. Rooted in the timeless beauty of the olive branch.
            </p>
            <div className="footer-social">
              {[
                { icon: <Icon.Instagram />, label: 'Instagram' },
                { icon: <Icon.Facebook />, label: 'Facebook' },
                { icon: <Icon.Pinterest />, label: 'Pinterest' },
              ].map((s, i) => (
                <a key={i} href="#" className="social-btn" aria-label={s.label} onClick={e => e.preventDefault()}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-col-title">Navigation</div>
            <nav className="footer-links">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Services', id: 'services' },
                { label: 'About Us', id: 'about' },
                { label: 'Gallery', id: 'gallery' },
                { label: 'Contact', id: 'contact' },
              ].map((l) => (
                <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollTo(l.id) }}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-title">Contact Us</div>
            <div>
              {[
                { 
                  icon: <Icon.MapPin />, 
                  text: 'Kaduthuruthy, Kottayam', 
                  link: 'https://maps.app.goo.gl/7N1uKAydXmdC39yp7' 
                },
                { icon: <Icon.Phone />, text: '+91 97470 95076' },
                { icon: <Icon.Mail />, text: 'shanijohn455@gmail.com' },
              ].map((c, i) => (
                <div key={i} className="footer-contact-item">
                  {c.link ? (
                    <a 
                      href={c.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="footer-contact-icon"
                      onClick={() => trackEvent('location_click', { contact_location: 'footer_contact', destination: 'google_maps' })}
                      style={{ display: 'inline-flex', cursor: 'pointer' }}
                    >
                      {c.icon}
                    </a>
                  ) : (
                    <span className="footer-contact-icon">{c.icon}</span>
                  )}
                  {c.link ? (
                    <a 
                      href={c.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="footer-contact-text"
                      onClick={() => trackEvent('location_click', { contact_location: 'footer_contact', destination: 'google_maps' })}
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
                    >
                      {c.text}
                    </a>
                  ) : (
                    <span className="footer-contact-text" style={{ whiteSpace: 'pre-line' }}>{c.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <div className="footer-col-title">Opening Hours</div>
            <div className="footer-hours">
              {[
                { day: 'Monday – Friday', time: '9:00 am – 6:00 pm' },
                { day: 'Saturday', time: '9:00 am – 6:00 pm' },
              ].map((h, i) => (
                <div key={i} className="hours-row">
                  <span className="hours-day">{h.day}</span>
                  <span className="hours-time">{h.time}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '28px' }}>
              <button className="btn btn-gold" onClick={() => onBook('footer_book_now')} style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: '11px' }}>
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} <span>Olivia Beauty Salon</span>. All rights reserved. Crafted with love &amp; elegance.
          </p>
          <div className="footer-bottom-links">
            <a href="#" onClick={e => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={e => e.preventDefault()}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────
   BOOKING MODAL (WITH 6 TILES & GOOGLE CALENDAR)
   ───────────────────────────────────────────── */
function BookingModal({ onClose, initialService = null }) {
  const [view, setView] = useState(initialService ? 'form' : 'tiles') // 'tiles' | 'form'
  const [selectedService, setSelectedService] = useState(initialService || (bookingTiles[0]?.name ?? ''))
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: initialService || (bookingTiles[0]?.name ?? ''),
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const selectedTile = bookingTiles.find(
    (t) => t.name.toLowerCase() === (form.service || selectedService || '').toLowerCase()
  ) || bookingTiles[0]

  const handleSelectTile = (tile) => {
    setSelectedService(tile.name)
    setForm((prev) => ({ ...prev, service: tile.name }))
    if (errors.service) setErrors((prev) => ({ ...prev, service: '' }))
    setView('form')
    trackEvent('service_tile_selected', {
      service_id: tile.id,
      service_name: tile.name,
    })
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      e.email = 'Valid email is required for Google Calendar'
    }
    setErrors(e)
    return !Object.keys(e).length
  }

  const onChange = (k, v) => {
    setForm((prev) => ({ ...prev, [k]: v }))
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: '' }))
  }

  // Google Calendar URL generator without fixed date/time so user selects them in Google Calendar
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Olivia Beauty Salon — ${form.service}`)
    const details = encodeURIComponent(
      `Appointment at Olivia Beauty Salon\n` +
      `Service: ${form.service}\n` +
      `Client: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `Please select your preferred date and time for this appointment.`
    )
    const location = encodeURIComponent('Olivia Beauty Salon, Kaduthuruthy, Kottayam, Kerala')

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    trackEvent('contact_form_submit', {
      form_name: 'booking_modal',
      service: form.service,
      client_name: form.name,
      client_email: form.email,
    })

    // Immediately open Google Calendar for the customer to choose date and time
    const calUrl = getGoogleCalendarUrl()
    window.open(calUrl, '_blank', 'noopener,noreferrer')

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
    }, 400)
  }

  // Close on Escape
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-heading">
      <div 
        className={`modal-box ${view === 'tiles' ? 'modal-box-wide' : 'modal-box-form'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close booking modal">
          <Icon.X />
        </button>

        {success ? (
          <div className="modal-success">
            <div className="modal-success-icon">
              <Icon.Check />
            </div>
            <h3>Google Calendar Opened!</h3>
            <div className="olive-divider" style={{ margin: '14px 0' }}>
              <div className="olive-divider-line"></div>
              <Icon.OliveBranch size={18} />
              <div className="olive-divider-line right"></div>
            </div>

            <div className="booking-reminder-callout" style={{ textAlign: 'center' }}>
              <p className="booking-reminder-text" style={{ fontSize: '15px', marginBottom: '8px' }}>
                Thank you, <strong>{form.name}</strong>! Your appointment for <strong>{form.service}</strong> is ready in Google Calendar.
              </p>
              <p style={{ fontSize: '13px', color: 'var(--charcoal-light)', margin: 0 }}>
                Please choose your preferred date and time on your Google Calendar to save your booking.
              </p>
            </div>

            <div className="booking-success-actions">
              <a 
                href={getGoogleCalendarUrl()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-google-cal"
              >
                <Icon.GoogleCalendar />
                <span>Open Google Calendar Again</span>
              </a>
              <button className="btn btn-gold" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        ) : view === 'tiles' ? (
          /* ──────────────── 6 TILES VIEW ──────────────── */
          <>
            <div className="modal-header">
              <img 
                src="/olivia.jpg" 
                alt="Olivia Beauty Salon" 
                style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 14px', border: '2px solid var(--gold)' }} 
              />
              <span className="section-label" style={{ marginBottom: 4 }}>Olivia Salon Reservations</span>
              <h2 className="modal-title" id="modal-heading">Book an Appointment</h2>
              <p className="modal-sub">Select your desired treatment from our 6 signature salon rituals below</p>
              <div className="olive-divider" style={{ marginTop: '16px', marginBottom: '0' }}>
                <div className="olive-divider-line"></div>
                <Icon.OliveBranch size={20} />
                <div className="olive-divider-line right"></div>
              </div>
            </div>

            <div className="booking-tiles-grid">
              {bookingTiles.map((tile) => (
                <div 
                  key={tile.id} 
                  className="booking-tile-card"
                  onClick={() => handleSelectTile(tile)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select ${tile.name}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleSelectTile(tile) } }}
                >
                  <div className="booking-tile-img-wrap">
                    <img src={tile.image} alt={tile.name} className="booking-tile-img" loading="lazy" />
                    <span className="booking-tile-category">{tile.category}</span>
                    <span className="booking-tile-badge">{tile.tag}</span>
                  </div>
                  <div className="booking-tile-content">
                    <div className="booking-tile-top">
                      <h3 className="booking-tile-title">{tile.name}</h3>
                    </div>
                    <p className="booking-tile-desc">{tile.desc}</p>
                    <div className="booking-tile-actions">
                      <button 
                        type="button" 
                        className="btn btn-gold booking-tile-btn-book"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectTile(tile)
                        }}
                      >
                        <span>Select & Book</span>
                        <Icon.ArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* ──────────────── FORM VIEW ──────────────── */
          <>
            <div className="booking-form-header-bar">
              <button 
                type="button" 
                className="booking-back-btn" 
                onClick={() => setView('tiles')}
              >
                ← Back to all 6 treatments
              </button>
              <span style={{ fontSize: '12px', color: 'var(--charcoal-light)' }}>
                Step 2 of 2: Appointment Details
              </span>
            </div>

            {selectedTile ? (
              <div className="booking-selected-card">
                <img src={selectedTile.image} alt={selectedTile.name} />
                <div className="booking-selected-meta">
                  <span className="booking-selected-tag">{selectedTile.category}</span>
                  <h4 className="booking-selected-name">{selectedTile.name}</h4>
                  <span style={{ fontSize: '11px', color: 'var(--charcoal-light)' }}>{selectedTile.tag}</span>
                </div>
                <button 
                  type="button" 
                  className="btn-outline-gold" 
                  style={{ padding: '6px 14px', fontSize: '11px' }}
                  onClick={() => setView('tiles')}
                >
                  Change Ritual
                </button>
              </div>
            ) : null}

            <form onSubmit={onSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="book-name">Full Name *</label>
                <input
                  id="book-name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => onChange('name', e.target.value)}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <span style={{ fontSize: 12, color: '#c0392b', marginTop: 4, display: 'block' }}>{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="book-email">Email Address *</label>
                <input
                  id="book-email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span style={{ fontSize: 12, color: '#c0392b', marginTop: 4, display: 'block' }}>{errors.email}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center', marginTop: '14px', padding: '15px 24px', fontSize: '13px' }}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 38 38" stroke="currentColor" style={{ animation: 'rotateSlow 1s linear infinite' }}>
                      <g fill="none"><g strokeWidth="3"><circle strokeOpacity=".25" cx="19" cy="19" r="18"/><path d="M37 19c0-9.94-8.06-18-18-18"/></g></g>
                    </svg>
                    Opening Google Calendar...
                  </>
                ) : (
                  <>
                    <Icon.GoogleCalendar /> Confirm Appointment <Icon.ArrowRight />
                  </>
                )}
              </button>
              <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--charcoal-light)', marginTop: '12px', marginBottom: 0 }}>
                You will be redirected to Google Calendar to select your date and time.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ROOT APP
   ───────────────────────────────────────────── */
export default function App() {
  const [loading, setLoading] = useState(true)
  const [videoReady, setVideoReady] = useState(false)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [initialBookingService, setInitialBookingService] = useState(null)

  const handlePreloaderDone = () => setLoading(false)
  const handleVideoReady = () => setVideoReady(true)

  const handleOpenBooking = (buttonLocation = 'unknown', serviceName = null) => {
    trackEvent('appointment_click', {
      button_location: buttonLocation,
      service: serviceName || 'all_services',
    })
    setInitialBookingService(serviceName)
    setBookingModalOpen(true)
  }

  const handleCloseBooking = () => {
    setBookingModalOpen(false)
    setInitialBookingService(null)
  }

  // Prevent background scroll when preloader or modal is active
  useEffect(() => {
    document.body.style.overflow = (loading || bookingModalOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loading, bookingModalOpen])

  return (
    <>
      <CustomCursor />
      {loading && <Preloader onComplete={handlePreloaderDone} videoReady={videoReady} />}

      {/* Hero renders immediately (behind preloader) so video can buffer */}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <Header onBook={handleOpenBooking} />
        <main>
          <Hero onBook={handleOpenBooking} onVideoReady={handleVideoReady} />
          <MarqueeStrip />
          <Services onBook={handleOpenBooking} />
          <About />
          <Testimonials />
          <Gallery />
          <BookingBanner onBook={handleOpenBooking} />
        </main>
        <Footer onBook={handleOpenBooking} />
      </div>

      {bookingModalOpen && (
        <BookingModal 
          onClose={handleCloseBooking} 
          initialService={initialBookingService}
        />
      )}
    </>
  )
}
