import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ROUTES } from '@/shared/routes';

const protectedPaths = [ROUTES.REST, ROUTES.VARIABLES, ROUTES.HISTORY];
const authPaths = [ROUTES.SIGN_IN, ROUTES.SIGN_UP];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('firebase-token')?.value;

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  const isAuthPath = authPaths.some((path) => pathname === path);

  if ((isProtectedPath && !token) || (isAuthPath && token)) {
    return NextResponse.redirect(new URL(ROUTES.MAIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/rest-client/:path*', '/variables/:path*', '/history/:path*', '/signin', '/signup'],
};
