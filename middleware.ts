import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

// Origens autorizadas a embutir o chat de cada chave do widget (cache de 60 s)
const frameCache = new Map<string, { origins: string[]; at: number }>();

async function frameAncestorsFor(key: string): Promise<string[]> {
  if (!/^pk_wl_[a-f0-9]{20,64}$/.test(key) || !API_URL) return [];
  const cached = frameCache.get(key);
  if (cached && Date.now() - cached.at < 60_000) return cached.origins;
  try {
    const res = await fetch(`${API_URL}/widget/config?key=${encodeURIComponent(key)}`, { cache: 'no-store' });
    const data = res.ok ? await res.json() : null;
    const origins: string[] = Array.isArray(data?.frameAncestors)
      ? data.frameAncestors.filter((o: string) => /^https?:\/\/[a-z0-9.-]+(:\d+)?$/i.test(o))
      : [];
    frameCache.set(key, { origins, at: Date.now() });
    return origins;
  } catch {
    return [];
  }
}

export async function middleware(request: NextRequest) {
  // Chat embutido (widget white-label): só os sites cadastrados do escritório podem abrir o iframe
  if (request.nextUrl.pathname.startsWith('/embed')) {
    const origins = await frameAncestorsFor(request.nextUrl.searchParams.get('key') || '');
    const response = NextResponse.next();
    response.headers.set('Content-Security-Policy', `frame-ancestors ${origins.length ? origins.join(' ') : "'none'"}`);
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    return response;
  }

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
    '/signup',
    '/embed/:path*'
  ],
};
