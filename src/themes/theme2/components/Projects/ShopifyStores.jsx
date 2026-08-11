import React, { useState } from 'react';
import portfolioData from '../../../../data/portfolio.json';
import { ExternalLink, Lock, Copy, Check, ShoppingBag, Globe } from 'lucide-react';
import './Projects.css';

// Static image imports for instant pre-cached loading
import store1Img from '../../../../assets/shopify-store/store1-full.png';
import store2Img from '../../../../assets/shopify-store/store2-full.png';
import store3Img from '../../../../assets/shopify-store/store3-full.png';
import store4Img from '../../../../assets/shopify-store/store4-full.png';

const imgMap = {
  '/assets/shopify-store/store1-full.png': store1Img,
  '/assets/shopify-store/store2-full.png': store2Img,
  '/assets/shopify-store/store3-full.png': store3Img,
  '/assets/shopify-store/store4-full.png': store4Img,
};

export default function ShopifyStores() {
  const { shopifyProjects } = portfolioData;
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!shopifyProjects || !Array.isArray(shopifyProjects) || shopifyProjects.length === 0) {
    return null;
  }

  const activeStores = shopifyProjects.filter(
    (store) => store && store.active !== false && store.status !== 'off'
  );

  if (activeStores.length === 0) {
    return null;
  }

  const handleCopyPassword = (password, index) => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <section id="shopify-stores" className="theme2-section theme2-shopify-section">
      <div className="theme2-container">
        <div className="theme2-shopify-card-box">
          {/* Section Header */}
          <div className="theme2-shopify-header">
            <div>
              <span className="theme2-shopify-eyebrow">E-COMMERCE ECOSYSTEMS</span>
              <h2 className="theme2-section-title" style={{ marginBottom: 0 }}>
                Shopify Stores
              </h2>
            </div>
            <div className="theme2-shopify-badge">
              <ShoppingBag size={14} />
              <span>{activeStores.length} Live Stores</span>
            </div>
          </div>

          {/* Stores Grid */}
          <div className="theme2-shopify-grid">
            {activeStores.map((store, idx) => {
              const imageSrc = imgMap[store.img] || store.img;
              const isCopied = copiedIndex === idx;

              return (
                <div key={store.number || idx} className="theme2-shopify-card">
                  {/* Image Preview */}
                  <div className="theme2-shopify-img-wrapper">
                    <img
                      src={imageSrc}
                      alt={store.subtitle || store.category}
                      className="theme2-shopify-img"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x380/f3eeff/8b5cf6?text=${encodeURIComponent(
                          store.category || 'Shopify Store'
                        )}`;
                      }}
                    />

                    {store.password && (
                      <button
                        className="theme2-shopify-pass-badge"
                        onClick={() => handleCopyPassword(store.password, idx)}
                        title="Click to copy store password"
                        type="button"
                        style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
                      >
                        <Lock size={12} />
                        <span>Pass: <strong>{store.password}</strong></span>
                        {isCopied ? (
                          <Check size={12} color="#4ade80" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="theme2-shopify-body">
                    <div className="theme2-shopify-meta">
                      <span className="theme2-shopify-cat">{store.category}</span>
                      {store.live && (
                        <a
                          href={store.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme2-project-header-btn"
                        >
                          Visit Store <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    <h3 className="theme2-shopify-title">{store.subtitle}</h3>

                    <p className="theme2-shopify-desc">{store.description}</p>

                    {/* Bottom Action Buttons */}
                    <div className="theme2-project-actions">
                      {store.live && (
                        <a
                          href={store.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme2-project-btn theme2-project-btn-live"
                        >
                          <Globe size={15} /> LIVE PREVIEW
                        </a>
                      )}
                      {store.password && (
                        <button
                          type="button"
                          onClick={() => handleCopyPassword(store.password, idx)}
                          className="theme2-project-btn theme2-project-btn-code"
                        >
                          {isCopied ? (
                            <>
                              <Check size={15} color="#16a34a" /> COPIED!
                            </>
                          ) : (
                            <>
                              <Lock size={15} /> COPY PASSWORD
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

