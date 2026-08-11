import React, { useState } from 'react';
import portfolioData from '../../../../data/portfolio.json';
import { Mail, Phone, MapPin, Send, ArrowLeft, CheckCircle2, Copy, Check } from 'lucide-react';
import './CTA.css';

export default function CTA() {
  const { personalInfo } = portfolioData;
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = personalInfo?.email || 'iamsushantgautam@gmail.com';
  const phone = personalInfo?.phone || '+91-6393958548';

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setShowForm(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="theme2-section">
      <div className="theme2-container">
        <div className="theme2-cta-card">
          {/* Left Column Content */}
          <div className="theme2-cta-content">
            <span className="theme2-section-eyebrow">LET'S CONNECT</span>
            <h2 className="theme2-cta-title">Have a project in mind?</h2>
            <p className="theme2-cta-desc">
              Whether you need a full-stack Laravel/MERN application, custom Shopify store development, or RESTful API solutions, I'm always ready to collaborate!
            </p>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="theme2-btn theme2-btn-primary"
              >
                SAY HELLO <Send size={16} />
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="theme2-btn theme2-btn-secondary"
              >
                <ArrowLeft size={16} /> VIEW CONTACT INFO
              </button>
            )}
          </div>

          {/* Right Column: Contact Info OR Send Form */}
          <div className="theme2-cta-right-box">
            {!showForm ? (
              <div className="theme2-cta-contact-list">
                <div className="theme2-contact-item">
                  <div className="theme2-contact-icon">
                    <Mail size={20} />
                  </div>
                  <div className="theme2-contact-details">
                    <span className="theme2-contact-label">Email</span>
                    <a href={`mailto:${email}`} className="theme2-contact-value">
                      {email}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className={`theme2-copy-btn ${copiedEmail ? 'copied' : ''}`}
                    title={copiedEmail ? 'Copied!' : 'Copy Email Address'}
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="theme2-contact-item">
                  <div className="theme2-contact-icon">
                    <Phone size={20} />
                  </div>
                  <div className="theme2-contact-details">
                    <span className="theme2-contact-label">Phone</span>
                    <a href={`tel:${phone}`} className="theme2-contact-value">
                      {phone}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className={`theme2-copy-btn ${copiedPhone ? 'copied' : ''}`}
                    title={copiedPhone ? 'Copied!' : 'Copy Phone Number'}
                    aria-label="Copy Phone"
                  >
                    {copiedPhone ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="theme2-contact-item">
                  <div className="theme2-contact-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="theme2-contact-details">
                    <span className="theme2-contact-label">Location</span>
                    <span className="theme2-contact-value">Lucknow, India</span>
                  </div>
                </div>
              </div>
            ) : submitted ? (
              <div className="theme2-form-success">
                <CheckCircle2 size={42} className="theme2-success-icon" />
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you shortly!</p>
                <button onClick={handleReset} className="theme2-btn theme2-btn-secondary" style={{ marginTop: '12px' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="theme2-contact-form" onSubmit={handleSubmit}>
                <div className="theme2-form-group">
                  <label className="theme2-form-label">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="theme2-form-input"
                  />
                </div>

                <div className="theme2-form-group">
                  <label className="theme2-form-label">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="theme2-form-input"
                  />
                </div>

                <div className="theme2-form-group">
                  <label className="theme2-form-label">Your Message</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="How can I help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="theme2-form-input theme2-form-textarea"
                  ></textarea>
                </div>

                <button type="submit" className="theme2-btn theme2-btn-primary" style={{ width: '100%' }}>
                  SUBMIT MESSAGE <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Decorative Paper Plane Graphic SVG */}
          <svg className="theme2-cta-paperplane" viewBox="0 0 200 200" fill="none">
            <path
              d="M10 100 L180 20 L110 180 L80 120 L10 100 Z M80 120 L180 20"
              stroke="#8B5CF6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="rgba(139, 92, 246, 0.08)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

