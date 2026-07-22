import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, servicios, comentarios, language } = body;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const isEnglish = language === 'en';

    const serviciosHTML = servicios.map((s: string) => `<li>${s}</li>`).join('');

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'gestion@plusbitnova.com',
        to: adminEmail,
        subject: isEnglish ? `[Design] ${nombre}` : `[Diseñar] ${nombre}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><h2 style="color:#27ae60;">${isEnglish ? 'New Design Request' : 'Nueva solicitud'}</h2><p><strong>${nombre}</strong> (${email})</p><ul>${serviciosHTML}</ul>${comentarios ? `<p>${comentarios}</p>` : ''}</div>`,
      });
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'gestion@plusbitnova.com',
      to: email,
      subject: isEnglish ? 'Request received - PubliCore' : 'Solicitud recibida - PubliCore',
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><h2 style="color:#27ae60;">${isEnglish ? `Thanks, ${nombre}!` : `¡Gracias, ${nombre}!`}</h2><p>${isEnglish ? 'We will contact you soon.' : 'Pronto te contactaremos.'}</p></div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}