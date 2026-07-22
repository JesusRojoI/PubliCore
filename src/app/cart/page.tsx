'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiSun, FiMoon, FiTrash2 } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';

const skuToIndex: { [key: string]: number } = {
  'PUB-8L3PS8': 0, 'PUB-FKOFDH': 1, 'PUB-PML9VS': 2, 'PUB-Y6HEHN': 3,
  'PUB-ZUWXUQ': 4, 'PUB-D4NBWT': 5, 'PUB-3V206A': 6, 'PUB-ER7ZV9': 7,
  'PUB-YWBWPT': 8, 'PUB-ZQ8WTW': 9, 'PUB-0XDZ00': 10, 'PUB-OM4PH5': 11,
  'PUB-E9NK2M': 12, 'PUB-9OFXMN': 13,
};

export default function Cart() {
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);

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

  const eliminarItem = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    localStorage.setItem('publicore-cart', JSON.stringify(newCart));
  };

  const formatMoney = (amount: number) => '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const getProductName = (item: any) => {
    if (item.id?.startsWith('custom-')) return item.nombre;
    const index = skuToIndex[item.sku];
    if (index !== undefined && t.coleccion?.productos?.[index]) return t.coleccion.productos[index].nombre;
    return item.nombre;
  };

  const cuponActivo = cartItems.find(item => item.cupon)?.cupon || null;
  const descuentoPorcentaje = Math.max(...cartItems.map(item => item.descuento || 0), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.precio, 0);
  const descuentoAplicado = descuentoPorcentaje > 0 ? subtotal * (descuentoPorcentaje / 100) : 0;
  const subtotalConDescuento = subtotal - descuentoAplicado;
  const impuesto = subtotalConDescuento * 0.16;
  const total = subtotalConDescuento + impuesto;

  return (
    <div className={`atelier-page ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="atelier-hero">
        <div className="cart-container">
          <h1 className="cart-title">{t.cart.titulo}</h1>
          {cartItems.length === 0 ? (
            <div className="cart-empty-container">
              <FiShoppingCart size={48} className="cart-empty-icon" />
              <p className="cart-empty">{t.cart.vacio}</p>
              <Link href="/coleccion-exclusiva" className="cart-back-shop">{t.cart.explorar}</Link>
            </div>
          ) : (
            <>
              <h2 className="cart-section-title">{t.cart.productos_titulo}</h2>
              <div className="cart-table">
                <div className="cart-table-header">
                  <div className="cart-col-producto">{t.cart.producto_col}</div>
                  <div className="cart-col-total">{t.cart.total_col}</div>
                </div>
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-table-row">
                    <div className="cart-col-producto">
                      <div className="cart-item-info">
                        <h3 className="cart-item-nombre">{getProductName(item)}</h3>
                        <span className="cart-item-sku">{t.cart.sku} {item.sku}</span>
                        {item.cupon && <span className="cart-item-cupon">{t.cart.cupon} {item.cupon}</span>}
                        <span className="cart-item-precio-unit">{formatMoney(item.precio)}</span>
                      </div>
                    </div>
                    <div className="cart-col-total">
                      <span className="cart-item-total-price">{formatMoney(item.precio)}</span>
                      <button className="cart-remove-btn" onClick={() => eliminarItem(index)}>
                        <FiTrash2 size={16} /><span>{t.cart.eliminar}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <h2 className="cart-section-title">{t.cart.totales_titulo}</h2>
              <div className="cart-totals">
                <div className="cart-total-row"><span>{t.cart.subtotal}</span><span>{formatMoney(subtotal)}</span></div>
                {descuentoPorcentaje > 0 && (
                  <div className="cart-total-row cart-discount-row"><span>{t.cart.descuento} ({descuentoPorcentaje}%) - {t.cart.cupon_label} {cuponActivo}</span><span>-{formatMoney(descuentoAplicado)}</span></div>
                )}
                <div className="cart-total-row"><span>{t.cart.impuesto}</span><span>{formatMoney(impuesto)}</span></div>
                <div className="cart-total-row cart-total-final"><span>{t.cart.total_estimado}</span><span>{formatMoney(total)}</span></div>
              </div>
              <Link href="/finalizar-compra" className="cart-checkout-btn">{t.cart.finalizar}</Link>
            </>
          )}
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