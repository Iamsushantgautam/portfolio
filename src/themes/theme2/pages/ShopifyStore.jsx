import React, { useEffect } from 'react';
import portfolioData from '../../../data/portfolio.json';
import Header from '../components/Header/Header';
import ShopifyStores from '../components/Projects/ShopifyStores';
import CTA from '../components/CTA/CTA';
import Footer from '../components/Footer/Footer';
import { ArrowLeft, ShoppingBag, Zap, Code2, Layers, Cpu, CheckCircle2, ExternalLink } from 'lucide-react';
import '../styles/theme2.css';
import './ShopifyStore.css';

export default function Theme2ShopifyStorePage() {
  const { shopifyProjects } = portfolioData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const capabilities = [
    {
      icon: Code2,
      title: 'Custom Liquid Templating',
      desc: 'Developing bespoke Shopify themes from scratch using Liquid, HTML5, CSS3, and JavaScript.'
    },
    {
      icon: Zap,
      title: 'Page Speed & CRO',
      desc: 'Optimizing store load times, asset minification, core web vitals, and conversion rate architecture.'
    },
    {
      icon: Layers,
      title: 'Metafields & Metaobjects',
      desc: 'Building custom data schemas, dynamic section blocks, and advanced product options.'
    },
    {
      icon: Cpu,
      title: 'App Integration & APIs',
      desc: 'Connecting third-party apps, custom checkout scripts, subscription models, and analytics.'
    }
  ];

  return (
    <div className="theme2 theme2-shopify-page">
      <Header />

      <main style={{ paddingTop: '100px' }}>
        {/* Hero Section */}
        <section className="theme2-section theme2-sp-hero-section">
          <div className="theme2-container">
            <div className="theme2-sp-hero-box">
              <button
                className="theme2-btn theme2-btn-secondary theme2-sp-back-btn"
                onClick={() => window.location.href = '/'}
              >
                <ArrowLeft size={16} /> Back to Portfolio
              </button>

              <div className="theme2-sp-hero-eyebrow">
                <ShoppingBag size={15} /> E-COMMERCE SHOWCASE
              </div>

              <h1 className="theme2-sp-hero-title">
                Shopify Stores & Custom <span className="theme2-sp-accent">Liquid Themes</span>
              </h1>

              <p className="theme2-sp-hero-desc">
                Crafting high-converting, mobile-first Shopify storefronts with custom Liquid templating, custom section schemas, performance optimization, and brand-aligned design systems.
              </p>

              {/* Stats Row */}
              <div className="theme2-sp-stats-grid">
                {[
                  { value: '4+', label: 'Live Storefronts' },
                  { value: '100%', label: 'Custom Liquid Themes' },
                  { value: '3x', label: 'Conversion Lift' },
                  { value: '4.9★', label: 'Client Satisfaction' },
                ].map((s, idx) => (
                  <div key={idx} className="theme2-sp-stat-card">
                    <span className="theme2-sp-stat-value">{s.value}</span>
                    <span className="theme2-sp-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Shopify Stores */}
        <ShopifyStores />

        {/* E-Commerce Capabilities */}
        <section className="theme2-section theme2-sp-capabilities-section">
          <div className="theme2-container">
            <div className="theme2-sp-capabilities-box">
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <span className="theme2-section-eyebrow">TECHNICAL EXCELLENCE</span>
                <h2 className="theme2-section-title">Shopify Development Services</h2>
              </div>

              <div className="theme2-sp-capabilities-grid">
                {capabilities.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="theme2-sp-cap-card">
                      <div className="theme2-sp-cap-icon-box">
                        <Icon size={22} />
                      </div>
                      <h3 className="theme2-sp-cap-title">{item.title}</h3>
                      <p className="theme2-sp-cap-desc">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
