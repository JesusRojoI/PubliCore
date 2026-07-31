'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiSun, FiMoon } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/app/components/Footer';

export default function PagarMiColeccion() {
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [coleccionId, setColeccionId] = useState('');
  const [totalPagar, setTotalPagar] = useState('');
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [zoomImg, setZoomImg] = useState(false);
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

  const mostrarMensaje = (texto: string) => { setMensaje(texto); setTimeout(() => setMensaje(null), 3000); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coleccionId || !totalPagar) { mostrarMensaje(t.pagar.campos_requeridos); return; }
    const monto = parseFloat(totalPagar);
    if (isNaN(monto) || monto <= 0) { mostrarMensaje('Ingresa un monto válido'); return; }
    const savedCart = localStorage.getItem('publicore-cart');
    const cartItems = savedCart ? JSON.parse(savedCart) : [];
    const newItem = { id: 'custom-' + Date.now(), nombre: `Colección Personalizada - ${coleccionId}`, sku: coleccionId, descripcion: 'Colección personalizada a la medida', detalles: ['Diseño personalizado', 'Cotización aprobada'], precio: monto, cupon: null, descuento: 0 };
    localStorage.setItem('publicore-cart', JSON.stringify([...cartItems, newItem]));
    mostrarMensaje(t.pagar.agregado);
    setColeccionId(''); setTotalPagar('');
  };

  const navTabs = [
    { label: t.pagar.breadcrumb.inicio, path: '/' },
    { label: t.pagar.breadcrumb.atelier, path: '/nuestro-atelier-creativo' },
    { label: t.pagar.breadcrumb.soluciones, path: '/soluciones-de-impacto' },
    { label: t.pagar.breadcrumb.coleccion, path: '/coleccion-exclusiva' },
    { label: t.pagar.breadcrumb.punto, path: '/punto-de-conexion' },
    { label: t.pagar.breadcrumb.carrito, path: '/cart' },
  ];

  return (
    <div ref={pageRef} className={`atelier-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {mensaje && <div className="toast-mensaje">{mensaje}</div>}
      <div className="pagar-navbar">
        <div className="pagar-navbar-inner">
          {navTabs.map((tab, i) => <Link key={i} href={tab.path} className="pagar-navbar-tab">{tab.label}</Link>)}
        </div>
      </div>
      <div className="atelier-hero">
        <div className="pagar-container">
          <span className="atelier-label">{t.pagar.label}</span>
          <h1 className="pagar-title">{t.pagar.titulo}</h1>
          <p className="pagar-intro">{t.pagar.intro}</p>
          <div className="pagar-content">
            <div className="pagar-form-wrapper">
              <form className="pagar-form" onSubmit={handleSubmit}>
                <div className="pagar-field"><label className="pagar-label">{t.pagar.id_label}</label><input type="text" className="pagar-input" placeholder={t.pagar.id_placeholder} value={coleccionId} onChange={(e) => setColeccionId(e.target.value)} /></div>
                <div className="pagar-field"><label className="pagar-label">{t.pagar.total_label} + {t.coleccion?.impuesto || 'IVA'}</label><input type="number" className="pagar-input" placeholder={t.pagar.total_placeholder} value={totalPagar} onChange={(e) => setTotalPagar(e.target.value)} min="0" step="0.01" /></div>
                <button type="submit" className="pagar-submit-btn">{t.pagar.boton}</button>
              </form>
            </div>
            <div className="pagar-image-container" onMouseEnter={() => setZoomImg(true)} onMouseLeave={() => setZoomImg(false)}>
              <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80" alt="Pagar colección" className={`pagar-image ${zoomImg ? 'zoomed' : ''}`} />
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