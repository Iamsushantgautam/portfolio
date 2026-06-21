import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import '../styles/SkillsSection.css'
import portfolioData from '../../public/api/portfolio.json'

import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiShopify,
  SiCanva,
  SiGit,
  SiGithub,
  SiPython,
  SiMysql,
  SiOpenai,
  SiBootstrap,
  SiLeetcode,
  SiPostgresql,
  SiLinux,
  SiCplusplus,
  SiPhp,
  SiLaravel,
} from 'react-icons/si'
import jsIcon from '../assets/icons/javascript.svg'
import reactIcon from '../assets/icons/react.svg'
import nodeIcon from '../assets/icons/nodejs.svg'

const iconMap = {
  jsIcon: <img src={jsIcon} alt="JavaScript" className="custom-skill-icon" />,
  reactIcon: <img src={reactIcon} alt="React" className="custom-skill-icon" />,
  nodeIcon: <img src={nodeIcon} alt="Node.js" className="custom-skill-icon" />,
  SiTailwindcss: <SiTailwindcss color="#06B6D4" />,
  SiExpress: <SiExpress color="#000000" />,
  SiPython: <SiPython color="#3776AB" />,
  SiMongodb: <SiMongodb color="#47A248" />,
  SiMysql: <SiMysql color="#4479A1" />,
  SiLeetcode: <SiLeetcode color="#FFA116" />,
  SiPostgresql: <SiPostgresql color="#4169E1" />,
  SiLinux: <SiLinux color="#000000" />,
  SiCplusplus: <SiCplusplus color="#00599C" />,
  SiShopify: <SiShopify color="#95BF47" />,
  SiGit: <SiGit color="#F05032" />,
  SiGithub: <SiGithub color="#000000" />,
  SiCanva: <SiCanva color="#00C4CC" />,
  SiOpenai: <SiOpenai color="#000000" />,
  SiBootstrap: <SiBootstrap color="#7952B3" />,
  SiPhp: <SiPhp color="#777BB4" />,
  SiLaravel: <SiLaravel color="#FF2D20" />
}

function SkillRow({ item }) {
  const rowRef = useRef(null)

  // Tie the row's physical scale and horizontal entry to scroll depth
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["0 1.1", "1 1"]
  })

  // Horizontal slide and scale
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1])
  const yOffset = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <motion.div
      ref={rowRef}
      className="skills-row"
      style={{ scale, opacity, y: yOffset }}
    >
      {/* Giant Left Column Title */}
      <div className="skills-category-col">
        <h3 className="skills-category-title">{item.category}</h3>
      </div>

      {/* Right Column Interactive Skill Pills */}
      <div className="skills-tools-col">
        {item.tools.map((tool) => (
          <div key={tool.name} className="skill-tag">
            <span className="skill-icon">{iconMap[tool.icon] || <SiShopify color="#95BF47" />}</span>
            <span className="skill-name">{tool.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function SkillsSection() {
  const headerRef = useRef(null)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Background Text Horizontal Movement (from right to left)
  const xMove = useTransform(scrollYProgress, [0, 1], [100, -200])

  const { scrollYProgress: headScroll } = useScroll({
    target: headerRef,
    offset: ["0 1.2", "1 1"]
  })

  const headerOpacity = useTransform(headScroll, [0, 1], [0, 1])
  const headerY = useTransform(headScroll, [0, 1], [50, 0])

  return (
    <section className="skills-section" ref={containerRef}>
      {/* Giant Background Text Animation */}
      <div className="skills-bg-text-container">
        <motion.span className="skills-bg-text" style={{ x: xMove }}>
          KNOWLEDGE // EXPERIENCE // CAPABILITIES // TOOLKIT // EXPERTISE // POWERED BY AI //
        </motion.span>
      </div>

      <div className="skills-container">

        {/* Top Eyebrow Tag explicitly tied to scroll progress */}
        <motion.div
          ref={headerRef}
          className="skills-header-label"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          My Stack
        </motion.div>

        {/* Clean Editorial Table Layout explicitly tied to Hardware Scroll */}
        <div className="skills-table">
          {portfolioData.skills.map((item, rowIndex) => (
            <SkillRow key={item.category} item={item} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default SkillsSection
