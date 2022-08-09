
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const authorization = req.headers.get('authorization')
  const url = req.nextUrl

  const expectedUsername = process.env.BASIC_AUTH_USERNAME
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD

  if (authorization) {
    const token = authorization.split(' ')[1] ?? ''

    // We need to use atob here, as `Buffer` is not available in middlewares
    const [username, password] = atob(token).split(':')
    if (username === expectedUsername && password === expectedPassword) {
      // Authorized
      return NextResponse.next()
    }
  }

  // Not authorized
  url.pathname = '/api/v1/auth'
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/', '/api/(.*)']
}
