import React from 'react';
import portfolioData from '../../../../data/portfolio.json';
import { Github, Linkedin, Instagram, Heart, ExternalLink, Download, Mail } from 'lucide-react';
import cvFile from '../../../../assets/SushantCV.pdf';
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

          {/* Col 1: Brand Info & Socials */}
          <div className="theme2-footer-brand-col">
            <a href="/" className="theme2-logo" onClick={(e) => handleLinkClick(e, { name: 'Home', href: '#hero' })}>
              <div className="theme2-logo-text">
                <span className="theme2-logo-name">{personalInfo?.logotext || personalInfo?.name || 'SUSHANT GAUTAM'}</span>
                <span className="theme2-logo-title">{personalInfo?.role || 'FULL STACK DEVELOPER'}</span>
              </div>
            </a>

            <p className="theme2-footer-col-desc">{personalInfo?.description}</p>

            <div className="theme2-footer-socials">
              {socialLinks.map((social, idx) => {
                const IconComp = social.Icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme2-footer-social-btn"
                    title={social.name}
                  >
                    <IconComp size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="theme2-footer-title">NAVIGATION</h4>
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

          {/* Col 3: Explore & Resources */}
          <div>
            <h4 className="theme2-footer-title">EXPLORE & RESOURCES</h4>
            <ul className="theme2-footer-links">
              <li>
                <a
                  href="/portfolios"
                  className="theme2-footer-link"
                  onClick={(e) => handleLinkClick(e, { href: '/portfolios', isPage: true })}
                >
                  <ExternalLink size={14} /> Portfolio Designs Page
                </a>
              </li>
              <li>
                <a
                  href={cvFile || '/assets/SushantCV.pdf'}
                  download="SushantCV.pdf"
                  className="theme2-footer-link"
                >
                  <Download size={14} /> Download Resume (CV)
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${personalInfo?.email || 'iamsushantgautam@gmail.com'}`}
                  className="theme2-footer-link"
                >
                  <Mail size={14} /> Hire & Get in Touch
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
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
