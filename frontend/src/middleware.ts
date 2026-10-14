import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('👉 Запрос на:', request.nextUrl.pathname);

  const response = NextResponse.next();
  response.headers.set('x-hello-from-middleware', 'hello from middleware');
  return response;
}

// Где middleware должен срабатывать
export const config = {
  matcher: '/:path*',  // все пути
};