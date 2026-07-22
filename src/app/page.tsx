'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = [
    { image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80', title: t.home.seccion1_titulo, subtitle: t.home.seccion1_subtitulo, link: '/nuestro-atelier-creativo' },
    { image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80', title: t.home.seccion2_titulo, subtitle: t.home.seccion2_subtitulo, link: '/soluciones-de-impacto' },
    { image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80', title: t.home.seccion3_titulo, subtitle: t.home.seccion3_subtitulo, link: '/coleccion-exclusiva' }
  ];

  const changeSection = (newIndex: number) => {
    if (isScrolling) return;
    const container = containerRef.current;
    if (!container) return;
    setIsScrolling(true);
    setActiveSection(newIndex);
    container.scrollTo({ top: newIndex * window.innerHeight, behavior: 'smooth' });
    setTimeout(() => setIsScrolling(false), 900);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let touchStartY = 0, touchEndY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      if (e.deltaY > 50 && activeSection < sections.length - 1) changeSection(activeSection + 1);
      else if (e.deltaY < -50 && activeSection > 0) changeSection(activeSection - 1);
    };

    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 50 && !isScrolling) {
        if (diff > 0 && activeSection < sections.length - 1) changeSection(activeSection + 1);
        else if (diff < 0 && activeSection > 0) changeSection(activeSection - 1);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, isScrolling]);

  const scrollToSection = (index: number) => { if (index !== activeSection) changeSection(index); };

  return (
    <>
      <div ref={containerRef} className="home-container">
        {sections.map((section, index) => (
          <div key={index} id={`section-${index}`} className={`home-section ${activeSection === index ? 'section-active' : ''}`} style={{ backgroundImage: `url(${section.image})` }}>
            <div className={`section-content ${activeSection === index ? 'content-visible' : ''}`}>
              <h1 className="section-title">{section.title}</h1>
              <Link href={section.link} className="section-subtitle">{section.subtitle}</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="scroll-indicator">
        {sections.map((_, index) => (
          <div key={index} className={`scroll-dot ${activeSection === index ? 'active' : ''}`} onClick={() => scrollToSection(index)} />
        ))}
      </div>
    </>
  );
}