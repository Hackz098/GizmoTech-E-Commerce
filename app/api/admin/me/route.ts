import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });
  try {
    verify(token, JWT_SECRET);
    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
