import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Eye, Zap, Sun, Moon } from 'lucide-react'
import { getActiveThemeKey } from '../../themes'
import portfolioData from '../../data/portfolio.json'
import theme1Img from '../../assets/themes/theme2.png'
import mainThemeImg from '../../assets/themes/theme1.png'
import './Portfolios.css'
import './MainTheme.css'
import './Theme1.css'

const THEMES_DATA = [
  {
    id: 'main-theme',
    name: 'Neo-Brutalist & Pop Art',
    tagline: 'Bold, high-contrast, electric colors & smooth inertia scroll',
    badge: 'POP ART',
    image: mainThemeImg,
    bgGradient: 'linear-gradient(135deg, #E8D94B 0%, #FF4500 50%, #8A2BE2 100%)',
    colors: ['#E8D94B', '#8A2BE2', '#FF4500', '#00D1FF', '#000000'],
    description: 'A striking neo-brutalist pop art design system with vivid color blocks, 4px solid borders, sticker badges, interactive browser frames, and buttery Lenis smooth scrolling.',
    features: [
      'Bold Pop-Art Typography & High Contrast Borders',
      'Smooth Inertia Scroll driven by Lenis Engine',
      'Interactive 3D Tilt Browser & Shopify Mockups',
      'Dynamic Marquee Animations & Badge Elements',
    ]
  },
  {
    id: 'theme1',
    name: 'Minimalist HSL & Clean',
    tagline: 'Sleek, professional, dark & light mode supported',
    badge: 'MINIMAL',
    image: theme1Img,
    bgGradient: 'linear-gradient(135deg, #6366f1 0%, #1e1b4b 50%, #0f172a 100%)',
    colors: ['#6366f1', '#1e1b4b', '#f8fafc', '#0f172a'],
    description: 'A clean, modern portfolio theme with Poppins typography, soft rounded cards, tabbed qualification timelines, interactive grid filters, and a seamless Dark/Light mode toggle.',
    features: [
      'Instant Dark & Light Mode Toggle',
      'Clean Single-Page HSL Color Architecture',
      'Interactive Work & Education Timeline Tabs',
      'Responsive Grid Layout & Vector Iconography',
    ]
  }
]

export default function PortfoliosPage() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('selected-theme')
    if (saved !== null) return saved === 'dark'
    return false
  })

  const activeTheme = getActiveThemeKey()
  const isTheme1 = activeTheme.includes('theme1')

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

  const handlePreviewTheme = (themeId) => {
    sessionStorage.setItem('preview-theme', themeId)
    window.open(`/?theme=${themeId}`, '_blank')
  }

  return (
    <div className={`portfolios-page ${isTheme1 ? 'portfolios-theme1' : 'portfolios-main-theme'}`}>
      {/* Top Navbar */}
      <nav className="portfolios-nav">
        <div className="portfolios-nav-inner">
          <button className="portfolios-back-btn" onClick={() => window.location.href = '/'}>
            <ArrowLeft size={14} strokeWidth={2.5} />
            Back to Portfolio
          </button>

          <a href="/" className="portfolios-nav-logo">
            {portfolioData.personalInfo.logotext || portfolioData.personalInfo.name}
            <span className="logo-dot">.</span>
          </a>

          {isTheme1 && (
            <button
              className="change-theme portfolios-theme-toggle"
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
              style={{ background: 'none', border: 'none', padding: '0.25rem', cursor: 'pointer' }}
            >
              {isDark ? <Sun size={20} strokeWidth={2} /> : <Moon size={20} strokeWidth={2} />}
            </button>
          )}
        </div>
      </nav>

      {/* Main Container */}
      <main className="portfolios-container">
        {/* Header Hero */}
        <header className="portfolios-header">
          <motion.div
            className="portfolios-hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={14} />
            PORTFOLIO DESIGNS & THEMES
          </motion.div>

          <motion.h1
            className="portfolios-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            EXPLORE <span className="portfolios-title-accent">PORTFOLIOS</span>
          </motion.h1>

          <motion.p
            className="portfolios-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Switch between different portfolio designs in real-time. Choose your preferred aesthetic below.
          </motion.p>
        </header>

        {/* Themes Grid */}
        <div className="portfolios-grid">
          {THEMES_DATA.map((theme, index) => {
            return (
              <motion.div
                key={theme.id}
                className="portfolio-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 * index }}
              >
                {/* Header Banner */}
                <div className="portfolio-card-banner" style={{ background: !theme.image ? theme.bgGradient : undefined }}>
                  {theme.image && (
                    <div className="portfolio-card-img-wrap">
                      <img src={theme.image} alt={theme.name} className="portfolio-card-img" />
                      <div className="portfolio-card-img-overlay" />
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="portfolio-card-body">
                  {/* Badges Header Row */}
                  <div className="portfolio-card-header-badges">
                    <span className="portfolio-card-badge">{theme.badge}</span>
                  </div>

                  <h2 className="portfolio-name">{theme.name}</h2>
                  <p className="portfolio-tagline">{theme.tagline}</p>
                  <p className="portfolio-desc">{theme.description}</p>

                  {/* Features List */}
                  <ul className="portfolio-features-list">
                    {theme.features.map((feat, i) => (
                      <li key={i}>
                        <Zap size={14} className="portfolio-feat-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="portfolio-actions">
                    <button
                      className="portfolio-select-btn"
                      onClick={() => handlePreviewTheme(theme.id)}
                    >
                      <Eye size={16} /> Preview Theme
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="portfolios-footer">
        <p>© 2026 {portfolioData.personalInfo.name} · All themes dynamic and fully functional</p>
      </footer>
    </div>
  )
}
