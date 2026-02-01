import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';

// Next.js 16 - Proxy replaces Middleware
// Runs in Node.js runtime, NOT Edge Runtime
// More secure for authentication

const publicRoutes = ['/login', '/register', '/api/auth'];
const protectedRoutes = ['/admin'];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => 
    path.startsWith(route) || path === '/'
  );
  
  // Check if route needs protection
  const isProtectedRoute = protectedRoutes.some(route =>
    path.startsWith(route)
  );
  
  // For protected routes, verify session from request cookies
  if (isProtectedRoute) {
    const token = request.cookies.get('session')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const session = await decrypt(token);
    
    if (!session?.userId) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Add security headers
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

// Configure which paths the proxy runs on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
