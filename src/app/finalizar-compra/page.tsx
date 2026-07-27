'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiSun, FiMoon, FiCreditCard } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

const skuToIndex: { [key: string]: number } = {
  'PUB-8L3PS8': 0, 'PUB-FKOFDH': 1, 'PUB-PML9VS': 2, 'PUB-Y6HEHN': 3,
  'PUB-ZUWXUQ': 4, 'PUB-D4NBWT': 5, 'PUB-3V206A': 6, 'PUB-ER7ZV9': 7,
  'PUB-YWBWPT': 8, 'PUB-ZQ8WTW': 9, 'PUB-0XDZ00': 10, 'PUB-OM4PH5': 11,
  'PUB-E9NK2M': 12, 'PUB-9OFXMN': 13,
};

export default function FinalizarCompra() {
  const { t, language } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [toastMensaje, setToastMensaje] = useState<string | null>(null);
  const [errores, setErrores] = useState<{[key: string]: string}>({});
  const pageRef = useRef<HTMLDivElement>(null);

  const [nombre, setNombre] = useState(''); const [apellidos, setApellidos] = useState('');
  const [pais, setPais] = useState('México'); const [direccion, setDireccion] = useState('');
  const [poblacion, setPoblacion] = useState(''); const [region, setRegion] = useState('Ciudad de México');
  const [codigoPostal, setCodigoPostal] = useState(''); const [emailFacturacion, setEmailFacturacion] = useState('');
  const [notas, setNotas] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState(''); const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaTarjeta, setFechaTarjeta] = useState(''); const [cvv, setCvv] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('zentaria-theme');
    if (savedTheme === 'light') setIsDarkMode(false);
    const savedCart = localStorage.getItem('publicore-cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('zentaria-theme', newDarkMode ? 'dark' : 'light');
  };

  const formatMoney = (amount: number) => '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const mostrarMensaje = (texto: string) => { setToastMensaje(texto); setTimeout(() => setToastMensaje(null), 4000); };

  const getProductName = (item: any) => {
    if (item.id?.startsWith('custom-')) return item.nombre;
    const index = skuToIndex[item.sku];
    if (index !== undefined && t.coleccion?.productos?.[index]) return t.coleccion.productos[index].nombre;
    return item.nombre;
  };

  const validarFormulario = (): boolean => {
    const newErrores: {[key: string]: string} = {};
    if (!nombre.trim()) newErrores.nombre = t.checkout.nombre_req;
    if (!apellidos.trim()) newErrores.apellidos = t.checkout.apellidos_req;
    if (!direccion.trim()) newErrores.direccion = t.checkout.direccion_req;
    // Población NO es obligatorio
    if (!codigoPostal.trim()) newErrores.codigoPostal = t.checkout.cp_req;
    else if (!/^\d{5}$/.test(codigoPostal.trim())) newErrores.codigoPostal = t.checkout.cp_inv;
    if (!emailFacturacion.trim()) newErrores.email = t.checkout.email_req;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFacturacion)) newErrores.email = t.checkout.email_inv;
    if (!nombreTarjeta.trim()) newErrores.nombreTarjeta = t.checkout.tarjeta_nombre_req;
    if (!numeroTarjeta.trim()) newErrores.numeroTarjeta = t.checkout.tarjeta_num_req;
    else if (!/^\d{16}$/.test(numeroTarjeta.replace(/\s/g, ''))) newErrores.numeroTarjeta = t.checkout.tarjeta_num_inv;
    if (!fechaTarjeta.trim()) newErrores.fechaTarjeta = t.checkout.tarjeta_fecha_req;
    else if (!/^\d{2}\/\d{2}$/.test(fechaTarjeta)) newErrores.fechaTarjeta = t.checkout.tarjeta_fecha_inv;
    if (!cvv.trim()) newErrores.cvv = t.checkout.cvv_req;
    else if (!/^\d{3,4}$/.test(cvv)) newErrores.cvv = t.checkout.cvv_inv;
    setErrores(newErrores);
    return Object.keys(newErrores).length === 0;
  };

  const handleNumeroTarjeta = (value: string) => {
    const cleaned = value.replace(/\s/g, '').replace(/\D/g, '');
    setNumeroTarjeta((cleaned.match(/.{1,4}/g)?.join(' ') || cleaned).substring(0, 19));
  };
  const handleFechaTarjeta = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    setFechaTarjeta(cleaned.length >= 2 ? cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4) : cleaned);
  };

  const cuponActivo = cartItems.find(item => item.cupon)?.cupon || null;
  const descuentoPorcentaje = Math.max(...cartItems.map(item => item.descuento || 0), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.precio, 0);
  const descuentoAplicado = descuentoPorcentaje > 0 ? subtotal * (descuentoPorcentaje / 100) : 0;
  const impuesto = (subtotal - descuentoAplicado) * 0.16;
  const total = subtotal - descuentoAplicado + impuesto;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) { mostrarMensaje(t.checkout.error_form); return; }
    if (cartItems.length === 0) { mostrarMensaje(t.checkout.carrito_vacio); return; }
    setEnviando(true);
    try {
      const paymentResponse = await fetch('/api/procesar-pago', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreTarjeta, numeroTarjeta: numeroTarjeta.replace(/\s/g, ''), fechaTarjeta, cvv, monto: total, descripcion: 'Compra PubliCore', nombre, apellidos, email: emailFacturacion, direccion, poblacion, region, codigoPostal, telefono: '5555555555' }),
      });
      if (!paymentResponse.ok) { const err = await paymentResponse.json(); throw new Error(err.message); }
      const paymentData = await paymentResponse.json();
      if (!paymentData.success) throw new Error(paymentData.message || 'Pago rechazado');

      await fetch('/api/enviar-correo', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: emailFacturacion, subject: language === 'en' ? 'Purchase Confirmed! - PubliCore' : '¡Compra confirmada! - PubliCore', orderData: { nombre: `${nombre} ${apellidos}`, email: emailFacturacion, productos: cartItems, subtotal, descuento: descuentoAplicado, impuesto, total, cupon: cuponActivo, transactionId: paymentData.transactionId || paymentData.reference }, language }),
      });

      localStorage.setItem('publicore-last-order', JSON.stringify({
        orderNumber: paymentData.transactionId || paymentData.reference || 'TXN-' + Date.now(),
        date: new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'es-MX', { year: 'numeric', month: 'short', day: 'numeric' }),
        nombre: `${nombre} ${apellidos}`, email: emailFacturacion, direccion, poblacion, region, codigoPostal,
        productos: cartItems, subtotal, descuento: descuentoAplicado, impuesto, total, cupon: cuponActivo,
      }));
      localStorage.removeItem('publicore-cart');
      localStorage.removeItem('publicore-ya-jugo');
      setCartItems([]);
      window.dispatchEvent(new Event('cartUpdated'));
      window.location.href = '/finalizar-compra/order-received';
    } catch (error: any) {
      mostrarMensaje(error.message || t.checkout.error_pago);
    } finally { setEnviando(false); }
  };

  return (
    <div ref={pageRef} className={`atelier-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {toastMensaje && <div className="toast-mensaje">{toastMensaje}</div>}
      <div className="atelier-hero">
        <div className="checkout-container">
          <h1 className="checkout-title">{t.checkout.titulo}</h1>
          <div className="checkout-steps">
            <div className="checkout-step active"><span className="step-number">1</span><span>{t.checkout.paso1}</span></div>
            <div className="checkout-step"><span className="step-number">2</span><span>{t.checkout.paso2}</span></div>
            <div className="checkout-step"><span className="step-number">3</span><span>{t.checkout.paso3}</span></div>
          </div>
          {cuponActivo && <div className="checkout-cupon-activo">🎫 {t.checkout.cupon_activo} <strong>{cuponActivo}</strong> ({descuentoPorcentaje}% {t.checkout.descuento})</div>}
          <form onSubmit={handleSubmit}>
            <div className="checkout-grid">
              <div className="checkout-col">
                <h2 className="checkout-section-title">{t.checkout.facturacion_titulo}</h2>
                <div className="checkout-field"><label className="checkout-label">{t.checkout.nombre_label}</label><input type="text" className={`checkout-input ${errores.nombre ? 'error' : ''}`} value={nombre} onChange={(e) => {setNombre(e.target.value); setErrores({...errores, nombre: ''})}} />{errores.nombre && <span className="checkout-error">{errores.nombre}</span>}</div>
                <div className="checkout-field"><label className="checkout-label">{t.checkout.apellidos_label}</label><input type="text" className={`checkout-input ${errores.apellidos ? 'error' : ''}`} value={apellidos} onChange={(e) => {setApellidos(e.target.value); setErrores({...errores, apellidos: ''})}} />{errores.apellidos && <span className="checkout-error">{errores.apellidos}</span>}</div>
                <div className="checkout-field"><label className="checkout-label">{t.checkout.pais_label}</label><select className="checkout-input" value={pais} onChange={(e) => setPais(e.target.value)}><option>México</option><option>Estados Unidos</option><option>España</option></select></div>
                <div className="checkout-field"><label className="checkout-label">{t.checkout.direccion_label}</label><input type="text" className={`checkout-input ${errores.direccion ? 'error' : ''}`} placeholder={t.checkout.direccion_placeholder} value={direccion} onChange={(e) => {setDireccion(e.target.value); setErrores({...errores, direccion: ''})}} />{errores.direccion && <span className="checkout-error">{errores.direccion}</span>}</div>
                <div className="checkout-field"><label className="checkout-label">{t.checkout.poblacion_label}</label><input type="text" className="checkout-input" value={poblacion} onChange={(e) => setPoblacion(e.target.value)} /></div>
                <div className="checkout-field"><label className="checkout-label">{t.checkout.region_label}</label><select className="checkout-input" value={region} onChange={(e) => setRegion(e.target.value)}><option>Ciudad de México</option><option>Estado de México</option><option>Jalisco</option><option>Nuevo León</option></select></div>
                <div className="checkout-field"><label className="checkout-label">{t.checkout.cp_label}</label><input type="text" className={`checkout-input ${errores.codigoPostal ? 'error' : ''}`} value={codigoPostal} onChange={(e) => {setCodigoPostal(e.target.value.replace(/\D/g, '').substring(0, 5)); setErrores({...errores, codigoPostal: ''})}} maxLength={5} />{errores.codigoPostal && <span className="checkout-error">{errores.codigoPostal}</span>}</div>
                <div className="checkout-field"><label className="checkout-label">{t.checkout.email_label}</label><input type="email" className={`checkout-input ${errores.email ? 'error' : ''}`} value={emailFacturacion} onChange={(e) => {setEmailFacturacion(e.target.value); setErrores({...errores, email: ''})}} />{errores.email && <span className="checkout-error">{errores.email}</span>}</div>
                <div className="checkout-field"><label className="checkout-label">{t.checkout.notas_label}</label><textarea className="checkout-textarea" placeholder={t.checkout.notas_placeholder} value={notas} onChange={(e) => setNotas(e.target.value)} rows={3} /></div>
                <div className="checkout-card-header"><h2 className="checkout-section-title"><FiCreditCard size={20} />{t.checkout.tarjeta_titulo}</h2><div className="checkout-card-logos"><img src="/keycop.svg" alt="Keycop" className="checkout-logo" /><img src="/secure.svg" alt="Secure" className="checkout-logo" /></div></div>
                <p className="checkout-card-info">{t.checkout.tarjeta_info}</p>
                <div className="checkout-field"><label className="checkout-label">{t.checkout.tarjeta_nombre}</label><input type="text" className={`checkout-input ${errores.nombreTarjeta ? 'error' : ''}`} placeholder={t.checkout.tarjeta_nombre_placeholder} value={nombreTarjeta} onChange={(e) => {setNombreTarjeta(e.target.value); setErrores({...errores, nombreTarjeta: ''})}} />{errores.nombreTarjeta && <span className="checkout-error">{errores.nombreTarjeta}</span>}</div>
                <div className="checkout-field"><label className="checkout-label">{t.checkout.tarjeta_numero}</label><input type="text" className={`checkout-input ${errores.numeroTarjeta ? 'error' : ''}`} placeholder="•••• •••• •••• ••••" value={numeroTarjeta} onChange={(e) => {handleNumeroTarjeta(e.target.value); setErrores({...errores, numeroTarjeta: ''})}} />{errores.numeroTarjeta && <span className="checkout-error">{errores.numeroTarjeta}</span>}</div>
                <div className="checkout-grid-2">
                  <div className="checkout-field"><label className="checkout-label">{t.checkout.tarjeta_fecha}</label><input type="text" className={`checkout-input ${errores.fechaTarjeta ? 'error' : ''}`} placeholder="MM / YY" value={fechaTarjeta} onChange={(e) => {handleFechaTarjeta(e.target.value); setErrores({...errores, fechaTarjeta: ''})}} maxLength={5} />{errores.fechaTarjeta && <span className="checkout-error">{errores.fechaTarjeta}</span>}</div>
                  <div className="checkout-field">
                    <label className="checkout-label">{t.checkout.tarjeta_cvv}</label>
                    <input 
                      type="password" 
                      className={`checkout-input ${errores.cvv ? 'error' : ''}`} 
                      placeholder="•••" 
                      value={cvv} 
                      onChange={(e) => {setCvv(e.target.value.replace(/\D/g, '').substring(0, 4)); setErrores({...errores, cvv: ''})}} 
                      maxLength={4} 
                      inputMode="numeric"
                      autoComplete="off"
                    />
                    {errores.cvv && <span className="checkout-error">{errores.cvv}</span>}
                  </div>
                </div>
              </div>
              <div className="checkout-col">
                <div className="checkout-resumen">
                  <h2 className="checkout-section-title">{t.checkout.pedido_titulo}</h2>
                  <div className="checkout-resumen-table">
                    <div className="checkout-resumen-header"><span>{t.checkout.producto_col}</span><span>{t.checkout.subtotal_col}</span></div>
                    {cartItems.map((item, i) => (<div key={i} className="checkout-resumen-row"><span>{getProductName(item)} × 1</span><span>{formatMoney(item.precio)}</span></div>))}
                  </div>
                  <div className="checkout-resumen-totals">
                    <div className="checkout-resumen-total-row"><span>{t.checkout.subtotal}</span><span>{formatMoney(subtotal)}</span></div>
                    {cuponActivo && descuentoPorcentaje > 0 && <div className="checkout-resumen-total-row discount"><span>{t.checkout.descuento_label} ({descuentoPorcentaje}%) - {cuponActivo}</span><span>-{formatMoney(descuentoAplicado)}</span></div>}
                    <div className="checkout-resumen-total-row"><span>{t.checkout.impuesto}</span><span>{formatMoney(impuesto)}</span></div>
                    <div className="checkout-resumen-total-row total"><span>{t.checkout.total}</span><span>{formatMoney(total)}</span></div>
                  </div>
                  <button type="submit" className="checkout-submit-btn" disabled={enviando || cartItems.length === 0}>{enviando ? t.checkout.procesando : t.checkout.boton}</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <footer className="atelier-footer"><div className="footer-content"><div className="footer-links"><Link href="/politica-privacidad">{t.footer.privacidad}</Link><Link href="/politica-reembolsos">{t.footer.reembolsos}</Link><Link href="/terminos-condiciones">{t.footer.terminos}</Link></div><div className="footer-copyright">{t.footer.copyright}</div></div></footer>
      <button onClick={toggleTheme} className="atelier-theme-toggle">{isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}</button>
    </div>
  );
}