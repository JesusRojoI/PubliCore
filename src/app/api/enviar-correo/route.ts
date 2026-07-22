import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, orderData, language } = body;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const isEnglish = language === 'en';

    const productosHTML = orderData.productos
      .map((p: any) => `<tr><td style="padding:8px;border-bottom:1px solid #eee;">${p.nombre} (SKU: ${p.sku})</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">$${p.precio.toFixed(2)}</td></tr>`)
      .join('');

    const emailHTML = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h1 style="color:#27ae60;">${isEnglish ? 'Purchase Confirmed!' : '¡Compra confirmada!'}</h1>
        <p>${isEnglish ? `Hello <strong>${orderData.nombre}</strong>,` : `Hola <strong>${orderData.nombre}</strong>,`}</p>
        <p>${isEnglish ? 'Your order has been processed successfully.' : 'Tu pedido ha sido procesado correctamente.'}</p>
        <h2>${isEnglish ? 'Order Summary' : 'Resumen de tu pedido'}</h2>
        <table style="width:100%;border-collapse:collapse;">${productosHTML}</table>
        <div style="margin-top:20px;padding:15px;background:#f5f5f5;">
          <p><strong>${isEnglish ? 'Subtotal:' : 'Subtotal:'}</strong> $${orderData.subtotal.toFixed(2)}</p>
          ${orderData.descuento > 0 ? `<p><strong>${isEnglish ? 'Discount:' : 'Descuento:'}</strong> -$${orderData.descuento.toFixed(2)}</p>` : ''}
          <p><strong>${isEnglish ? 'Tax:' : 'Impuesto:'}</strong> $${orderData.impuesto.toFixed(2)}</p>
          <p style="font-size:18px;"><strong>${isEnglish ? 'Total:' : 'Total:'}</strong> $${orderData.total.toFixed(2)}</p>
          ${orderData.cupon ? `<p><strong>${isEnglish ? 'Coupon used:' : 'Cupón utilizado:'}</strong> ${orderData.cupon}</p>` : ''}
        </div>
        <p><strong>${isEnglish ? 'Transaction:' : 'Transacción:'}</strong> ${orderData.transactionId}</p>
        <p>${isEnglish ? 'Thank you for your purchase at' : 'Gracias por tu compra en'} <strong>PubliCore</strong>.</p>
      </div>`;

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'gestion@plusbitnova.com',
      to: to,
      subject: isEnglish ? 'Purchase Confirmed! - PubliCore' : '¡Compra confirmada! - PubliCore',
      html: emailHTML,
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'gestion@plusbitnova.com',
        to: adminEmail,
        subject: isEnglish ? `[FWD] New Purchase - ${orderData.nombre}` : `[FWD] Nueva compra - ${orderData.nombre}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><h2 style="color:#27ae60;">${isEnglish ? '📦 New Purchase' : '📦 Nueva compra'}</h2><p><strong>${isEnglish ? 'Customer:' : 'Cliente:'}</strong> ${orderData.nombre}</p><p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p><hr/>${emailHTML}</div>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}