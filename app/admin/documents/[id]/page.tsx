'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import type { CSSProperties } from 'react'

import RemitoClassicTemplate from '@/templates/remitos/RemitoClassicTemplate'
import PresupuestoClassicTemplate from '@/templates/presupuestos/PresupuestoClassicTemplate'
import OrdenTrabajoTemplate from '@/templates/ordenTrabajo/ordenTrabajoTemplate'
import type { RemitoData } from '@/types/documents/remito'
import type { PresupuestoData } from '@/types/documents/presupuesto'
import type { OrdenTrabajoData } from '@/types/documents/orden'
import Modal from '@/components/ui/Modal'
import AdminHeader from '@/components/layout/AdminHeader'
import DocumentPrintWrapper from '@/components/pdf/DocumentPrintWrapper'
type DocumentData = Record<string, unknown>

type Document = {
	id: string
	type: 'REMITO' | 'PRESUPUESTO' | 'ORDEN_TRABAJO'
	number: string
	data: DocumentData
	createdAt: string
	updatedAt: string
}

export default function DocumentDetailPage() {
	const params = useParams()
	const router = useRouter()

	const id = params?.id as string

	const [document, setDocument] = useState<Document | null>(null)

	const [loading, setLoading] = useState(true)

	const [deleteModal, setDeleteModal] = useState(false)
	const [deleting, setDeleting] = useState(false)

	useEffect(() => {
		if (!id) return

		const fetchDoc = async () => {
			try {
				const res = await fetch(`/api/documents/${id}`, {
					cache: 'no-store',
				})

				if (!res.ok) {
					throw new Error('Documento no encontrado')
				}

				const data = await res.json()

				console.log('📄 DETAIL DOCUMENT:', data)

				setDocument(data)
			} catch (err) {
				console.error(err)
				setDocument(null)
			} finally {
				setLoading(false)
			}
		}

		fetchDoc()
	}, [id])

	const renderTemplate = () => {
		if (!document) return null

		switch (document.type) {
			case 'REMITO': {
				const data = document.data as RemitoData

				return (
					<RemitoClassicTemplate
						data={{
							...data,
							numero: document.number,
							fecha: data.fecha ?? new Date(document.createdAt).toLocaleDateString('es-AR'),
						}}
					/>
				)
			}

			case 'PRESUPUESTO': {
				const data = document.data as PresupuestoData

				return (
					<PresupuestoClassicTemplate
						data={{
							...data,
							numero: document.number,
							fecha: data.fecha ?? new Date(document.createdAt).toLocaleDateString('es-AR'),
						}}
					/>
				)
			}

			case 'ORDEN_TRABAJO': {
				const data = document.data as OrdenTrabajoData

				return (
					<OrdenTrabajoTemplate
						data={{
							...data,
							numero: document.number,
							fecha: data.fecha ?? new Date(document.createdAt).toLocaleDateString('es-AR'),
						}}
					/>
				)
			}

			default:
				return null
		}
	}

	const handleDelete = async () => {
		if (!document) return

		try {
			setDeleting(true)

			const response = await fetch(`/api/documents/${document.id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error('Error eliminando documento')
			}

			router.push('/admin/documents/list')
			router.refresh()
		} catch (error) {
			console.error(error)
			alert('Ocurrió un error al eliminar el documento')
		} finally {
			setDeleting(false)
		}
	}

	if (loading) {
		return (
			<div style={styles.loadingContainer}>
				<p>Cargando documento...</p>
			</div>
		)
	}

	if (!document) {
		return (
			<div style={styles.loadingContainer}>
				<p>Documento no encontrado</p>
			</div>
		)
	}

	return (
		<>
			<AdminHeader />
			<div style={styles.container}>
				{/* HEADER */}
				<div style={styles.header}>
					<div>
						<h1 style={styles.title}>
							{document.type} #{document.number}
						</h1>

						<p style={styles.subtitle}>
							Creado el {new Date(document.createdAt).toLocaleDateString()}
						</p>
					</div>

					<div style={styles.actions}>
						<button style={styles.secondaryButton} onClick={() => router.push('/admin')}>
							Volver
						</button>

						<button
							style={styles.primaryButton}
							onClick={() => router.push(`/admin/documents/edit/${document.id}`)}
						>
							Editar
						</button>

						<DocumentPrintWrapper buttonLabel='Imprimir'>{renderTemplate()}</DocumentPrintWrapper>

						<button style={styles.dangerButton} onClick={() => setDeleteModal(true)}>
							Eliminar
						</button>
					</div>
				</div>

				{/* PREVIEW */}
				<div style={styles.previewContainer}>{renderTemplate()}</div>

				<Modal open={deleteModal} title='Eliminar documento' onClose={() => setDeleteModal(false)}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
						}}
					>
						<p style={{ color: '#374151' }}>¿Estás seguro de eliminar este documento?</p>

						<p style={{ color: '#6B7280', fontSize: 14 }}>
							La acción ocultará el documento del sistema.
						</p>

						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								gap: 10,
							}}
						>
							<button style={styles.secondaryButton} onClick={() => setDeleteModal(false)}>
								Cancelar
							</button>

							<button style={styles.dangerButton} onClick={handleDelete} disabled={deleting}>
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
		padding: 20,
		background: '#E5E7EB',
		minHeight: '100vh',
	},

	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
		flexWrap: 'wrap',
		gap: 16,
	},

	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#111827',
		marginBottom: 4,
	},

	subtitle: {
		color: '#4B5563',
	},

	actions: {
		display: 'flex',
		gap: 10,
		flexWrap: 'wrap',
	},

	primaryButton: {
		padding: '10px 18px',
		borderRadius: 8,
		border: 'none',
		background: '#111827',
		color: 'white',
		cursor: 'pointer',
		fontWeight: 'bold',
	},

	secondaryButton: {
		padding: '10px 18px',
		borderRadius: 8,
		border: '1px solid #D1D5DB',
		background: 'white',
		cursor: 'pointer',
		fontWeight: 'bold',
		color: '#000'
	},

	dangerButton: {
		padding: '10px 18px',
		borderRadius: 8,
		border: 'none',
		background: '#DC2626',
		color: 'white',
		cursor: 'pointer',
		fontWeight: 'bold',
	},

	previewContainer: {
		background: '#D1D5DB',
		padding: 20,
		borderRadius: 12,
		overflow: 'auto',
	},

	loadingContainer: {
		minHeight: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#E5E7EB',
	},
}
