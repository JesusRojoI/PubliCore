'use client'
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/app/components/Footer';

export default function PoliticaPrivacidad() {
  const { t } = useLanguage();
  const p = t.legales.privacidad;

  const s = {
    container: { padding: '8rem 4rem 4rem', maxWidth: '900px', margin: '0 auto', minHeight: '100vh' },
    h1: { fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #2ecc71, #27ae60)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    h2: { fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', color: '#2ecc71', marginBottom: '1rem', marginTop: '2rem' },
    h3: { fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', color: '#27ae60', marginBottom: '0.8rem', marginTop: '1.5rem' },
    h4: { fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#d4a017', marginBottom: '0.5rem', marginTop: '1.2rem' },
    p: { fontFamily: 'Inter, sans-serif', color: '#cccccc', lineHeight: '1.8', marginBottom: '0.5rem' },
    li: { fontFamily: 'Inter, sans-serif', color: '#cccccc', lineHeight: '1.8', marginBottom: '0.3rem', marginLeft: '1.5rem' },
    subtitle: { fontFamily: 'Inter, sans-serif', color: '#cccccc', marginBottom: '0.3rem' },
    center: { textAlign: 'center' as const, marginTop: '3rem', fontStyle: 'italic', color: '#2ecc71' },
  };

  return (
    <div className="atelier-page dark-mode" style={{ background: 'linear-gradient(160deg, #1a1a1a 0%, #0d1f0d 100%)' }}>
      <div style={s.container}>
        <h1 style={s.h1}>{t.legales.privacidad_titulo}</h1>
        <p style={{...s.subtitle, color: '#2ecc71', fontWeight: 'bold'}}>{p.subtitulo}</p>
        <p style={s.subtitle}>{p.unidad}</p>
        <p style={{...s.subtitle, marginBottom: '2rem'}}>{p.fecha}</p>

        <h2 style={s.h2}>{p.intro_titulo}</h2>
        <p style={s.p}>{p.intro_texto}</p>

        <h2 style={s.h2}>{p.s1_titulo}</h2>
        <p style={s.p}>{p.s1_1}</p><p style={s.p}>{p.s1_2}</p>
        <p style={s.p}>{p.s1_3}</p><p style={s.p}>{p.s1_4}</p>

        <h2 style={s.h2}>{p.s2_titulo}</h2>
        <h3 style={s.h3}>{p.s2_1_titulo}</h3>
        <ul><li style={s.li}>{p.s2_1_1}</li><li style={s.li}>{p.s2_1_2}</li><li style={s.li}>{p.s2_1_3}</li><li style={s.li}>{p.s2_1_4}</li></ul>
        <h3 style={s.h3}>{p.s2_2_titulo}</h3>
        <ul><li style={s.li}>{p.s2_2_1}</li><li style={s.li}>{p.s2_2_2}</li><li style={s.li}>{p.s2_2_3}</li></ul>
        <h3 style={s.h3}>{p.s2_3_titulo}</h3>
        <ul><li style={s.li}>{p.s2_3_1}</li><li style={s.li}>{p.s2_3_2}</li></ul>
        <h3 style={s.h3}>{p.s2_4_titulo}</h3>
        <ul>
          <li style={s.li}>{p.s2_4_1}</li><li style={s.li}>{p.s2_4_2}</li>
          <li style={s.li}>{p.s2_4_3}</li><li style={s.li}>{p.s2_4_4}</li>
          <li style={s.li}>{p.s2_4_5}</li><li style={s.li}>{p.s2_4_6}</li>
          <li style={s.li}>{p.s2_4_7}</li><li style={s.li}>{p.s2_4_8}</li>
        </ul>

        <h2 style={s.h2}>{p.s3_titulo}</h2>
        <h3 style={s.h3}>{p.s3_subtitulo}</h3>
        <ul><li style={s.li}>{p.s3_1}</li><li style={s.li}>{p.s3_2}</li><li style={s.li}>{p.s3_3}</li></ul>

        <h2 style={s.h2}>{p.s4_titulo}</h2>
        <h3 style={s.h3}>{p.s4_1_titulo}</h3>
        <ul><li style={s.li}>{p.s4_1_1}</li><li style={s.li}>{p.s4_1_2}</li><li style={s.li}>{p.s4_1_3}</li><li style={s.li}>{p.s4_1_4}</li></ul>
        <h3 style={s.h3}>{p.s4_2_titulo}</h3>
        <ul><li style={s.li}>{p.s4_2_1}</li><li style={s.li}>{p.s4_2_2}</li><li style={s.li}>{p.s4_2_3}</li><li style={s.li}>{p.s4_2_4}</li></ul>
        <h3 style={s.h3}>{p.s4_3_titulo}</h3>
        <ul><li style={s.li}>{p.s4_3_1}</li><li style={s.li}>{p.s4_3_2}</li><li style={s.li}>{p.s4_3_3}</li><li style={s.li}>{p.s4_3_4}</li></ul>
        <h3 style={s.h3}>{p.s4_4_titulo}</h3>
        <ul><li style={s.li}>{p.s4_4_1}</li><li style={s.li}>{p.s4_4_2}</li><li style={s.li}>{p.s4_4_3}</li><li style={s.li}>{p.s4_4_4}</li></ul>

        <h2 style={s.h2}>{p.s5_titulo}</h2>
        <h3 style={s.h3}>{p.s5_1_titulo}</h3><ul><li style={s.li}>{p.s5_1_1}</li></ul>
        <h3 style={s.h3}>{p.s5_2_titulo}</h3>
        <ul><li style={s.li}>{p.s5_2_1}</li><li style={s.li}>{p.s5_2_2}</li><li style={s.li}>{p.s5_2_3}</li><li style={s.li}>{p.s5_2_4}</li></ul>
        <h3 style={{...s.h3, color: '#e74c3c'}}>{p.s5_3_titulo}</h3>
        <ul><li style={s.li}>{p.s5_3_1}</li><li style={s.li}>{p.s5_3_2}</li><li style={s.li}>{p.s5_3_3}</li><li style={s.li}>{p.s5_3_4}</li></ul>

        <h2 style={s.h2}>{p.s6_titulo}</h2>
        <h3 style={s.h3}>{p.s6_1_titulo}</h3>
        <ul><li style={s.li}>{p.s6_1_1}</li><li style={s.li}>{p.s6_1_2}</li><li style={s.li}>{p.s6_1_3}</li><li style={s.li}>{p.s6_1_4}</li><li style={s.li}>{p.s6_1_5}</li></ul>
        <h3 style={s.h3}>{p.s6_2_titulo}</h3>
        <ul><li style={s.li}>{p.s6_2_1}</li><li style={s.li}>{p.s6_2_2}</li><li style={s.li}>{p.s6_2_3}</li><li style={s.li}>{p.s6_2_4}</li></ul>

        <h2 style={s.h2}>{p.s7_titulo}</h2><p style={s.p}>{p.s7_texto}</p>

        <h2 style={s.h2}>{p.s8_titulo}</h2>
        <h3 style={s.h3}>{p.s8_subtitulo}</h3>
        <p style={s.p}>{p.s8_1}<br/>{p.s8_2}</p>

        <h2 style={s.h2}>{p.s9_titulo}</h2>
        <h3 style={s.h3}>{p.s9_subtitulo}</h3>
        <ol><li style={s.li}>{p.s9_1}</li><li style={s.li}>{p.s9_2}</li><li style={s.li}>{p.s9_3}</li><li style={s.li}>{p.s9_4}</li></ol>

        <p style={s.center}>{p.cierre}</p>
      </div>
      <Footer />
    </div>
  );
}