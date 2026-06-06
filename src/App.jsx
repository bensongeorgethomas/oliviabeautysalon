import { useState, useEffect, useRef } from 'react'
import './App.css'

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
  )
}

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const services = [
  {
    icon: <Icon.Scissors />,
    name: 'Hair Styling',
    desc: 'From precision cuts to bespoke color treatments, our expert stylists craft looks that perfectly frame your features.',
    price: 'From $85'
  },
  {
    icon: <Icon.Hand />,
    name: 'Nail Artistry',
    desc: 'Gel, acrylic, or natural — indulge in meticulous nail care with premium products and stunning artisan designs.',
    price: 'From $45'
  },
  {
    icon: <Icon.Sparkles />,
    name: 'Skincare & Facials',
    desc: 'Revitalise your skin with our curated facial treatments using luxury botanical ingredients and advanced techniques.',
    price: 'From $120'
  },
  {
    icon: <Icon.Drop />,
    name: 'Spa Treatments',
    desc: 'Escape into tranquility with full-body massages, aromatherapy wraps, and rejuvenating body treatments.',
    price: 'From $150'
  },
  {
    icon: <Icon.Eye />,
    name: 'Brow & Lash',
    desc: 'Perfectly arched brows, lash lifts, and tinting services to open up and define your eyes with elegance.',
    price: 'From $55'
  },
  {
    icon: <Icon.Leaf />,
    name: 'Bridal Packages',
    desc: 'Your most beautiful day deserves the finest touch. Luxurious bespoke packages for brides and their wedding parties.',
    price: 'From $350'
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
  { bg: 'linear-gradient(135deg, #f5e8b4 0%, #d4af37 100%)', label: 'Hair Color' },
  { bg: 'linear-gradient(135deg, #faf0f3 0%, #e8b4c4 100%)', label: 'Nail Art' },
  { bg: 'linear-gradient(135deg, #f0f5f0 0%, #b4d4b4 100%)', label: 'Skincare' },
  { bg: 'linear-gradient(135deg, #f5f0e8 0%, #d4c4a8 100%)', label: 'Spa & Wellness' },
  { bg: 'linear-gradient(135deg, #f0e8f5 0%, #c4a8d4 100%)', label: 'Brow & Lash' },
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
function Preloader({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onComplete, 800)
    }, 2600)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className={`preloader ${fadeOut ? 'fade-out' : ''}`} role="status" aria-label="Loading Olivia Beauty Salon">
      <div className="preloader-logo-wrapper">
        <svg className="preloader-ring" viewBox="0 0 100 100">
          <circle className="preloader-ring-bg" cx="50" cy="50" r="46" />
          <circle className="preloader-ring-circle" cx="50" cy="50" r="46" />
        </svg>
        <img src="/olivia.png" alt="Olivia Beauty Salon" className="preloader-logo" />
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

  const scrollTo = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 90
      window.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#" className="header-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <img src="/olivia.png" alt="Olivia Beauty Salon Logo" />
          <div className="header-logo-text">
            <span>Olivia</span>
            <span>Beauty Salon</span>
          </div>
        </a>

        <nav className="site-nav">
          {['services', 'about', 'gallery', 'contact'].map((s) => (
            <button key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ background: 'none', border: 'none' }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <button className="btn btn-gold btn-book" onClick={onBook}>
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
            <button key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ background: 'none', border: 'none' }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <button className="btn btn-gold" onClick={() => { setMobileOpen(false); onBook() }}>
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
function Hero({ onBook }) {
  const [bgLoaded, setBgLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = '/hero_salon.png'
    img.onload = () => setTimeout(() => setBgLoaded(true), 100)
  }, [])

  return (
    <section className="hero" id="home">
      <div className="container hero-container">
        <div className="hero-split">
          <div className="hero-split-left">
            <div className="hero-content">
              <span className="hero-label">Welcome to Olivia Beauty Salon</span>
              <h1 className="hero-heading">
                Discover the Art of<br />
                <em>Timeless Beauty</em>
              </h1>
              <p className="hero-sub">
                A sanctuary of elegance where expert artistry meets pure luxury. We craft bespoke beauty experiences tailored to reveal your most radiant self.
              </p>
              <div className="hero-cta">
                <button className="btn btn-gold" onClick={onBook}>
                  Book an Appointment
                  <Icon.ArrowRight />
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    const el = document.getElementById('services')
                    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 90, behavior: 'smooth' })
                  }}
                >
                  Explore Services
                </button>
              </div>
            </div>
          </div>
          <div className="hero-split-right">
            <div className={`hero-image-mask ${bgLoaded ? 'loaded' : ''}`}>
              <div className="hero-image-inner" style={{ backgroundImage: "url('/hero_salon.png')" }}></div>
            </div>
            <div className="hero-geo" role="presentation"></div>
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
   SCROLL ANIMATION (Frame Sequence)
   ───────────────────────────────────────────── */
const FRAME_START = 2
const FRAME_END = 50
const framePaths = Array.from(
  { length: FRAME_END - FRAME_START + 1 },
  (_, index) => `/animation/ezgif-frame-${String(index + FRAME_START).padStart(3, '0')}.jpg`
)

const visualIndexItems = [
  {
    label: '01 / Hair',
    title: 'Precision styling',
    copy: 'Sculpted cuts, polish, and soft movement for every appointment.',
    image: '/hero_salon.png'
  },
  {
    label: '02 / Skin',
    title: 'Quiet radiance',
    copy: 'Facials and ritual care shaped around texture, tone, and glow.',
    image: '/about_salon.png'
  },
  {
    label: '03 / Nails',
    title: 'Fine detail',
    copy: 'Minimal, ornate, glossy, or custom: small-scale art with a steady hand.',
    image: '/olivia.png'
  },
  {
    label: '04 / Bridal',
    title: 'A composed day',
    copy: 'Hair, skin, and finishing touches paced for the moments that matter.',
    image: '/hero_salon.png'
  }
]

function ScrollAnimation() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const currentFrameRef = useRef(0)
  const rafRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [hintVisible, setHintVisible] = useState(false)

  const drawFrame = (index) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const img = imagesRef.current[index]
    if (!ctx || !img || !img.complete || !img.naturalWidth) return

    const dpr = window.devicePixelRatio || 1
    const displayWidth = canvas.clientWidth
    const displayHeight = canvas.clientHeight
    if (!displayWidth || !displayHeight) return

    const pixelWidth = Math.round(displayWidth * dpr)
    const pixelHeight = Math.round(displayHeight * dpr)
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth
      canvas.height = pixelHeight
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, displayWidth, displayHeight)

    const scale = Math.min(displayWidth / img.naturalWidth, displayHeight / img.naturalHeight)
    const drawW = img.naturalWidth * scale
    const drawH = img.naturalHeight * scale
    const drawX = (displayWidth - drawW) / 2
    const drawY = (displayHeight - drawH) / 2

    ctx.drawImage(img, drawX, drawY, drawW, drawH)
  }

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0
    let cancelled = false
    const images = framePaths.map((src) => {
      const img = new Image()
      img.src = src
      return img
    })

    imagesRef.current = images

    const markLoaded = () => {
      if (cancelled) return
      loadedCount += 1
      if (loadedCount === images.length) {
        setLoaded(true)
        requestAnimationFrame(() => drawFrame(currentFrameRef.current))
      }
    }

    images.forEach((img) => {
      if (img.complete) {
        markLoaded()
        return
      }
      img.onload = markLoaded
      img.onerror = markLoaded
    })

    return () => {
      cancelled = true
      images.forEach((img) => {
        img.onload = null
        img.onerror = null
      })
    }
  }, [])

  // Scroll handler
  useEffect(() => {
    if (!loaded) return

    const updateFrame = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = Math.max(section.offsetHeight - window.innerHeight, 1)
      const scrolled = -rect.top

      const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 1)
      const frameIndex = Math.min(Math.round(progress * (framePaths.length - 1)), framePaths.length - 1)
      const shouldShowHint = progress < 0.04

      setHintVisible((visible) => visible === shouldShowHint ? visible : shouldShowHint)

      const track = trackRef.current
      if (track) {
        const maxShift = Math.max(track.scrollWidth - window.innerWidth, 0)
        track.style.transform = `translate3d(${-progress * maxShift}px, 0, 0)`
      }

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }

      if (frameIndex !== currentFrameRef.current && frameIndex >= 0) {
        currentFrameRef.current = frameIndex
        drawFrame(frameIndex)
      }
    }

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        updateFrame()
      })
    }

    const onResize = () => drawFrame(currentFrameRef.current)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    updateFrame()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [loaded])

  return (
    <section className="scroll-animation" ref={sectionRef} aria-label="Olivia Beauty Salon visual index">
      <div className="scroll-animation-sticky">
        <div className="scroll-animation-brand" aria-hidden="true">
          <img src="/olivia.png" alt="" />
          <span>Olivia</span>
        </div>

        <div className="scroll-animation-marquee" aria-hidden="true">
          <div>
            <span>Bookings open</span>
            <span>Hair styling</span>
            <span>Skin rituals</span>
            <span>Nail artistry</span>
            <span>Bridal beauty</span>
            <span>Olivia visual index</span>
          </div>
        </div>

        <div className="scroll-animation-progress" aria-hidden="true">
          <span ref={progressRef}></span>
        </div>

        <div className="scroll-animation-track" ref={trackRef}>
          <article className="scroll-index-panel scroll-index-panel-intro">
            <p className="scroll-index-kicker">Visual index</p>
            <h2>Beauty rituals, moving one frame at a time.</h2>
            <p>
              A cinematic pass through Olivia's signature services, paced by your scroll.
            </p>
          </article>

          <div className="scroll-index-seal">
            <div className="scroll-animation-frame">
              <canvas
                ref={canvasRef}
                className="scroll-animation-canvas"
                aria-label="Olivia Beauty Salon logo animation"
              />
            </div>
          </div>

          {visualIndexItems.map((item, index) => (
            <article className={`scroll-index-panel panel-${index + 1}`} key={item.title}>
              <div className="scroll-index-image">
                <img src={item.image} alt="" />
              </div>
              <div className="scroll-index-copy">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}

          <article className="scroll-index-panel scroll-index-panel-end">
            <p className="scroll-index-kicker">Next</p>
            <h2>Reserve your experience.</h2>
            <p>Continue down to services, treatments, and booking.</p>
          </article>
        </div>

        <div className={`scroll-animation-hint ${loaded && hintVisible ? 'visible' : ''}`}>
          <span>Scroll down to move right</span>
          <div className="scroll-hint-arrow">
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
              <path d="M10 2 L10 24 M3 18 L10 25 L17 18" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   MARQUEE
   ───────────────────────────────────────────── */
function MarqueeStrip() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const animations = track.getAnimations()
    if (!animations.length) return
    const anim = animations[0]

    let targetRate = 1
    let currentRate = 1
    let lastScrollY = window.scrollY

    const onScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      // Accelerate based on scroll speed and direction
      targetRate = 1 + delta * 0.02
      
      clearTimeout(window.marqueeTimeout)
      window.marqueeTimeout = setTimeout(() => {
        targetRate = 1
      }, 100)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    let frame
    const loop = () => {
      currentRate += (targetRate - currentRate) * 0.1
      anim.playbackRate = currentRate
      frame = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const quadrupled = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
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
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'))
          }
        })
      },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="services" id="services" ref={ref}>
      <div className="container">
        <div className="services-header">
          <span className="section-label reveal">Our Services</span>
          <h2 className="section-title reveal reveal-delay-1">Curated for <em>Your Radiance</em></h2>
          <div className="olive-divider reveal reveal-delay-2">
            <div className="olive-divider-line"></div>
            <Icon.OliveBranch />
            <div className="olive-divider-line right"></div>
          </div>
          <p className="reveal reveal-delay-2" style={{ maxWidth: '520px', margin: '16px auto 0', fontSize: '15px', fontWeight: 300, color: 'var(--charcoal-light)', lineHeight: 1.8 }}>
            Each service is a carefully crafted ritual, designed to restore balance and illuminate your natural beauty.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <TiltCard key={i} className={`service-card reveal reveal-delay-${Math.min(i + 1, 5)}`}>
              <div className="service-icon" aria-hidden="true">{s.icon}</div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <span className="service-price">{s.price}</span>
            </TiltCard>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <button className="btn btn-gold reveal" onClick={onBook}>
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
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'))
          }
        })
      },
      { threshold: 0.12 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          {/* Image side */}
          <div className="about-image-frame reveal">
            <img src="/about_salon.png" alt="Olivia, founder of Olivia Beauty Salon" />
            <div className="about-badge">
              <div className="about-badge-number">12+</div>
              <div className="about-badge-text">Years of Excellence</div>
            </div>
          </div>

          {/* Content side */}
          <div className="about-content">
            <span className="section-label reveal">Our Story</span>
            <h2 className="section-title reveal reveal-delay-1">
              Beauty Rooted in<br /><em>Passion & Artistry</em>
            </h2>
            <div className="gold-line left reveal reveal-delay-2" style={{ marginBottom: '32px', marginTop: '16px', animation: 'none' }}></div>

            <blockquote className="about-quote reveal reveal-delay-2">
              "True beauty is not about perfection — it is about confidence, care, and the feeling of being absolutely yourself."
            </blockquote>

            <p className="about-body reveal reveal-delay-3">
              Founded with a vision to create a haven of luxury and refinement, Olivia Beauty Salon has been a trusted destination for discerning clients seeking the very finest in beauty services. We believe that beauty is a deeply personal journey, and our expert team is dedicated to celebrating your unique essence.
            </p>
            <p className="about-body reveal reveal-delay-3">
              Every detail of our salon — from the hand-selected botanical products to our highly trained specialists — reflects our unwavering commitment to excellence. Inspired by the olive branch, a timeless symbol of beauty and vitality, we nourish not just your appearance, but your spirit.
            </p>

            <div className="about-stats reveal reveal-delay-4">
              <div>
                <div className="about-stat-number">3,200+</div>
                <div className="about-stat-label">Happy Clients</div>
              </div>
              <div>
                <div className="about-stat-number">18</div>
                <div className="about-stat-label">Expert Artists</div>
              </div>
              <div>
                <div className="about-stat-number">40+</div>
                <div className="about-stat-label">Awards Won</div>
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
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'))
          }
        })
      },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="testimonials" ref={ref}>
      <div className="container">
        <div className="testimonials-header">
          <span className="section-label reveal">Testimonials</span>
          <h2 className="section-title reveal reveal-delay-1">Voices of <em>Our Clients</em></h2>
          <div className="olive-divider reveal reveal-delay-2">
            <div className="olive-divider-line"></div>
            <Icon.OliveBranch />
            <div className="olive-divider-line right"></div>
          </div>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className={`testimonial-card reveal reveal-delay-${i + 1}`}>
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
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'))
          }
        })
      },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="gallery-strip" id="gallery" ref={ref}>
      <div className="container">
        <div className="gallery-header">
          <span className="section-label reveal">Our Work</span>
          <h2 className="section-title reveal reveal-delay-1">A Glimpse of <em>Elegance</em></h2>
          <div className="olive-divider reveal reveal-delay-2">
            <div className="olive-divider-line"></div>
            <Icon.OliveBranch />
            <div className="olive-divider-line right"></div>
          </div>
        </div>

        <div className="gallery-grid reveal reveal-delay-2">
          {galleryColors.map((g, i) => (
            <div key={i} className="gallery-item">
              <div className="gallery-item-inner" style={{ background: g.bg }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '22px',
                  fontStyle: 'italic',
                  color: 'rgba(44,44,44,0.6)',
                  textAlign: 'center',
                  padding: '20px',
                  textShadow: '0 1px 3px rgba(255,255,255,0.4)'
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
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'))
          }
        })
      },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="booking-banner" ref={ref}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <p className="booking-banner-label reveal">Reserve Your Experience</p>
        <h2 className="booking-banner-title reveal reveal-delay-1">
          Elevate Your Beauty<br />
          <em>Begin Your Journey Today</em>
        </h2>
        <div className="booking-banner-divider reveal reveal-delay-2">
          <span className="divider-leaf"><Icon.OliveBranch size={22} /></span>
        </div>
        <p className="booking-banner-sub reveal reveal-delay-2">
          Secure your appointment with our expert team. We look forward to welcoming you into our world of refined luxury.
        </p>
        <button className="btn btn-gold reveal reveal-delay-3" onClick={onBook}>
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
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 90, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <img src="/olivia.png" alt="Olivia Beauty Salon" />
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
                { icon: <Icon.MapPin />, text: 'Chakkarakkal, Kannur\nKerala, India' },
                { icon: <Icon.Phone />, text: '+91 9747095076' },
                { icon: <Icon.Mail />, text: 'hello@oliviabeauty.com' },
              ].map((c, i) => (
                <div key={i} className="footer-contact-item">
                  <span className="footer-contact-icon">{c.icon}</span>
                  <span className="footer-contact-text" style={{ whiteSpace: 'pre-line' }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <div className="footer-col-title">Opening Hours</div>
            <div className="footer-hours">
              {[
                { day: 'Monday – Friday', time: '9:00 am – 8:00 pm' },
                { day: 'Saturday', time: '9:00 am – 7:00 pm' },
                { day: 'Sunday', time: '10:00 am – 6:00 pm' },
              ].map((h, i) => (
                <div key={i} className="hours-row">
                  <span className="hours-day">{h.day}</span>
                  <span className="hours-time">{h.time}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '28px' }}>
              <button className="btn btn-gold" onClick={onBook} style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: '11px' }}>
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
   BOOKING MODAL
   ───────────────────────────────────────────── */
function BookingModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', time: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.service) e.service = 'Please select a service'
    if (!form.date) e.date = 'Please choose a date'
    setErrors(e)
    return !Object.keys(e).length
  }

  const onChange = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }))
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: '' }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSuccess(true) }, 1800)
  }

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-heading">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close booking form">
          <Icon.X />
        </button>

        {!success ? (
          <>
            <div className="modal-header">
              <img src="/olivia.png" alt="" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px' }} />
              <h2 className="modal-title" id="modal-heading">Book an Appointment</h2>
              <p className="modal-sub">Reserve your luxurious experience at Olivia Beauty Salon</p>
              <div className="olive-divider" style={{ marginTop: '20px', marginBottom: '0' }}>
                <div className="olive-divider-line"></div>
                <Icon.OliveBranch size={20} />
                <div className="olive-divider-line right"></div>
              </div>
            </div>

            <form onSubmit={onSubmit} noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="book-name">Full Name *</label>
                  <input
                    id="book-name"
                    className="form-control"
                    placeholder="Your name"
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
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span style={{ fontSize: 12, color: '#c0392b', marginTop: 4, display: 'block' }}>{errors.email}</span>}
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="book-phone">Phone Number</label>
                  <input
                    id="book-phone"
                    type="tel"
                    className="form-control"
                    placeholder="+91 9747095076"
                    value={form.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="book-service">Service *</label>
                  <select
                    id="book-service"
                    className="form-control"
                    value={form.service}
                    onChange={(e) => onChange('service', e.target.value)}
                    aria-invalid={!!errors.service}
                  >
                    <option value="">What kind of services do you need?</option>
                    <option value="Multiple / Custom Services">Multiple / Custom Services (Describe below)</option>
                    {services.map((s, i) => (
                      <option key={i} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                  {errors.service && <span style={{ fontSize: 12, color: '#c0392b', marginTop: 4, display: 'block' }}>{errors.service}</span>}
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="book-date">Preferred Date *</label>
                  <input
                    id="book-date"
                    type="date"
                    className="form-control"
                    value={form.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => onChange('date', e.target.value)}
                    aria-invalid={!!errors.date}
                  />
                  {errors.date && <span style={{ fontSize: 12, color: '#c0392b', marginTop: 4, display: 'block' }}>{errors.date}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="book-time">Preferred Time</label>
                  <select
                    id="book-time"
                    className="form-control"
                    value={form.time}
                    onChange={(e) => onChange('time', e.target.value)}
                  >
                    <option value="">Select time...</option>
                    {['9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="book-notes">Message to Owner / Special Requests</label>
                <textarea
                  id="book-notes"
                  className="form-control"
                  rows={3}
                  placeholder="Interact with the owner directly: tell us what you need, any special requests, or ask a question..."
                  value={form.notes}
                  onChange={(e) => onChange('notes', e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 38 38" stroke="currentColor" style={{ animation: 'rotateSlow 1s linear infinite' }}>
                      <g fill="none"><g strokeWidth="3"><circle strokeOpacity=".25" cx="19" cy="19" r="18"/><path d="M37 19c0-9.94-8.06-18-18-18"/></g></g>
                    </svg>
                    Confirming...
                  </>
                ) : (
                  <>Confirm Appointment <Icon.ArrowRight /></>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <div className="modal-success-icon">
              <Icon.Check />
            </div>
            <h3>Appointment Requested!</h3>
            <div className="olive-divider" style={{ margin: '16px 0' }}>
              <div className="olive-divider-line"></div>
              <Icon.OliveBranch size={18} />
              <div className="olive-divider-line right"></div>
            </div>
            <p>
              Thank you, <strong>{form.name}</strong>. Your appointment request for <strong>{form.service}</strong> on <strong>{form.date}{form.time ? ` at ${form.time}` : ''}</strong> has been received. We will confirm your booking via email within 24 hours.
            </p>
            <button className="btn btn-gold" style={{ marginTop: '28px' }} onClick={onClose}>
              Close
            </button>
          </div>
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
  const [bookingOpen, setBookingOpen] = useState(false)

  const handlePreloaderDone = () => setLoading(false)

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = (loading || bookingOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loading, bookingOpen])

  return (
    <>
      <CustomCursor />
      {loading && <Preloader onComplete={handlePreloaderDone} />}
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}

      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <Header onBook={() => setBookingOpen(true)} />
        <main>
          <Hero onBook={() => setBookingOpen(true)} />
          <ScrollAnimation />
          <MarqueeStrip />
          <Services onBook={() => setBookingOpen(true)} />
          <About />
          <Testimonials />
          <Gallery />
          <BookingBanner onBook={() => setBookingOpen(true)} />
        </main>
        <Footer onBook={() => setBookingOpen(true)} />
      </div>
    </>
  )
}
