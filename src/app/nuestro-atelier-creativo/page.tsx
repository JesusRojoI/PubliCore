'use client'
import Footer from '@/app/components/Footer';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiSun, FiMoon, FiArrowUp } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

export default function AtelierCreativo() {
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('zentaria-theme');
    if (savedTheme === 'light') setIsDarkMode(false);
  }, []);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const handleScroll = () => setShowScrollTop(el.scrollTop > 300);
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('zentaria-theme', newDarkMode ? 'dark' : 'light');
  };

  const scrollToTop = () => {
    pageRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={pageRef} className={`atelier-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="atelier-hero">
        <div className="atelier-content">
          <div className="atelier-text">
            <span className="atelier-label">{t.atelier.label}</span>
            <h1 className="atelier-title">{t.atelier.titulo}</h1>
            <p className="atelier-description">{t.atelier.descripcion1}</p>
            <p className="atelier-description">{t.atelier.descripcion2}</p>
            <h2 className="atelier-subtitle">{t.atelier.subtitulo}</h2>
            <ul className="atelier-list">
              {t.atelier.lista.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="atelier-description">{t.atelier.descripcion3}</p>
            <p className="atelier-highlight">{t.atelier.highlight}</p>
            <Link href="/soluciones-de-impacto" className="atelier-button">{t.atelier.boton}</Link>
          </div>
          <div className="atelier-image-container">
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80" alt="Atelier" className="atelier-image" />
          </div>
        </div>
      </div>

      <Footer />
      <Link href="/cart" className="atelier-cart-float"><FiShoppingCart size={22} /></Link>
      <button onClick={toggleTheme} className="atelier-theme-toggle">
        {isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
      </button>
      {showScrollTop && (
        <button onClick={scrollToTop} style={{ position: 'fixed', bottom: '2rem', right: '6rem', zIndex: 100, width: 48, height: 48, display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', cursor: 'pointer', borderRadius: '50%', background: 'var(--gradient-accent)', color: '#1a1a1a' }}>
          <FiArrowUp size={22} />
        </button>
      )}
    </div>
  );
}