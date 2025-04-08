import { NextURL } from 'next/dist/server/web/next-url';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from './lib/firebase/config';

const PROTECTED_ROUTES_UNAUTHORIZED = ['/rest-client', '/history', 'variables'];
const PROTECTED_ROUTES_AUTHORIZED = ['/signin', '/signup'];

export function middleware(req: NextRequest) {
  // const { pathname, origin } = req.nextUrl;
  // if (auth.currentUser) {
  //   if (PROTECTED_ROUTES_AUTHORIZED.includes(pathname)) {
  //     const mainUrl = new NextURL('/', origin);
  //     return NextResponse.redirect(mainUrl);
  //   }
  // } else {
  //   if (PROTECTED_ROUTES_UNAUTHORIZED.includes(pathname)) {
  //     const mainUrl = new NextURL('/', origin);
  //     return NextResponse.redirect(mainUrl);
  //   }
  // }
}
