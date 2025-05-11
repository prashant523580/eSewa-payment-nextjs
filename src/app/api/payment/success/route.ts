// app/api/payment/success/route.ts
import { NextRequest, NextResponse } from 'next/server';

import CryptoJS from "crypto-js";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Extract required parameters
    const donationId = formData.get('donationId');
    const transactionUuid = formData.get('transaction_uuid');
    const totalAmount = formData.get('total_amount');
    const productCode = formData.get('product_code');
    const receivedSignature = formData.get('signature');

    // Validate required parameters
    if (!donationId || !transactionUuid || !totalAmount || !productCode || !receivedSignature) {
      return NextResponse.redirect(`${process.env.AUTH_URL}/failure`);
    }

    // Verify with eSewa API
    const verificationResponse = await fetch('https://rc-epay.esewa.com.np/api/epay/main/v2/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ESEWA_SECRET_KEY}`
      },
      body: JSON.stringify({
        transaction_uuid: transactionUuid.toString(),
        total_amount: totalAmount.toString()
      })
    });

    if (!verificationResponse.ok) {
      throw new Error('eSewa verification failed');
    }

    // Generate signature
    const signatureMessage = [
      `total_amount=${totalAmount.toString()}`,
      `transaction_uuid=${transactionUuid.toString()}`,
      `product_code=${process.env.ESEWA_MERCHANT_ID}`
    ].join(',');

    const validSignature = CryptoJS.HmacSHA256(
      signatureMessage,
      process.env.ESEWA_SECRET_KEY!
    ).toString(CryptoJS.enc.Base64);

    if (validSignature !== receivedSignature.toString()) {
      throw new Error('Invalid signature');
    }

  

    return NextResponse.redirect(`${process.env.AUTH_URL}/success`);

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.redirect(`${process.env.AUTH_URL}/failure`);
  }
}