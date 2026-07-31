'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiSun, FiMoon, FiCheck } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/app/components/Footer';

export default function DisenarMiColeccion() {
  const { t, language } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [nombre, setNombre] = useState(''); const [email, setEmail] = useState('');
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);
  const [comentarios, setComentarios] = useState('');
  const [consentimiento, setConsentimiento] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const servicios = t.disenar.servicios_lista;

  useEffect(() => {
    const savedTheme = localStorage.getItem('zentaria-theme');
    if (savedTheme === 'light') setIsDarkMode(false);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('zentaria-theme', newDarkMode ? 'dark' : 'light');
  };

  const toggleServicio = (s: string) => setServiciosSeleccionados(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const mostrarMensaje = (texto: string) => { setMensaje(texto); setTimeout(() => setMensaje(null), 3000); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !email) { mostrarMensaje(t.disenar.campos_requeridos); return; }
    if (serviciosSeleccionados.length === 0) { mostrarMensaje(t.disenar.servicios_requeridos); return; }
    if (!consentimiento) { mostrarMensaje(t.disenar.consentimiento_requerido); return; }
    try {
      const response = await fetch('/api/enviar-correo-disenar', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, servicios: serviciosSeleccionados, comentarios, language }),
      });
      if (!response.ok) throw new Error('Error');
      mostrarMensaje(t.disenar.exito);
      setNombre(''); setEmail(''); setServiciosSeleccionados([]); setComentarios(''); setConsentimiento(false);
    } catch { mostrarMensaje(t.disenar.error); }
  };

  return (
    <div ref={pageRef} className={`atelier-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {mensaje && <div className="toast-mensaje">{mensaje}</div>}
      <div className="atelier-hero">
        <div className="disenar-container">
          <span className="atelier-label">{t.disenar.label}</span>
          <h1 className="disenar-title">{t.disenar.titulo}</h1>
          <p className="disenar-intro">{t.disenar.intro}</p>
          <form className="disenar-form" onSubmit={handleSubmit}>
            <div className="disenar-section"><h2 className="disenar-section-title">{t.disenar.datos_contacto}</h2>
              <div className="disenar-grid-2">
                <div className="disenar-field"><label className="disenar-label">{t.disenar.nombre_label}</label><input type="text" className="disenar-input" placeholder={t.disenar.nombre_placeholder} value={nombre} onChange={(e) => setNombre(e.target.value)} /></div>
                <div className="disenar-field"><label className="disenar-label">{t.disenar.email_label}</label><input type="email" className="disenar-input" placeholder={t.disenar.email_placeholder} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              </div>
            </div>
            <div className="disenar-section"><h2 className="disenar-section-title">{t.disenar.servicios_titulo}</h2><p className="disenar-section-subtitle">{t.disenar.servicios_subtitulo}</p>
              <div className="disenar-servicios-grid">
                {servicios.map((s, i) => (
                  <div key={i} className={`disenar-servicio-item ${serviciosSeleccionados.includes(s) ? 'selected' : ''}`} onClick={() => toggleServicio(s)}>
                    <div className={`disenar-checkbox ${serviciosSeleccionados.includes(s) ? 'checked' : ''}`}>{serviciosSeleccionados.includes(s) && <FiCheck size={16} />}</div>
                    <span className="disenar-servicio-text">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="disenar-section"><h2 className="disenar-section-title">{t.disenar.comentarios_titulo}</h2><textarea className="disenar-textarea" placeholder={t.disenar.comentarios_placeholder} value={comentarios} onChange={(e) => setComentarios(e.target.value)} rows={6} /></div>
            <div className="disenar-section">
              <div className={`disenar-consentimiento ${consentimiento ? 'selected' : ''}`} onClick={() => setConsentimiento(!consentimiento)}>
                <div className={`disenar-checkbox ${consentimiento ? 'checked' : ''}`}>{consentimiento && <FiCheck size={16} />}</div>
                <span className="disenar-consentimiento-text">{t.disenar.consentimiento} <Link href="/politica-privacidad" className="disenar-link">{t.disenar.politicas}</Link> y <Link href="/terminos-condiciones" className="disenar-link">{t.disenar.terminos}</Link></span>
              </div>
            </div>
            <button type="submit" className="disenar-submit-btn">{t.disenar.boton}</button>
          </form>
        </div>
      </div>
      <Footer />
      <Link href="/cart" className="atelier-cart-float"><FiShoppingCart size={22} /></Link>
      <button onClick={toggleTheme} className="atelier-theme-toggle">{isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}</button>
    </div>
  );
}