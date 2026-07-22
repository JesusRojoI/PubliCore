import { NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = "https://pagos.keycop.com.mx/api/v1";

async function getAuthToken() {
  const { data } = await axios.post(`${API_URL}/signin`, {
    email: process.env.KEYCOP_EMAIL,
    password: process.env.KEYCOP_PASSWORD
  });
  return data.authToken;
}

async function tokenizeCard(token: string, cardData: any) {
  const { data } = await axios.post(`${API_URL}/card/tokenizer`, {
    cardData: {
      cardNumber: cardData.number.replace(/\s/g, ''),
      cardholderName: cardData.name,
      expirationYear: cardData.year,
      expirationMonth: cardData.month
    }
  }, { headers: { Authorization: `Bearer ${token}` } });
  return data.cardNumberToken;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombreTarjeta, numeroTarjeta, fechaTarjeta, cvv, monto, nombre, apellidos, email, direccion, poblacion, region, codigoPostal, telefono } = body;

    if (!process.env.KEYCOP_EMAIL || !process.env.KEYCOP_PASSWORD) {
      return NextResponse.json({ success: false, message: 'Configuración de pago incompleta' }, { status: 500 });
    }

    const authToken = await getAuthToken();
    const [month, year] = fechaTarjeta.split('/');
    const cardToken = await tokenizeCard(authToken, {
      number: numeroTarjeta,
      name: nombreTarjeta,
      month: month,
      year: '20' + year
    });

    const salePayload = {
      amount: Number(monto),
      currency: "484",
      reference: 'TXN-' + Date.now(),
      customerInformation: {
        firstName: nombre || 'Cliente',
        lastName: apellidos || 'PubliCore',
        email: email || 'cliente@publicore.com.mx',
        phone1: telefono || '5555555555',
        address1: direccion || 'Sin dirección',
        address2: "",
        city: poblacion || 'Ciudad de México',
        state: region || 'Ciudad de México',
        postalCode: codigoPostal || '06500',
        country: "MX",
        company: "",
        ip: request.headers.get('x-forwarded-for') || '127.0.0.1',
      },
      cardData: { cardNumberToken: cardToken, cvv: cvv },
    };

    const { data } = await axios.post(`${API_URL}/sale`, salePayload, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    if (data.status === "APPROVED") {
      return NextResponse.json({ success: true, transactionId: data.orderId || data.reference, reference: data.reference, status: data.status, message: 'Pago aprobado' });
    } else {
      return NextResponse.json({ success: false, status: data.status, message: data.message || 'Pago rechazado' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Keycop Payment Error:', error.response?.data || error.message);
    return NextResponse.json({ success: false, status: 'error', message: error.response?.data?.message || 'Error procesando el pago' }, { status: 500 });
  }
}