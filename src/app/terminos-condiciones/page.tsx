'use client'
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/app/components/Footer';

export default function TerminosCondiciones() {
  const { t } = useLanguage();
  const term = t.legales.terminos;

  const s = {
    container: { padding: '8rem 4rem 4rem', maxWidth: '900px', margin: '0 auto', minHeight: '100vh' },
    h1: { fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', marginBottom: '2rem', background: 'linear-gradient(135deg, #2ecc71, #27ae60)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    h2: { fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', color: '#2ecc71', marginBottom: '1rem', marginTop: '2rem' },
    h3: { fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', color: '#27ae60', marginBottom: '0.8rem', marginTop: '1.5rem' },
    h4: { fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#d4a017', marginBottom: '0.5rem', marginTop: '1.2rem' },
    p: { fontFamily: 'Inter, sans-serif', color: '#cccccc', lineHeight: '1.8', marginBottom: '0.5rem' },
    li: { fontFamily: 'Inter, sans-serif', color: '#cccccc', lineHeight: '1.8', marginBottom: '0.3rem', marginLeft: '1.5rem' },
    subtitle: { fontFamily: 'Inter, sans-serif', color: '#cccccc', marginBottom: '0.5rem' },
    center: { textAlign: 'center' as const, marginTop: '3rem', fontStyle: 'italic', color: '#2ecc71' },
    contact: { textAlign: 'center' as const, color: '#cccccc', marginTop: '1rem' },
  };

  return (
    <div className="atelier-page dark-mode" style={{ background: 'linear-gradient(160deg, #1a1a1a 0%, #0d1f0d 100%)' }}>
      <div style={s.container}>
        <h1 style={s.h1}>{t.legales.terminos_titulo || 'Términos y condiciones'}</h1>
        <p style={s.subtitle}>{term.ultima_actualizacion}</p>
        <p style={s.subtitle}>{term.entidad}</p>
        <p style={{...s.subtitle, marginBottom: '2rem'}}>{term.marco_legal}</p>

        <h2 style={s.h2}>{term.bienvenida_titulo}</h2>
        <p style={s.p}>{term.bienvenida_texto}</p>

        <h2 style={s.h2}>{term.s1_titulo}</h2>
        <ul><li style={s.li}>{term.s1_1}</li><li style={s.li}>{term.s1_2}</li><li style={s.li}>{term.s1_3}</li></ul>

        <h2 style={s.h2}>{term.s2_titulo}</h2>
        <h3 style={s.h3}>{term.s2_subtitulo}</h3>
        <ul><li style={s.li}>{term.s2_1}</li><li style={s.li}>{term.s2_2}</li><li style={s.li}>{term.s2_3}</li><li style={s.li}>{term.s2_4}</li><li style={s.li}>{term.s2_5}</li></ul>

        <h2 style={s.h2}>{term.s3_titulo}</h2>
        <h3 style={s.h3}>{term.s3_subtitulo}</h3>
        <ul><li style={s.li}>{term.s3_1}</li><li style={s.li}>{term.s3_2}</li><li style={s.li}>{term.s3_3}</li><li style={s.li}>{term.s3_4}</li></ul>
        <h3 style={s.h3}>{term.s3_5_titulo}</h3>
        <ul><li style={s.li}>{term.s3_5_1}</li><li style={s.li}>{term.s3_5_2}</li><li style={s.li}>{term.s3_5_3}</li><li style={s.li}>{term.s3_5_4}</li><li style={s.li}>{term.s3_5_5}</li></ul>
        <h3 style={s.h3}>{term.s3_6_titulo}</h3>
        <ul><li style={s.li}>{term.s3_6_1}</li></ul>

        <h2 style={s.h2}>{term.s4_titulo}</h2>
        <h3 style={s.h3}>{term.s4_subtitulo}</h3>
        <ul><li style={s.li}>{term.s4_1}</li><li style={s.li}>{term.s4_2}</li><li style={s.li}>{term.s4_3}</li></ul>
        <h3 style={{...s.h3, color: '#e74c3c'}}>{term.s4_4_titulo}</h3>
        <ul><li style={s.li}>{term.s4_4_1}</li><li style={s.li}>{term.s4_4_2}</li><li style={s.li}>{term.s4_4_3}</li><li style={s.li}>{term.s4_4_4}</li><li style={s.li}>{term.s4_4_5}</li><li style={s.li}>{term.s4_4_6}</li><li style={s.li}>{term.s4_4_7}</li></ul>
        <h3 style={s.h3}>{term.s4_5_titulo}</h3>
        <p style={s.p}>{term.s4_5_texto}</p>

        <h2 style={s.h2}>{term.s5_titulo}</h2>
        <h3 style={s.h3}>{term.s5_subtitulo}</h3>
        <ul><li style={s.li}>{term.s5_1}</li><li style={s.li}>{term.s5_2}</li><li style={s.li}>{term.s5_3}</li><li style={s.li}>{term.s5_4}</li><li style={s.li}>{term.s5_5}</li></ul>
        <h3 style={s.h3}>{term.s5_6_titulo}</h3>
        <ul><li style={s.li}>{term.s5_6_1}</li><li style={s.li}>{term.s5_6_2}</li><li style={s.li}>{term.s5_6_3}</li><li style={s.li}>{term.s5_6_4}</li></ul>

        <h2 style={s.h2}>{term.s6_titulo}</h2>
        <h3 style={s.h3}>{term.s6_subtitulo}</h3>
        <ul><li style={s.li}>{term.s6_1}</li></ul>
        <h3 style={s.h3}>{term.s6_2_titulo}</h3>
        <ul><li style={s.li}>{term.s6_2_1}</li><li style={s.li}>{term.s6_2_2}</li><li style={s.li}>{term.s6_2_3}</li><li style={s.li}>{term.s6_2_4}</li></ul>

        <h2 style={s.h2}>{term.s7_titulo}</h2>
        <h3 style={s.h3}>{term.s7_subtitulo}</h3>
        <ul><li style={s.li}>{term.s7_1}</li><li style={s.li}>{term.s7_2}</li><li style={s.li}>{term.s7_3}</li><li style={s.li}>{term.s7_4}</li></ul>
        <h3 style={{...s.h3, color: '#e74c3c'}}>{term.s7_5_titulo}</h3>
        <p style={s.p}>{term.s7_5_texto}</p>
        <h3 style={{...s.h3, color: '#e74c3c'}}>{term.s7_6_titulo}</h3>
        <ul><li style={s.li}>{term.s7_6_1}</li><li style={s.li}>{term.s7_6_2}</li><li style={s.li}>{term.s7_6_3}</li><li style={s.li}>{term.s7_6_4}</li></ul>

        <h2 style={s.h2}>{term.s8_titulo}</h2>
        <h3 style={s.h3}>{term.s8_subtitulo}</h3><p style={s.p}>{term.s8_texto}</p>
        <h3 style={s.h3}>{term.s8_2_titulo}</h3><p style={s.p}>{term.s8_2_texto}</p>
        <h3 style={s.h3}>{term.s8_3_titulo}</h3><p style={s.p}>{term.s8_3_texto}</p>

        <h2 style={s.h2}>{term.s9_titulo}</h2>
        <h3 style={s.h3}>{term.s9_subtitulo}</h3><p style={s.p}>{term.s9_texto}</p>
        <h3 style={s.h3}>{term.s9_2_titulo}</h3><p style={s.p}>{term.s9_2_texto}</p>

        <h2 style={s.h2}>{term.s10_titulo}</h2>
        <h3 style={s.h3}>{term.s10_subtitulo}</h3>
        <ol><li style={s.li}>{term.s10_1}</li><li style={s.li}>{term.s10_2}</li><li style={s.li}>{term.s10_3}</li><li style={s.li}>{term.s10_4}</li></ol>
        <h3 style={s.h3}>{term.s10_5_titulo}</h3><p style={s.p}>{term.s10_5_texto}</p>

        <h2 style={s.h2}>{term.s11_titulo}</h2>
        <h3 style={s.h3}>{term.s11_subtitulo}</h3><p style={s.p}>{term.s11_texto}</p>
        <h3 style={s.h3}>{term.s11_2_titulo}</h3>
        <ul><li style={s.li}>{term.s11_2_1}</li><li style={s.li}>{term.s11_2_2}</li><li style={s.li}>{term.s11_2_3}</li></ul>
        <h3 style={s.h3}>{term.s11_3_titulo}</h3><p style={s.p}>{term.s11_3_texto}</p>

        <h2 style={s.h2}>{term.aceptacion_titulo}</h2>
        <p style={s.p}>{term.aceptacion_texto}</p>

        <p style={s.center}>{term.cierre}</p>
        <div style={s.contact}>
          <p><strong>{term.contacto_titulo}</strong></p>
          <p>{term.correo}</p>
          <p>{term.domicilio}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}