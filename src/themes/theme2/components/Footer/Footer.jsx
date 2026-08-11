import React from 'react';
import portfolioData from '../../../../data/portfolio.json';
import { Github, Linkedin, Instagram, Heart, ExternalLink } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const { personalInfo } = portfolioData;

  const isHomePage = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '/index.html');

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#stats' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  const pageLinks = [
    { name: 'Shopify Stores Page', href: '/shopifystore', isPage: true },
    { name: 'Portfolio Designs Page', href: '/portfolios', isPage: true },
  ];

  const handleLinkClick = (e, link) => {
    const { name, href, isPage } = typeof link === 'object' ? link : { name: link, href: arguments[2] };

    if (isPage || href?.startsWith('/')) {
      e.preventDefault();
      window.location.href = href;
      return;
    }

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

  const socialLinks = [
    { name: 'GitHub', href: personalInfo?.github || 'https://github.com/Iamsushantgautam', Icon: Github },
    { name: 'LinkedIn', href: personalInfo?.linkedin || 'https://www.linkedin.com/in/sushantgautam2507', Icon: Linkedin },
    { name: 'Instagram', href: personalInfo?.instagram || 'https://www.instagram.com/its_sushant01/', Icon: Instagram },
  ];

  return (
    <footer className="theme2-footer">
      <div className="theme2-container">
        <div className="theme2-footer-grid">
          {/* Col 1: Brand */}
          <div>
            <a href="/" className="theme2-logo" onClick={(e) => handleLinkClick(e, { name: 'Home', href: '#hero' })}>
              <div className="theme2-logo-text">
                <span className="theme2-logo-name">{personalInfo?.logotext || personalInfo?.name || 'SUSHANT GAUTAM'}</span>
                <span className="theme2-logo-title">{personalInfo?.role || 'FULL STACK DEVELOPER'}</span>
              </div>
            </a>
            <p className="theme2-footer-col-desc">{personalInfo?.description}</p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="theme2-footer-title">QUICK LINKS</h4>
            <ul className="theme2-footer-links">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="theme2-footer-link"
                    onClick={(e) => handleLinkClick(e, link)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Dedicated Pages & Showcase Section */}
          <div>
            <h4 className="theme2-footer-title">SHOWCASE & PAGES</h4>
            <ul className="theme2-footer-links">
              {pageLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="theme2-footer-link"
                    onClick={(e) => handleLinkClick(e, link)}
                  >
                    <ExternalLink size={14} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Follow Me */}
          <div>
            <h4 className="theme2-footer-title">FOLLOW ME</h4>
            <ul className="theme2-footer-links">
              {socialLinks.map((social, idx) => {
                const IconComp = social.Icon;
                return (
                  <li key={idx}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme2-footer-link"
                    >
                      <IconComp size={16} /> {social.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="theme2-footer-bottom">
          <span>© {new Date().getFullYear()} {personalInfo?.name || 'Sushant Gautam'}. All Rights Reserved.</span>
          <span>
            Designed with <Heart size={14} className="theme2-heart" display="inline" /> for great user experiences.
          </span>
        </div>
      </div>
    </footer>
  );
}
