import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowUpRight, X, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import expImg from '../../../assets/exp.png'
import myPic3 from '../../../assets/mypic3.png'
import '../styles/ExperienceSection.css'
import portfolioData from '../../../data/portfolio.json'

function ExperienceCard({ exp, index, cardTheme, onOpenModal }) {
  return (
    <div className="exp-card-wrapper">
      <div className={`exp-card ${cardTheme}`}>
        {/* Dynamic Background Number for each card */}
        <div className="exp-card-number-bg">
          {exp.number}
        </div>

        <div className="exp-main">
          <div className="exp-top">
            <h3 className="exp-role">{exp.title}</h3>
            <span className="exp-period">{exp.period}</span>
          </div>
          <div className="exp-company-wrapper">
            <span className="exp-company">{exp.company}</span>
          </div>
          <p className="exp-desc">{exp.description}</p>
        </div>

        <button onClick={() => onOpenModal(exp)} className="exp-more">
          View Summary <ArrowUpRight size={18} strokeWidth={3} />
        </button>
      </div>
    </div>
  )
}

function ExperienceSection() {
  const sectionRef = useRef(null)
  const rightColRef = useRef(null)
  const [selectedExp, setSelectedExp] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const experiences = portfolioData.experiences || []

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  // Map vertical scroll progress to horizontal translation
  // There are 3 cards, so to translate 2 card widths left, we shift by 2/3 (66.66%) of the track width
  const xTransform = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-66.66%"], { clamp: true })

  // Large background text movement - sync with others
  const bgTextX = useTransform(scrollYProgress, [0.05, 0.95], [150, -150], { clamp: true })

  // Handle active index detection on scroll for mobile
  const handleMobileScroll = () => {
    if (!rightColRef.current || !isMobile || experiences.length === 0) return
    const container = rightColRef.current
    const cardWrapper = container.querySelector('.exp-card-wrapper')
    if (!cardWrapper) return
    const scrollLeft = container.scrollLeft
    const step = cardWrapper.offsetWidth + 20 // card width + track gap
    const newIndex = Math.round(scrollLeft / step)
    const clampedIndex = Math.min(Math.max(newIndex, 0), experiences.length - 1)
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex)
    }
  }

  const scrollToCard = (index) => {
    if (!rightColRef.current) return
    const container = rightColRef.current
    const cardWrappers = container.querySelectorAll('.exp-card-wrapper')
    if (cardWrappers[index]) {
      cardWrappers[index].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      })
      setActiveIndex(index)
    }
  }

  // Touch swipe gesture handlers for mobile
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 40

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) {
      handleNext()
    } else if (distance < -minSwipeDistance) {
      handlePrev()
    }
  }

  const handlePrev = () => {
    const prevIdx = Math.max(activeIndex - 1, 0)
    scrollToCard(prevIdx)
  }

  const handleNext = () => {
    const nextIdx = Math.min(activeIndex + 1, experiences.length - 1)
    scrollToCard(nextIdx)
  }

  return (
    <section className="exp-section" ref={sectionRef}>
      {/* Giant Background Text */}
      <div className="exp-bg-text-container">
        <motion.span
          className="exp-bg-text"
          style={{ x: bgTextX }}
        >
          EXPERIENCE // JOURNEY // PROFESSIONAL // CAREER // GROWTH //
        </motion.span>
      </div>

      <div className="exp-sticky-wrapper">
        <div className="exp-header-sticky">
          <span className="exp-eyebrow">Professional Journey</span>
          <h2 className="exp-title">Work <span className="exp-title-accent">Experience</span></h2>
        </div>

        {/* Split Layout Container */}
        <div className="exp-split-container">

          {/* Left Column: Polaroid Image (Sticky & Solid Layer) */}
          <div className="exp-left-col">
            <img src={isMobile ? myPic3 : expImg} alt="Sushant Gautam" className="exp-intro-img" />
          </div>

          {/* Right Column: Sliding Cards Viewport */}
          <div
            className="exp-right-col"
            ref={rightColRef}
            onScroll={handleMobileScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            data-lenis-prevent
          >
            <motion.div
              className="exp-track"
              style={isMobile ? {} : { x: xTransform }}
            >
              {experiences.map((exp, index) => {
                const themes = ['theme-pink', 'theme-cyan', 'theme-white']
                const cardTheme = themes[index % themes.length]

                return (
                  <ExperienceCard
                    key={index}
                    exp={exp}
                    index={index}
                    cardTheme={cardTheme}
                    onOpenModal={setSelectedExp}
                  />
                )
              })}
            </motion.div>
          </div>

        </div>

        {/* Mobile Carousel Controls */}
        {isMobile && experiences.length > 0 && (
          <div className="exp-mobile-controls">
            <button
              className="exp-nav-btn"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous Experience"
            >
              <ChevronLeft size={22} strokeWidth={3} />
            </button>

            <button
              className="exp-nav-btn"
              onClick={handleNext}
              disabled={activeIndex === experiences.length - 1}
              aria-label="Next Experience"
            >
              <ChevronRight size={22} strokeWidth={3} />
            </button>
          </div>
        )}

      </div>

      <AnimatePresence>
        {selectedExp && (
          <div className="exp-modal-overlay" onClick={() => setSelectedExp(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="exp-modal"
            >
              <div className="exp-modal-header">
                <h3 className="exp-modal-title">Summary :</h3>
                <button className="exp-modal-close" onClick={() => setSelectedExp(null)}>
                  <X size={24} />
                </button>
              </div>
              <div className="exp-modal-content" data-lenis-prevent>
                <ul className="exp-modal-list">
                  {(selectedExp.summary || []).map((item, i) => (
                    <li key={i} className="exp-modal-item">
                      <span className="exp-modal-icon">
                        <CheckCircle2 size={24} strokeWidth={1.5} />
                      </span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ExperienceSection