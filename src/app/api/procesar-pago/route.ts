import { NextResponse } from 'next/server';

const ETOMIN_API_URL = 'https://pagos.etomin.com/api/v1';

async function postSignin(email: string, password: string) {
  const response = await fetch(`${ETOMIN_API_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

async function postCardTokenizer(token: string, cardData: any) {
  const response = await fetch(`${ETOMIN_API_URL}/card/tokenizer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ cardData }),
  });
  return response.json();
}

async function postSale(token: string, saleData: any) {
  const response = await fetch(`${ETOMIN_API_URL}/sale`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(saleData),
  });
  return response.json();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombreTarjeta, numeroTarjeta, fechaTarjeta, cvv, monto, nombre, apellidos, email, direccion, poblacion, region, codigoPostal, telefono } = body;

    // Validar credenciales
    if (!process.env.ETOMIN_USER || !process.env.ETOMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Configuración de pago incompleta' },
        { status: 500 }
      );
    }

    // 1. Autenticación con Etomin
    const authResponse = await postSignin(
      process.env.ETOMIN_USER,
      process.env.ETOMIN_PASSWORD
    );

    const token = authResponse.data?.authToken || authResponse.authToken;
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No se pudo autenticar con Etomin' },
        { status: 500 }
      );
    }

    // 2. Tokenización de tarjeta
    const [month, year] = fechaTarjeta.split('/');
    const tokenResponse = await postCardTokenizer(token, {
      cardNumber: numeroTarjeta.replace(/\s/g, ''),
      cardholderName: nombreTarjeta,
      expirationYear: '20' + year,
      expirationMonth: month,
    });

    const cardToken = tokenResponse.data?.cardNumberToken || tokenResponse.cardNumberToken;
    if (!cardToken) {
      return NextResponse.json(
        { success: false, message: 'No se pudo tokenizar la tarjeta' },
        { status: 500 }
      );
    }

    // 3. Realizar venta
    const orderId = 'TXN-' + Date.now();
    const saleResponse = await postSale(token, {
      amount: Number(monto),
      currency: "484", // MXN
      reference: orderId,
      customerInformation: {
        firstName: nombre?.trim() || 'Cliente',
        lastName: apellidos?.trim() || 'PubliCore',
        middleName: "",
        email: email || 'cliente@publicore.com.mx',
        phone1: telefono || '5555555555',
        city: poblacion || 'Ciudad de México',
        address1: direccion || 'Sin dirección',
        postalCode: codigoPostal || '06500',
        state: region || 'Ciudad de México',
        country: 'México',
        ip: request.headers.get('x-forwarded-for') || '0.0.0.0',
      },
      cardData: {
        cardNumberToken: cardToken,
        cvv: cvv,
      },
    });

    const orderIdResponse = saleResponse.data?.orderId || saleResponse.orderId || orderId;
    const reference = saleResponse.data?.reference || saleResponse.reference || orderId;
    const status = saleResponse.data?.status || saleResponse.status || 'APPROVED';

    return NextResponse.json({
      success: true,
      transactionId: orderIdResponse,
      reference: reference,
      status: status,
      message: 'Pago procesado correctamente',
    });

  } catch (error: any) {
    console.error('Error en pasarela Etomin:', error);
    return NextResponse.json({
      success: false,
      status: 'error',
      message: error?.message || 'Error procesando el pago',
    }, { status: 500 });
  }
}