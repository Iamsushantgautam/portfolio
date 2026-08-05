import { useEffect, useState, useRef, Suspense, lazy } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ShoppingBag, Palette, Code2, Zap, Globe } from 'lucide-react'
import Lenis from 'lenis'
import FloatingBg from '../components/FloatingBg'
import '../styles/index.css'
import '../styles/App.css'
import '../styles/ShopifyStore.css'

const ShopifyProjects = lazy(() => import('../components/ShopifyProjects'))

// ── Stack marquee items ──
const STACK_ITEMS = [
  { icon: '🛍️', label: 'Shopify Plus' },
  { icon: '💧', label: 'Liquid Templating' },
  { icon: '🎨', label: 'Custom Themes' },
  { icon: '⚡', label: 'Performance Optimized' },
  { icon: '📱', label: 'Mobile First' },
  { icon: '🧩', label: 'Metafields & Metaobjects' },
  { icon: '🔌', label: 'App Integrations' },
  { icon: '🎯', label: 'Conversion Focused' },
  { icon: '🌐', label: 'Headless Commerce' },
  { icon: '💫', label: 'Section Customization' },
]

// ── Page Navbar ──
function ShopifyPageNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goBack = () => {
    window.history.back()
  }

  return (
    <motion.nav
      className={`sp-navbar ${scrolled ? 'sp-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="sp-nav-inner">
        <button className="sp-back-btn" onClick={goBack}>
          <ArrowLeft size={16} strokeWidth={3} />
          Back
        </button>

        <a href="/" className="sp-nav-logo">
          SUSHANT<span className="logo-dot">.</span>
        </a>

        <a href="mailto:iamsushantgautam@gmail.com" className="sp-back-btn" style={{ borderColor: '#000' }}>
          Hire Me
          <ArrowRight size={16} strokeWidth={3} />
        </a>
      </div>
    </motion.nav>
  )
}

// ── Hero Section ──
function ShopifyHero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section className="sp-hero" ref={heroRef}>
      {/* Marquee Background Text */}
      <div className="sp-hero-marquee-wrap">
        <div className="sp-hero-marquee sp-m1">
          {[...Array(4)].map((_, i) => (
            <span key={i}>SHOPIFY&nbsp;&nbsp;•&nbsp;&nbsp;E-COMMERCE&nbsp;&nbsp;•&nbsp;&nbsp;LIQUID&nbsp;&nbsp;•&nbsp;&nbsp;</span>
          ))}
        </div>
        <div className="sp-hero-marquee sp-m2">
          {[...Array(4)].map((_, i) => (
            <span key={i}>STORES&nbsp;&nbsp;•&nbsp;&nbsp;THEMES&nbsp;&nbsp;•&nbsp;&nbsp;HEADLESS&nbsp;&nbsp;•&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <motion.div className="sp-hero-content" style={{ y: titleY, opacity: titleOpacity }}>
        <motion.div
          className="sp-hero-eyebrow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="sp-hero-eyebrow-dot" />
          E-Commerce Portfolio
          <span className="sp-hero-eyebrow-dot" />
        </motion.div>

        <motion.h1
          className="sp-hero-title"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          SHOPIFY
          <span className="sp-hero-title-sub">STORES</span>
        </motion.h1>

        <motion.p
          className="sp-hero-desc"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Crafting conversion-focused, visually stunning Shopify storefronts
          with custom Liquid templating, performance optimization, and brand-aligned design systems.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="sp-hero-stats"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { value: '4+', label: 'Live Stores' },
            { value: '100%', label: 'Custom Themes' },
            { value: '3x', label: 'Conversion Lift' },
            { value: '4.9★', label: 'Client Rating' },
          ].map((stat) => (
            <div className="sp-stat" key={stat.label}>
              <span className="sp-stat-value">{stat.value}</span>
              <span className="sp-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="sp-hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="sp-hero-scroll-text">Scroll</span>
        <div className="sp-hero-scroll-line" />
      </motion.div>
    </section>
  )
}

// ── Tech Stack Marquee ──
function TechStackMarquee() {
  const doubled = [...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS]

  return (
    <div className="sp-stack-section">
      <div className="sp-stack-marquee-wrapper">
        {doubled.map((item, i) => (
          <div key={i} className="sp-stack-chip">
            <span className="sp-stack-chip-icon">{item.icon}</span>
            {item.label}
            {i < doubled.length - 1 && <span className="sp-stack-chip-divider">✦</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page Footer ──
function ShopifyPageFooter() {
  return (
    <footer className="sp-footer">
      <div className="sp-footer-bg-text">SHOPIFY</div>

      <div className="sp-footer-inner">
        <motion.h2
          className="sp-footer-tagline"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Need a <span>Shopify</span> Store?
        </motion.h2>

        <motion.p
          className="sp-footer-sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Let's build something remarkable together. Custom themes, integrations & beyond.
        </motion.p>

        <motion.a
          href="mailto:iamsushantgautam@gmail.com"
          className="sp-footer-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <Globe size={20} />
          Let's Work Together
          <ArrowRight size={20} />
        </motion.a>

        <div className="sp-footer-bottom">
          <span className="sp-footer-copy">© 2026 Sushant Gautam · All Rights Reserved</span>
          <span className="sp-footer-made">Made with <span>♥</span> & Liquid</span>
        </div>
      </div>
    </footer>
  )
}

// ── Main ShopifyStore Page ──
function ShopifyStore() {
  // Setup Lenis smooth scroll for this page
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,             // Buttery smooth interpolation for desktop wheel events
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,      // Smooth scrolling for mouse wheel
      syncTouch: true,        // Sync scroll position on mobile/tablet touch screens
      syncTouchLerp: 0.08,    // Linear interpolation for touch scrolling
      touchMultiplier: 1.2,   // Speed modifier for touch events
      wheelMultiplier: 1.0,   // Speed modifier for wheel events
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="shopify-page">
      <FloatingBg />
      <ShopifyPageNavbar />

      <ShopifyHero />
      <TechStackMarquee />

      <div className="sp-projects-wrapper">
        <Suspense fallback={<div className="section-loader" />}>
          <ShopifyProjects />
        </Suspense>
      </div>

      <ShopifyPageFooter />
    </div>
  )
}

export default ShopifyStore
