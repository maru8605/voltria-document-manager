import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const session = request.cookies.get('session')

	const isLoggedIn = session?.value === 'authenticated'

	const pathname = request.nextUrl.pathname

	const isAdminRoute = pathname.startsWith('/admin')
	const isLoginRoute = pathname === '/login'

	if (isAdminRoute && !isLoggedIn) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (isLoginRoute && isLoggedIn) {
		return NextResponse.redirect(new URL('/admin', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/admin/:path*', '/login'],
}
