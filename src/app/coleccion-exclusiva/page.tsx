'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiSun, FiMoon, FiX, FiGift } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

function generateCoupon(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

interface Producto {
  id: string;
  nombre: string;
  sku: string;
  descripcion: string;
  precio: number;
  detalles: string[];
}

export default function ColeccionExclusiva() {
  const { t, language } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showRuleta, setShowRuleta] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);
  const [cupon, setCupon] = useState('');
  const [yaJugo, setYaJugo] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const descuentos = [0, 7, 10, 12, 16, 20];
  const coloresRuleta = ['#1a3a2a', '#0d2a1a', '#2a5a3a', '#1a4a2a', '#3a6a4a', '#2a5a3a'];
  const emojisRuleta = ['😢', '7%', '10%', '12%', '16%', '20%'];

  const mostrarMensaje = (texto: string) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(null), 3000);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('zentaria-theme');
    if (savedTheme === 'light') setIsDarkMode(false);
    const jugo = localStorage.getItem('publicore-ya-jugo');
    if (jugo === 'true') setYaJugo(true);
    else setShowRuleta(true);
    const savedCart = localStorage.getItem('publicore-cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('zentaria-theme', newDarkMode ? 'dark' : 'light');
  };

  const girarRuleta = () => {
    if (!nombre || !email) { mostrarMensaje(t.ruleta.campos_requeridos); return; }
    if (yaJugo) { mostrarMensaje(t.ruleta.ya_participaste); return; }
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * descuentos.length);
    const descuentoGanado = descuentos[randomIndex];
    const nuevoCupon = descuentoGanado > 0 ? generateCoupon() : '';
    const sectorAngle = 360 / descuentos.length;
    const targetAngle = 360 * 5 + (360 - randomIndex * sectorAngle) - sectorAngle / 2;
    setRotation(rotation + targetAngle);
    const descuentoFinal = descuentoGanado;
    const cuponFinal = nuevoCupon;
    setTimeout(() => {
      setSpinning(false);
      setResultado(descuentoFinal);
      setYaJugo(true);
      localStorage.setItem('publicore-ya-jugo', 'true');
      if (descuentoFinal > 0) {
        setCupon(cuponFinal);
        fetch('/api/enviar-correo-cupon', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: email, nombre, descuento: descuentoFinal, cupon: cuponFinal, language }),
        }).catch(err => console.log('Error:', err));
      }
    }, 4000);
  };

  const copiarCupon = () => {
    navigator.clipboard.writeText(cupon);
    mostrarMensaje(t.ruleta.cupon_copiado);
  };

  const agregarAlCarrito = (producto: Producto, index: number) => {
    const productoTrad = t.coleccion.productos[index];
    const newCart = [...cartItems, {
      ...producto,
      nombre: productoTrad.nombre,
      descripcion: productoTrad.descripcion,
      detalles: productoTrad.detalles,
      cupon: resultado && resultado > 0 ? cupon : null,
      descuento: resultado && resultado > 0 ? resultado : 0
    }];
    setCartItems(newCart);
    localStorage.setItem('publicore-cart', JSON.stringify(newCart));
    mostrarMensaje(`${productoTrad.nombre} ${t.ruleta.producto_agregado}`);
  };

  const productos: Producto[] = [
    { id: 'pub-8l3ps8', nombre: '', sku: 'PUB-8L3PS8', descripcion: '', precio: 290, detalles: [] },
    { id: 'pub-fkofdh', nombre: '', sku: 'PUB-FKOFDH', descripcion: '', precio: 580, detalles: [] },
    { id: 'pub-pml9vs', nombre: '', sku: 'PUB-PML9VS', descripcion: '', precio: 1160, detalles: [] },
    { id: 'pub-y6hehn', nombre: '', sku: 'PUB-Y6HEHN', descripcion: '', precio: 2320, detalles: [] },
    { id: 'pub-zuwxuq', nombre: '', sku: 'PUB-ZUWXUQ', descripcion: '', precio: 5104, detalles: [] },
    { id: 'pub-d4nbwt', nombre: '', sku: 'PUB-D4NBWT', descripcion: '', precio: 5800, detalles: [] },
    { id: 'pub-3v206a', nombre: '', sku: 'PUB-3V206A', descripcion: '', precio: 7540, detalles: [] },
    { id: 'pub-er7zv9', nombre: '', sku: 'PUB-ER7ZV9', descripcion: '', precio: 10904, detalles: [] },
    { id: 'pub-ywbwpt', nombre: '', sku: 'PUB-YWBWPT', descripcion: '', precio: 11600, detalles: [] },
    { id: 'pub-zq8wtw', nombre: '', sku: 'PUB-ZQ8WTW', descripcion: '', precio: 13920, detalles: [] },
    { id: 'pub-0xdz00', nombre: '', sku: 'PUB-0XDZ00', descripcion: '', precio: 17400, detalles: [] },
    { id: 'pub-om4ph5', nombre: '', sku: 'PUB-OM4PH5', descripcion: '', precio: 21112, detalles: [] },
    { id: 'pub-e9nk2m', nombre: '', sku: 'PUB-E9NK2M', descripcion: '', precio: 35380, detalles: [] },
    { id: 'pub-9ofxmn', nombre: '', sku: 'PUB-9OFXMN', descripcion: '', precio: 52200, detalles: [] }
  ];

  return (
    <div ref={pageRef} className={`atelier-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {mensaje && <div className="toast-mensaje">{mensaje}</div>}
      <div className="atelier-hero">
        <div className="coleccion-container">
          <span className="atelier-label">{t.coleccion.label}</span>
          <h1 className="coleccion-title">{t.coleccion.titulo}</h1>
          <p className="coleccion-intro">{t.coleccion.intro}</p>
          <div className="coleccion-grid">
            {productos.map((producto, index) => (
              <div key={index} className="coleccion-card">
                <div className="coleccion-card-header">
                  <span className="coleccion-precio">$ {producto.precio.toLocaleString()} MXN + {t.coleccion.impuesto}</span>
                  <h3 className="coleccion-producto-nombre">{t.coleccion.productos[index]?.nombre || producto.nombre}</h3>
                  <span className="coleccion-sku">SKU: {producto.sku}</span>
                </div>
                <p className="coleccion-producto-desc">{t.coleccion.productos[index]?.descripcion || ''}</p>
                {t.coleccion.productos[index]?.detalles.length > 0 && (
                  <ul className="coleccion-detalles">{t.coleccion.productos[index].detalles.map((d, i) => <li key={i}>{d}</li>)}</ul>
                )}
                <button className="coleccion-btn" onClick={() => agregarAlCarrito(producto, index)}>{t.coleccion.boton}</button>
              </div>
            ))}
          </div>

          <div className="coleccion-personalizada">
            <h2 className="coleccion-personalizada-title">{t.coleccion.personalizada_titulo}</h2>
            <p className="coleccion-personalizada-text">{t.coleccion.personalizada_texto1}</p>
            <p className="coleccion-personalizada-highlight">{t.coleccion.personalizada_highlight}</p>
            <p className="coleccion-personalizada-text">{t.coleccion.personalizada_texto2}</p>
            <div className="coleccion-personalizada-buttons">
              <Link href="/disenar-mi-coleccion" className="coleccion-btn-outline">{t.coleccion.personalizada_boton1}</Link>
              <Link href="/pagar-mi-coleccion" className="coleccion-btn-solid">{t.coleccion.personalizada_boton2}</Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="atelier-footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link href="/politica-privacidad">{t.footer.privacidad}</Link>
            <Link href="/politica-reembolsos">{t.footer.reembolsos}</Link>
            <Link href="/terminos-condiciones">{t.footer.terminos}</Link>
          </div>
          <div className="footer-copyright">{t.footer.copyright}</div>
        </div>
      </footer>

      <Link href="/cart" className="atelier-cart-float"><FiShoppingCart size={22} /></Link>
      <button onClick={toggleTheme} className="atelier-theme-toggle">{isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}</button>

      {!showRuleta && (
        <button onClick={() => setShowRuleta(true)} className="ruleta-float-btn"><FiGift size={24} /></button>
      )}

      {showRuleta && (
  <div className="ruleta-overlay">
    <div className="ruleta-container">
      <button className="ruleta-close" onClick={() => setShowRuleta(false)}>
        <FiX size={22} />
      </button>
      
      <h2 className="ruleta-title">{t.ruleta.titulo}</h2>
      
      {yaJugo && resultado !== null ? (
        <>
          {resultado > 0 ? (
            <div className="ruleta-resultado">
              <div className="ruleta-premio-icono">🎉</div>
              <p className="ruleta-felicitacion">{t.ruleta.felicitacion.replace('{descuento}', String(resultado))}</p>
              <p className="ruleta-cupon-label">{t.ruleta.usa_cupon}</p>
              <div className="ruleta-cupon-box">
                <span className="ruleta-cupon-codigo">{cupon}</span>
                <button className="ruleta-copiar-btn" onClick={copiarCupon}>{t.ruleta.copiar}</button>
              </div>
              <p className="ruleta-info">{t.ruleta.siguiente_compra}</p>
              <p className="ruleta-email-info">{t.ruleta.email_enviado}</p>
            </div>
          ) : (
            <div className="ruleta-resultado">
              <div className="ruleta-premio-icono">😢</div>
              <p className="ruleta-sin-suerte">{t.ruleta.sin_suerte}</p>
              <p className="ruleta-info">{t.ruleta.sin_descuento}</p>
            </div>
          )}
          <button className="ruleta-button" onClick={() => setShowRuleta(false)}>{t.ruleta.cerrar}</button>
        </>
      ) : (
        <>
          <p className="ruleta-subtitle">{t.ruleta.subtitulo}</p>
          
          {/* NUEVA RULETA */}
          <div className="ruleta-wheel-wrapper">
            {/* Marcador superior */}
            <div className="ruleta-marker">
              <svg width="30" height="40" viewBox="0 0 30 40">
                <polygon points="15,38 0,0 30,0" fill="#d4a017" stroke="#b8860b" strokeWidth="1"/>
              </svg>
            </div>
            
            <div className="ruleta-wheel-new" style={{ transform: `rotate(${rotation}deg)` }}>
  {descuentos.map((descuento, index) => {
    const angle = 360 / descuentos.length;
    const rotationDeg = angle * index;
    return (
      <div
        key={index}
        className="ruleta-slice"
        style={{
          transform: `rotate(${rotationDeg}deg) skewY(${-(90 - angle)}deg)`,
          backgroundColor: coloresRuleta[index],
        }}
      >
        <span 
          className="ruleta-slice-text"
          style={{ 
            transform: `skewY(${90 - angle}deg) rotate(${angle / 2}deg)`,
          }}
        >
          {emojisRuleta[index]}
        </span>
      </div>
    );
  })}
  <div className="ruleta-center"></div>
</div>
            
            {/* Borde decorativo */}
            <div className="ruleta-outer-ring"></div>
          </div>

          <div className="ruleta-form">
            <input
              type="text"
              placeholder={t.ruleta.placeholder_nombre}
              className="ruleta-input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={spinning}
            />
            <input
              type="email"
              placeholder={t.ruleta.placeholder_email}
              className="ruleta-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={spinning}
            />
            <button 
              className="ruleta-button" 
              onClick={girarRuleta}
              disabled={spinning}
            >
              {spinning ? (
                <span className="ruleta-spinning-text">
                  <span className="ruleta-spinner"></span> {t.ruleta.girando}
                </span>
              ) : t.ruleta.boton_girar}
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}
    </div>
  );
}