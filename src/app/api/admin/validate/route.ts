import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminPassword && token === adminPassword) {
      return NextResponse.json({ valid: true });
    }
    return NextResponse.json({ valid: false });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
