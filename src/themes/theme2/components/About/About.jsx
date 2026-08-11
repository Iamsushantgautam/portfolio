import React from 'react';
import portfolioData from '../../../../data/portfolio.json';
import { User, MapPin, Briefcase, Award, Rocket, Download, ArrowUpRight, GraduationCap, CheckCircle2, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import cvFile from '../../../../assets/SushantCV.pdf';
import './About.css';

export default function About() {
  const { personalInfo, about } = portfolioData;

  if (!about) return null;

  const iconMap = [Briefcase, Award, GraduationCap, Rocket];

  return (
    <section id="about" className="theme2-section theme2-about-section">
      <div className="theme2-container">
        <div className="theme2-about-card-box">
          <div className="theme2-about-grid">
            {/* Left Content Column directly from portfolio.json */}
            <div className="theme2-about-content">
              <span className="theme2-about-eyebrow">ABOUT ME</span>

              <p className="theme2-about-text">{about.background}</p>
              {about.experience && (
                <p className="theme2-about-text" style={{ marginTop: '-12px', fontWeight: 600, color: 'var(--theme2-text)' }}>
                  {about.experience}
                </p>
              )}

              {/* Social Media Links from portfolio.json */}
              <div className="theme2-about-socials">
                <span className="theme2-socials-label">FIND ME ON:</span>
                <div className="theme2-socials-links">
                  {personalInfo?.github && (
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme2-about-social-icon github"
                      title="GitHub"
                      aria-label="GitHub"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {personalInfo?.linkedin && (
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme2-about-social-icon linkedin"
                      title="LinkedIn"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {personalInfo?.instagram && (
                    <a
                      href={personalInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme2-about-social-icon instagram"
                      title="Instagram"
                      aria-label="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                  {personalInfo?.email && (
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="theme2-about-social-icon email"
                      title="Email"
                      aria-label="Email"
                    >
                      <Mail size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column Specialties Grid */}
            <div className="theme2-about-metrics">
              {/* Key Specialties Pills in Right Column */}
              {about.specialties && about.specialties.length > 0 && (
                <div className="theme2-about-specialties-box">
                  <span className="theme2-specialties-label">KEY SPECIALTIES & EXPERTISE</span>
                  <div className="theme2-about-specialties">
                    {about.specialties.map((spec, idx) => (
                      <span key={idx} className="theme2-specialty-badge">
                        <CheckCircle2 size={13} className="theme2-badge-icon" />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
