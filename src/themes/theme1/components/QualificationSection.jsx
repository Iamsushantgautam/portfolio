import React from 'react'

export default function QualificationSection({
  education,
  experiences,
  trainingsList,
  activeQualTab,
  setActiveQualTab,
  activeModalData,
  setActiveModalData
}) {
  return (
    <section className="qualification__section service__section" id="qualification">
      <h2 className="section__title">Qualification & Experience</h2>
      <span className="section__subtitle">My personal journey</span>

      <div className="qualification__container container">
        <div className="qualification__tabs">
          <div
            className={`qualification__button button--flex ${activeQualTab === 'education' ? 'qualification__active' : ''}`}
            onClick={() => setActiveQualTab('education')}
          >
            <i className="uil uil-graduation-cap qualification__icon"></i>
            Education
          </div>

          <div
            className={`qualification__button button--flex ${activeQualTab === 'work' ? 'qualification__active' : ''}`}
            onClick={() => setActiveQualTab('work')}
          >
            <i className="uil uil-briefcase-alt qualification__icon"></i>
            Work
          </div>

          <div
            className={`qualification__button button--flex ${activeQualTab === 'trainings' ? 'qualification__active' : ''}`}
            onClick={() => setActiveQualTab('trainings')}
          >
            <i className="uil uil-award qualification__icon"></i>
            Trainings
          </div>
        </div>

        <div className="qualification__sections">
          {/* ====== Education Tab ====== */}
          {activeQualTab === 'education' && (
            <div className="qualification__content qualification__active" id="education">
              {education && education.map((eduItem, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div className="qualification__data" key={eduItem.type}>
                    {!isEven && <div></div>}
                    {!isEven && (
                      <div>
                        <span className="qualification__rounder"></span>
                        {idx < education.length - 1 && <span className="qualification__line"></span>}
                      </div>
                    )}

                    <div>
                      <h3 className="qualification__title">{eduItem.institution}</h3>
                      <span className="qualification__subtitle">{eduItem.specialization || eduItem.type}</span>
                      <div className="qualification__calender">
                        <i className="uil uil-calendar-alt"></i> {eduItem.period}
                      </div>
                      <span
                        className="button button--flex button--small button--link services__button"
                        onClick={() => setActiveModalData({
                          title: `${eduItem.type} Summary`,
                          bullets: [
                            `Institution: ${eduItem.institution}`,
                            `Specialization: ${eduItem.specialization}`,
                            `Grade / Score: ${eduItem.grade}`,
                            `Period: ${eduItem.period}`
                          ]
                        })}
                      >
                        View More <i className="uil uil-arrow-right button__icon"></i>
                      </span>
                    </div>

                    {isEven && (
                      <div>
                        <span className="qualification__rounder"></span>
                        {idx < education.length - 1 && <span className="qualification__line"></span>}
                      </div>
                    )}
                    {isEven && <div></div>}
                  </div>
                )
              })}
            </div>
          )}

          {/* ====== Work Tab ====== */}
          {activeQualTab === 'work' && (
            <div className="qualification__content qualification__active" id="work">
              {experiences && experiences.map((expItem, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div className="qualification__data" key={expItem.number}>
                    {!isEven && <div></div>}
                    {!isEven && (
                      <div>
                        <span className="qualification__rounder"></span>
                        {idx < experiences.length - 1 && <span className="qualification__line"></span>}
                      </div>
                    )}

                    <div>
                      <h3 className="qualification__title">{expItem.title}</h3>
                      <span className="qualification__subtitle">{expItem.company}</span>
                      <div className="qualification__calender">
                        <i className="uil uil-calendar-alt"></i> {expItem.period}
                      </div>
                      <span
                        className="button button--flex button--small button--link services__button"
                        onClick={() => setActiveModalData({
                          title: `${expItem.title} @ ${expItem.company}`,
                          bullets: expItem.summary || [expItem.description]
                        })}
                      >
                        View More <i className="uil uil-arrow-right button__icon"></i>
                      </span>
                    </div>

                    {isEven && (
                      <div>
                        <span className="qualification__rounder"></span>
                        {idx < experiences.length - 1 && <span className="qualification__line"></span>}
                      </div>
                    )}
                    {isEven && <div></div>}
                  </div>
                )
              })}
            </div>
          )}

          {/* ====== Trainings Tab ====== */}
          {activeQualTab === 'trainings' && (
            <div className="qualification__content qualification__active" id="trainings">
              {trainingsList.map((trItem, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div className="qualification__data" key={trItem.title}>
                    {!isEven && <div></div>}
                    {!isEven && (
                      <div>
                        <span className="qualification__rounder"></span>
                        {idx < trainingsList.length - 1 && <span className="qualification__line"></span>}
                      </div>
                    )}

                    <div>
                      <h3 className="qualification__title">{trItem.title}</h3>
                      <span className="qualification__subtitle">{trItem.company}</span>
                      <div className="qualification__calender">
                        <i className="uil uil-calendar-alt"></i> {trItem.period}
                      </div>
                      <span className="qualification__location">{trItem.location}</span>
                      <span
                        className="button button--flex button--small button--link services__button"
                        style={{ marginTop: '5px' }}
                        onClick={() => setActiveModalData({
                          title: trItem.title,
                          bullets: trItem.summary
                        })}
                      >
                        View More <i className="uil uil-arrow-right button__icon"></i>
                      </span>
                    </div>

                    {isEven && (
                      <div>
                        <span className="qualification__rounder"></span>
                        {idx < trainingsList.length - 1 && <span className="qualification__line"></span>}
                      </div>
                    )}
                    {isEven && <div></div>}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal popup */}
      {activeModalData && (
        <div className="services__modal active-modal">
          <div className="services__modal-content">
            <h4 className="services__modal-title">{activeModalData.title}</h4>
            <i className="uil uil-times services__modal-close" onClick={() => setActiveModalData(null)}></i>
            <ul className="services__modal-services grid">
              {activeModalData.bullets && activeModalData.bullets.map((b, i) => (
                <li className="services__modal-service" key={i}>
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p>{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}
