'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import AdminHeader from '@/components/layout/AdminHeader'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboardPage() {
	const router = useRouter()
	const [stats, setStats] = useState({
		total: 0,
		remitos: 0,
		presupuestos: 0,
		ordenes: 0,
	})

	type DashboardDocument = {
		id: string
		type: string
		number: string
		createdAt: string
		data: {
			cliente?: {
				nombre?: string
			}
		}
	}

	const [latestDocuments, setLatestDocuments] = useState<DashboardDocument[]>([])

	useEffect(() => {
		const loadStats = async () => {
			try {
				const response = await fetch('/api/documents', {
					cache: 'no-store',
				})

				const documents = await response.json()
				setLatestDocuments(documents.slice(0, 5))
				setStats({
					remitos: documents.filter((doc: { type: string }) => doc.type === 'REMITO').length,

					presupuestos: documents.filter((doc: { type: string }) => doc.type === 'PRESUPUESTO')
						.length,

					ordenes: documents.filter((doc: { type: string }) => doc.type === 'ORDEN_TRABAJO').length,

					total: documents.length,
				})
			} catch (error) {
				console.error(error)
			}
		}

		loadStats()
	}, [])

	return (
		<>
			<AdminHeader />

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

				<div style={styles.gridStats}>
					<div style={styles.statCard}>
						<h3>Remitos</h3>
						<p style={styles.statNumber}>{stats.remitos}</p>
					</div>

					<div style={styles.statCard}>
						<h3>Presupuestos</h3>
						<p style={styles.statNumber}>{stats.presupuestos}</p>
					</div>

					<div style={styles.statCard}>
						<h3>Órdenes de trabajo</h3>
						<p style={styles.statNumber}>{stats.ordenes}</p>
					</div>

					<div style={styles.statCard}>
						<h3>Total documentos</h3>
						<p style={styles.statNumber}>{stats.total}</p>
					</div>
				</div>

				<div style={styles.latestContainer}>
					<h2 style={styles.latestTitle}>Últimos documentos</h2>

					{latestDocuments.length === 0 ? (
						<p>No hay documentos generados.</p>
					) : (
						<div style={styles.latestList}>
							{latestDocuments.map((doc) => (
								<div
									key={doc.id}
									style={styles.latestItem}
									onClick={() => router.push(`/admin/documents/${doc.id}`)}
								>
									<div>
										<strong>{doc.type}</strong> #{doc.number}
									</div>

									<div>{doc.data?.cliente?.nombre || 'Sin cliente'}</div>

									<div>{new Date(doc.createdAt).toLocaleDateString()}</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</>
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
		marginBottom: 30,
	},

	card: {
		background: 'white',
		padding: 24,
		borderRadius: 12,
		border: '1px solid #D1D5DB',
		textDecoration: 'none',
		color: '#111827',
		boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
		textAlign: 'center',
	},

	subtitle: {
		fontSize: '24px',
		fontWeight: 'bold',
	},
	gridStats: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
		gap: 20,
		marginBottom: 30,
	},

	statCard: {
		background: 'white',
		padding: 20,
		borderRadius: 12,
		border: '1px solid #D1D5DB',
		textAlign: 'center',
		boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
		color: '#000',
	},

	statNumber: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#044290',
		marginTop: 10,
	},
	latestContainer: {
		background: 'white',
		borderRadius: 12,
		padding: 24,
		marginBottom: 30,
		border: '1px solid #D1D5DB',
	},

	latestTitle: {
		marginBottom: 20,
		color: '#111827',
	},

	latestList: {
		display: 'flex',
		flexDirection: 'column',
		gap: 12,
	},

	latestItem: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 12,
		borderBottom: '1px solid #E5E7EB',
		color: '#111827',
		cursor: 'pointer'
	},
}
