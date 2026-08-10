import React, { useState, useEffect } from 'react'
import MainTheme from './main-theme/MainTheme'
import Theme1 from './theme1/Theme1'
import portfolioData from '../data/portfolio.json'

const themes = {
  'theme1': Theme1,
  'main-theme': MainTheme,
  'maintheme': MainTheme,
}

export function getActiveThemeKey() {
  if (typeof window !== 'undefined') {
    // 1. sessionStorage preview override (no URL params needed)
    const previewTheme = sessionStorage.getItem('preview-theme')
    if (previewTheme && themes[previewTheme.toLowerCase().trim()]) {
      return previewTheme.toLowerCase().trim()
    }

    // 2. Persisted user selection
    const savedTheme = localStorage.getItem('user_active_theme')
    if (savedTheme && themes[savedTheme.toLowerCase().trim()]) {
      return savedTheme.toLowerCase().trim()
    }
  }

  const rawKey = (portfolioData && (portfolioData.activeTheme || portfolioData.theme)) || 'main-theme'
  return rawKey.toString().toLowerCase().trim()
}

export function setActiveThemeKey(themeKey) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user_active_theme', themeKey)
    window.dispatchEvent(new Event('themechange'))
  }
}

export function ActiveTheme(props) {
  const [currentKey, setCurrentKey] = useState(getActiveThemeKey())

  useEffect(() => {
    const handleThemeChange = () => {
      setCurrentKey(getActiveThemeKey())
    }
    window.addEventListener('themechange', handleThemeChange)
    window.addEventListener('popstate', handleThemeChange)
    return () => {
      window.removeEventListener('themechange', handleThemeChange)
      window.removeEventListener('popstate', handleThemeChange)
    }
  }, [])

  const ThemeComponent = themes[currentKey] || (currentKey.includes('theme1') ? Theme1 : MainTheme)

  return React.createElement(ThemeComponent, props)
}

export { MainTheme, Theme1 }
export default ActiveTheme


