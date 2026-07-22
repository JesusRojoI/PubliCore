import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, nombre, descuento, cupon, language } = body;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const isEnglish = language === 'en';

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'gestion@plusbitnova.com',
      to: to,
      subject: isEnglish ? `${descuento}% Discount Coupon! - PubliCore` : `¡Cupón de descuento del ${descuento}%! - PubliCore`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h1 style="color:#27ae60;">${isEnglish ? `🎁 Congratulations, ${nombre}!` : `🎁 ¡Felicidades, ${nombre}!`}</h1>
          <p>${isEnglish ? `You have received a <strong>${descuento}%</strong> discount coupon.` : `Has obtenido un cupón de descuento del <strong>${descuento}%</strong>.`}</p>
          <div style="margin:30px 0;padding:20px;background:#f5f5f5;text-align:center;">
            <p style="font-size:14px;color:#666;">${isEnglish ? 'Your coupon code:' : 'Tu código de cupón:'}</p>
            <p style="font-size:32px;font-weight:bold;color:#1a1a1a;letter-spacing:3px;">${cupon}</p>
          </div>
          <p style="font-size:14px;color:#666;">${isEnglish ? 'Use this code at checkout.' : 'Usa este código al finalizar tu compra.'}</p>
          <p style="font-size:14px;color:#999;">PubliCore</p>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}