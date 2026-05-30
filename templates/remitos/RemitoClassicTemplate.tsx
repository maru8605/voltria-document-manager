import type { CSSProperties } from 'react'
import type { RemitoData } from '@/types/documents'
type Props = {
	data: RemitoData
}
export default function RemitoClassicTemplate({ data }: Props) {
	
	if (!data) return null
	const total = (data.items ?? []).reduce((acc, i) => acc + i.valorUnitario * i.unidad, 0)

	return (
		<div style={styles.page}>
			{/* WATERMARK LETRA DOCUMENTO */}
			<div style={styles.bigLetter}>R</div>

			{/* HEADER */}
			<div style={styles.headerRow}>
				{/* IZQUIERDA - LOGO */}
				<div style={styles.box}>
					<div style={styles.logoBox}>
						<img src='/logos/logo-voltria.png' style={styles.logo} />

						<p style={styles.smallText}>📞 15-7247-9965</p>
						<p style={styles.smallText}>📧 contacto@voltria-soluciones.com</p>
					</div>
				</div>

				{/* DERECHA - REMITO INFO */}
				<div style={styles.box}>
					<div style={styles.centerBox}>
						<p style={styles.bigText}>N° {data.numero}</p>
						<p style={styles.smallText}>{data.fecha}</p>
					</div>
				</div>
			</div>

			{/* CLIENTE */}
			<div style={styles.client}>
				<p>
					<b>Cliente:</b> {data.cliente.nombre}
				</p>
				{data.cliente.cuit && (
					<p>
						<b>CUIT:</b> {data.cliente.cuit}
					</p>
				)}
				<p>
					<b>Dirección:</b> {data.cliente.direccion}
				</p>
				{data.cliente.observaciones && (
					<p>
						<b>Observaciones:</b> {data.cliente.observaciones}
					</p>
				)}
			</div>

			{/* TABLA */}
			<table style={styles.table}>
				<thead>
					<tr>
						<th style={styles.thSmall}>Unidad</th>
						<th style={styles.th}>Descripción</th>
						<th style={styles.th}>Valor Unitario</th>
						<th style={styles.th}>Total</th>
					</tr>
				</thead>

				<tbody>
					{data.items.map((item, i) => (
						<tr key={i}>
							<td style={styles.tdCenter}>{item.unidad}</td>
							<td style={styles.td}>{item.descripcion}</td>
							<td style={styles.tdRight}>${item.valorUnitario}</td>
							<td style={styles.tdRight}>${item.valorUnitario * item.unidad}</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* TOTAL */}
			<div style={styles.total}>TOTAL: ${total}</div>

			{/* FIRMA */}
			<div style={styles.footer}>
				<div style={styles.signatureBox}>
					<div style={styles.line}></div>
					<p>Firma cliente</p>
				</div>

				<div style={styles.signatureBox}>
					<div style={styles.line}></div>
					<p>Firma Voltria</p>
				</div>
			</div>
		</div>
	)
}

const styles: Record<string, CSSProperties> = {
	page: {
		width: '794px',
		minHeight: '1123px',
		margin: 'auto',
		padding: 40,
		fontFamily: 'Arial',
		color: '#374151',
		background: 'white',
		position: 'relative',
	},

	/* WATERMARK R */
	bigLetter: {
		position: 'absolute',
		top: 40,
		left: '50%',
		transform: 'translateX(-50%)',
		fontSize: 45,
		fontWeight: 'bold',
		color: '#474747',
		zIndex: 99,
		border: '2px solid #c3c4c5',
		background: '#f0f0f0',
		padding: '0 10px',
	},

	/* HEADER */
	headerRow: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 25,
		position: 'relative',
		zIndex: 1,
		background: '#f0f0f0',
	},

	box: {
		width: '50%',
		border: '1px solid #c3c4c5',
		padding: 20,
		borderRadius: 4,
	},

	logoBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	logo: {
		width: 320,
		marginBottom: 10,
	},

	centerBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},

	title: {
		margin: 0,
		color: '#111827',
	},

	bigText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#111827',
		margin: 5,
	},

	smallText: {
		margin: 2,
		color: '#6B7280',
	},

	/* CLIENTE */
	client: {
		border: '1px solid #E5E7EB',
		padding: 15,
		marginBottom: 20,
		position: 'relative',
		zIndex: 1,
	},

	/* TABLE */
	table: {
		width: '100%',
		borderCollapse: 'collapse',
	},

	th: {
		border: '1px solid #E5E7EB',
		padding: 10,
		background: '#F9FAFB',
		color: '#374151',
	},

	thSmall: {
		width: '10%',
		border: '1px solid #E5E7EB',
		padding: 10,
		background: '#F9FAFB',
	},

	td: {
		border: '1px solid #E5E7EB',
		padding: 10,
	},

	tdCenter: {
		border: '1px solid #E5E7EB',
		padding: 10,
		textAlign: 'center',
	},

	tdRight: {
		border: '1px solid #E5E7EB',
		padding: 10,
		textAlign: 'right',
	},

	total: {
		marginTop: 20,
		textAlign: 'right',
		fontWeight: 'bold',
		color: '#111827',
	},

	/* FIRMA */
	footer: {
		marginTop: 90,
		display: 'flex',
		justifyContent: 'space-between',
		color: '#6B7280',
	},

	signatureBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	line: {
		width: 220, // ~7–8 cm
		borderTop: '1px solid #111827',
		marginBottom: 8,
	},
}
