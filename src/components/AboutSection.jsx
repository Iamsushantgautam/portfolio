import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import myImg from '../assets/me3.svg'
import '../styles/AboutSection.css'
import { RiSearch2Fill } from 'react-icons/ri'

// Custom Scroll Engine component to handle paragraphs and blocks seamlessly
function ScrollReveal({ children, className, direction = 'up', offset = ["0 1.1", "1 1"] }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset })

  const yOffset = direction === 'up' ? [60, 0] : direction === 'down' ? [-60, 0] : [0, 0]
  const xOffset = direction === 'left' ? [-60, 0] : direction === 'right' ? [60, 0] : [0, 0]

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], yOffset)
  const x = useTransform(scrollYProgress, [0, 1], xOffset)

  return (
    <motion.div ref={ref} className={className} style={{ opacity, y, x }}>
      {children}
    </motion.div>
  )
}

function AboutSection() {
  const imageRef = useRef(null)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Large background text movement
  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100])

  const { scrollYProgress: imageScroll } = useScroll({ target: imageRef, offset: ["0 1", "0.7 1"] })
  const imageScale = useTransform(imageScroll, [0, 1], [0.8, 1])
  const imageRotate = useTransform(imageScroll, [0, 1], [-5, 0])


  return (
    <section className="about-section" ref={containerRef}>
      {/* Giant Background Text */}
      <div className="about-bg-text-container">
        <motion.span className="about-bg-text" style={{ x: xLeft }}>
          ABOUT SUSHANT GAUTAM // FULL STACK DEVELOPER // SHOPIFY EXPERT // PROBLEM SOLVER //
        </motion.span>
      </div>
      <div className="about-container">

        {/* Left Column - Image */}
        <motion.div
          ref={imageRef}
          className="about-left"
          style={{ scale: imageScale, rotate: imageRotate }}
          initial={{ y: 120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-img-wrapper">
            <img src={myImg} alt="About Me" className="about-img" />
            <ScrollReveal direction="up" className="about-img-quote script-font">
              Every codebase tells a story,<br />let&apos;s build yours.
            </ScrollReveal>
          </div>
        </motion.div>

        {/* Right Column - Text */}
        <div className="about-right">

          <ScrollReveal direction="left">
            <h2 className="about-heading">
              About<span className="about-heading-script script-font">Me</span>
            </h2>
          </ScrollReveal>

          <div className="about-grid">
            <ScrollReveal className="about-block" direction="up">
              <h3 className="about-label">BACKGROUND</h3>
              <p className="about-text">
                I AM A B.TECH GRADUATE IN COMPUTER SCIENCE & ENGINEERING, PASSIONATE ABOUT TECHNOLOGY AND AN AVID READER. I HAVE A SELF-MOTIVATED AND CAN-DO ATTITUDE, THRIVING IN CHALLENGING AND DYNAMIC ENVIRONMENTS.
              </p>
            </ScrollReveal>

            <ScrollReveal className="about-block" direction="up">
              <h3 className="about-label">EXPERIENCE</h3>
              <p className="about-text">
                I HAVE ACQUIRED OVER 11+ MONTHS OF HANDS-ON EXPERIENCE IN FULL-STACK DEVELOPMENT AND SHOPIFY ECOSYSTEMS.
              </p>
            </ScrollReveal>

            <ScrollReveal className="about-block" direction="up">
              <h3 className="about-label">SPECIALTIES</h3>
              <ul className="about-specialties-list">
                <li>LARAVEL DEVELOPMENT</li>
                <li>REACT & MERN STACK</li>
                <li>SHOPIFY DEVELOPMENT</li>
                <li>API INTEGRATIONS</li>
                <li>CONVERSION RATE OPTIMISATION</li>
                <li>PROBLEM SOLVING</li>
              </ul>
            </ScrollReveal>

            {/* Decorative Squiggle */}
            <ScrollReveal className="about-decorative-squiggle" direction="up">
              <svg width="150" height="80" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 13.5C2.5 13.5 6.5 63 29.5 73.5C52.5 84 64.5 48.5 88 47C111.5 45.5 120 73.5 147.5 71" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7.5 2L1.5 10L14 11" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutSection
