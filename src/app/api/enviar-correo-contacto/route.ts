import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, asunto, mensaje, language } = body;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const isEnglish = language === 'en';

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'gestion@plusbitnova.com',
        to: adminEmail,
        subject: isEnglish ? `[Contact] ${asunto} - ${nombre}` : `[Contacto] ${asunto} - ${nombre}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><h2 style="color:#27ae60;">${isEnglish ? '📬 New Message' : '📬 Nuevo mensaje'}</h2><p><strong>${isEnglish ? 'Name:' : 'Nombre:'}</strong> ${nombre}</p><p><strong>Email:</strong> ${email}</p><p><strong>${isEnglish ? 'Subject:' : 'Asunto:'}</strong> ${asunto}</p><hr/><p>${mensaje}</p></div>`,
      });
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'gestion@plusbitnova.com',
      to: email,
      subject: isEnglish ? 'We received your message - PubliCore' : 'Recibimos tu mensaje - PubliCore',
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><h2 style="color:#27ae60;">${isEnglish ? `Thanks, ${nombre}!` : `¡Gracias, ${nombre}!`}</h2><p>${isEnglish ? 'We will contact you soon.' : 'Pronto te contactaremos.'}</p></div>`,
    });

    return NextResponse.json({ success: true, message: 'Correos enviados' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'Error' }, { status: 500 });
  }
}
