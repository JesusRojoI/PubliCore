'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiShoppingCart } from 'react-icons/fi';

export default function CartIcon() {
  const pathname = usePathname();
  const showCartPages = ['/', '/cart'];
  
  if (!showCartPages.includes(pathname) || pathname === '/cart') return null;

  return (
    <Link href="/cart" className="cart-icon-float">
      <FiShoppingCart size={26} color="#1a1a1a" />
    </Link>
  );
}