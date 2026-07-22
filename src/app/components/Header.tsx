'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { FiX, FiMenu, FiHome, FiPenTool, FiTrendingUp, FiStar, FiMessageCircle, FiShoppingCart } from 'react-icons/fi';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, t, toggleLanguage } = useLanguage();

  const menuItems = [
    { label: t.header.inicio, path: '/', icon: <FiHome size={20} /> },
    { label: t.header.atelier_creativo, path: '/nuestro-atelier-creativo', icon: <FiPenTool size={20} /> },
    { label: t.header.soluciones_impacto, path: '/soluciones-de-impacto', icon: <FiTrendingUp size={20} /> },
    { label: t.header.coleccion_exclusiva, path: '/coleccion-exclusiva', icon: <FiStar size={20} /> },
    { label: t.header.punto_conexion, path: '/punto-de-conexion', icon: <FiMessageCircle size={20} /> },
    { label: ` ${t.header.carrito}`, path: '/cart', icon: <FiShoppingCart size={20} /> },
  ];

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link href="/" className="logo">
            <img src="/logo.svg" alt="PubliCore" />
          </Link>
          
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="menu-icon">{isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}</span>
            <span className="menu-text">{isMenuOpen ? t.header.cerrar : t.header.menu}</span>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="menu-overlay">
          <div className="menu-content">
            {/* Caja de navegación principal */}
            <div className="menu-box">
              
              <nav className="menu-nav">
                {menuItems.map((item, index) => (
                  <Link 
                    key={index} 
                    href={item.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className="menu-nav-item"
                  >
                    <span className="menu-nav-icon">{item.icon}</span>
                    <span className="menu-nav-text">{item.label}</span>
                    <span className="menu-nav-arrow">→</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Caja de información */}
            <div className="menu-info-box">
              <div className="menu-contact">
                <div className="menu-contact-item">
                  <span className="menu-contact-icon">📍</span>
                  <p>{t.header.direccion}</p>
                </div>
                <div className="menu-contact-item">
                  <span className="menu-contact-icon">📞</span>
                  <p>{t.header.telefono}</p>
                </div>
                <div className="menu-contact-item">
                  <span className="menu-contact-icon">✉️</span>
                  <p>{t.header.correo}</p>
                </div>
              </div>

              <div className="menu-bottom">
                <div className="menu-payment">
                  <img src="/visa.svg" alt="Visa" />
                  <img src="/mastercard.svg" alt="Mastercard" />
                </div>

                <button className="language-toggle-menu" onClick={toggleLanguage}>
                  {language === 'es' ? '🇺🇸 English' : '🇲🇽 Español'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}