// app/api/payment/failure/route.ts

import {  NextResponse } from "next/server";

export async function POST() {
    return NextResponse.redirect(`${process.env.AUTH_URL}/donation/failure`);
  }