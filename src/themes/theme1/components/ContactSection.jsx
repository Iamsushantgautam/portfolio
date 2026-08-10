import React from 'react'

export default function ContactSection({
  personalInfo,
  formState,
  setFormState,
  formFeedback,
  handleContactSubmit,
  isSubmitting
}) {
  return (
    <section className="contact section" id="contact">
      <h2 className="section__title">Contact Me</h2>
      <span className="section__subtitle">Get in touch</span>

      <div className="contact__container container grid">
        <div>
          <div className="contact__information">
            <i className="uil uil-calling contact__icon"></i>
            <div>
              <h3 className="contact__title">Call Me</h3>
              <span className="contact__subtitle">{personalInfo.phone}</span>
            </div>
          </div>

          <div className="contact__information">
            <i className="uil uil-envelope-minus contact__icon"></i>
            <div>
              <h3 className="contact__title">Email</h3>
              <span className="contact__subtitle">{personalInfo.email}</span>
            </div>
          </div>

          <div className="contact__information">
            <i className="uil uil-map-marker contact__icon"></i>
            <div>
              <h3 className="contact__title">Location</h3>
              <span className="contact__subtitle">Lucknow, Uttar Pradesh, India</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleContactSubmit} className="contact__form grid">
          <div className="contact__inputs grid">
            <div className="contact__content">
              <label htmlFor="name" className="contact__label">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="contact__input"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            </div>

            <div className="contact__content">
              <label htmlFor="email" className="contact__label">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="contact__input"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
            </div>
          </div>

          <div className="contact__content">
            <label htmlFor="message" className="contact__label">Message</label>
            <textarea
              name="message"
              id="message"
              cols="0"
              rows="7"
              className="contact__input"
              required
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            ></textarea>
          </div>

          <div>
            <button type="submit" className="button button--flex" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <i className="uil uil-message button__icon"></i>
            </button>
          </div>

          {formFeedback.show && (
            <div
              style={{
                color: formFeedback.success ? '#2e7d32' : '#d32f2f',
                marginTop: '10px',
                textAlign: 'center',
                fontWeight: '500'
              }}
            >
              {formFeedback.text}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
