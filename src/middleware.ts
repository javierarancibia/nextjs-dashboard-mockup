import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/auth/login', '/auth/signup'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  // Check for the token in cookies
  const token = req.cookies.get('ValuadorToken');
  console.log(token)

  // Redirect to /auth/login if the user is not authenticated and the route is protected
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  // No redirection needed for public routes or authenticated users on protected routes
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};