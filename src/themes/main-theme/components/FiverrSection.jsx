import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, CheckCircle2, Layout, Zap, RefreshCw, ShoppingBag } from 'lucide-react'
import '../styles/FiverrSection.css'

// Using the image path provided by the user
import fiverrImg from '../../../assets/fiverr/shopify-fiverr.png'
import portfolioData from '../../../data/portfolio.json'

const iconMap = {
  Layout,
  Zap,
  RefreshCw,
  ShoppingBag,
}

function FiverrSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100])

  const fiverr = portfolioData.fiverr || {}
  const features = fiverr.features || portfolioData.fiverrFeatures || []
  const descriptions = fiverr.descriptions || []

  return (
    <section className="projects-list-section fiverr-section" id="fiverr" ref={containerRef}>
      {/* Giant Background Text */}
      <div className="plist-bg-text-container">
        <motion.span className="plist-bg-text" style={{ x: xLeft }}>
          {fiverr.bgText || 'FIVERR // SHOPIFY EXPERT // FREELANCE // TOP RATED // DESIGN // REDESIGN //'}
        </motion.span>
      </div>

      <div className="plist-container">
        <motion.div
          className="plist-section-header"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="fiverr-badge">{fiverr.badge || 'Featured Service'}</span>
          <h1 className="plist-section-title">
            My Fiverr <span className="plist-title-accent">{fiverr.titleAccent || 'Profile'}</span>
          </h1>
        </motion.div>

        <div className="fiverr-card-wrapper">
          <motion.div className="fiverr-image-container">
            <div className="fiverr-img-frame">
              <img src={fiverrImg} alt="Shopify Fiverr Gig" className="fiverr-img" />
            </div>
          </motion.div>

          <motion.div
            className="fiverr-info"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="plist-category">{fiverr.category || 'Shopify Expert'}</h2>
            <h3 className="plist-subtitle">{fiverr.subtitle}</h3>

            {descriptions.slice(0, 2).map((desc, idx) => (
              <p key={idx} className="plist-description">
                {desc}
              </p>
            ))}

            <div className="fiverr-features">
              {features.map((feature, idx) => {
                const IconComponent = iconMap[feature.icon] || Zap
                return (
                  <div key={idx} className="fiverr-feature-item">
                    <IconComponent size={20} />
                    <span>{feature.text}</span>
                  </div>
                )
              })}
            </div>

            {descriptions.slice(2).map((desc, idx) => (
              <p key={idx} className="plist-description">
                {desc}
              </p>
            ))}

            <div className="plist-btn-group">
              <a
                href={fiverr.link || 'https://www.fiverr.com/sushantkumardev'}
                target="_blank"
                rel="noreferrer"
                className="fiverr-btn"
              >
                {fiverr.buttonText || 'Hire Me on Fiverr'} <ExternalLink size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FiverrSection
