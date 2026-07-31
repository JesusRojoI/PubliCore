'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiSun, FiMoon, FiMapPin, FiPhone, FiMail, FiCheck } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/app/components/Footer';

export default function PuntoConexion() {
  const { t, language } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [nombre, setNombre] = useState(''); const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState(''); const [mensajeTexto, setMensajeTexto] = useState('');
  const [consentimiento, setConsentimiento] = useState(false);
  const [toastMensaje, setToastMensaje] = useState<string | null>(null);
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

  const mostrarMensaje = (texto: string) => { setToastMensaje(texto); setTimeout(() => setToastMensaje(null), 3000); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email || !asunto || !mensajeTexto) { mostrarMensaje(t.conexion.campos_requeridos); return; }
    if (!consentimiento) { mostrarMensaje(t.conexion.consentimiento_requerido); return; }
    try {
      const response = await fetch('/api/enviar-correo-contacto', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, asunto, mensaje: mensajeTexto, language }),
      });
      if (!response.ok) throw new Error('Error');
      mostrarMensaje(t.conexion.exito);
      setNombre(''); setEmail(''); setAsunto(''); setMensajeTexto(''); setConsentimiento(false);
    } catch { mostrarMensaje(t.conexion.error); }
  };

  return (
    <div ref={pageRef} className={`atelier-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {toastMensaje && <div className="toast-mensaje">{toastMensaje}</div>}
      <div className="atelier-hero">
        <div className="conexion-container">
          <span className="atelier-label">{t.conexion.label}</span>
          <h1 className="conexion-title">{t.conexion.titulo}</h1>
          <p className="conexion-intro">{t.conexion.intro1}</p>
          <p className="conexion-intro">{t.conexion.intro2}</p>
          <div className="conexion-content">
            <div className="conexion-info">
              <h2 className="conexion-info-title">{t.conexion.info_titulo}</h2>
              <div className="conexion-info-item"><div className="conexion-info-icon"><FiMapPin size={22} /></div><div className="conexion-info-text"><span className="conexion-info-label">{t.conexion.direccion_label}</span><p>{t.conexion.direccion}</p></div></div>
              <div className="conexion-info-item"><div className="conexion-info-icon"><FiPhone size={22} /></div><div className="conexion-info-text"><span className="conexion-info-label">{t.conexion.telefono_label}</span><p>{t.conexion.telefono}</p></div></div>
              <div className="conexion-info-item"><div className="conexion-info-icon"><FiMail size={22} /></div><div className="conexion-info-text"><span className="conexion-info-label">{t.conexion.correo_label}</span><p>{t.conexion.correo}</p></div></div>
            </div>
            <div className="conexion-form-wrapper">
              <h2 className="conexion-form-title">{t.conexion.form_titulo}</h2>
              <form className="conexion-form" onSubmit={handleSubmit}>
                <div className="conexion-field"><input type="text" className="conexion-input" placeholder={t.conexion.placeholder_nombre} value={nombre} onChange={(e) => setNombre(e.target.value)} /></div>
                <div className="conexion-field"><input type="email" className="conexion-input" placeholder={t.conexion.placeholder_email} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div className="conexion-field"><input type="text" className="conexion-input" placeholder={t.conexion.placeholder_asunto} value={asunto} onChange={(e) => setAsunto(e.target.value)} /></div>
                <div className="conexion-field"><textarea className="conexion-textarea" placeholder={t.conexion.placeholder_mensaje} value={mensajeTexto} onChange={(e) => setMensajeTexto(e.target.value)} rows={5} /></div>
                <div className={`conexion-consentimiento ${consentimiento ? 'selected' : ''}`} onClick={() => setConsentimiento(!consentimiento)}>
                  <div className={`conexion-checkbox ${consentimiento ? 'checked' : ''}`}>{consentimiento && <FiCheck size={14} />}</div>
                  <span className="conexion-consentimiento-text">{t.conexion.consentimiento} <Link href="/politica-privacidad" className="conexion-link">{t.conexion.politicas}</Link> y <Link href="/terminos-condiciones" className="conexion-link">{t.conexion.terminos}</Link></span>
                </div>
                <button type="submit" className="conexion-submit-btn">{t.conexion.boton}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      <Link href="/cart" className="atelier-cart-float"><FiShoppingCart size={22} /></Link>
      <button onClick={toggleTheme} className="atelier-theme-toggle">{isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}</button>
    </div>
  );
}