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
    // 1. URL parameter override (e.g. /?theme=theme1)
    const params = new URLSearchParams(window.location.search)
    const urlTheme = params.get('theme') || params.get('preview')
    if (urlTheme && themes[urlTheme.toLowerCase().trim()]) {
      const selectedTheme = urlTheme.toLowerCase().trim()
      try {
        sessionStorage.setItem('activePreviewTheme', selectedTheme)
        params.delete('theme')
        params.delete('preview')
        const newSearch = params.toString()
        const cleanUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '') + window.location.hash
        window.history.replaceState(null, '', cleanUrl)
      } catch (err) {
        // Silent fallback
      }
      return selectedTheme
    }

    // 2. Active preview session override
    try {
      const savedPreview = sessionStorage.getItem('activePreviewTheme')
      if (savedPreview && themes[savedPreview.toLowerCase().trim()]) {
        return savedPreview.toLowerCase().trim()
      }
    } catch (err) {
      // Silent fallback
    }
  }

  // 3. Follow portfolio.json activeTheme setting
  const rawKey = (portfolioData && (portfolioData.activeTheme || portfolioData.theme)) || 'main-theme'
  return rawKey.toString().toLowerCase().trim()
}

export const themeColors = {
  'theme2': '#AF97F4',
  'theme-2': '#AF97F4',
  'theme1': '#6366F1',
  'main-theme': '#E8D94B',
  'maintheme': '#E8D94B',
}

export function updateMetaThemeColor(themeKey) {
  if (typeof document === 'undefined') return;
  const key = (themeKey || getActiveThemeKey()).toLowerCase().trim();
  const color = themeColors[key] || (key.includes('theme2') ? '#AF97F4' : key.includes('theme1') ? '#6366F1' : '#E8D94B');
  
  let metaEl = document.querySelector('meta[name="theme-color"]');
  if (!metaEl) {
    metaEl = document.createElement('meta');
    metaEl.setAttribute('name', 'theme-color');
    document.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', color);
}

export function setActiveThemeKey(themeKey) {
  if (typeof window !== 'undefined') {
    if (themeKey) {
      try {
        sessionStorage.setItem('activePreviewTheme', themeKey.toLowerCase().trim())
      } catch (e) {}
    }
    updateMetaThemeColor(themeKey)
    window.dispatchEvent(new Event('themechange'))
  }
}

export function ActiveTheme(props) {
  const [currentKey, setCurrentKey] = useState(getActiveThemeKey())

  useEffect(() => {
    updateMetaThemeColor(currentKey)
    const handleThemeChange = () => {
      const newKey = getActiveThemeKey()
      setCurrentKey(newKey)
      updateMetaThemeColor(newKey)
    }
    window.addEventListener('themechange', handleThemeChange)
    window.addEventListener('popstate', handleThemeChange)
    return () => {
      window.removeEventListener('themechange', handleThemeChange)
      window.removeEventListener('popstate', handleThemeChange)
    }
  }, [currentKey])

  const ThemeComponent = themes[currentKey] || (currentKey.includes('theme2') ? Theme2 : currentKey.includes('theme1') ? Theme1 : MainTheme)

  return React.createElement(ThemeComponent, props)
}

export { MainTheme, Theme1, Theme2 }
export default ActiveTheme


