'use client'
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function PoliticaReembolsos() {
  const { t } = useLanguage();
  return (
    <div className="atelier-page dark-mode" style={{ padding: '8rem 2rem', minHeight: '100vh' }}>
      <h1>{t.legales.reembolsos_titulo}</h1>
      <p>{t.legales.reembolsos_contenido}</p>
    </div>
  );
}