import React, { useState, useEffect } from 'react'
import './newcss.css'
import './swiper-bundle.min.css'

import portfolioData from '../../data/portfolio.json'

// Sub-components for each section
import Header from './components/Header'
import HomeSection from './components/HomeSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import QualificationSection from './components/QualificationSection'
import ProjectsSection from './components/ProjectsSection'
import FiverrSection from './components/FiverrSection'
import ContactSection from './components/ContactSection'
import FooterSection from './components/FooterSection'
import ScrollUp from './components/ScrollUp'

// Images for project mapping
import pawpertioImg from '../../assets/Projects/pawpertioss.png'
import skillnearImg from '../../assets/Projects/skillnearss.png'
import wittoolImg from '../../assets/Projects/wittoolss.png'
import witcetMernImg from '../../assets/Projects/witcetss.png'

import store1Img from '../../assets/shopify-store/store1-full.png'
import store2Img from '../../assets/shopify-store/store2-full.png'
import store3Img from '../../assets/shopify-store/store3-full.png'
import store4Img from '../../assets/shopify-store/store4-full.png'

import scraperImg from '../../assets/utility-tools/witcraper.png'

const imgMap = {
  '/assets/Projects/pawpertio.png': pawpertioImg,
  '/assets/Projects/D-Home.png': skillnearImg,
  '/assets/Projects/wittool.png': wittoolImg,
  '/assets/Projects/witcet.png': witcetMernImg,
  '/assets/shopify-store/store1-full.png': store1Img,
  '/assets/shopify-store/store2-full.png': store2Img,
  '/assets/shopify-store/store3-full.png': store3Img,
  '/assets/shopify-store/store4-full.png': store4Img,
  '/assets/utility-tools/witcraper.png': scraperImg,
}

// Category icons map
const categoryIconMap = {
  'FRONTEND': 'fas fa-code',
  'BACKEND': 'fas fa-server',
  'DATABASE': 'fas fa-database',
  'AUTHENTICATION': 'fas fa-user-shield',
  'CORE CONCEPTS': 'fas fa-brain',
  'SHOPIFY TECH': 'fas fa-shopping-bag',
  'Ecommerce Strategy': 'fas fa-chart-line',
  'TOOLS / DESIGN': 'fas fa-pencil-ruler',
}

export default function Theme1() {
  const { personalInfo, education, experiences, projects, mernProjects, shopifyProjects, skills, utilityTools, trainings } = portfolioData

  // State (Light mode default)
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const saved = localStorage.getItem('selected-theme')
    if (saved !== null) return saved === 'dark'
    return false
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSkillsIndex, setOpenSkillsIndex] = useState(0)
  const [activeQualTab, setActiveQualTab] = useState('work')
  const [activeModalData, setActiveModalData] = useState(null)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [activeNavSection, setActiveNavSection] = useState('home')
  const [showScrollHeader, setShowScrollHeader] = useState(false)
  const [showScrollUpBtn, setShowScrollUpBtn] = useState(false)

  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formFeedback, setFormFeedback] = useState({ show: false, success: false, text: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Helper function to check if project is active
  const isProjectActive = (p) => p && p.active !== false && p.status !== 'off' && p.status !== 'false'

  // Combine all projects dynamically from portfolio.json (showing active projects only)
  const mainProjectsList = projects || mernProjects || []
  const allProjects = [
    ...mainProjectsList.filter(isProjectActive).map(p => ({
      title: p.category,
      subtitle: p.subtitle,
      description: p.description,
      tech: p.tech,
      live: p.live,
      github: p.github,
      img: imgMap[p.img] || p.img,
      type: p.type || 'Web Application',
      active: p.active,
      status: p.status
    })),
    ...(shopifyProjects || []).filter(isProjectActive).map(p => ({
      title: p.category,
      subtitle: p.subtitle,
      description: p.description,
      live: p.live,
      password: p.password,
      img: imgMap[p.img] || p.img,
      type: 'Shopify Store',
      active: p.active,
      status: p.status
    })),
    ...(utilityTools && isProjectActive(utilityTools) ? [{
      title: utilityTools.title,
      subtitle: utilityTools.subtitle,
      description: utilityTools.points ? utilityTools.points.join(' ') : utilityTools.title,
      tech: utilityTools.tech,
      live: utilityTools.live,
      github: utilityTools.github,
      img: imgMap[utilityTools.img] || utilityTools.img || scraperImg,
      type: 'Utility Tool',
      active: utilityTools.active,
      status: utilityTools.status
    }] : [])
  ]

  // Trainings list dynamically from portfolio.json
  const trainingsList = trainings || []


  // Toggle Dark Theme
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme')
      localStorage.setItem('selected-theme', 'dark')
      localStorage.setItem('selected-icon', 'uil-sun')
    } else {
      document.body.classList.remove('dark-theme')
      localStorage.setItem('selected-theme', 'light')
      localStorage.setItem('selected-icon', 'uil-moon')
    }

    return () => {
      document.body.classList.remove('dark-theme')
    }
  }, [isDarkTheme])

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset

      if (scrollY >= 80) setShowScrollHeader(true)
      else setShowScrollHeader(false)

      if (scrollY >= 500) setShowScrollUpBtn(true)
      else setShowScrollUpBtn(false)

      const sections = document.querySelectorAll('section[id]')
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 100
        const sectionId = current.getAttribute('id')
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveNavSection(sectionId)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll handler with custom easing
  const scrollToSection = (e, targetId) => {
    e.preventDefault()
    setIsMenuOpen(false)

    let finalTargetId = targetId
    if (targetId === '#trainings' || targetId === '#work' || targetId === '#education') {
      const tabName = targetId.replace('#', '')
      setActiveQualTab(tabName)
      finalTargetId = '#qualification'
    }

    if (finalTargetId === '#') finalTargetId = '#home'

    const targetElement = document.querySelector(finalTargetId)
    if (targetElement) {
      const header = document.getElementById('header')
      const headerOffset = header ? header.offsetHeight : 0
      const elementPosition = targetElement.getBoundingClientRect().top
      const targetY = elementPosition + window.pageYOffset - headerOffset

      // Custom easeInOutCubic smooth scroll
      const startY = window.pageYOffset
      const distance = targetY - startY
      const duration = 700
      let startTime = null

      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        window.scrollTo(0, startY + distance * easeInOutCubic(progress))
        if (progress < 1) requestAnimationFrame(step)
      }

      requestAnimationFrame(step)
    }
  }

  const toggleSkillsCategory = (index) => {
    setOpenSkillsIndex(openSkillsIndex === index ? -1 : index)
  }

  const handlePrevProject = () => {
    setCurrentProjectIndex((prev) => (prev === 0 ? allProjects.length - 1 : prev - 1))
  }
  const handleNextProject = () => {
    setCurrentProjectIndex((prev) => (prev === allProjects.length - 1 ? 0 : prev + 1))
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormFeedback({ show: false, success: false, text: '' })

    try {
      const formData = new FormData()
      formData.append('name', formState.name)
      formData.append('email', formState.email)
      formData.append('message', formState.message)

      const response = await fetch('https://formsubmit.co/ajax/iamsushantgautam@gmail.com', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        setFormState({ name: '', email: '', message: '' })
        setFormFeedback({
          show: true,
          success: true,
          text: 'Your message has been sent successfully!'
        })
      } else {
        setFormFeedback({
          show: true,
          success: false,
          text: 'There was an error sending your message. Please try again.'
        })
      }
    } catch (err) {
      setFormFeedback({
        show: true,
        success: false,
        text: 'There was an error sending your message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setFormFeedback({ show: false, success: false, text: '' })
      }, 8000)
    }
  }

  return (
    <div className={`theme1-root ${isDarkTheme ? 'dark-theme' : ''}`}>
      <Header
        personalInfo={personalInfo}
        showScrollHeader={showScrollHeader}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeNavSection={activeNavSection}
        activeQualTab={activeQualTab}
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        scrollToSection={scrollToSection}
      />

      <main className="main">
        <HomeSection personalInfo={personalInfo} scrollToSection={scrollToSection} />
        <AboutSection personalInfo={personalInfo} about={portfolioData.about} />
        <SkillsSection
          skills={skills}
          openSkillsIndex={openSkillsIndex}
          toggleSkillsCategory={toggleSkillsCategory}
          categoryIconMap={categoryIconMap}
        />
        <QualificationSection
          education={education}
          experiences={experiences}
          trainingsList={trainingsList}
          activeQualTab={activeQualTab}
          setActiveQualTab={setActiveQualTab}
          activeModalData={activeModalData}
          setActiveModalData={setActiveModalData}
        />
        <ProjectsSection
          allProjects={allProjects}
          currentProjectIndex={currentProjectIndex}
          setCurrentProjectIndex={setCurrentProjectIndex}
          handlePrevProject={handlePrevProject}
          handleNextProject={handleNextProject}
        />
        <FiverrSection />
        <ContactSection
          personalInfo={personalInfo}
          formState={formState}
          setFormState={setFormState}
          formFeedback={formFeedback}
          handleContactSubmit={handleContactSubmit}
          isSubmitting={isSubmitting}
        />
      </main>

      <FooterSection personalInfo={personalInfo} scrollToSection={scrollToSection} />
      <ScrollUp showScrollUpBtn={showScrollUpBtn} scrollToSection={scrollToSection} />
    </div>
  )
}
