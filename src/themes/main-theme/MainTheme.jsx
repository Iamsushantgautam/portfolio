import React, { lazy, Suspense, useEffect } from 'react'
import Lenis from 'lenis'

import './styles/index.css'
import './styles/App.css'

// ─── Eager (above-the-fold, critical path) ────────────────────────────────────
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

// ─── Lazy (below-the-fold, code-split for faster initial load) ────────────────
const AboutSection       = lazy(() => import('./components/AboutSection'))
const EducationSection   = lazy(() => import('./components/EducationSection'))
const ExperienceSection  = lazy(() => import('./components/ExperienceSection'))
const SkillsSection      = lazy(() => import('./components/SkillsSection'))
const Projects           = lazy(() => import('./components/Projects'))
const UtilityToolsSection = lazy(() => import('./components/UtilityToolsSection'))
const ContactSection     = lazy(() => import('./components/ContactSection'))
const FooterSection      = lazy(() => import('./components/FooterSection'))

// ─── Skeleton fallback shown while lazy sections load ─────────────────────────
function SectionLoader() {
  return (
    <div style={{
      width: '100%',
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '3px solid rgba(233,30,99,0.15)',
        borderTop: '3px solid #e91e63',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function MainTheme() {
  useEffect(() => {
    // Remove dark-theme class from body when main-theme mounts
    document.body.classList.remove('dark-theme')

    const isMobile  = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    const isTouch   = window.matchMedia('(pointer: coarse)').matches
    const isTablet  = isTouch && window.innerWidth >= 768

    // ── Device-adaptive Lenis config ────────────────────────────────
    const lenis = new Lenis({
      // Easing: smooth cubic out — feels natural on all devices
      easing: (t) => 1 - Math.pow(1 - t, 4),

      // Desktop: long luxurious deceleration; mobile: snappier
      duration: isMobile ? 0.9 : isTablet ? 1.1 : 1.6,

      smoothWheel: !isMobile,          // native scroll on mobile is better
      syncTouch: isMobile,             // sync Lenis to native touch momentum
      syncTouchLerp: 0.06,             // silky touch interpolation
      touchInertiaMultiplier: 25,      // natural inertia throw on touch

      wheelMultiplier: 0.85,           // desktop wheel — controlled deceleration
      touchMultiplier: isMobile ? 1.0 : 1.6,  // let native touch breathe on phones

      lerp: isMobile ? 0.12 : 0.07,   // faster interpolation on mobile
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      autoResize: true,
    })

    // Sync Lenis scroll position with framer-motion's scroll tracking
    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll', { bubbles: true }))
    })

    // Drive Lenis with native RAF — works across all framer-motion versions
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="main-theme-root">
      {/* ── Critical above-the-fold (eager) ─────────────────────── */}
      <CustomCursor />
      <Navbar />
      <HeroSection />

      {/* ── Below-the-fold (lazy loaded, each in its own Suspense) ─ */}
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <EducationSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ExperienceSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <UtilityToolsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <FooterSection />
      </Suspense>
    </div>
  )
}
