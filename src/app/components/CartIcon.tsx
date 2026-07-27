'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiShoppingCart } from 'react-icons/fi';

export default function CartIcon() {
  const pathname = usePathname();
  const [itemCount, setItemCount] = useState(0);
  const showCartPages = ['/', '/cart', '/nuestro-atelier-creativo', '/soluciones-de-impacto', '/coleccion-exclusiva', '/punto-de-conexion', '/disenar-mi-coleccion', '/pagar-mi-coleccion', '/finalizar-compra'];
  
  const updateCount = () => {
    const savedCart = localStorage.getItem('publicore-cart');
    if (savedCart) {
      setItemCount(JSON.parse(savedCart).length);
    } else {
      setItemCount(0);
    }
  };

  useEffect(() => { updateCount(); }, []);
  useEffect(() => { updateCount(); }, [pathname]);

  useEffect(() => {
    const handleCartUpdate = () => updateCount();
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  if (pathname === '/cart') return null;
  if (!showCartPages.includes(pathname)) return null;

  return (
    <Link href="/cart" className="cart-icon-float">
      <FiShoppingCart size={26} color="#1a1a1a" />
      {itemCount > 0 && (
        <span className="cart-badge">{itemCount}</span>
      )}
    </Link>
  );
}