'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { CSSProperties } from 'react'

import RemitoForm from '@/components/forms/RemitoForm'
import PresupuestoForm from '@/components/forms/PresupuestoForm'
import OrdenTrabajoForm from '@/components/forms/OrdenTrabajoForm'

import RemitoClassicTemplate from '@/templates/remitos/RemitoClassicTemplate'
import PresupuestoClassicTemplate from '@/templates/presupuestos/PresupuestoClassicTemplate'
import OrdenTrabajoTemplate from '@/templates/ordenTrabajo/ordenTrabajoTemplate'
import type { RemitoData } from '@/types/documents/remito'
import type { PresupuestoData } from '@/types/documents/presupuesto'
import type { OrdenTrabajoData } from '@/types/documents/orden'
import Modal from '@/components/ui/Modal'
import { useRouter } from 'next/navigation'
import DocumentPrintWrapper from '@/components/pdf/DocumentPrintWrapper'
import AdminHeader from '@/components/layout/AdminHeader'

type Document = {
	id: string
	type: 'REMITO' | 'PRESUPUESTO' | 'ORDEN_TRABAJO'
	number: string
	data: RemitoData | PresupuestoData | OrdenTrabajoData
	createdAt: string
	updatedAt: string
}
export default function EditDocumentPage() {
	const params = useParams()

	const id = params?.id as string

	const [document, setDocument] = useState<Document | null>(null)

	const [loading, setLoading] = useState(true)

	const [successModal, setSuccessModal] = useState(false)
	const [errorModal, setErrorModal] = useState(false)
  const router = useRouter()
	useEffect(() => {
		if (!id) return

		const fetchDocument = async () => {
			try {
				const response = await fetch(`/api/documents/${id}`)

				if (!response.ok) {
					throw new Error('Documento no encontrado')
				}

				const data = await response.json()

				setDocument(data)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		fetchDocument()
	}, [id])

	if (loading) {
		return <p style={{ padding: 20 }}>Cargando...</p>
	}

	if (!document) {
		return <p style={{ padding: 20 }}>Documento no encontrado</p>
  }
  const handleUpdate = async () => {
		if (!document) return

		try {
			const response = await fetch(`/api/documents/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: document.data,
				}),
			})

			if (!response.ok) {
				throw new Error('Error actualizando')
			}

			setSuccessModal(true)
		} catch (error) {
			console.error(error)

			setErrorModal(true)
		}
	}


	const renderForm = () => {
		switch (document.type) {
			case 'REMITO':
				return (
					<RemitoForm
						data={document.data as RemitoData}
						setData={(newData) => {
							const resolvedData =
								typeof newData === 'function' ? newData(document.data as RemitoData) : newData

							setDocument({
								...document,
								data: resolvedData,
							})
						}}
					/>
				)

			case 'PRESUPUESTO':
				return (
					<PresupuestoForm
						data={document.data as PresupuestoData}
						setData={(newData) => {
							const resolvedData =
								typeof newData === 'function' ? newData(document.data as PresupuestoData) : newData

							setDocument({
								...document,
								data: resolvedData,
							})
						}}
					/>
				)

			case 'ORDEN_TRABAJO':
				return (
					<OrdenTrabajoForm
						data={document.data as OrdenTrabajoData}
						setData={(newData) => {
							const resolvedData =
								typeof newData === 'function' ? newData(document.data as OrdenTrabajoData) : newData

							setDocument({
								...document,
								data: resolvedData,
							})
						}}
					/>
				)

			default:
				return null
		}
	}

	const renderPreview = () => {
		switch (document.type) {
			case 'REMITO':
				return <RemitoClassicTemplate data={document.data} />

			case 'PRESUPUESTO':
				return <PresupuestoClassicTemplate data={document.data} />

			case 'ORDEN_TRABAJO':
				return <OrdenTrabajoTemplate data={document.data as OrdenTrabajoData} />

			default:
				return null
		}
	}

	return (
		<>
			<AdminHeader />
			<div style={styles.container}>
				<h1 style={styles.title}>Editar documento</h1>

				<div style={styles.btnContainer}>
					<button
						style={{
							padding: '10px 20px',
							background: '#111827',
							color: 'white',
							border: 'none',
							borderRadius: 8,
							cursor: 'pointer',
						}}
						onClick={handleUpdate}
					>
						Guardar cambios
					</button>
					<DocumentPrintWrapper buttonLabel='Imprimir'>{renderPreview()}</DocumentPrintWrapper>
					<button onClick={() => router.push('/admin')} style={styles.btn}>
						← Inicio
					</button>
				</div>

				<div style={styles.split}>
					<div style={styles.form}>{renderForm()}</div>

					<div style={styles.preview}>{renderPreview()}</div>
				</div>

				<Modal
					open={successModal}
					title='Documento actualizado'
					onClose={() => setSuccessModal(false)}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
						}}
					>
						<p style={{ color: '#374151' }}>Los cambios fueron guardados correctamente.</p>

						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								gap: 10,
							}}
						>
							<button style={styles.btn} onClick={() => setSuccessModal(false)}>
								Seguir editando
							</button>

							<button
								style={styles.activeBtn}
								onClick={() => router.push(`/admin/documents/${document?.id}`)}
							>
								Ver documento
							</button>
						</div>
					</div>
				</Modal>

				<Modal open={errorModal} title='Error' onClose={() => setErrorModal(false)}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 16,
						}}
					>
						<p style={{ color: '#DC2626' }}>Ocurrió un error al actualizar el documento.</p>

						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}
						>
							<button style={styles.btn} onClick={() => setErrorModal(false)}>
								Cerrar
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

	selector: {
		display: 'flex',
		gap: 10,
		marginBottom: 20,
	},

	actions: {
		marginBottom: 20,
	},

	btn: {
		padding: '10px 15px',
		border: '1px solid #ccc',
		background: 'white',
		cursor: 'pointer',
		color: 'black',
	},

	activeBtn: {
		padding: '10px 15px',
		border: '1px solid #111827',
		background: '#111827',
		color: 'white',
		cursor: 'pointer',
	},

	saveButton: {
		padding: '10px 20px',
		background: '#111827',
		color: 'white',
		border: 'none',
		borderRadius: 8,
		cursor: 'pointer',
		fontWeight: 'bold',
	},

	snackbar: {
		position: 'fixed',
		bottom: 20,
		right: 20,
		background: '#111827',
		color: 'white',
		padding: '12px 18px',
		borderRadius: 8,
		zIndex: 999,
	},

	split: {
		display: 'flex',
		gap: 20,
	},

	form: {
		width: '40%',
		background: 'white',
		padding: 20,
		border: '1px solid #ccc',
		color: 'black',
	},

	preview: {
		width: '60%',
		background: '#D1D5DB',
		padding: 20,
		overflow: 'auto',
	},

	section: {
		marginBottom: 20,
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
		color: 'black',
	},

	itemRow: {
		display: 'flex',
		gap: 10,
		marginBottom: 10,
		alignItems: 'center',
	},

	input: {
		border: '1px solid black',
		borderRadius: '5px',
		height: '30px',
		padding: '2px 4px',
	},

	button: {
		padding: '4px',
		border: '1px solid black',
		borderRadius: '5px',
	},

	smallInput: {
		width: '65px',
		border: '1px solid black',
		borderRadius: '5px',
		padding: '4px',
		height: '30px',
	},
  btnContainer: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}
