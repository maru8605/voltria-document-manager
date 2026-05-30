import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const validUser = process.env.ADMIN_USER
		const validPassword = process.env.ADMIN_PASSWORD

		if (body.user !== validUser || body.password !== validPassword) {
			return NextResponse.json(
				{
					error: 'Credenciales inválidas',
				},
				{
					status: 401,
				}
			)
		}

		const cookieStore = await cookies()

		cookieStore.set('session', 'authenticated', {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24,
		})
    cookieStore.set('username', process.env.ADMIN_USER || 'Admin')
		return NextResponse.json({
			success: true,
		})
	} catch (error) {
		console.error(error)

		return NextResponse.json(
			{
				error: 'Error interno',
			},
			{
				status: 500,
			}
		)
	}
}
