'use client'

import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { useRouter } from 'next/navigation'
import Modal from '@/components/ui/Modal'
import AdminHeader from '@/components/layout/AdminHeader'
type DocumentItem = {
	id: string
	type: string
	number: string
	data: {
		cliente?: {
			nombre?: string
		}
		[key: string]: unknown
	}
	createdAt: string
}

export default function DocumentsListPage() {
	const [documents, setDocuments] = useState<DocumentItem[]>([])
	const [loading, setLoading] = useState(true)

	const [search, setSearch] = useState('')
	const [filterType, setFilterType] = useState('ALL')
	const [filterDate, setFilterDate] = useState('')
	
	const [deleteModal, setDeleteModal] = useState(false)

	const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)

	const [deleting, setDeleting] = useState(false)

	const router = useRouter()

	useEffect(() => {
		const loadDocuments = async () => {
			try {
				const response = await fetch('/api/documents', {
					cache: 'no-store', 
				})
				const data = await response.json()

				console.log('📦 DOCUMENTOS API:', data)

				setDocuments(data)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		loadDocuments()
	}, [])

	// FILTRADO
	const filteredDocuments = useMemo(() => {
		return documents.filter((doc) => {
			const matchesSearch =
				(doc.data.cliente?.nombre ?? '').toLowerCase().includes(search.toLowerCase()) ||
				(doc.number ?? '').toLowerCase().includes(search.toLowerCase())

			const matchesType = filterType === 'ALL' || doc.type === filterType

			const docDate = new Date(doc.createdAt)

			const localDate = `${docDate.getFullYear()}-${String(docDate.getMonth() + 1).padStart(
				2,
				'0'
			)}-${String(docDate.getDate()).padStart(2, '0')}`

			const matchesDate = !filterDate || localDate === filterDate

			return matchesSearch && matchesType && matchesDate
		})
	}, [documents, search, filterType, filterDate])

	const getTypeLabel = (type: string) => {
		switch (type) {
			case 'REMITO':
				return 'Remito'

			case 'PRESUPUESTO':
				return 'Presupuesto'

			case 'ORDEN_TRABAJO':
				return 'Orden de trabajo'

			default:
				return type
		}
	}

	const handleDelete = async () => {
		if (!selectedDocumentId) return

		try {
			setDeleting(true)

			const response = await fetch(`/api/documents/${selectedDocumentId}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error('Error eliminando documento')
			}

			setDocuments((prev) => prev.filter((doc) => doc.id !== selectedDocumentId))

			setDeleteModal(false)

			setSelectedDocumentId(null)
		} catch (error) {
			console.error(error)
			alert('Error eliminando documento')
		} finally {
			setDeleting(false)
		}
	}

	return (
		<>
			<AdminHeader />
			<div style={styles.container}>
				{/* HEADER */}
				<div style={styles.header}>
					<div>
						<h1 style={styles.title}>Documentos generados</h1>

						<p style={styles.subtitle}>Visualizá, buscá y administrá los documentos creados.</p>
					</div>
					<div style={styles.headerContainer}>
						<button onClick={() => router.push('/admin')} style={styles.btn}>
							← Inicio
						</button>
						<button onClick={() => router.push('/admin/documents/new')} style={styles.btn}>
							Nuevo
						</button>
					</div>
				</div>

				{/* FILTERS */}
				<div style={styles.filters}>
					<input
						style={styles.searchInput}
						placeholder='Buscar por cliente o número...'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<input
						type='date'
						value={filterDate}
						onChange={(e) => setFilterDate(e.target.value)}
						style={styles.searchInput}
					/>

					<select
						style={styles.select}
						value={filterType}
						onChange={(e) => setFilterType(e.target.value)}
					>
						<option value='ALL'>Todos</option>

						<option value='REMITO'>Remitos</option>

						<option value='PRESUPUESTO'>Presupuestos</option>

						<option value='ORDEN_TRABAJO'>Órdenes de trabajo</option>
					</select>
				</div>

				{/* CONTENT */}
				{loading ? (
					<div style={styles.emptyState}>
						<p>Cargando documentos...</p>
					</div>
				) : filteredDocuments.length === 0 ? (
					<div style={styles.emptyState}>
						<h3>No se encontraron documentos</h3>

						<p>Probá cambiando los filtros o generando un nuevo documento.</p>
					</div>
				) : (
					<>
						{/* RESUMEN */}
						<div style={styles.summary}>
							<p style={styles.summaryText}>
								Documentos encontrados: <b>{filteredDocuments.length}</b>
							</p>
						</div>

						{/* GRID */}
						<div style={styles.grid}>
							{filteredDocuments.map((doc) => (
								<div key={doc.id} style={styles.card}>
									<div style={styles.cardTop}>
										<div style={styles.badge}>{getTypeLabel(doc.type)}</div>

										<p style={styles.date}>{new Date(doc.createdAt).toLocaleDateString()}</p>
									</div>

									<div style={styles.cardContent}>
										<h3 style={styles.number}>{doc.number || 'Sin número'}</h3>

										<p style={styles.client}>{doc.data?.cliente?.nombre || 'Sin cliente'}</p>
									</div>

									<div style={styles.actions}>
										<button
											onClick={() => (window.location.href = `/admin/documents/${doc.id}`)}
											style={styles.primaryButton}
										>
											Ver
										</button>
										<button
											style={styles.button}
											onClick={() => router.push(`/admin/documents/edit/${doc.id}`)}
										>
											Editar
										</button>

										<button
											style={styles.buttonDanger}
											onClick={() => {
												setSelectedDocumentId(doc.id)
												setDeleteModal(true)
											}}
										>
											Eliminar
										</button>
									</div>
								</div>
							))}
						</div>
					</>
				)}

				<Modal open={deleteModal} title='Eliminar documento' onClose={() => setDeleteModal(false)}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
						}}
					>
						<p style={{ color: '#000' }}>¿Estás seguro de eliminar este documento?</p>

						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								gap: 10,
							}}
						>
							<button style={styles.button} onClick={() => setDeleteModal(false)}>
								Cancelar
							</button>

							<button style={styles.buttonDanger} onClick={handleDelete} disabled={deleting}>
								{deleting ? 'Eliminando...' : 'Eliminar'}
							</button>
						</div>
					</div>
				</Modal>
			</div>
		</>
	)
}

const styles: Record<string, CSSProperties> = {
	container: {
		padding: 30,
		background: '#F3F4F6',
		minHeight: '100vh',
	},

	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 25,
	},

	title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#111827',
		margin: 0,
	},

	subtitle: {
		marginTop: 8,
		color: '#6B7280',
		fontSize: 15,
	},

	filters: {
		display: 'flex',
		gap: 15,
		marginBottom: 25,
		flexWrap: 'wrap',
	},

	searchInput: {
		flex: 1,
		minWidth: 250,
		padding: '12px 14px',
		borderRadius: 10,
		border: '1px solid #D1D5DB',
		background: 'white',
		fontSize: 14,
		color: '#111827',
	},

	select: {
		padding: '12px 14px',
		borderRadius: 10,
		border: '1px solid #D1D5DB',
		background: 'white',
		fontSize: 14,
		color: '#111827',
		minWidth: 220,
	},

	summary: {
		marginBottom: 20,
	},

	summaryText: {
		color: '#374151',
		fontSize: 14,
	},

	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
		gap: 20,
	},

	card: {
		background: 'white',
		borderRadius: 16,
		padding: 20,
		border: '1px solid #E5E7EB',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		gap: 18,
		boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
	},

	cardTop: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		gap: 6,
	},

	badge: {
		background: '#111827',
		color: 'white',
		padding: '6px 10px',
		borderRadius: 8,
		width: 'fit-content',
		fontSize: 12,
		fontWeight: 'bold',
	},

	number: {
		margin: 0,
		color: '#111827',
		fontSize: 22,
	},

	client: {
		margin: 0,
		color: '#374151',
		fontSize: 15,
	},

	date: {
		margin: 0,
		color: '#6B7280',
		fontSize: 13,
	},

	actions: {
		display: 'flex',
		gap: 10,
		flexWrap: 'wrap',
	},

	primaryButton: {
		padding: '10px 14px',
		border: 'none',
		borderRadius: 8,
		background: '#111827',
		color: 'white',
		cursor: 'pointer',
		fontWeight: 600,
	},

	button: {
		padding: '10px 14px',
		border: '1px solid #D1D5DB',
		borderRadius: 8,
		background: '#F9FAFB',
		cursor: 'pointer',
		color: '#111827',
	},

	buttonDanger: {
		padding: '10px 14px',
		border: '1px solid #FCA5A5',
		borderRadius: 8,
		background: '#FEF2F2',
		cursor: 'pointer',
		color: '#DC2626',
	},

	emptyState: {
		background: 'white',
		borderRadius: 16,
		padding: 40,
		textAlign: 'center',
		border: '1px solid #E5E7EB',
		color: '#6B7280',
	},
	btn: {
		padding: '10px 15px',
		border: '1px solid #000000',
		background: 'white',
		cursor: 'pointer',
		color: 'black',
	},
	headerContainer: {
		marginBottom: '20px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
	},
	btnContainer: {
		gap: 10,
	},
}
