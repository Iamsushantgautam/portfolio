import React from 'react';
import portfolioData from '../../../../data/portfolio.json';
import { ExternalLink, ShoppingBag, Lock } from 'lucide-react';
import './Projects.css';

// Static image imports for instant pre-cached loading
import store1Img from '../../../../assets/shopify-store/store1-full.png';
import store2Img from '../../../../assets/shopify-store/store2-full.png';
import store3Img from '../../../../assets/shopify-store/store3-full.png';
import store4Img from '../../../../assets/shopify-store/store4-full.png';

const shopifyStoreImages = [store1Img, store2Img, store3Img, store4Img];

export default function ShopifyStores() {
  const { shopifyProjects } = portfolioData;
  const isProjectActive = (p) => p && p.active !== false && p.status !== 'off';

  const stores = (shopifyProjects || []).filter(isProjectActive).map((p, idx) => ({
    id: `shopify-${idx}`,
    title: p.category ? `${p.category} Store` : 'Shopify Store',
    category: p.category || 'Shopify E-Commerce',
    subtitle: p.subtitle,
    description: p.description,
    tech: ['Shopify', 'Liquid', 'Theme Customization', 'CRO & SEO'],
    live: p.live,
    password: p.password,
    img: shopifyStoreImages[idx % shopifyStoreImages.length] || p.img,
  }));

  if (!stores.length) return null;

  return (
    <section id="shopify" className="theme2-section theme2-shopify-section">
      <div className="theme2-container">
        <div className="theme2-shopify-card-box">
          {/* Header */}
          <div className="theme2-shopify-header">
            <div>
              <span className="theme2-shopify-eyebrow">E-COMMERCE ECOSYSTEM</span>
              <h2 className="theme2-section-title">Shopify Stores & Custom Themes</h2>
            </div>
            <div className="theme2-shopify-badge">
              <ShoppingBag size={16} /> 4 LIVE STORES
            </div>
          </div>

          {/* Grid */}
          <div className="theme2-shopify-grid">
            {stores.map((store) => (
              <div key={store.id} className="theme2-shopify-card">
                <div className="theme2-shopify-img-wrapper">
                  <img
                    src={store.img}
                    alt={store.title}
                    className="theme2-shopify-img"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/600x380/f3eeff/8b5cf6?text=' + encodeURIComponent(store.title);
                    }}
                  />
                  {store.password && (
                    <div className="theme2-shopify-pass-badge">
                      <Lock size={12} /> Password: <strong>{store.password}</strong>
                    </div>
                  )}
                </div>

                <div className="theme2-shopify-body">
                  <div className="theme2-shopify-meta">
                    <span className="theme2-shopify-cat">{store.category}</span>
                  </div>

                  <h3 className="theme2-shopify-title">{store.subtitle || store.title}</h3>
                  <p className="theme2-shopify-desc">{store.description}</p>

                  <div className="theme2-project-tags" style={{ marginTop: 'auto' }}>
                    {store.tech.map((tag, idx) => (
                      <span key={idx} className="theme2-project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="theme2-project-actions" style={{ marginTop: '16px' }}>
                    {store.live && (
                      <a
                        href={store.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="theme2-project-btn theme2-project-btn-live"
                        style={{ width: '100%' }}
                      >
                        <ExternalLink size={14} />
                        <span>Visit Live Store</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
