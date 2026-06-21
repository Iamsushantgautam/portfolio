import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Chrome, Zap, Database, BarChart3, ShieldCheck } from 'lucide-react'
import '../styles/ProjectsList.css'
import portfolioData from '../../public/api/portfolio.json'
import extensionMockup from '../assets/utility-tools/witcraper.png'

const EXTENSION_DATA = portfolioData.utilityTools

const iconMap = {
  Zap,
  Database,
  BarChart3,
  ShieldCheck,
}

const imgMap = {
  '/assets/utility-tools/witcraper.png': extensionMockup,
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
              {EXTENSION_DATA.features.map((feature, i) => {
                const IconComponent = iconMap[feature.icon] || Zap
                return (
                  <div key={i} className="chrome-feature-item">
                    <IconComponent size={18} />
                    <span>{feature.label}</span>
                  </div>
                )
              })}
            </div>

            <div className="plist-btn-group">
              <a href={EXTENSION_DATA.github} target="_blank" rel="noreferrer" className="plist-btn github">
                <Github size={18} /> View Code
              </a>
              {EXTENSION_DATA.live && (
                <a href={EXTENSION_DATA.live} target="_blank" rel="noreferrer" className="plist-btn live">
                  <Chrome size={18} /> Preview
                </a>
              )}
            </div>
          </motion.div>

          <div className="plist-image-wrap">
            <motion.div
              className="plist-img-frame"
              style={{
                y: imageY
              }}
            >
              <img
                src={imgMap[EXTENSION_DATA.img] || EXTENSION_DATA.img}
                alt={EXTENSION_DATA.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default UtilityToolsSection
