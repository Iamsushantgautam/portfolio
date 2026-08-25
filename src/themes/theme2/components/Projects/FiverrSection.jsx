import React from 'react'
import portfolioData from '../../../../data/portfolio.json'
import { ExternalLink, Layout, Zap, RefreshCw, ShoppingBag } from 'lucide-react'
import fiverrImg from '../../../../assets/fiverr/shopify-fiverr.png'
import './Projects.css'

const iconMap = {
  Layout,
  Zap,
  RefreshCw,
  ShoppingBag,
}

export default function FiverrSection() {
  const fiverrData = portfolioData.fiverr || {}
  const features = fiverrData.features || portfolioData.fiverrFeatures || []
  const descriptions = fiverrData.descriptions || []

  return (
    <section id="fiverr" className="theme2-section theme2-fiverr-section">
      <div className="theme2-container">
        <div className="theme2-fiverr-card-box">
          {/* Section Header */}
          <div className="theme2-fiverr-header">
            <div>
              <span className="theme2-section-eyebrow">{fiverrData.badge || 'FEATURED SERVICE'}</span>
              <h2 className="theme2-section-title" style={{ marginBottom: 0 }}>
                {fiverrData.title || 'My Fiverr Profile'}
              </h2>
            </div>
            <div className="theme2-shopify-badge">
              <ShoppingBag size={14} />
              <span>{fiverrData.category || 'Shopify Expert'}</span>
            </div>
          </div>

          {/* Fiverr Content Grid */}
          <div className="theme2-fiverr-grid">
            {/* Image Preview Column */}
            <div className="theme2-fiverr-img-col">
              <div className="theme2-fiverr-img-wrapper">
                <img
                  src={fiverrImg}
                  alt="Shopify Fiverr Gig"
                  className="theme2-fiverr-img"
                  loading="eager"
                />
              </div>
            </div>

            {/* Information Column */}
            <div className="theme2-fiverr-info-col">
              <h3 className="theme2-fiverr-subtitle">{fiverrData.subtitle}</h3>

              {descriptions.slice(0, 2).map((desc, idx) => (
                <p key={idx} className="theme2-fiverr-desc">
                  {desc}
                </p>
              ))}

              {/* Feature Badges */}
              <div className="theme2-fiverr-features">
                {features.map((feature, idx) => {
                  const IconComp = iconMap[feature.icon] || Zap
                  return (
                    <div key={idx} className="theme2-fiverr-feature-pill">
                      <IconComp size={16} className="theme2-fiverr-feature-icon" />
                      <span>{feature.text}</span>
                    </div>
                  )
                })}
              </div>

              {descriptions.slice(2).map((desc, idx) => (
                <p key={idx} className="theme2-fiverr-desc">
                  {desc}
                </p>
              ))}

              <div className="theme2-fiverr-actions">
                <a
                  href={fiverrData.link || 'https://www.fiverr.com/sushantkumardev'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme2-btn theme2-btn-primary"
                >
                  {fiverrData.buttonText || 'Hire Me on Fiverr'} <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
