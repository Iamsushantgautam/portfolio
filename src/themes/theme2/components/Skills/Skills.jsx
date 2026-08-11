import React, { useState } from 'react';
import portfolioData from '../../../../data/portfolio.json';
import {
  SiReact,
  SiLaravel,
  SiPhp,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiShopify,
  SiGit,
  SiGithub,
  SiPostman,
  SiCanva,
  SiOpenai,
  SiPython,
  SiBootstrap,
  SiJsonwebtokens,
  SiAuth0,
  SiGmail,
  SiPostgresql,
  SiLinux,
} from 'react-icons/si';
import { Code2, CheckCircle2 } from 'lucide-react';
import './Skills.css';

const siIconMap = {
  jsIcon: SiJavascript,
  reactIcon: SiReact,
  nodeIcon: SiNodedotjs,
  SiHtml5: SiHtml5,
  SiCss: SiCss,
  SiCss3: SiCss,
  SiTailwindcss: SiTailwindcss,
  SiBootstrap: SiBootstrap,
  SiExpress: SiExpress,
  SiPhp: SiPhp,
  SiLaravel: SiLaravel,
  SiPython: SiPython,
  SiMysql: SiMysql,
  SiMongodb: SiMongodb,
  SiJsonwebtokens: SiJsonwebtokens,
  SiAuth0: SiAuth0,
  SiGmail: SiGmail,
  SiLeetcode: Code2,
  SiPostgresql: SiPostgresql,
  SiLinux: SiLinux,
  SiShopify: SiShopify,
  SiGit: SiGit,
  SiGithub: SiGithub,
  SiPostman: SiPostman,
  SiCanva: SiCanva,
  SiOpenai: SiOpenai,
};

export default function Skills() {
  const { skills } = portfolioData;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const categories = skills || [];
  const currentCategory = categories[activeCategoryIndex] || categories[0];

  const defaultProgress = [
    { name: 'Laravel & PHP Development', percentage: 90 },
    { name: 'React.js & Frontend Engineering', percentage: 88 },
    { name: 'Shopify Store Customization & Liquid', percentage: 95 },
    { name: 'Node.js, Express & MongoDB', percentage: 82 },
    { name: 'RESTful API & Database Architecture', percentage: 88 },
  ];

  return (
    <section id="skills" className="theme2-section">
      <div className="theme2-container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="theme2-section-eyebrow">TECH STACK & CAPABILITIES</span>
          <h2 className="theme2-section-title">Tools & Technologies</h2>
        </div>

        {/* Skill Category Tabs */}
        <div className="theme2-skills-categories" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`theme2-btn ${activeCategoryIndex === idx ? 'theme2-btn-primary' : 'theme2-btn-secondary'}`}
              style={{ padding: '8px 16px', fontSize: '0.8rem', textTransform: 'uppercase' }}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="theme2-skills-grid">
          {/* Left Column Expertise Progress Bars */}
          <div className="theme2-skills-left">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: '#1e293b' }}>
              Proficiency Breakdown
            </h3>

            <div className="theme2-progress-list">
              {defaultProgress.map((skill, idx) => (
                <div key={idx} className="theme2-progress-item">
                  <div className="theme2-progress-header">
                    <span className="theme2-progress-name">{skill.name}</span>
                    <span className="theme2-progress-percentage">{skill.percentage}%</span>
                  </div>
                  <div className="theme2-progress-track">
                    <div
                      className="theme2-progress-fill"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Tech Grid for Active Category */}
          <div className="theme2-skills-right">
            <div className="theme2-tech-grid">
              {(currentCategory?.tools || []).map((tech, idx) => {
                const IconComponent = siIconMap[tech.icon] || CheckCircle2;
                const iconColor = tech.color || '#8B5CF6';

                return (
                  <div key={idx} className="theme2-tech-card">
                    <div className="theme2-tech-icon" style={{ color: iconColor }}>
                      <IconComponent size={24} />
                    </div>
                    <span className="theme2-tech-name">{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

