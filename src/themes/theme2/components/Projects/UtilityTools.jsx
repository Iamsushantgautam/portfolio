import React from 'react';
import portfolioData from '../../../../data/portfolio.json';
import { ExternalLink, Github, CheckCircle2, Zap, Database, BarChart3, ShieldCheck } from 'lucide-react';
import './Projects.css';

// Static image import for instant pre-cached loading
import witscraperImg from '../../../../assets/utility-tools/witcraper.png';

const featureIconMap = {
  Zap: Zap,
  Database: Database,
  BarChart3: BarChart3,
  ShieldCheck: ShieldCheck,
};

export default function UtilityTools() {
  const { utilityTools } = portfolioData;

  if (!utilityTools || utilityTools.active === false || utilityTools.status === 'off') {
    return null;
  }

  const techList = utilityTools.tech ? utilityTools.tech.split(',').map((t) => t.trim()) : [];

  return (
    <section id="utility" className="theme2-section theme2-utility-section">
      <div className="theme2-container">
        <div className="theme2-utility-card-box">
          <div className="theme2-utility-grid">
            {/* Left Content */}
            <div className="theme2-utility-content">
              <span className="theme2-utility-eyebrow">
                {utilityTools.category || 'CHROME EXTENSION'}
              </span>

              <h2 className="theme2-section-title">{utilityTools.title}</h2>
              <h3 className="theme2-utility-subtitle">{utilityTools.subtitle}</h3>

              {/* Bullet Points */}
              {utilityTools.points && utilityTools.points.length > 0 && (
                <div className="theme2-utility-points">
                  {utilityTools.points.map((pt, idx) => (
                    <div key={idx} className="theme2-utility-point">
                      <CheckCircle2 size={16} className="theme2-point-icon" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Features Badges */}
              {utilityTools.features && utilityTools.features.length > 0 && (
                <div className="theme2-utility-features">
                  {utilityTools.features.map((feat, idx) => {
                    const IconComp = featureIconMap[feat.icon] || Zap;
                    return (
                      <div key={idx} className="theme2-utility-feature-badge">
                        <IconComp size={14} className="theme2-feature-icon" />
                        <span>{feat.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tech Stack Pills */}
              {techList.length > 0 && (
                <div className="theme2-project-tags" style={{ marginBottom: '24px' }}>
                  {techList.map((tag, idx) => (
                    <span key={idx} className="theme2-project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="theme2-utility-actions">
                {utilityTools.live && (
                  <a
                    href={utilityTools.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme2-btn theme2-btn-primary"
                  >
                    LIVE DEMO <ExternalLink size={16} />
                  </a>
                )}
                {utilityTools.github && (
                  <a
                    href={utilityTools.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme2-btn theme2-btn-secondary"
                  >
                    GITHUB REPO <Github size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Right Graphic Preview */}
            <div className="theme2-utility-preview">
              <img
                src={witscraperImg}
                alt={utilityTools.title}
                className="theme2-utility-img"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://placehold.co/600x380/f3eeff/8b5cf6?text=Shopify+Product+Scraper';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
