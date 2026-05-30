'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'

export default function AdminDashboardPage() {
	return (
		<div style={styles.container}>
			<h1 style={styles.title}>Panel administrativo</h1>

			<div style={styles.grid}>
				<Link href='/admin/documents/new' style={styles.card}>
					<h2 style={styles.subtitle}>Nuevo documento</h2>
					<p>Crear remitos, presupuestos y órdenes de trabajo.</p>
				</Link>

				<Link href='/admin/documents/list' style={styles.card}>
					<h2 style={styles.subtitle}>Documentos generados</h2>
					<p>Ver historial y administrar documentos.</p>
				</Link>
			</div>
		</div>
	)
}

const styles: Record<string, CSSProperties> = {
	container: {
		padding: 40,
		minHeight: '100vh',
		background: '#E5E7EB',
	},

	title: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 30,
		color: '#111827',
	},

	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
		gap: 20,
	},

	card: {
		background: 'white',
		padding: 24,
		borderRadius: 12,
		border: '1px solid #D1D5DB',
		textDecoration: 'none',
		color: '#111827',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    textAlign: 'center'
  },
  
  subtitle: {
    fontSize: '24px',
    fontWeight: 'bold'
  }
}
