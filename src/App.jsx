import { useEffect, Suspense, lazy } from 'react'
import Lenis from 'lenis'
import './styles/App.css'

import Navbar from './components/Navbar'
import FloatingBg from './components/FloatingBg'
import HeroSection from './components/HeroSection' // No lazy for LCP

// Lazy Load Sections for faster initial bundle and loading
const AboutSection = lazy(() => import('./components/AboutSection'))
const ExperienceSection = lazy(() => import('./components/ExperienceSection'))
const EducationSection = lazy(() => import('./components/EducationSection'))
const SkillsSection = lazy(() => import('./components/SkillsSection'))
const MernProjects = lazy(() => import('./components/MernProjects'))
const ShopifyProjects = lazy(() => import('./components/ShopifyProjects'))
const FiverrSection = lazy(() => import('./components/FiverrSection'))
const UtilityToolsSection = lazy(() => import('./components/UtilityToolsSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const FooterSection = lazy(() => import('./components/FooterSection'))

// Lazy Load Pages
const ShopifyStorePage = lazy(() => import('./pages/ShopifyStore'))

function App() {
  const path = window.location.pathname

  // Route: /shopifystore → render the ShopifyStore page
  if (path === '/shopifystore' || path === '/shopifystore/') {
    return (
      <Suspense fallback={<div className="section-loader" />}>
        <ShopifyStorePage />
      </Suspense>
    )
  }

  // Redirect to home page if route is not found/recognized
  if (path !== '/' && path !== '/index.html') {
    window.location.replace('/')
    return null
  }

  // Default: main portfolio page
  return <PortfolioHome />
}

function PortfolioHome() {
  // Global smooth scroll setup with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,             // Buttery smooth interpolation for desktop wheel events
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,      // Smooth scrolling for mouse wheel
      syncTouch: true,        // Sync scroll position on mobile/tablet touch screens
      syncTouchLerp: 0.08,    // Linear interpolation for touch scrolling
      touchMultiplier: 1.2,   // Speed modifier for touch events
      wheelMultiplier: 1.0,   // Speed modifier for wheel events
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="portfolio-wrapper">
      <FloatingBg />
      <Navbar />

      <HeroSection />

      <Suspense fallback={<div className="section-loader" />}>
        <section id="about">
          <AboutSection />
        </section>

        <section id="education">
          <EducationSection />
        </section>

        <section id="experience">
          <ExperienceSection />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>

        <section id="mern">
          <MernProjects />
        </section>

        {/* <section id="shopify">
          <ShopifyProjects />
        </section> */}

        <section id="utility-tools">
          <UtilityToolsSection />
        </section>

        {/* <section id="fiverr">
          <FiverrSection />
        </section> */}

        <section id="contact">
          <ContactSection />
        </section>

        <FooterSection />
      </Suspense>
    </div>
  )
}

export default App
