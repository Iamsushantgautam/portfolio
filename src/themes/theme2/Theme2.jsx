import React, { useEffect } from 'react';
import './styles/theme2.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import FeaturedProjects from './components/Projects/FeaturedProjects';
import ShopifyStores from './components/Projects/ShopifyStores';
import UtilityTools from './components/Projects/UtilityTools';
import Skills from './components/Skills/Skills';
import Process from './components/Process/Process';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';

export default function Theme2() {
  useEffect(() => {
    const targetSection = sessionStorage.getItem('scrollToSection');
    if (targetSection) {
      sessionStorage.removeItem('scrollToSection');
      setTimeout(() => {
        const el = document.querySelector(targetSection);
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 120);
    }
  }, []);

  return (
    <div className="theme2">
      <Header />
      <main>
        <Hero />
        <About />
        <FeaturedProjects />
        <ShopifyStores />
        <UtilityTools />
        <Skills />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
