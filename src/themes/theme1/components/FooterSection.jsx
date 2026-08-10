import React from 'react'

export default function FooterSection({ personalInfo, scrollToSection }) {
  return (
    <footer className="footer">
      <div className="footer__bg">
        <div className="footer__container container grid">
          <div>
            <h1 className="footer__title">{personalInfo.name}</h1>
            <span className="footer__subtitle">{personalInfo.role}</span>
          </div>

          <ul className="footer__links">
            <li>
              <a href="#trainings" onClick={(e) => scrollToSection(e, '#trainings')} className="footer__link">Trainings</a>
            </li>
            <li>
              <a href="#qualification" onClick={(e) => scrollToSection(e, '#education')} className="footer__link">Qualification</a>
            </li>
            <li>
              <a href="#work" onClick={(e) => scrollToSection(e, '#work')} className="footer__link">Work</a>
            </li>
            <li>
              <a href="#portfolio" onClick={(e) => scrollToSection(e, '#portfolio')} className="footer__link">Projects</a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="footer__link">Contact-Me</a>
            </li>
            <li>
              <a href="/shopifystore" className="footer__link">Shopify Stores</a>
            </li>
            <li>
              <a href="/portfolios" className="footer__link">Portfolios</a>
            </li>
          </ul>

          <div className="footer__socials">
            {personalInfo.instagram && (
              <a href={personalInfo.instagram} className="footer__social" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
            )}
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="footer__social">
                <i className="fa-brands fa-github"></i>
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="footer__social">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            )}
          </div>
        </div>

        <p className="footer__copy">&#169; SHK Gautam. All rights reserved.</p>
      </div>
    </footer>
  )
}
