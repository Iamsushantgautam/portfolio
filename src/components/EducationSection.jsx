import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, BookOpen, School } from 'lucide-react'
import '../styles/EducationSection.css'
import me4 from '../assets/me3.svg'
import eduimg from '../assets/edu.png'
import portfolioData from '../../public/api/portfolio.json'

const iconMap = {
  GraduationCap,
  BookOpen,
  School,
}

function EducationItem({ item, index }) {
  const itemRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['0 1.1', '0.6 1'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const x = useTransform(scrollYProgress, [0, 1], [60, 0])

  const IconComponent = iconMap[item.icon] || School

  return (
    <motion.div
      ref={itemRef}
      className="ed-tl-item"
      style={{ opacity, x }}
    >
      {/* Icon circle on the line */}
      <div className="ed-tl-icon-col">
        <div className="ed-tl-icon-circle">
          <IconComponent size={26} strokeWidth={2} />
        </div>
        {/* Connector line drawn via CSS ::after on the column */}
      </div>

      {/* Card */}
      <div className="ed-tl-card">
        <div className="ed-tl-card-top">
          <div className="ed-tl-card-left">
            <h3 className="ed-tl-type">{item.type}</h3>
            <p className="ed-tl-spec">{item.specialization}</p>
            <p className="ed-tl-inst">{item.institution}</p>
          </div>
          <div className="ed-tl-card-right">
            <span className="ed-tl-badge">{item.period}</span>
            {item.grade && <span className="ed-tl-grade-badge">{item.grade}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function EducationSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const bgTextX = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const imgScrollY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section className="ed-section" ref={containerRef}>
      {/* Giant Background Text */}
      <div className="ed-bg-text-container">
        <motion.span className="ed-bg-text" style={{ x: bgTextX }}>
          EDUCATION // ACADEMICS // LEARNING // COMPUTER SCIENCE // BN CET LUCKNOW //
        </motion.span>
      </div>

      <div className="ed-container">
        <div className="ed-split">
          {/* LEFT: Timeline */}
          <div className="ed-cards-col">
            {/* Header */}
            <div className="ed-header">
              <span className="ed-eyebrow">Intellectual Roots</span>
              <h2 className="ed-title">My <span className="ed-title-accent">Education</span></h2>
              <p className="ed-subtitle">A journey of learning, growth and achievement</p>
            </div>

            <div className="ed-timeline">
              {portfolioData.education.map((item, index) => (
                <EducationItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* RIGHT: Sticky Image */}
          <div className="ed-image-col">
            <motion.div
              className="ed-image-wrapper"
              viewport={{ once: true }}
              initial={{ y: 50, scale: 0.8, opacity: 0 }}
              whileInView={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img 
                src={eduimg} 
                alt="Sushant Gautam" 
                className="ed-image" 
                style={{ y: imgScrollY }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationSection
