'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { CSSProperties } from 'react'

export default function AdminHeader() {
	const router = useRouter()
	const handleLogout = async () => {
		try {
			await fetch('/api/auth/logout', {
				method: 'POST',
			})

			window.location.href = '/login'
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<header style={styles.header}>
			<div style={styles.logoContainer}>
				<Image src='/logos/logo-voltria.png' alt='Voltria' width={180} height={60} priority />
			</div>

			<button style={styles.logoutButton} onClick={handleLogout}>
				Cerrar sesión
			</button>
		</header>
	)
}

const styles: Record<string, CSSProperties> = {
	header: {
		background: '#044290',
		height: 80,
		padding: '0 30px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	logoContainer: {
		display: 'flex',
		alignItems: 'center',
	},

	logoutButton: {
		background: 'transparent',
		border: '1px solid rgba(255,255,255,0.3)',
		color: '#FFFFFF',
		padding: '10px 16px',
		borderRadius: 8,
		cursor: 'pointer',
		fontWeight: 600,
	},
}
