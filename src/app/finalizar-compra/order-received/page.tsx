'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSun, FiMoon, FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

export default function OrderReceived() {
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('zentaria-theme');
    if (savedTheme === 'light') setIsDarkMode(false);
    const savedOrder = localStorage.getItem('publicore-last-order');
    if (savedOrder) setOrderData(JSON.parse(savedOrder));
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('zentaria-theme', newDarkMode ? 'dark' : 'light');
  };

  const formatMoney = (amount: number) => '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (!orderData) {
    return (
      <div className={`atelier-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="atelier-hero">
          <div className="order-container">
            <div className="order-empty">
              <p>{t.order_received.no_info}</p>
              <Link href="/coleccion-exclusiva" className="order-back-btn">{t.order_received.ir_tienda}</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`atelier-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="atelier-hero">
        <div className="order-container">
          <div className="order-success-icon"><FiCheckCircle size={64} /></div>
          <h1 className="order-title">{t.order_received.titulo}</h1>
          <div className="order-summary">
            <div className="order-summary-grid">
              <div className="order-summary-item"><span className="order-summary-label">{t.order_received.numero_pedido}</span><span className="order-summary-value">{orderData.orderNumber}</span></div>
              <div className="order-summary-item"><span className="order-summary-label">{t.order_received.fecha}</span><span className="order-summary-value">{orderData.date}</span></div>
              <div className="order-summary-item"><span className="order-summary-label">{t.order_received.total}</span><span className="order-summary-value order-total">{formatMoney(orderData.total)}</span></div>
            </div>
          </div>
          <h2 className="order-section-title">{t.order_received.detalles_titulo}</h2>
          <div className="order-table">
            <div className="order-table-header"><span>{t.order_received.producto_col}</span><span>{t.order_received.total_col}</span></div>
            {orderData.productos.map((item: any, i: number) => (
              <div key={i} className="order-table-row"><span>{item.nombre} × 1</span><span>{formatMoney(item.precio)}</span></div>
            ))}
          </div>
          <div className="order-totals">
            <div className="order-total-row"><span>{t.order_received.subtotal}</span><span>{formatMoney(orderData.subtotal)}</span></div>
            {orderData.descuento > 0 && <div className="order-total-row discount"><span>{t.order_received.descuento} ({orderData.cupon}):</span><span>-{formatMoney(orderData.descuento)}</span></div>}
            <div className="order-total-row"><span>{t.order_received.impuesto}</span><span>{formatMoney(orderData.impuesto)}</span></div>
            <div className="order-total-row total"><span>{t.order_received.total_label}</span><span>{formatMoney(orderData.total)}</span></div>
          </div>
          <h2 className="order-section-title">{t.order_received.direccion_titulo}</h2>
          <div className="order-address">
            <p>{orderData.nombre}</p><p>{orderData.direccion}</p><p>{orderData.poblacion}</p>
            <p>{orderData.region}</p><p>{orderData.codigoPostal}</p><p>{orderData.email}</p>
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
      <button onClick={toggleTheme} className="atelier-theme-toggle">{isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}</button>
    </div>
  );
}