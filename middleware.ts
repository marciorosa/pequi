import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get('token')?.value;
  const isAuthRoute = request.nextUrl.pathname.startsWith('/dashboard');
  const isLoginPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';
  
  // Check if token is properly formatted
  const isValidToken = token && token.length > 20;

  // If trying to access protected route without valid token, redirect to login
  if (isAuthRoute && !isValidToken) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', request.nextUrl.pathname);
    
    // Clear any potentially invalid tokens
    const response = NextResponse.redirect(url);
    response.cookies.delete('token'); 
    
    return response;
  }

  // If trying to access login page with valid token, redirect to dashboard
  if (isLoginPage && isValidToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which paths should be protected
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/signup'
  ],
}; 