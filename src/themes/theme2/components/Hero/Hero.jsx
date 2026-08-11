import React from 'react';
import portfolioData from '../../../../data/portfolio.json';
import { ArrowUpRight, Download, Cpu, Activity } from 'lucide-react';
import mypic3 from '../../../../assets/mypic3.png';
import cvFile from '../../../../assets/SushantCV.pdf';
import './Hero.css';

export default function Hero() {
  const { personalInfo } = portfolioData;

  return (
    <section id="hero" className="theme2-hero">
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
            <a
              href={cvFile || '/assets/SushantCV.pdf'}
              download="Sushant_Kumar_Gautam_CV.pdf"
              className="theme2-btn theme2-btn-secondary"
            >
              DOWNLOAD CV <Download size={16} />
            </a>
          </div>
        </div>

        {/* Right Column Profile Image with Futuristic Elements */}
        <div className="theme2-hero-graphic">
          <div className="theme2-hero-ring"></div>

          <div className="theme2-hero-avatar-wrapper">
            <img
              src={mypic3}
              alt={personalInfo?.name || 'Sushant Gautam'}
              className="theme2-hero-img"
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

