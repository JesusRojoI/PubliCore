'use client'
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function PoliticaPrivacidad() {
  const { t } = useLanguage();
  return (
    <div className="atelier-page dark-mode" style={{ padding: '8rem 2rem', minHeight: '100vh' }}>
      <h1>{t.legales.privacidad_titulo}</h1>
      <p>{t.legales.privacidad_contenido}</p>
    </div>
  );
}