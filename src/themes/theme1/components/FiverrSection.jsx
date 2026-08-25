import React from 'react'
import { Layout, Zap, RefreshCw, ShoppingBag, ExternalLink, Star, Award, CheckCircle2, ShieldCheck } from 'lucide-react'
import fiverrImg from '../../../assets/fiverr/shopify-fiverr.png'
import portfolioData from '../../../data/portfolio.json'

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
    <section className="fiverr section" id="fiverr">
      <h2 className="section__title">{fiverrData.title || 'My Fiverr Profile'}</h2>
      <span className="section__subtitle">{fiverrData.badge || 'Featured Service'}</span>

      <div className="fiverr__container container">
        <div className="fiverr__card">
          <div className="fiverr__grid">

            {/* Visual Column */}
            <div className="fiverr__visual-col">
              <div className="fiverr__img-wrapper">


                <img src={fiverrImg} alt="Shopify Fiverr Gig Showcase" className="fiverr__img" />
              </div>

              {/* Quick Stats */}
              <div className="fiverr__stats-grid">
                <div className="fiverr__stat-card">
                  <span className="fiverr__stat-number">100+</span>
                  <span className="fiverr__stat-label">Stores Built</span>
                </div>
                <div className="fiverr__stat-card">
                  <span className="fiverr__stat-number">5.0 ★</span>
                  <span className="fiverr__stat-label">Rating</span>
                </div>
                <div className="fiverr__stat-card">
                  <span className="fiverr__stat-number">100%</span>
                  <span className="fiverr__stat-label">Satisfaction</span>
                </div>
              </div>
            </div>

            {/* Data & Info Column */}
            <div className="fiverr__info-col">
              <div className="fiverr__category-wrapper">
                <span className="fiverr__status-dot"></span>
                <span className="fiverr__category">{fiverrData.category || 'Shopify Expert'}</span>
                <span className="fiverr__availability">Available for Projects</span>
              </div>

              <h3 className="fiverr__subtitle">{fiverrData.subtitle}</h3>

              <div className="fiverr__descriptions">
                {descriptions.map((desc, i) => (
                  <p className="fiverr__description" key={i}>
                    {desc}
                  </p>
                ))}
              </div>

              <div className="fiverr__features">
                {features.map((item, idx) => {
                  const IconComp = iconMap[item.icon] || CheckCircle2
                  return (
                    <div className="fiverr__feature-item" key={idx}>
                      <div className="fiverr__feature-icon-wrapper">
                        <IconComp size={16} className="fiverr__feature-icon" />
                      </div>
                      <span>{item.text}</span>
                    </div>
                  )
                })}
              </div>

              <div className="fiverr__actions">
                <a
                  href={fiverrData.link || 'https://www.fiverr.com/sushantkumardev'}
                  target="_blank"
                  rel="noreferrer"
                  className="fiverr__cta-btn"
                >
                  <span>{fiverrData.buttonText || 'Hire Me on Fiverr'}</span>
                  <ExternalLink size={18} className="fiverr__btn-icon" />
                </a>

                <div className="fiverr__trust-note">
                  <ShieldCheck size={16} className="fiverr__shield-icon" />
                  <span>Order directly with 100% buyer protection on Fiverr</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

