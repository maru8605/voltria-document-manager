import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function Home() {
	const cookieStore = await cookies()
	const session = cookieStore.get('session')
	const isLoggedIn = session?.value === 'authenticated'

	redirect(isLoggedIn ? '/admin' : '/login')
}
