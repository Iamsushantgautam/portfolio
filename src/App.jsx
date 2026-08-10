import { Suspense, lazy } from 'react'
import ActiveTheme from './themes'
import portfolioData from './data/portfolio.json'

// ── Active theme from portfolio.json ──────────────────────────────────────────
const activeTheme = portfolioData.activeTheme || 'main-theme'

/**
 * loadPage(pageName)
 *
 * Dynamically imports a page from the active theme's /pages/ folder.
 * Falls back to main-theme if the page doesn't exist for the active theme.
 *
 * Convention: src/themes/<themeName>/pages/<PageName>.jsx
 *
 * ✅ Add a new theme  → just create  src/themes/<newTheme>/pages/
 * ✅ Add a new page   → just create  src/themes/<theme>/pages/<NewPage>.jsx
 * ✅ No changes here  → App.jsx never needs to be touched again.
 */
function loadPage(pageName) {
  return lazy(() =>
    import(`./pages/${pageName}.jsx`).catch(() =>
      import(`./pages/${pageName}/ShopifyStore.jsx`).catch(() =>
        import(`./pages/${pageName}/Portfolios.jsx`).catch(() =>
          import(`./themes/${activeTheme}/pages/${pageName}.jsx`).catch(() =>
            import(`./themes/main-theme/pages/${pageName}.jsx`)
          )
        )
      )
    )
  )
}

// ── Page registry — add new pages here as a single line ──────────────────────
const ShopifyStorePage = loadPage('shopifystore')
const PortfoliosPage   = loadPage('portfolios')

// ── Route map — add new routes here ──────────────────────────────────────────
const ROUTES = {
  '/shopifystore': ShopifyStorePage,
  '/shopifystore/': ShopifyStorePage,
  '/portfolios': PortfoliosPage,
  '/portfolios/': PortfoliosPage,
}

function App() {
  const path = window.location.pathname
  const PageComponent = ROUTES[path]

  // Matched route → render the page
  if (PageComponent) {
    return (
      <Suspense fallback={<div className="section-loader" />}>
        <PageComponent />
      </Suspense>
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
