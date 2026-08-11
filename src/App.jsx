import React, { Component, Suspense, lazy } from 'react'
import ActiveTheme, { getActiveThemeKey } from './themes'
import portfolioData from './data/portfolio.json'

// Maps route segment → exact PascalCase filename in pages/ folders
const PAGE_NAME_MAP = {
  shopifystore: 'ShopifyStore',
  portfolios:   'Portfolios',
}

// Vite glob importers for theme pages and shared pages
const themePageModules  = import.meta.glob('./themes/*/pages/*.jsx')
const sharedPageModules = import.meta.glob('./pages/*/*.jsx')

/**
 * loadPage(pageName)
 *
 * Dynamically imports a page for the currently active theme.
 * 1. Checks if current theme has: src/themes/<activeTheme>/pages/<PascalCase>.jsx
 * 2. Falls back to default pages: src/pages/<pageName>/<PascalCase>.jsx
 * 3. If page does not exist, redirects to home page ('/')
 */
function loadPage(pageName) {
  const PascalName = PAGE_NAME_MAP[pageName] || pageName
  return lazy(() => {
    const rawKey = getActiveThemeKey()
    const activeTheme = rawKey.includes('theme2') ? 'theme2' : rawKey.includes('theme1') ? 'theme1' : 'main-theme'

    // 1. Try active theme's page
    const themePath = `./themes/${activeTheme}/pages/${PascalName}.jsx`
    if (themePageModules[themePath]) {
      return themePageModules[themePath]()
    }

    // 2. Try default shared pages/ directory
    const sharedPath = `./pages/${pageName}/${PascalName}.jsx`
    if (sharedPageModules[sharedPath]) {
      return sharedPageModules[sharedPath]()
    }

    // 3. If page is not available, redirect to home page
    if (typeof window !== 'undefined') {
      window.location.replace('/')
    }
    return Promise.resolve({ default: () => null })
  })
}

// ── Page registry — add new pages here as a single line ──────────────────────
const ShopifyStorePage = loadPage('shopifystore')
const PortfoliosPage   = loadPage('portfolios')

// ── Route map — add new routes here ──────────────────────────────────────────
const ROUTES = {
  '/shopifystore': ShopifyStorePage,
  '/shopifystore/': ShopifyStorePage,
  '/shopify-store': ShopifyStorePage,
  '/shopify-store/': ShopifyStorePage,
  '/shopify': ShopifyStorePage,
  '/shopify/': ShopifyStorePage,
  '/portfolios': PortfoliosPage,
  '/portfolios/': PortfoliosPage,
}

// ── Route error boundary ──────────────────────────────────────────────────

class RouteErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error) {
    console.error('Route error caught:', error)
  }
  render() {
    if (this.state.hasError) {
      return <ActiveTheme />
    }
    return this.props.children
  }
}

function App() {
  const path = window.location.pathname
  const PageComponent = ROUTES[path]

  // Matched route → render the page
  if (PageComponent) {
    return (
      <RouteErrorBoundary>
        <Suspense fallback={<div className="section-loader" />}>
          <PageComponent />
        </Suspense>
      </RouteErrorBoundary>
    )
  }

  // Unknown route → redirect to home
  if (path !== '/' && path !== '/index.html') {
    window.location.replace('/')
    return null
  }

  // Default → active portfolio theme
  return <ActiveTheme />
}

export default App
