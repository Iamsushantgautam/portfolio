import React, { useState } from 'react';
import portfolioData from '../../../../data/portfolio.json';
import { ArrowUpRight, Download, Cpu, Activity, Loader2, Check } from 'lucide-react';
import { SiLaravel, SiReact, SiShopify, SiCanva, SiMongodb, SiMysql } from 'react-icons/si';
import mypic3 from '../../../../assets/mypic3.webp';
import cvFile from '../../../../assets/SushantCV.pdf';
import './Hero.css';

export default function Hero() {
  const { personalInfo } = portfolioData;
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadCV = (e) => {
    e.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloaded(false);

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = cvFile || '/assets/SushantCV.pdf';
      link.download = 'SushantCV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
      setDownloaded(true);

      setTimeout(() => {
        setDownloaded(false);
      }, 2500);
    }, 1200);
  };

  return (
    <section id="hero" className="theme2-hero">
      {/* Background Decorative Grid & Ambient Glow Orbs */}
      <div className="theme2-hero-bg-grid" aria-hidden="true"></div>
      <div className="theme2-hero-glow-orb theme2-hero-glow-1" aria-hidden="true"></div>
      <div className="theme2-hero-glow-orb theme2-hero-glow-2" aria-hidden="true"></div>

      <div className="theme2-container theme2-hero-grid">
        {/* Left Column Text */}
        <div className="theme2-hero-content">
          <span className="theme2-section-eyebrow">{personalInfo?.role || 'FULL STACK DEVELOPER'}</span>
          <h1 className="theme2-hero-title">{personalInfo?.name || 'Sushant Gautam'}</h1>
          <h2 className="theme2-hero-subtitle">
            Building Scalable & <br />
            <span className="theme2-hero-accent-text">High-Impact Web Applications</span>
          </h2>
          <p className="theme2-hero-desc">{personalInfo?.description}</p>

          <div className="theme2-hero-buttons">
            <a href="#projects" className="theme2-btn theme2-btn-primary">
              VIEW WORK <ArrowUpRight size={18} />
            </a>
            <button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              className={`theme2-btn theme2-btn-secondary ${isDownloading ? 'theme2-btn-loading' : ''} ${downloaded ? 'theme2-btn-success' : ''}`}
              title="Download CV (PDF)"
            >
              {isDownloading ? (
                <>
                  DOWNLOADING... <Loader2 size={16} className="theme2-spin-fast" />
                </>
              ) : downloaded ? (
                <>
                  DOWNLOADED! <Check size={16} color="#10B981" />
                </>
              ) : (
                <>
                  DOWNLOAD CV <Download size={16} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column Profile Image with Floating Tech Badges & UI Cards */}
        <div className="theme2-hero-graphic">
          <div className="theme2-hero-glow-center"></div>
          <div className="theme2-hero-ring"></div>
          <div className="theme2-hero-ring-inner"></div>

          {/* Floating Tech Stack Badges */}
          <div className="theme2-float-tech-badge theme2-float-tech-laravel" title="Laravel">
            <SiLaravel color="#FF2D20" className="theme2-tech-icon-svg" />
          </div>

          <div className="theme2-float-tech-badge theme2-float-tech-react" title="React">
            <SiReact color="#61DAFB" className="theme2-tech-icon-svg theme2-spin-slow" />
          </div>

          <div className="theme2-float-tech-badge theme2-float-tech-shopify" title="Shopify">
            <SiShopify color="#96BF48" className="theme2-tech-icon-svg" />
          </div>

          <div className="theme2-float-tech-badge theme2-float-tech-canva" title="Canva">
            <SiCanva color="#00C4CC" className="theme2-tech-icon-svg" />
          </div>

          <div className="theme2-float-tech-badge theme2-float-tech-mongodb" title="MongoDB">
            <SiMongodb color="#47A248" className="theme2-tech-icon-svg" />
          </div>

          <div className="theme2-float-tech-badge theme2-float-tech-mysql" title="MySQL">
            <SiMysql color="#4479A1" className="theme2-tech-icon-svg" />
          </div>

          <div className="theme2-hero-avatar-wrapper">
            <img
              src={mypic3}
              alt={personalInfo?.name || 'Sushant Gautam'}
              className="theme2-hero-img"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          {/* Floating UI Card Top Right */}
          <div className="theme2-float-card theme2-float-card-top">
            <div className="theme2-float-card-header">
              <span>FULL STACK STACK</span>
              <Cpu size={12} color="#8B5CF6" />
            </div>
            <div className="theme2-float-card-title">{personalInfo?.role || 'Laravel, MERN & Shopify'}</div>
            <svg className="theme2-float-wave" viewBox="0 0 100 20" fill="none">
              <path d="M0 10 Q25 0 50 10 T100 10" stroke="#8B5CF6" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Floating UI Card Bottom Left */}
          <div className="theme2-float-card theme2-float-card-bottom">
            <div className="theme2-float-card-header">
              <span>SPECIALTIES</span>
              <Activity size={12} color="#8B5CF6" />
            </div>
            <div className="theme2-float-progress-list">
              <div className="theme2-float-progress-item">
                <span>LARAVEL & REACT</span>
                <span className="theme2-float-dot"></span>
              </div>
              <div className="theme2-float-progress-item">
                <span>SHOPIFY ECOSYSTEM</span>
                <span className="theme2-float-dot"></span>
              </div>
              <div className="theme2-float-progress-item">
                <span>REST API & MYSQL</span>
                <span className="theme2-float-dot"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

