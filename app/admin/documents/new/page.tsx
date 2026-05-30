'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'

import RemitoClassicTemplate from '@/templates/remitos/RemitoClassicTemplate'
import PresupuestoClassicTemplate from '@/templates/presupuestos/PresupuestoClassicTemplate'
import OrdenTrabajoTemplate from '@/templates/ordenTrabajo/ordenTrabajoTemplate'

import RemitoForm from '@/components/forms/RemitoForm'
import PresupuestoForm from '@/components/forms/PresupuestoForm'
import OrdenTrabajoForm from '@/components/forms/OrdenTrabajoForm'

import type { RemitoData } from '@/types/documents/remito'
import type { OrdenTrabajoData } from '@/types/documents/orden'
import type { PresupuestoData } from '@/types/documents/presupuesto'
import Modal from '@/components/ui/Modal'
import DocumentPrintWrapper from '@/components/pdf/DocumentPrintWrapper'
import { useRouter } from 'next/navigation'
import AdminHeader from '@/components/layout/AdminHeader'


type DocType = 'remito' | 'presupuesto' | 'orden'

const getTodayArgentina = () =>
	new Date().toLocaleDateString('es-AR', {
		timeZone: 'America/Argentina/Buenos_Aires',
	})

const createInitialRemito = (): RemitoData => ({
	numero: '0000000001',
	fecha: getTodayArgentina(),

	cliente: {
		nombre: '',
		cuit: '',
		direccion: '',
		observaciones: '',
	},

	items: [],
})

const createInitialPresupuesto = (): PresupuestoData => ({
	numero: '0000000002',
	fecha: getTodayArgentina(),

	cliente: {
		nombre: '',
		cuit: '',
		direccion: '',
		observaciones: '',
	},

	items: [],
})

const createInitialOrden = (): OrdenTrabajoData => ({
	numero: 'OT-0001',
	fecha: getTodayArgentina(),

	cliente: {
		nombre: '',
		direccion: '',
	},

	items: [],

	tipoServicio: '',
	fechaProgramada: '',
	horaInicio: '',
	horaFin: '',
	observacionesTecnico: '',
	tareasRealizar: '',
})

export default function DocumentsNewPage() {
	const [docType, setDocType] = useState<DocType>('remito')

	const [loading, setLoading] = useState(false)

	const [snackbar, setSnackbar] = useState('')

	const [remito, setRemito] = useState<RemitoData>(createInitialRemito)

	const [presupuesto, setPresupuesto] = useState<PresupuestoData>(createInitialPresupuesto)

	const [orden, setOrden] = useState<OrdenTrabajoData>(createInitialOrden)

	const [documentForPrint, setDocumentForPrint] = useState<
		RemitoData | PresupuestoData | OrdenTrabajoData | null
	>(null)

	const [successModal, setSuccessModal] = useState(false)

	const [createdDocument, setCreatedDocument] = useState<{
		id: string
		number: string
		type: string
	} | null>(null)
	const router = useRouter()
	// GUARDAR DOCUMENTO
	const handleSave = async () => {
		try {
			setLoading(true)

			let payload

			switch (docType) {
				case 'remito':
					payload = {
						type: 'REMITO',
						number: remito.numero,
						clientName: remito.cliente.nombre,
						data: remito,
					}
					break

				case 'presupuesto':
					payload = {
						type: 'PRESUPUESTO',
						number: presupuesto.numero,
						clientName: presupuesto.cliente.nombre,
						data: presupuesto,
					}
					break

				case 'orden':
					payload = {
						type: 'ORDEN_TRABAJO',
						number: orden.numero,
						clientName: orden.cliente.nombre,
						data: orden,
					}
					break
			}
			console.log('🚀 DOC TYPE', docType)
			console.log('🚀 PAYLOAD', payload)
			const response = await fetch('/api/documents', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})

			if (!response.ok) {
				throw new Error('Error guardando documento')
			}

			const savedDocument = await response.json()

			setCreatedDocument(savedDocument)

			const dataForPrint = structuredClone(payload.data)

			dataForPrint.numero = savedDocument.number

			setDocumentForPrint(dataForPrint)

			setSuccessModal(true)
			console.log('🚀 REMITO STATE', remito)
			console.log('🚀 PRESUPUESTO STATE', presupuesto)
			console.log('🚀 ORDEN STATE', orden)
			// RESET FORM
			switch (docType) {
				case 'remito':
					setRemito(createInitialRemito)
					break

				case 'presupuesto':
					setPresupuesto(createInitialPresupuesto)
					break

				case 'orden':
					setOrden(createInitialOrden)
					break
			}

		} catch (error) {
			console.error(error)

			setSnackbar('Ocurrió un error al guardar')
		} finally {
			setLoading(false)
		}
	}

	// FORM SWITCH
	const renderForm = () => {
		switch (docType) {
			case 'remito':
				return <RemitoForm data={remito} setData={setRemito} />

			case 'presupuesto':
				return <PresupuestoForm data={presupuesto} setData={setPresupuesto} />

			case 'orden':
				return <OrdenTrabajoForm data={orden} setData={setOrden} />

			default:
				return null
		}
	}

	// TEMPLATE SWITCH
	const renderTemplate = () => {
		switch (docType) {
			case 'remito':
				return <RemitoClassicTemplate data={remito} />

			case 'presupuesto':
				return <PresupuestoClassicTemplate data={presupuesto} />

			case 'orden':
				return <OrdenTrabajoTemplate data={orden} />

			default:
				return null
		}
	}

	return (
		<>
			<AdminHeader />
			<div style={styles.container}>
				{/* SELECTOR */}
				<div style={styles.containerBtn}>
					<div style={styles.selector}>
						<button
							onClick={() => setDocType('remito')}
							style={docType === 'remito' ? styles.activeBtn : styles.btn}
						>
							Remito
						</button>

						<button
							onClick={() => setDocType('presupuesto')}
							style={docType === 'presupuesto' ? styles.activeBtn : styles.btn}
						>
							Presupuesto
						</button>

						<button
							onClick={() => setDocType('orden')}
							style={docType === 'orden' ? styles.activeBtn : styles.btn}
						>
							Orden de trabajo
						</button>
					</div>

					<button onClick={() => router.push('/admin')} style={styles.btn}>
						← Inicio
					</button>
				</div>

				{/* BOTON SAVE */}
				<div style={styles.actions}>
					<button style={styles.saveButton} onClick={handleSave} disabled={loading}>
						{loading ? 'Guardando...' : 'Guardar documento'}
					</button>
				</div>

				{/* SPLIT */}
				<div style={styles.split}>
					{/* FORM */}
					<div style={styles.form}>{renderForm()}</div>

					{/* PREVIEW */}
					<div style={styles.preview}>{renderTemplate()}</div>
				</div>

				<Modal
					open={successModal}
					title='Documento generado'
					onClose={() => setSuccessModal(false)}
				>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
						<p style={{ color: '#374151' }}>El documento se generó correctamente.</p>

						<div
							style={{
								display: 'flex',
								gap: 10,
								justifyContent: 'flex-end',
								flexWrap: 'wrap',
							}}
						>
							<button style={styles.btn} onClick={() => setSuccessModal(false)}>
								Cerrar
							</button>

							<DocumentPrintWrapper buttonLabel='Descargar PDF'>
								{docType === 'remito' && documentForPrint && (
									<RemitoClassicTemplate data={documentForPrint as RemitoData} />
								)}

								{docType === 'presupuesto' && documentForPrint && (
									<PresupuestoClassicTemplate data={documentForPrint as PresupuestoData} />
								)}

								{docType === 'orden' && documentForPrint && (
									<OrdenTrabajoTemplate data={documentForPrint as OrdenTrabajoData} />
								)}
							</DocumentPrintWrapper>

							<button
								style={styles.activeBtn}
								onClick={() => {
									if (!createdDocument) return

									window.location.href = `/admin/documents/${createdDocument.id}`
								}}
							>
								Ver documento
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
	containerBtn: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
}
