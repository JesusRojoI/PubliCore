'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiSun, FiMoon, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/app/components/Footer';

export default function FlashAds() {
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [hoverLink, setHoverLink] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const images = [
'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80',    'https://images.unsplash.com/photo-1557838923-2985c318be48?w=1200&q=80'
  ];
  const nextImage = currentImage === 0 ? 1 : 0;

  useEffect(() => {
    const savedTheme = localStorage.getItem('zentaria-theme');
    if (savedTheme === 'light') setIsDarkMode(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating) {
        setAnimating(true);
        setTimeout(() => { setCurrentImage(nextImage); setTimeout(() => setAnimating(false), 50); }, 800);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImage, animating, nextImage]);

  const changeImage = (index: number) => {
    if (index !== currentImage && !animating) {
      setAnimating(true);
      setTimeout(() => { setCurrentImage(index); setTimeout(() => setAnimating(false), 50); }, 800);
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('zentaria-theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <div ref={pageRef} className={`atelier-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="atelier-hero">
        <div className="servicio-detalle-container">
          <span className="atelier-label">{t.flash_ads.label}</span>
          <h1 className="servicio-detalle-title">{t.flash_ads.titulo}</h1>

          <div className="servicio-slider">
            <div className="slider-container">
              <div className={`slider-image ${animating ? (currentImage === 0 ? 'leaving' : 'entering') : currentImage === 0 ? 'active' : 'waiting'}`} style={{ backgroundImage: `url(${images[0]})` }} />
              <div className={`slider-image ${animating ? (currentImage === 1 ? 'leaving' : 'entering') : currentImage === 1 ? 'active' : 'waiting'}`} style={{ backgroundImage: `url(${images[1]})` }} />
            </div>
            <div className="slider-dots">
              {images.map((_, i) => <button key={i} className={`slider-dot ${currentImage === i ? 'active' : ''}`} onClick={() => changeImage(i)} />)}
            </div>
          </div>

          <div className="servicio-detalle-content">
            <h2 className="servicio-detalle-subtitle">{t.flash_ads.subtitulo}</h2>
            <p className="servicio-detalle-text">{t.flash_ads.texto1}</p>
            <p className="servicio-detalle-text">{t.flash_ads.texto2}</p>
            <p className="servicio-detalle-text">{t.flash_ads.texto3}</p>
            <p className="servicio-detalle-text">{t.flash_ads.texto4}</p>
            <p className="servicio-detalle-text">{t.flash_ads.texto5}</p>
            <div className="servicio-detalle-beneficios">
              <span className="beneficios-label">{t.flash_ads.beneficios_label}</span> {t.flash_ads.beneficios}
            </div>
          </div>

          <div className="servicio-navegacion">
            <div className="servicio-nav-wrapper" onMouseEnter={() => setHoverLink('coleccion')} onMouseLeave={() => setHoverLink(null)}>
              <Link href="/coleccion-exclusiva" className="servicio-nav-link prev"><FiArrowLeft size={20} /><span>{t.flash_ads.nav_prev}</span></Link>
              <div className={`nav-preview ${hoverLink === 'coleccion' ? 'visible' : ''}`}><div className="preview-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80)' }} /></div>
            </div>
            <div className="servicio-nav-wrapper" onMouseEnter={() => setHoverLink('social')} onMouseLeave={() => setHoverLink(null)}>
              <Link href="/soluciones-de-impacto/social-chic" className="servicio-nav-link next"><span>{t.flash_ads.nav_next}</span><FiArrowRight size={20} /></Link>
              <div className={`nav-preview ${hoverLink === 'social' ? 'visible' : ''}`}><div className="preview-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&q=80)' }} /></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <Link href="/cart" className="atelier-cart-float"><FiShoppingCart size={22} /></Link>
      <button onClick={toggleTheme} className="atelier-theme-toggle">{isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}</button>
    </div>
  );
}