import React from 'react'

export default function SkillsSection({ skills, openSkillsIndex, toggleSkillsCategory, categoryIconMap }) {
  return (
    <section className="skills section" id="skills">
      <h2 className="section__title">Skills</h2>
      <span className="section__subtitle">My technical level</span>

      <div className="skills__container container grid">
        {skills && skills.map((skillGroup, idx) => {
          const isOpen = openSkillsIndex === idx;
          const iconClass = categoryIconMap[skillGroup.category] || 'fas fa-code';

          return (
            <div key={skillGroup.category}>
              <div className={`skills__content ${isOpen ? 'skills__open' : 'skills__close'}`}>
                <div className="skills__header" onClick={() => toggleSkillsCategory(idx)}>
                  <i className={`${iconClass} skills__icon`}></i>
                  <div>
                    <h1 className="skills__title">{skillGroup.category}</h1>
                  </div>
                  <i className="uil uil-angle-down skills__arrow"></i>
                </div>

                <div className="skills__list grid">
                  {skillGroup.tools && skillGroup.tools.map((tool) => (
                    <div className="skills__data" key={tool.name}>
                      <div className="skills__titles">
                        <h3 className="skills__name">{tool.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
}
