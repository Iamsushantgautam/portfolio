import React from 'react'
import {
  Sun,
  Moon,
  Home,
  User,
  FileText,
  Folder,
  Award,
  GraduationCap,
  Layout,
  ShoppingBag,
  Send,
  X,
  LayoutGrid
} from 'lucide-react'

export default function Header({
  personalInfo,
  showScrollHeader,
  isMenuOpen,
  setIsMenuOpen,
  activeNavSection,
  activeQualTab,
  isDarkTheme,
  setIsDarkTheme,
  scrollToSection
}) {
  return (
    <header className={`header ${showScrollHeader ? 'scroll-header' : ''}`} id="header">
      <nav className="nav container">
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="nav__logo">
          {personalInfo.logotext || personalInfo.name}
        </a>

        <div className={`nav__menu ${isMenuOpen ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="nav__list grid">
            <li className="nav__item">
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, '#home')}
                className={`nav__link ${activeNavSection === 'home' ? 'active-link' : ''}`}
              >
                <Home size={18} className="nav__icon" />Home
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, '#about')}
                className={`nav__link ${activeNavSection === 'about' ? 'active-link' : ''}`}
              >
                <User size={18} className="nav__icon" />About
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#skills"
                onClick={(e) => scrollToSection(e, '#skills')}
                className={`nav__link ${activeNavSection === 'skills' ? 'active-link' : ''}`}
              >
                <FileText size={18} className="nav__icon" />Skills
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#work"
                onClick={(e) => scrollToSection(e, '#work')}
                className={`nav__link ${activeNavSection === 'qualification' && activeQualTab === 'work' ? 'active-link' : ''}`}
              >
                <Folder size={18} className="nav__icon" />Work
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#trainings"
                onClick={(e) => scrollToSection(e, '#trainings')}
                className={`nav__link ${activeNavSection === 'qualification' && activeQualTab === 'trainings' ? 'active-link' : ''}`}
              >
                <Award size={18} className="nav__icon" />Trainings
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#education"
                onClick={(e) => scrollToSection(e, '#education')}
                className={`nav__link ${activeNavSection === 'qualification' && activeQualTab === 'education' ? 'active-link' : ''}`}
              >
                <GraduationCap size={18} className="nav__icon" />Qualification
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#portfolio"
                onClick={(e) => scrollToSection(e, '#portfolio')}
                className={`nav__link ${activeNavSection === 'portfolio' ? 'active-link' : ''}`}
              >
                <Layout size={18} className="nav__icon" />Projects
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#fiverr"
                onClick={(e) => scrollToSection(e, '#fiverr')}
                className={`nav__link ${activeNavSection === 'fiverr' ? 'active-link' : ''}`}
              >
                <ShoppingBag size={18} className="nav__icon" />Fiverr
              </a>
            </li>
            <li className="nav__item">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className={`nav__link ${activeNavSection === 'contact' ? 'active-link' : ''}`}
              >
                <Send size={18} className="nav__icon" />Contact-Me
              </a>
            </li>
          </ul>
          <X size={22} className="nav__close" id="nav-close" onClick={() => setIsMenuOpen(false)} />
        </div>

        <div className="nav__btns">
          {/* Theme change button */}
          <button
            className="change-theme"
            id="theme-button"
            title={isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            {isDarkTheme ? <Sun size={20} strokeWidth={2.2} /> : <Moon size={20} strokeWidth={2.2} />}
          </button>

          <div className="nav__toggle" id="nav-toggle" onClick={() => setIsMenuOpen(true)}>
            <LayoutGrid size={20} />
          </div>
        </div>
      </nav>
    </header>
  )
}

