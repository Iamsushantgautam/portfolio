import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import '../styles/CustomCursor.css'

function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 250 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const checkHover = () => {
      const hoveredElement = document.querySelectorAll('a, button, .ps-card, .ps-live-btn, .pill-button')
      hoveredElement.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true))
        el.addEventListener('mouseleave', () => setIsHovered(false))
      })
    }

    window.addEventListener('mousemove', moveCursor)
    checkHover()

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}>
      <motion.div
        className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      >
        <div className="cursor-dot" />
        <div className="cursor-ring" />
      </motion.div>
    </div>
  )
}

export default CustomCursor
