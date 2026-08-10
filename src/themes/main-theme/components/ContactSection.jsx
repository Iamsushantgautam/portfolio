import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import '../styles/ContactSection.css'

function ContactSection() {
  const containerRef = useRef(null)
  const { scrollYProgress: completeProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })

  // Animation values
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])
  const yOffset = useTransform(scrollYProgress, [0, 1], [40, 0])
  const headerX = useTransform(scrollYProgress, [0, 1], [-40, 0])

  // Giant background text scroll
  const xMove = useTransform(completeProgress, [0, 1], [100, -300])

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formsubmit.co/ajax/iamsushantgautam@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `New Portfolio Message from ${formState.name}`,
          _captcha: 'false',
          _next: window.location.href // Fallback to current URL
        })

      })

      if (response.ok) {
        setSubmitted(true)
        setFormState({ name: '', email: '', message: '' })
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      alert('Failed to send message. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-section" ref={containerRef}>
      <div className="contact-container">
        
        {/* Massive Background Scroll Text */}
        <div className="contact-bg-text-container">
          <motion.span className="contact-bg-text" style={{ x: xMove }}>
            GET IN TOUCH // SEND A MESSAGE // LET'S COLLABORATE // START A PROJECT //
          </motion.span>
        </div>

        <div className="contact-inner">
          
          {/* Left Column: Form */}
          <motion.div 
            className="contact-left"
            style={{ opacity, y: yOffset }}
          >
            <motion.div style={{ x: headerX }} className="contact-header">
              <span className="contact-eyebrow">Ready to start?</span>
              <h2 className="contact-title">Lets <span className="contact-title-accent">Talk</span></h2>
            </motion.div>

            <form className="contact-form" onSubmit={handleSubmit}>
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="contact-success-msg"
                >
                  <h3>🚀 Message Sent!</h3>
                  <p>Thanks for reaching out! I'll get back to you shortly.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="contact-reset-btn">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Your Name" 
                      required 
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Your Email" 
                      required 
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <textarea 
                      name="message" 
                      placeholder="Drop a Message..." 
                      rows="5" 
                      required
                      value={formState.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </>
              )}
            </form>

          </motion.div>

          {/* Right Column: Details & Visual */}
          <motion.div 
            className="contact-right"
            style={{ opacity }}
          >
            <div className="contact-info-card theme-cyan">
              <h3 className="contact-info-title">Contact Info</h3>
              <div className="contact-detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">iamsushantgautam@gmail.com</span>
              </div>
              <div className="contact-detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">Lucknow, Uttar Pradesh, India</span>
              </div>
              
              <div className="contact-social-pills">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-pill">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social-pill">Github</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-pill">Instagram</a>
              </div>
            </div>

            {/* A fun pop-art decorative element */}
            <div className="contact-pop-decoration">
               <div className="circle-bg pink"></div>
               <div className="circle-bg cyan"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default ContactSection
