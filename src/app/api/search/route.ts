import { NextResponse } from "next/server";

const API_KEY = process.env.HOTPEPPER_API_KEY;

export async function GET() {
  return NextResponse.json({
    message: API_KEY,
  })
}
