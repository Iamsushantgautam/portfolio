import React from 'react'
import aboutImg from '../../../assets/me.jpg'
import cvPdf from '../../../assets/SushantCV.pdf'
import portfolioData from '../../../data/portfolio.json'

export default function AboutSection({ personalInfo = portfolioData.personalInfo, about = portfolioData.about }) {
  const aboutData = about || portfolioData.about || {}
  const statsList = aboutData.stats || []

  return (
    <section className="about section" id="about">
      <h2 className="section__title">About Me</h2>
      <span className="section__subtitle">My introduction</span>

      <div className="about__container container grid">
        <img src={aboutImg} alt={personalInfo.name} className="about__img" />

        <div className="about__data">
          <p className="about__description">
            {aboutData.description || personalInfo.quote}
          </p>

          {statsList.length > 0 && (
            <div className="about__info">
              {statsList.map((stat, i) => (
                <div key={i}>
                  <span className="about__info-title">{stat.value}</span>
                  <span className="about__info-name">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="about__buttons">
            <a download href={cvPdf} className="button button--flex">
              Download CV <i className="fas fa-download button__icon"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

