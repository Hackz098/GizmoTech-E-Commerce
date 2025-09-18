import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs'
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    console.log('Login attempt for username:', username);

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    console.log('Admin found:', admin ? 'yes' : 'no');

    if (!admin) {
      console.log('Admin not found');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await compare(password, admin.password);
    console.log('Password match:', passwordMatch ? 'yes' : 'no');

    if (!passwordMatch) {
      console.log('Password does not match');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT token
    const token = sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set JWT token in HTTP-only cookie
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: false, // Set to false for development
      sameSite: 'lax',
      path: '/',
      maxAge: 86400 // 1 day in seconds
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
