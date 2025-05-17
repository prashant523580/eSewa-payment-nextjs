// app/api/payment/failure/route.ts

import {  NextResponse } from "next/server";

export async function POST() {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/failure`);
  }