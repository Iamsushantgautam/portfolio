import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ShoppingBag, Zap, RefreshCw, Layout, ExternalLink, CheckCircle2 } from 'lucide-react'
import '../styles/FiverrSection.css'

// Using the image path provided by the user
import fiverrImg from '../assets/fiverr/shopify-fiverr.png'

const FEATURES = [
  { icon: <Layout size={20} />, text: 'Custom Shopify Design' },
  { icon: <Zap size={20} />, text: 'High-Converting Layouts' },
  { icon: <RefreshCw size={20} />, text: 'WooCommerce Migration' },
  { icon: <ShoppingBag size={20} />, text: 'Dropshipping Automation' },
]

function FiverrSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section className="projects-list-section fiverr-section" ref={containerRef}>
      {/* Giant Background Text */}
      <div className="plist-bg-text-container">
        <motion.span className="plist-bg-text" style={{ x: xLeft }}>
          FIVERR // SHOPIFY EXPERT // FREELANCE // TOP RATED // DESIGN // REDESIGN //
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
          <span className="fiverr-badge">Featured Service</span>
          <h1 className="plist-section-title">My Fiverr <span className="plist-title-accent">Profile</span></h1>
        </motion.div>

        <div className="fiverr-card-wrapper">
          <motion.div
            className="fiverr-image-container"
          >
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
            <h2 className="plist-category">Shopify Expert</h2>
            <h3 className="plist-subtitle">I will design and redesign a professional Shopify store, dropshipping store, or e-commerce website.</h3>

            <p className="plist-description">
              Looking for a high-converting, premium Shopify store? I specialize in creating storefronts that don't just look good but are optimized for sales. Whether it's a new build or a complete redesign, I bring your brand to life with modern UI/UX principles.
            </p>

            <p className="plist-description">
              With over 100+ stores built and optimized, I focus on performance, mobile-first design, and seamless user journeys. My goal is to transform your vision into a profitable online business using the best practices in e-commerce strategy.
            </p>

            <div className="fiverr-features">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="fiverr-feature-item">
                  {feature.icon}
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <p className="plist-description">
              Ready to start your dropshipping journey or scale your current brand? Let's collaborate and create something exceptional. Click below to view my full portfolio and reviews directly on Fiverr.
            </p>

            <div className="plist-btn-group">
              <a
                href="https://www.fiverr.com/sushantkumardev/design-and-redesign-a-shopify-store-dropshipping-store-or-ecommerce-website"
                target="_blank"
                rel="noreferrer"
                className="fiverr-btn"
              >
                Hire Me on Fiverr <ExternalLink size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FiverrSection
