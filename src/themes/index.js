import React, { useState, useEffect } from 'react'
import MainTheme from './main-theme/MainTheme'
import Theme1 from './theme1/Theme1'
import Theme2 from './theme2/Theme2'
import portfolioData from '../data/portfolio.json'

const themes = {
  'theme1': Theme1,
  'theme2': Theme2,
  'theme-2': Theme2,
  'main-theme': MainTheme,
  'maintheme': MainTheme,
}

export function getActiveThemeKey() {
  if (typeof window !== 'undefined') {
    // URL parameter override (e.g. /?theme=theme2)
    const params = new URLSearchParams(window.location.search)
    const urlTheme = params.get('theme') || params.get('preview')
    if (urlTheme && themes[urlTheme.toLowerCase().trim()]) {
      return urlTheme.toLowerCase().trim()
    }
  }

  // Strictly follow portfolio.json activeTheme setting (no cache/localStorage)
  const rawKey = (portfolioData && (portfolioData.activeTheme || portfolioData.theme)) || 'main-theme'
  return rawKey.toString().toLowerCase().trim()
}

export function setActiveThemeKey(themeKey) {
  if (typeof window !== 'undefined') {
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

  const ThemeComponent = themes[currentKey] || (currentKey.includes('theme2') ? Theme2 : currentKey.includes('theme1') ? Theme1 : MainTheme)

  return React.createElement(ThemeComponent, props)
}

export { MainTheme, Theme1, Theme2 }
export default ActiveTheme


