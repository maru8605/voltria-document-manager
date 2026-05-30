'use client'

import { useState } from 'react'

import RemitoClassicTemplate from '@/templates/remitos/RemitoClassicTemplate'
import PresupuestoClassicTemplate from '@/templates/presupuestos/PresupuestoClassicTemplate'
import OrdenTrabajoTemplate from '@/templates/ordenTrabajo/ordenTrabajoTemplate'

import type { RemitoData } from '@/types/documents'

export default function PreviewPage() {
	const [remito] = useState<RemitoData>({
		numero: '0000000001',
		fecha: '26/05/2026',
		cliente: {
			nombre: '',
			cuit: '',
			direccion: '',
			observaciones: '',
		},
		items: [],
	})

	return (
		<div style={styles.container}>
			<h1 style={{ marginBottom: 20 }}>Preview Documentos</h1>

			{/* REMITO */}
			<div style={styles.sheet}>
				<RemitoClassicTemplate data={remito} />
			</div>

			{/* PRESUPUESTO */}
			<div style={styles.sheet}>
				<PresupuestoClassicTemplate data={remito} />
			</div>

			{/* ORDEN */}
			<div style={styles.sheet}>
				<OrdenTrabajoTemplate data={remito} />
			</div>
		</div>
	)
}

const styles: Record<string, React.CSSProperties> = {
	container: {
		background: '#E5E7EB',
		minHeight: '100vh',
		padding: 40,
	},

	sheet: {
		transform: 'scale(0.75)',
		transformOrigin: 'top center',
		marginBottom: 40,
	},
}
