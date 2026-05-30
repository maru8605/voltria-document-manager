'use client'

import type { CSSProperties } from 'react'

type Item = {
	unidad: number
	descripcion: string
	valorUnitario: number
}

type Cliente = {
	nombre?: string
	cuit?: string
	direccion?: string
	observaciones?: string
}

type DocumentData = {
	numero?: string
	fecha?: string
	cliente?: Cliente
	items?: Item[]
}

type Props = {
	type: string
	number: string
	data: DocumentData
}

export default function DocumentPreview({ type, number, data }: Props) {
	const total =
		data.items?.reduce((acc, item) => {
			return acc + item.unidad * item.valorUnitario
		}, 0) ?? 0

	const getTypeLabel = () => {
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

	return (
		<div style={styles.wrapper}>
			{/* HEADER */}
			<div style={styles.header}>
				<div>
					<h1 style={styles.title}>{getTypeLabel()}</h1>

					<p style={styles.number}>N° {number}</p>
				</div>

				<div style={styles.dateContainer}>
					<p>
						<strong>Fecha:</strong> {data.fecha || '-'}
					</p>
				</div>
			</div>

			{/* CLIENTE */}
			<div style={styles.section}>
				<h2 style={styles.sectionTitle}>Cliente</h2>

				<p>
					<strong>Nombre:</strong> {data.cliente?.nombre || '-'}
				</p>

				<p>
					<strong>CUIT:</strong> {data.cliente?.cuit || '-'}
				</p>

				<p>
					<strong>Dirección:</strong> {data.cliente?.direccion || '-'}
				</p>

				<p>
					<strong>Observaciones:</strong> {data.cliente?.observaciones || '-'}
				</p>
			</div>

			{/* ITEMS */}
			<div style={styles.section}>
				<h2 style={styles.sectionTitle}>Items</h2>

				<table style={styles.table}>
					<thead>
						<tr>
							<th style={styles.th}>Cantidad</th>
							<th style={styles.th}>Descripción</th>
							<th style={styles.th}>Valor unitario</th>
							<th style={styles.th}>Subtotal</th>
						</tr>
					</thead>

					<tbody>
						{data.items?.map((item, index) => {
							const subtotal = item.unidad * item.valorUnitario

							return (
								<tr key={index}>
									<td style={styles.td}>{item.unidad}</td>

									<td style={styles.td}>{item.descripcion}</td>

									<td style={styles.td}>${item.valorUnitario}</td>

									<td style={styles.td}>${subtotal}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>

			{/* TOTAL */}
			<div style={styles.totalContainer}>
				<h2>Total: ${total}</h2>
			</div>
		</div>
	)
}

const styles: Record<string, CSSProperties> = {
	wrapper: {
		background: 'white',
		borderRadius: 12,
		padding: 32,
		border: '1px solid #D1D5DB',
		boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
	},

	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 32,
	},

	title: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 4,
	},

	number: {
		fontSize: 18,
		color: '#6B7280',
	},

	dateContainer: {
		textAlign: 'right',
	},

	section: {
		marginBottom: 32,
	},

	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 12,
	},

	table: {
		width: '100%',
		borderCollapse: 'collapse',
	},

	th: {
		textAlign: 'left',
		padding: 12,
		borderBottom: '1px solid #E5E7EB',
		background: '#F9FAFB',
	},

	td: {
		padding: 12,
		borderBottom: '1px solid #E5E7EB',
	},

	totalContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: 24,
		fontSize: 24,
		fontWeight: 'bold',
	},
}
