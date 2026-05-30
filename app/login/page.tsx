'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
	const router = useRouter()

	const [user, setUser] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handleLogin = async () => {
		try {
			setLoading(true)
			setError('')

			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user,
					password,
				}),
			})

			if (!response.ok) {
				throw new Error('Credenciales inválidas')
			}

			router.push('/admin')
			router.refresh()
		} catch {
			setError('Usuario o contraseña incorrectos')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div style={styles.container}>
			<div style={styles.card}>
				<div style={styles.logoContainer}>
					<Image src='/logos/logo-voltria.png' alt='Voltria' width={180} height={60} priority />
				</div>

				<input
					style={styles.input}
					placeholder='Usuario'
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>

				<input
					type='password'
					style={styles.input}
					placeholder='Contraseña'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				{error && <p style={styles.error}>{error}</p>}

				<button style={styles.button} onClick={handleLogin} disabled={loading}>
					{loading ? 'Ingresando...' : 'Ingresar'}
				</button>
			</div>
		</div>
	)
}

const styles = {
	container: {
		minHeight: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#054290',
	},

	card: {
		width: 400,
		background: '#ececec',
		padding: 30,
		borderRadius: 12,
		display: 'flex',
		flexDirection: 'column' as const,
		gap: 15,
	},

	title: {
		textAlign: 'center' as const,
		color: '#044290',
	},

	input: {
		padding: 12,
		borderRadius: 8,
		border: '1px solid #D1D5DB',
		color: '#000',
	},

	button: {
		padding: 12,
		borderRadius: 8,
		border: 'none',
		background: '#044290',
		color: 'white',
		cursor: 'pointer',
		fontWeight: 'bold',
	},

	error: {
		color: '#DC2626',
		fontSize: 14,
	},
	logoContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}
