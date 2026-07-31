'use client'
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/app/components/Footer';

export default function PoliticaReembolsos() {
  const { t } = useLanguage();
  const r = t.legales.reembolsos;

  const s = {
    container: { padding: '8rem 4rem 4rem', maxWidth: '900px', margin: '0 auto', minHeight: '100vh' },
    h1: { fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', marginBottom: '2rem', background: 'linear-gradient(135deg, #2ecc71, #27ae60)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    h2: { fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', color: '#2ecc71', marginBottom: '1rem', marginTop: '2rem' },
    h3: { fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', color: '#27ae60', marginBottom: '0.8rem', marginTop: '1.5rem' },
    h4: { fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#d4a017', marginBottom: '0.5rem', marginTop: '1.2rem' },
    p: { fontFamily: 'Inter, sans-serif', color: '#cccccc', lineHeight: '1.8', marginBottom: '0.5rem' },
    li: { fontFamily: 'Inter, sans-serif', color: '#cccccc', lineHeight: '1.8', marginBottom: '0.3rem', marginLeft: '1.5rem' },
    subtitle: { fontFamily: 'Inter, sans-serif', color: '#cccccc', marginBottom: '0.5rem' },
    center: { textAlign: 'center' as const, marginTop: '2rem' },
  };

  return (
    <div className="atelier-page dark-mode" style={{ background: 'linear-gradient(160deg, #1a1a1a 0%, #0d1f0d 100%)' }}>
      <div style={s.container}>
        <h1 style={s.h1}>{t.legales.reembolsos_titulo || 'Política de reembolsos y cancelaciones'}</h1>
        <p style={s.subtitle}>{r.ultima_actualizacion}</p>
        <p style={s.subtitle}>{r.aplicable}</p>
        <p style={{...s.subtitle, marginBottom: '2rem'}}>{r.marco_legal}</p>

        <h2 style={s.h2}>{r.compromiso_titulo}</h2>
        <p style={s.p}>{r.compromiso_texto}</p>

        <h2 style={s.h2}>{r.s1_titulo}</h2>
        <p style={s.p}>{r.s1_intro}</p>
        <ul><li style={s.li}>{r.s1_1}</li><li style={s.li}>{r.s1_2}</li><li style={s.li}>{r.s1_3}</li><li style={s.li}>{r.s1_4}</li><li style={s.li}>{r.s1_5}</li><li style={s.li}>{r.s1_6}</li></ul>

        <h2 style={s.h2}>{r.s2_titulo}</h2>
        <h3 style={s.h3}>{r.s2_1_titulo}</h3><p style={s.p}>{r.s2_1_texto}</p>
        <h3 style={s.h3}>{r.s2_2_titulo}</h3><p style={s.p}>{r.s2_2_texto}</p>
        <h3 style={s.h3}>{r.s2_3_titulo}</h3><p style={s.p}>{r.s2_3_texto}</p>
        <h3 style={s.h3}>{r.s2_4_titulo}</h3><p style={s.p}>{r.s2_4_texto}</p>

        <h2 style={s.h2}>{r.s3_titulo}</h2>
        <h3 style={s.h3}>{r.s3_1_titulo}</h3>
        <h4 style={s.h4}>{r.s3_1_sub1}</h4><ul><li style={s.li}>{r.s3_1_1}</li><li style={s.li}>{r.s3_1_2}</li><li style={s.li}>{r.s3_1_3}</li></ul>
        <h4 style={s.h4}>{r.s3_1_sub2}</h4><ul><li style={s.li}>{r.s3_1_4}</li><li style={s.li}>{r.s3_1_5}</li><li style={s.li}>{r.s3_1_6}</li></ul>
        <h3 style={s.h3}>{r.s3_2_titulo}</h3>
        <h4 style={s.h4}>{r.s3_2_sub1}</h4><ul><li style={s.li}>{r.s3_2_1}</li><li style={s.li}>{r.s3_2_2}</li><li style={s.li}>{r.s3_2_3}</li></ul>
        <h4 style={s.h4}>{r.s3_2_sub2}</h4><ul><li style={s.li}>{r.s3_2_4}</li><li style={s.li}>{r.s3_2_5}</li><li style={s.li}>{r.s3_2_6}</li></ul>

        <h2 style={s.h2}>{r.s4_titulo}</h2>
        <h3 style={s.h3}>{r.s4_1_titulo}</h3>
        <h4 style={s.h4}>{r.s4_1_sub1}</h4><ul><li style={s.li}>{r.s4_1_1}</li><li style={s.li}>{r.s4_1_2}</li><li style={s.li}>{r.s4_1_3}</li></ul>
        <h4 style={s.h4}>{r.s4_1_sub2}</h4><ul><li style={s.li}>{r.s4_1_4}</li><li style={s.li}>{r.s4_1_5}</li><li style={s.li}>{r.s4_1_6}</li></ul>
        <h4 style={s.h4}>{r.s4_1_sub3}</h4><ul><li style={s.li}>{r.s4_1_7}</li><li style={s.li}>{r.s4_1_8}</li><li style={s.li}>{r.s4_1_9}</li></ul>
        <h3 style={s.h3}>{r.s4_2_titulo}</h3>
        <h4 style={s.h4}>{r.s4_2_sub1}</h4><ul><li style={s.li}>{r.s4_2_1}</li><li style={s.li}>{r.s4_2_2}</li><li style={s.li}>{r.s4_2_3}</li></ul>
        <h3 style={s.h3}>{r.s4_3_titulo}</h3>
        <h4 style={s.h4}>{r.s4_3_sub1}</h4><ul><li style={s.li}>{r.s4_3_1}</li><li style={s.li}>{r.s4_3_2}</li></ul>
        <h4 style={s.h4}>{r.s4_3_sub2}</h4><ul><li style={s.li}>{r.s4_3_3}</li><li style={s.li}>{r.s4_3_4}</li><li style={s.li}>{r.s4_3_5}</li></ul>
        <h4 style={s.h4}>{r.s4_3_sub3}</h4><ul><li style={s.li}>{r.s4_3_6}</li><li style={s.li}>{r.s4_3_7}</li><li style={s.li}>{r.s4_3_8}</li><li style={s.li}>{r.s4_3_9}</li></ul>

        <h2 style={s.h2}>{r.s5_titulo}</h2>
        <h3 style={s.h3}>{r.s5_1_titulo}</h3><ul><li style={s.li}>{r.s5_1_1}</li><li style={s.li}>{r.s5_1_2}</li><li style={s.li}>{r.s5_1_3}</li><li style={s.li}>{r.s5_1_4}</li></ul>
        <h3 style={s.h3}>{r.s5_2_titulo}</h3><ul><li style={s.li}>{r.s5_2_1}</li><li style={s.li}>{r.s5_2_2}</li><li style={s.li}>{r.s5_2_3}</li></ul>
        <h3 style={s.h3}>{r.s5_3_titulo}</h3><ol><li style={s.li}>{r.s5_3_1}</li><li style={s.li}>{r.s5_3_2}</li><li style={s.li}>{r.s5_3_3}</li><li style={s.li}>{r.s5_3_4}</li></ol>

        <h2 style={s.h2}>{r.s6_titulo}</h2>
        <h3 style={s.h3}>{r.s6_1}</h3><p style={s.p}>{r.s6_2}</p>

        <h2 style={s.h2}>{r.s7_titulo}</h2>
        <h3 style={s.h3}>{r.s7_1_titulo}</h3><p style={s.p}>{r.s7_1_texto}</p>
        <h3 style={s.h3}>{r.s7_2_titulo}</h3><p style={s.p}>{r.s7_2_texto}</p>

        <h2 style={s.h2}>{r.s8_titulo}</h2>
        <h3 style={s.h3}>{r.s8_1_titulo}</h3><ul><li style={s.li}>{r.s8_1_1}</li><li style={s.li}>{r.s8_1_2}</li><li style={s.li}>{r.s8_1_3}</li><li style={s.li}>{r.s8_1_4}</li></ul>
        <h3 style={s.h3}>{r.s8_2_titulo}</h3><ul><li style={s.li}>{r.s8_2_1}</li><li style={s.li}>{r.s8_2_2}</li><li style={s.li}>{r.s8_2_3}</li><li style={s.li}>{r.s8_2_4}</li></ul>

        <h2 style={s.h2}>{r.s9_titulo}</h2>
        <h3 style={s.h3}>{r.s9_1_titulo}</h3><p style={s.p}>{r.s9_1_1}</p><p style={s.p}>{r.s9_1_2}</p>
        <h3 style={s.h3}>{r.s9_2_titulo}</h3><p style={s.p}>{r.s9_2_texto}</p>

        <h2 style={s.h2}>{r.s10_titulo}</h2>
        <h3 style={s.h3}>{r.s10_1_titulo}</h3><p style={s.p}>{r.s10_1_texto}</p>
        <h3 style={s.h3}>{r.s10_2_titulo}</h3><p style={s.p}>{r.s10_2_texto}</p>

        <h2 style={{...s.h2, textAlign: 'center', marginTop: '3rem'}}>{r.contacto_titulo}</h2>
        <p style={{...s.p, textAlign: 'center'}}><strong>{r.contacto_sub}</strong></p>
        <p style={{...s.p, textAlign: 'center'}}>{r.contacto_email}</p>
        <p style={{...s.p, textAlign: 'center', marginTop: '2rem', fontStyle: 'italic'}}>{r.cierre}</p>
      </div>
      <Footer />
    </div>
  );
}