import React from 'react'

export default function ProjectsSection({ allProjects }) {
  const displayProjects = (allProjects || []).filter(
    p => p && p.type !== 'Shopify Store' && p.active !== false && p.status !== 'off' && p.status !== 'false'
  )

  if (!displayProjects || displayProjects.length === 0) return null

  return (
    <section className="portfolio section" id="portfolio">
      <h2 className="section__title">Projects</h2>
      <span className="section__subtitle">Most recent work</span>

      <div className="portfolio__container container">
        <div className="portfolio__list">
          {displayProjects.map((project, index) => {
            const techTags = project.tech
              ? project.tech.split(',').map(t => t.trim())
              : []

            return (
              <div className="portfolio__item-card" key={index}>
                {/* Left Side: Image */}
                <img
                  src={project.img}
                  alt={project.title}
                  className="portfolio__img"
                />

                {/* Right Side: Text Information */}
                <div className="portfolio__data">
                  <span className="portfolio__number">0{index + 1}</span>
                  <h3 className="portfolio__title">{project.title}</h3>
                  <h4 className="portfolio__subtitle">{project.subtitle}</h4>
                  <p className="portfolio__description">{project.description}</p>

                  {/* Tech Stack Pills */}
                  {techTags.length > 0 && (
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h5 className="portfolio__tech-title">Tech Stack</h5>
                      <div className="portfolio__tech-list">
                        {techTags.map((tech, idx) => (
                          <span key={idx} className="portfolio__tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Store Password Badge */}
                  {project.password && (
                    <div className="portfolio__password-box">
                      <i className="fa-solid fa-lock"></i>
                      <span>Store Password: <strong>{project.password}</strong></span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="portfolio__actions">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="portfolio__btn portfolio__btn--primary"
                      >
                        <span>See Live Demo</span>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="portfolio__btn portfolio__btn--secondary"
                      >
                        <i className="fa-brands fa-github"></i>
                        <span>GitHub Repository</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



