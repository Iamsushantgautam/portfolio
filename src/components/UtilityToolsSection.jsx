import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Chrome, Zap, ShieldCheck, BarChart3, Database } from 'lucide-react'
import '../styles/ProjectsList.css'

import extensionMockup from '../assets/utility-tools/shopify-scraper.png'

const EXTENSION_DATA = {
  number: '08',
  category: 'Chrome Extension',
  title: 'Shopify Product Scraper',
  subtitle: 'Powerful Data Extraction Utility',
  period: 'April 2024',
  points: [
    'Developed a Chrome extension to automate extraction of Shopify product data for bulk processing',
    'Scraped product details including titles, prices, images, and variants using DOM parsing techniques',
    'Implemented Shopify store detection and collection-based filtering for targeted data extraction',
    'Built deep scanning functionality and exported data into Shopify-ready CSV format for bulk import'
  ],
  features: [
    { icon: <Zap size={18} />, label: 'Auto-detection' },
    { icon: <Database size={18} />, label: 'Deep Scanning' },
    { icon: <BarChart3 size={18} />, label: 'Store Insights' },
    { icon: <ShieldCheck size={18} />, label: 'Manifest V3' }
  ],
  tech: 'JavaScript, Chrome Extensions API (Manifest V3), HTML, CSS',
  github: 'https://github.com/Iamsushantgautam/Chrome-extension-Shopify-Product-Scraper',
  img: extensionMockup
}

function UtilityToolsSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const { scrollYProgress: contentScroll } = useScroll({
    target: contentRef,
    offset: ["0 1.2", "0.8 1"]
  })

  // Large background text movement
  const xLeft = useTransform(scrollYProgress, [0, 1], [-200, 200])

  // Content animations
  const textX = useTransform(contentScroll, [0, 1], [-80, 0])
  const imageY = useTransform(contentScroll, [0, 1], [150, 0])

  // Header animations
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["0 1.2", "1 1"]
  })
  const headerY = useTransform(headerScroll, [0, 1], [80, 0])
  const headerOpacity = useTransform(headerScroll, [0, 1], [0, 1])

  return (
    <section className="projects-list-section chrome-section" ref={sectionRef}>
      {/* Giant Background Text */}
      <div className="plist-bg-text-container">
        <motion.span className="plist-bg-text" style={{ x: xLeft }}>
          UTILITY TOOLS // BROWSER UTILS // DATA SCRAPER // AUTOMATION // MANIFEST V3 // TOOLING //
        </motion.span>
      </div>

      <div className="plist-container">
        <motion.div
          ref={headerRef}
          className="plist-section-header"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <span className="plist-eyebrow">Productivity Toolkit</span>
          <h1 className="plist-section-title">Utility <span className="plist-title-accent">Tools</span></h1>
        </motion.div>

        <motion.div
          ref={contentRef}
          className="plist-item"
        >
          {/* Background Decor Number */}
          <motion.div className="plist-item-bg-decor">
            {EXTENSION_DATA.number}
          </motion.div>

          <motion.div className="plist-content" style={{ x: textX }}>
            <div className="plist-number-wrap">
              <span>{EXTENSION_DATA.number}</span>
            </div>
            <h2 className="plist-category">{EXTENSION_DATA.category}</h2>
            <div className="plist-subtitle-row">
              <h3 className="plist-subtitle">{EXTENSION_DATA.title}</h3>
              {/* <span className="plist-period">{EXTENSION_DATA.period}</span> */}
            </div>
            <ul className="plist-points">
              {EXTENSION_DATA.points.map((point, i) => (
                <li key={i} className="plist-point">{point}</li>
              ))}
            </ul>

            {/* <div className="plist-tech">
              <strong>Tools used:</strong> {EXTENSION_DATA.tech}
            </div> */}

            <div className="chrome-feature-grid">
              {EXTENSION_DATA.features.map((feature, i) => (
                <div key={i} className="chrome-feature-item">
                  {feature.icon}
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>

            <div className="plist-btn-group">
              <a href={EXTENSION_DATA.github} target="_blank" rel="noreferrer" className="plist-btn github">
                <Github size={18} /> View Code
              </a>
              {/* <button className="plist-btn live" disabled style={{ opacity: 0.7, cursor: 'not-allowed', color: '#666' }}>
                <Chrome size={18} /> Chrome Store
              </button> */}
            </div>
          </motion.div>

          <div className="plist-image-wrap">
            <motion.div
              className="plist-img-frame"
              style={{
                y: imageY,
                borderRadius: '24px',
                border: '8px solid #000',
                boxShadow: '20px 20px 0px #000',
                overflow: 'hidden',
                background: '#000'
              }}
            >
              <img
                src={EXTENSION_DATA.img}
                alt={EXTENSION_DATA.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default UtilityToolsSection
