import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import sushantCV from '../../../assets/SushantCV.pdf'
import '../styles/Navbar.css'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  // { name: 'Fiverr', href: '#fiverr' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Update navbar state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-container">
        {/* LOGO */}
        <a href="#hero" className="nav-logo">
          SUSHANT<span className="logo-dot">.</span>
        </a>

        {/* NAV LINKS */}
        {/* <ul className="nav-links">
          {navLinks.map((link) => (
            <motion.li key={link.name} whileHover={{ y: -2 }}>
              <a href={link.href} className="nav-link">
                <span className="nav-link-name">{link.name}</span>

              </a>
            </motion.li>
          ))}
        </ul> */}

        {/* CTA */}
        <motion.a
          href={sushantCV}
          download="Sushant_CV.pdf"
          className="nav-cta"
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          DOWNLOAD CV
        </motion.a>
      </div>
    </motion.nav>
  )
}

export default Navbar
