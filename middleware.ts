import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

export async function middleware(request: NextRequest) {
  console.log('🔍 Middleware running for:', request.nextUrl.pathname);
  
  // Only run middleware for admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    console.log('❌ Not an admin route, skipping middleware');
    return NextResponse.next();
  }

  // Allow access to login page
  if (request.nextUrl.pathname === '/admin/login') {
    console.log('✅ Allowing access to login page');
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value;
  console.log('🍪 Token found:', token ? 'yes' : 'no');
  console.log('🍪 All cookies:', request.cookies.getAll().map(c => c.name));

  if (!token) {
    console.log('❌ No token, redirecting to login');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Perform a minimal check in Edge: ensure token exists; defer full verification to server routes
  return NextResponse.next();
}

export const config = {
  matcher: [],
}
