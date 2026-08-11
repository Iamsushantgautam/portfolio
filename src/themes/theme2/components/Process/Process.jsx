import React, { useState } from 'react';
import portfolioData from '../../../../data/portfolio.json';
import { Briefcase, GraduationCap, Award, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import './Process.css';

export default function Process() {
  const { experiences, education, trainings } = portfolioData;
  const [activeTab, setActiveTab] = useState('experience');

  const expList = experiences || [];
  const eduList = education || [];
  const trainList = trainings || [];

  return (
    <section id="process" className="theme2-section theme2-process">
      <div className="theme2-container">
        <div className="theme2-process-card-box">
          {/* Section Header */}
          <div className="theme2-process-header">
            <span className="theme2-process-eyebrow">BACKGROUND & JOURNEY</span>
            <h2 className="theme2-section-title">Experience & Education</h2>
          </div>

          {/* Tab Switcher */}
          <div className="theme2-process-tabs">
            <button
              onClick={() => setActiveTab('experience')}
              className={`theme2-process-tab ${activeTab === 'experience' ? 'active' : ''}`}
            >
              <Briefcase size={16} /> Work Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`theme2-process-tab ${activeTab === 'education' ? 'active' : ''}`}
            >
              <GraduationCap size={16} /> Education
            </button>
            <button
              onClick={() => setActiveTab('trainings')}
              className={`theme2-process-tab ${activeTab === 'trainings' ? 'active' : ''}`}
            >
              <Award size={16} /> Certifications
            </button>
          </div>

          {/* Content List */}
          <div className="theme2-timeline-list">
            {activeTab === 'experience' &&
              expList.map((item, idx) => (
                <div key={idx} className="theme2-timeline-card">
                  <div className="theme2-timeline-badge">{item.number || `0${idx + 1}`}</div>
                  <div className="theme2-timeline-body">
                    <div className="theme2-timeline-top">
                      <div>
                        <h3 className="theme2-timeline-title">{item.title}</h3>
                        <div className="theme2-timeline-org">
                          <Building2 size={15} /> {item.company}
                        </div>
                      </div>
                      <div className="theme2-timeline-date">
                        <Calendar size={14} /> {item.period}
                      </div>
                    </div>

                    {item.description && (
                      <p className="theme2-timeline-desc">{item.description}</p>
                    )}

                    {item.summary && Array.isArray(item.summary) && (
                      <div className="theme2-timeline-points">
                        {item.summary.map((point, pIdx) => (
                          <div key={pIdx} className="theme2-timeline-point">
                            <CheckCircle2 size={16} className="theme2-point-icon" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

            {activeTab === 'education' &&
              eduList.map((item, idx) => (
                <div key={idx} className="theme2-timeline-card">
                  <div className="theme2-timeline-badge">{`0${idx + 1}`}</div>
                  <div className="theme2-timeline-body">
                    <div className="theme2-timeline-top">
                      <div>
                        <h3 className="theme2-timeline-title">{item.specialization || item.type}</h3>
                        <div className="theme2-timeline-org">
                          <Building2 size={15} /> {item.institution}
                        </div>
                      </div>
                      <div className="theme2-timeline-date">
                        <Calendar size={14} /> {item.period}
                      </div>
                    </div>

                    {item.grade && (
                      <div className="theme2-timeline-grade">
                        Grade / Score: <strong>{item.grade}</strong>
                      </div>
                    )}
                  </div>
                </div>
              ))}

            {activeTab === 'trainings' &&
              trainList.map((item, idx) => (
                <div key={idx} className="theme2-timeline-card">
                  <div className="theme2-timeline-badge">{`0${idx + 1}`}</div>
                  <div className="theme2-timeline-body">
                    <div className="theme2-timeline-top">
                      <div>
                        <h3 className="theme2-timeline-title">{item.title}</h3>
                        <div className="theme2-timeline-org">
                          <Building2 size={15} /> {item.company} ({item.location || 'Virtual'})
                        </div>
                      </div>
                      <div className="theme2-timeline-date">
                        <Calendar size={14} /> {item.period}
                      </div>
                    </div>

                    {item.summary && Array.isArray(item.summary) && (
                      <div className="theme2-timeline-points">
                        {item.summary.map((point, pIdx) => (
                          <div key={pIdx} className="theme2-timeline-point">
                            <CheckCircle2 size={16} className="theme2-point-icon" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

