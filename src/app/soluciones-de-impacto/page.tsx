'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiSun, FiMoon } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/app/components/Footer';

// Imágenes alusivas para cada servicio
const imagenesServicios = [
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80', // Glam Branding - moda/diseño
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80', // Catwalk Digital - analytics/digital
'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80', // Flash Ads
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80', // Story Luxe - contenido/escritura
  'https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&q=80', // Social Chic - redes sociales
];

const links = [
  '/soluciones-de-impacto/glam-branding',
  '/soluciones-de-impacto/catwalk-digital',
  '/soluciones-de-impacto/flash-ads',
  '/soluciones-de-impacto/story-luxe',
  '/soluciones-de-impacto/social-chic'
];

export default function SolucionesImpacto() {
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('zentaria-theme');
    if (savedTheme === 'light') setIsDarkMode(false);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('zentaria-theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <div ref={pageRef} className={`atelier-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="atelier-hero">
        <div className="soluciones-container">
          <span className="atelier-label">{t.soluciones.label}</span>
          <h1 className="soluciones-main-title">{t.soluciones.titulo}</h1>
          <p className="soluciones-intro">{t.soluciones.intro}</p>
          <div className="soluciones-grid">
            {t.soluciones.servicios.map((s, i) => (
              <Link href={links[i]} key={i} className="servicio-card">
                <div className="servicio-content">
                  <h2 className="servicio-titulo">{s.titulo}</h2>
                  <h3 className="servicio-subtitulo">{s.subtitulo}</h3>
                  <p className="servicio-descripcion">{s.descripcion}</p>
                  <div className="servicio-beneficios">
                    <span className="beneficios-label">{t.soluciones.beneficios_label}</span> {s.beneficios}
                  </div>
                </div>
                <div className="servicio-image-side">
                  <img src={imagenesServicios[i]} alt={s.titulo} className="servicio-image" />
                  <div className="servicio-image-overlay"></div>
                </div>
              </Link>
            ))}
          </div>
          <div className="soluciones-cta">
            <Link href="/coleccion-exclusiva" className="soluciones-cta-button">{t.soluciones.cta}</Link>
          </div>
        </div>
      </div>

      <Footer />

      <Link href="/cart" className="atelier-cart-float"><FiShoppingCart size={22} /></Link>
      <button onClick={toggleTheme} className="atelier-theme-toggle">{isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}</button>
    </div>
  );
}