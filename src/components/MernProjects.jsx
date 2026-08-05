import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Github, Globe } from 'lucide-react'
import '../styles/ProjectsList.css'
import portfolioData from '../../public/api/portfolio.json'

import witcetImg from '../assets/MERN Project/witcet.png'
import expenseTrackerImg from '../assets/MERN Project/portfolio3-full.png'
import wittoolImg from '../assets/MERN Project/wittool.png'
import skillnearImg from '../assets/MERN Project/D-Home.png'
import pawpertioImg from '../assets/MERN Project/pawpertio.png'
const imgMap = {
  '/assets/MERN Project/witcet.png': witcetImg,
  '/assets/MERN Project/portfolio3-full.png': expenseTrackerImg,
  '/assets/MERN Project/wittool.png': wittoolImg,
  '/assets/MERN Project/D-Home.png': skillnearImg,
  '/assets/MERN Project/pawpertio.png': pawpertioImg,
}

function ProjectItem({ project, index }) {
  const isEven = index % 2 !== 0
  const itemRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["0 1.1", "0.8 1"]
  })

  const opacity = 1
  const textX = useTransform(scrollYProgress, [0, 1], [isEven ? 80 : -80, 0])
  const imageScale = 1
  const imageRotate = 0


  // Background number parallax
  const bgNumberY = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <motion.div
      ref={itemRef}
      className={`plist-item ${isEven ? 'reverse' : ''}`}
      style={{ opacity }}
    >
      {/* Individual Project Background Decoration */}
      <motion.div
        className="plist-item-bg-decor"
        style={{ y: bgNumberY }}
      >
        {project.number}
      </motion.div>

      <motion.div className="plist-content" style={{ x: textX }}>
        <div className="plist-number-wrap">
          <span>{project.number}</span>
        </div>
        <h2 className="plist-category">{project.category}</h2>
        <div className="plist-subtitle-row">
          <h3 className="plist-subtitle">{project.subtitle}</h3>
        </div>
        <p className="plist-description">
          {project.description}
        </p>
        <div className="plist-tech">
          <strong>Tools used:</strong> {project.tech}
        </div>
        <div className="plist-btn-group">
          <a href={project.live} target="_blank" rel="noreferrer" className="plist-btn live">
            <Globe size={18} /> Preview
          </a>
          <a href={project.github} target="_blank" rel="noreferrer" className="plist-btn github">
            <Github size={18} /> Github Code
          </a>
        </div>
      </motion.div>

      <div className="plist-image-wrap">
        <motion.div
          className="plist-browser-mockup"
          style={{ scale: imageScale, rotate: imageRotate }}
        >
          {/* Browser Top Bar */}
          <div className="plist-browser-bar">
            <div className="plist-browser-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="plist-browser-url">
              <span>{project.live.replace('https://', '')}</span>
            </div>
          </div>
          {/* Screenshot */}
          <div className="plist-browser-screen">
            <img
              src={imgMap[project.img] || project.img}
              alt={project.subtitle}
              className="plist-img"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function MernProjects() {
  const mernHeaderRef = useRef(null)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Large background text movement
  const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100])

  const { scrollYProgress: mernScroll } = useScroll({
    target: mernHeaderRef,
    offset: ["0 1.2", "1 1"]
  })

  const mernY = useTransform(mernScroll, [0, 1], [80, 0])
  const mernOpacity = useTransform(mernScroll, [0, 1], [0, 1])

  return (
    <section className="projects-list-section mern-section" ref={containerRef}>
      {/* Giant Background Text */}
      <div className="plist-bg-text-container">
        <motion.span className="plist-bg-text" style={{ x: xLeft }}>
          MERN STACK DEVELOPMENT // FULL STACK // REACT // NODE // MONGO // EXPRESS //
        </motion.span>
      </div>

      <div className="plist-container">
        <motion.div
          ref={mernHeaderRef}
          className="plist-section-header"
          style={{ y: mernY, opacity: mernOpacity }}
        >
          <span className="plist-eyebrow">Full-Stack Development</span>
          <h1 className="plist-section-title">MERN <span className="plist-title-accent">Projects</span></h1>
        </motion.div>

        {portfolioData.mernProjects.map((project, idx) => (
          <ProjectItem key={project.number} project={project} index={idx} />
        ))}
      </div>
    </section>
  )
}

export default MernProjects
