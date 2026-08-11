import React, { useState } from 'react';
import portfolioData from '../../../../data/portfolio.json';
import {
  Menu,
  X,
  ArrowUpRight,
  Home,
  User,
  Briefcase,
  ShoppingBag,
  Code,
  Sparkles,
  Mail,
  ChevronRight,
  Github,
  Linkedin,
  Instagram
} from 'lucide-react';
import './Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  const { personalInfo } = portfolioData;
  const isHomePage = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '/index.html');

  const navLinks = [
    { name: 'Home', href: '#hero', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Shopify Stores', href: '#shopify', icon: ShoppingBag },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Experience', href: '#process', icon: Sparkles },
    { name: 'Contact', href: '#contact', icon: Mail }
  ];

  const handleNavClick = (e, name, href) => {
    setActiveNav(name);
    setMobileMenuOpen(false);

    if (name === 'Home' || href === '#hero') {
      if (isHomePage) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.href = '/';
      }
      return;
    }

    if (isHomePage) {
      e.preventDefault();
      const targetEl = document.querySelector(href);
      if (targetEl) {
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else {
      e.preventDefault();
      sessionStorage.setItem('scrollToSection', href);
      window.location.href = '/';
    }
  };

  return (
    <header className="theme2-header">
      <div className="theme2-header-container">
        {/* Left Logo */}
        <a href="/" className="theme2-logo" onClick={(e) => handleNavClick(e, 'Home', '#hero')}>
          <div className="theme2-logo-text">
            <span className="theme2-logo-name">{personalInfo?.logotext || personalInfo?.name || 'SUSHANT GAUTAM'}</span>
            <span className="theme2-logo-title">{personalInfo?.logoRole || 'FULL STACK DEVELOPER'}</span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav className="theme2-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={isHomePage ? link.href : '/'}
              className={`theme2-nav-link ${activeNav === link.name ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.name, link.href)}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="theme2-header-action">
          <a
            href={isHomePage ? '#contact' : '/'}
            className="theme2-btn theme2-btn-secondary theme2-talk-btn"
            onClick={(e) => handleNavClick(e, 'Contact', '#contact')}
          >
            LET'S TALK <ArrowUpRight size={16} />
          </a>

          <button
            className="theme2-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Backdrop Overlay when side drawer is open */}
      {mobileMenuOpen && (
        <div
          className="theme2-mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Side Navigation Drawer */}
      <div className={`theme2-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="theme2-drawer-top">
          <div className="theme2-logo-text">
            <span className="theme2-logo-name">{personalInfo?.logotext || personalInfo?.name || 'SUSHANT GAUTAM'}</span>
            <span className="theme2-logo-title">{personalInfo?.logoRole || 'FULL STACK DEVELOPER'}</span>
          </div>

          <button
            className="theme2-drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="theme2-mobile-menu-header">
        </div>

        <div className="theme2-mobile-nav-list">
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            const isActive = activeNav === link.name;
            return (
              <a
                key={link.name}
                href={isHomePage ? link.href : '/'}
                className={`theme2-mobile-link ${isActive ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.name, link.href)}
              >
                <div className="theme2-mobile-link-content">
                  <span className="theme2-mobile-link-icon">
                    <IconComponent size={18} />
                  </span>
                  <span className="theme2-mobile-link-name">{link.name}</span>
                </div>
                <ChevronRight size={16} className="theme2-mobile-link-arrow" />
              </a>
            );
          })}
        </div>

        {/* Drawer Footer Actions & Socials */}
        <div className="theme2-mobile-menu-footer">
          <a
            href={isHomePage ? '#contact' : '/'}
            className="theme2-btn theme2-btn-primary theme2-mobile-cta"
            onClick={(e) => handleNavClick(e, 'Contact', '#contact')}
          >
            LET'S TALK <ArrowUpRight size={18} />
          </a>

          <div className="theme2-mobile-socials">
            {personalInfo?.github && (
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="github">
                <Github size={16} />
              </a>
            )}
            {personalInfo?.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="linkedin">
                <Linkedin size={16} />
              </a>
            )}
            {personalInfo?.instagram && (
              <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="instagram">
                <Instagram size={16} />
              </a>
            )}
            {personalInfo?.email && (
              <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="email">
                <Mail size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

