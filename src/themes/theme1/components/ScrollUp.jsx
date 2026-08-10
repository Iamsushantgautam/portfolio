import React from 'react'

export default function ScrollUp({ showScrollUpBtn, scrollToSection }) {
  return (
    <a
      href="#home"
      onClick={(e) => scrollToSection(e, '#home')}
      className={`scrollup ${showScrollUpBtn ? 'show-scroll' : ''}`}
      id="scroll-up"
    >
      <i className="uil uil-arrow-up scrollup__icon"></i>
    </a>
  )
}
