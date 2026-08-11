import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ShoppingBag, Globe } from 'lucide-react'
import Lenis from 'lenis'
import { motion } from 'framer-motion'
import portfolioData from '../../../data/portfolio.json'
import ShopifyProjects from '../components/ShopifyProjects'
import '../styles/ShopifyStore.css'
import './MainThemeShopifyStore.css'

const STACK_ITEMS = [
  '🛍️ Shopify Plus', '💧 Liquid Templating', '🎨 Custom Themes',
  '⚡ Performance Optimized', '📱 Mobile First', '🧩 Metafields & Metaobjects',
  '🔌 App Integrations', '🎯 Conversion Focused', '🌐 Headless Commerce',
]

const STATS = [
  { value: '4+',   label: 'Live Stores'     },
  { value: '100%', label: 'Custom Themes'   },
  { value: '3x',   label: 'Conversion Lift' },
  { value: '4.9★', label: 'Client Rating'   },
]

export default function MainThemeShopifyStorePage() {
  const [scrolled, setScrolled] = useState(false)

  // Navbar scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lenis smooth scroll — matches main-theme feel
  useEffect(() => {
    let lenis
    let reqId
    try {
      lenis = new Lenis({
        lerp: 0.08,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
      })
      const raf = (time) => {
        if (lenis) {
          lenis.raf(time)
          reqId = requestAnimationFrame(raf)
        }
      }
      reqId = requestAnimationFrame(raf)
    } catch (err) {
      console.warn('Lenis scroll error:', err)
    }
    return () => {
      if (reqId) cancelAnimationFrame(reqId)
      try { if (lenis) lenis.destroy() } catch (_) {}
    }
  }, [])

  const { personalInfo } = portfolioData

  return (
    <div className="shopify-page shopify-main-theme">

      {/* ── Navbar ── */}
      <nav className={`sp-navbar ${scrolled ? 'sp-scrolled' : ''}`}>
        <div className="sp-nav-inner">
          <button className="sp-back-btn" onClick={() => window.location.href = '/'}>
            <ArrowLeft size={16} strokeWidth={2.5} /> Back
          </button>

          <a href="/" className="sp-nav-logo">
            {personalInfo.logotext || personalInfo.name}
            <span className="logo-dot">.</span>
          </a>

          <a href={`mailto:${personalInfo.email}`} className="sp-hire-btn">
            Hire Me <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="sp-hero">
        <div className="sp-hero-content">
          <motion.div
            className="sp-hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag size={14} /> E-Commerce Showcase
          </motion.div>

          <motion.h1
            className="sp-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            SHOPIFY <span className="sp-hero-title-accent">STORES</span>
          </motion.h1>

          <motion.p
            className="sp-hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Crafting conversion-focused, visually stunning Shopify storefronts with custom Liquid
            templating, performance optimization, and brand-aligned design systems.
          </motion.p>

          <motion.div
            className="sp-hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {STATS.map(s => (
              <div key={s.label} className="sp-stat">
                <span className="sp-stat-value">{s.value}</span>
                <span className="sp-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Tech Stack Marquee ── */}
      <div className="sp-stack-marquee">
        <div className="sp-stack-track">
          {[...STACK_ITEMS, ...STACK_ITEMS, ...STACK_ITEMS].map((item, i) => (
            <span key={i} className="sp-stack-chip">
              {item}
              <span className="sp-stack-chip-divider">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Projects — uses main-theme's ShopifyProjects component ── */}
      <section className="sp-projects-container">
        <ShopifyProjects />
      </section>

      {/* ── Footer ── */}
      <footer className="sp-footer">
        <div className="sp-footer-inner">
          <motion.h2
            className="sp-footer-tagline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Need a <span>Shopify</span> Store?
          </motion.h2>
          <p className="sp-footer-sub">
            Let's build something remarkable together. Custom themes, integrations & beyond.
          </p>
          <a href={`mailto:${personalInfo.email}`} className="sp-footer-cta">
            <Globe size={18} /> Let's Work Together <ArrowRight size={18} />
          </a>
          <p className="sp-footer-copy">
            © 2026 {personalInfo.name} · All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  )
}
