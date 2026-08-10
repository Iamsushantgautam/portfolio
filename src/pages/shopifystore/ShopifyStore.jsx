import { useEffect, useState, useRef, Suspense, lazy } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, ShoppingBag, Globe, Lock, Copy, Check, Moon, Sun } from 'lucide-react'
import Lenis from 'lenis'
import { getActiveThemeKey } from '../../themes'
import portfolioData from '../../data/portfolio.json'
import storeTaansh from '../../assets/shopify-store/store1-full.png'
import storeWelthCo from '../../assets/shopify-store/store2-full.png'
import storeSkinora from '../../assets/shopify-store/store3-full.png'
import storeZynr from '../../assets/shopify-store/store4-full.png'

import './ShopifyStore.css'
import './MainTheme.css'
import './Theme1.css'

const ShopifyProjects = lazy(() => import('../../themes/main-theme/components/ShopifyProjects'))

const imgMap = {
  '/assets/shopify-store/store1-full.png': storeTaansh,
  '/assets/shopify-store/store2-full.png': storeWelthCo,
  '/assets/shopify-store/store3-full.png': storeSkinora,
  '/assets/shopify-store/store4-full.png': storeZynr,
}

const projects = (portfolioData.shopifyProjects || []).filter(
  p => p && p.active !== false && p.status !== 'off' && p.status !== 'false'
)

const STACK_ITEMS = [
  '🛍️ Shopify Plus', '💧 Liquid Templating', '🎨 Custom Themes',
  '⚡ Performance Optimized', '📱 Mobile First', '🧩 Metafields & Metaobjects',
  '🔌 App Integrations', '🎯 Conversion Focused', '🌐 Headless Commerce',
]

export default function ShopifyStorePage() {
  const [activeTheme] = useState(getActiveThemeKey())
  const isTheme1 = activeTheme.includes('theme1')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('selected-theme')
    if (saved !== null) return saved === 'dark'
    return false
  })

  useEffect(() => {
    if (isTheme1) {
      if (isDark) {
        document.body.classList.add('dark-theme')
      } else {
        document.body.classList.remove('dark-theme')
      }
      localStorage.setItem('selected-theme', isDark ? 'dark' : 'light')
    }
  }, [isDark, isTheme1])

  const toggleTheme = () => setIsDark(prev => !prev)

  // Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchMultiplier: 1.2,
      wheelMultiplier: 1.0,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className={`shopify-page ${isTheme1 ? 'shopify-theme1' : 'shopify-main-theme'}`}>
      {/* Navbar */}
      <nav className={`sp-navbar ${scrolled ? 'sp-scrolled' : ''}`}>
        <div className="sp-nav-inner">
          <button className="sp-back-btn" onClick={() => window.location.href = '/'}>
            <ArrowLeft size={16} strokeWidth={2.5} />
            Back
          </button>

          <a href="/" className="sp-nav-logo">
            {portfolioData.personalInfo.logotext || 'SHK Gautam'}
            <span className="logo-dot">.</span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            {isTheme1 && (
              <button
                className="change-theme"
                onClick={toggleTheme}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme"
                style={{ background: 'none', border: 'none', padding: '0.25rem', cursor: 'pointer' }}
              >
                {isDark ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
              </button>
            )}

            <a href="mailto:iamsushantgautam@gmail.com" className="sp-hire-btn">
              Hire Me <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-hero-content">
          <div className="sp-hero-eyebrow">
            <ShoppingBag size={14} /> E-Commerce Showcase
          </div>

          <h1 className="sp-hero-title">
            SHOPIFY <span className="sp-hero-title-accent">STORES</span>
          </h1>

          <p className="sp-hero-desc">
            Crafting conversion-focused, visually stunning Shopify storefronts with custom Liquid templating, performance optimization, and brand-aligned design systems.
          </p>

          <div className="sp-hero-stats">
            {[
              { value: '4+', label: 'Live Stores' },
              { value: '100%', label: 'Custom Themes' },
              { value: '3x', label: 'Conversion Lift' },
              { value: '4.9★', label: 'Client Rating' },
            ].map(s => (
              <div key={s.label} className="sp-stat">
                <span className="sp-stat-value">{s.value}</span>
                <span className="sp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
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

      {/* Projects Grid */}
      <section className="sp-projects-container">
        {isTheme1 ? (
          <div className="t1sp-projects-grid">
            {projects.map((project, index) => (
              <ProjectCardTheme1 key={project.id || index} project={project} index={index} />
            ))}
          </div>
        ) : (
          <Suspense fallback={<div className="section-loader" />}>
            <ShopifyProjects />
          </Suspense>
        )}
      </section>

      {/* Footer */}
      <footer className="sp-footer">
        <div className="sp-footer-inner">
          <h2 className="sp-footer-tagline">Need a <span>Shopify</span> Store?</h2>
          <p className="sp-footer-sub">Let's build something remarkable together. Custom themes, integrations & beyond.</p>
          <a href="mailto:iamsushantgautam@gmail.com" className="sp-footer-cta">
            <Globe size={18} /> Let's Work Together <ArrowRight size={18} />
          </a>
          <p className="sp-footer-copy">© 2026 {portfolioData.personalInfo.name} · All Rights Reserved</p>
        </div>
      </footer>
    </div>
  )
}

function ProjectCardTheme1({ project, index }) {
  const [copied, setCopied] = useState(false)
  const isEven = index % 2 !== 0

  const handleCopy = () => {
    if (project.password) {
      navigator.clipboard.writeText(project.password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      className={`t1sp-project-card ${isEven ? 't1sp-project-card--reverse' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="t1sp-img-box">
        <img
          src={imgMap[project.img] || project.img}
          alt={project.subtitle}
          className="t1sp-img"
          loading="lazy"
        />
      </div>

      <div className="t1sp-data">
        <span className="t1sp-number">{String(project.number || index + 1).padStart(2, '0')}</span>
        <h2 className="t1sp-title">{project.subtitle}</h2>
        <span className="t1sp-subtitle">{project.category}</span>
        <p className="t1sp-description">{project.description}</p>

        {project.password && (
          <button className="t1sp-password-box" onClick={handleCopy}>
            <Lock size={13} />
            Password: {project.password}
            {copied ? <Check size={13} color="#22c55e" /> : <Copy size={13} />}
          </button>
        )}

        <div className="t1sp-actions">
          <a href={project.live} target="_blank" rel="noreferrer" className="t1sp-preview-btn">
            <Globe size={15} /> Live Preview
          </a>
        </div>
      </div>
    </motion.div>
  )
}
