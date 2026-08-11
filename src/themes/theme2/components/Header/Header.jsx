import React, { useState } from 'react';
import portfolioData from '../../../../data/portfolio.json';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  const { personalInfo } = portfolioData;
  const isHomePage = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '/index.html');

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Shopify Stores', href: '#shopify' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#process' },
    { name: 'Contact', href: '#contact' }
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
            <span className="theme2-logo-title">{personalInfo?.role || 'FULL STACK DEVELOPER'}</span>
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

      {/* Mobile Menu Dropdown */}
      <div className={`theme2-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={isHomePage ? link.href : '/'}
            className="theme2-mobile-link"
            onClick={(e) => handleNavClick(e, link.name, link.href)}
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
}

