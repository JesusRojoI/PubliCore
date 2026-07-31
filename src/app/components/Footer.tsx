'use client'
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <footer className="atelier-footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/logo.svg" alt="PubliCore" className="footer-logo" />
            <p className="footer-address">{t.footer.direccion}</p>
            <div className="footer-contact">
              <span>📞 {t.footer.telefono}</span>
              <span>✉️ {t.footer.correo}</span>
            </div>
          </div>
          <div className="footer-payment">
            <span className="footer-payment-label">{isEnglish ? 'We accept' : 'Aceptamos'}</span>
            <div className="footer-payment-icons">
              <img src="/visa.svg" alt="Visa" className="footer-payment-icon" />
              <img src="/mastercard.svg" alt="Mastercard" className="footer-payment-icon" />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-links">
            <Link href="/politica-privacidad">{t.footer.privacidad}</Link>
            <Link href="/politica-reembolsos">{t.footer.reembolsos}</Link>
            <Link href="/terminos-condiciones">{t.footer.terminos}</Link>
          </div>
          <div className="footer-copyright">{t.footer.copyright}</div>
        </div>
      </div>
    </footer>
  );
}