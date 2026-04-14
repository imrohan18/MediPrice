import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Pass-through middleware: session refresh is handled in Server Components
  // via utils/supabase/server.ts. @supabase/ssr's createServerClient uses
  // Node.js crypto APIs incompatible with Vercel's Edge Runtime.
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

