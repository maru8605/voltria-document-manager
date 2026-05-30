import type { CSSProperties } from 'react'
import type { OrdenTrabajoData } from '@/types/documents/orden'

type Props = {
	data: OrdenTrabajoData
}

export default function OrdenTrabajoTemplate({ data }: Props) {
	return (
		<div style={styles.page}>
			<div style={styles.bigLetter}>O</div>

			{/* HEADER */}
			<div style={styles.headerRow}>
				<div style={styles.box}>
					<div style={styles.logoBox}>
						<img src='/logos/logo-voltria.png' style={styles.logo} />

						<p style={styles.smallText}>📞 15-7247-9965</p>
						<p style={styles.smallText}>📧 contacto@voltria-soluciones.com</p>
					</div>
				</div>

				<div style={styles.box}>
					<div style={styles.centerBox}>
						<p style={styles.bigText}>ORDEN DE TRABAJO</p>

						<p style={styles.bigText}>{data.numero}</p>

						<p style={styles.smallText}>Fecha: {data.fecha}</p>

						{data.fechaProgramada && (
							<p style={styles.smallText}>Programada: {data.fechaProgramada}</p>
						)}

						{data.estado && <p style={styles.status}>Estado: {data.estado}</p>}
					</div>
				</div>
			</div>

			{/* CLIENTE */}
			<div style={styles.section}>
				<h3 style={styles.sectionTitle}>Datos del cliente</h3>

				<p>
					<b>Cliente:</b> {data.cliente.nombre}
				</p>

				{data.cliente.cuit && (
					<p>
						<b>CUIT/DNI:</b> {data.cliente.cuit}
					</p>
				)}

				{data.cliente.telefono && (
					<p>
						<b>Teléfono:</b> {data.cliente.telefono}
					</p>
				)}

				{data.cliente.email && (
					<p>
						<b>Email:</b> {data.cliente.email}
					</p>
				)}

				<p>
					<b>Dirección:</b> {data.cliente.direccion}
				</p>
			</div>

			{/* SERVICIO */}
			<div style={styles.section}>
				<h3 style={styles.sectionTitle}>Detalle del servicio</h3>

				<p>
					<b>Tipo de servicio:</b> {data.tipoServicio}
				</p>

				{data.descripcionProblema && (
					<p>
						<b>Descripción:</b> {data.descripcionProblema}
					</p>
				)}

				{data.tareasRealizar && (
					<p>
						<b>Tareas a realizar:</b> {data.tareasRealizar}
					</p>
				)}
			</div>

			{/* TECNICO */}
			<div style={styles.section}>
				<h3 style={styles.sectionTitle}>Personal asignado</h3>

				{data.tecnico && (
					<p>
						<b>Técnico:</b> {data.tecnico}
					</p>
				)}


			</div>

			{/* MATERIALES */}
			<div style={styles.section}>
				<h3 style={styles.sectionTitle}>Materiales utilizados</h3>

				<table style={styles.table}>
					<thead>
						<tr>
							<th style={styles.thSmall}>Cant.</th>
							<th style={styles.th}>Descripción</th>
						</tr>
					</thead>

					<tbody>
						{data.items.map((item, i) => (
							<tr key={i}>
								<td style={styles.tdCenter}>{item.cantidad}</td>

								<td style={styles.td}>{item.descripcion}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* HORARIOS */}
			<div style={styles.section}>
				<h3 style={styles.sectionTitle}>Horarios</h3>

				{data.horaInicio && (
					<p>
						<b>Inicio:</b> {data.horaInicio}
					</p>
				)}

				{data.horaFin && (
					<p>
						<b>Finalización:</b> {data.horaFin}
					</p>
				)}
			</div>

			{/* OBSERVACIONES */}
			{data.observacionesTecnico && (
				<div style={styles.section}>
					<h3 style={styles.sectionTitle}>Observaciones</h3>

					<p>{data.observacionesTecnico}</p>
				</div>
			)}

			{/* FIRMAS */}
			<div style={styles.footer}>
				<div style={styles.signatureBox}>
					<div style={styles.line}></div>
					<p>Firma técnico</p>
				</div>

				<div style={styles.signatureBox}>
					<div style={styles.line}></div>
					<p>Conformidad cliente</p>
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
		background: 'white',
		color: '#374151',
		position: 'relative',
	},

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

	headerRow: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 25,
		background: '#f0f0f0',
	},

	box: {
		width: '50%',
		border: '1px solid #c3c4c5',
		padding: 20,
	},

	logoBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	logo: {
		width: 320,
	},

	centerBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},

	bigText: {
		fontSize: 18,
		fontWeight: 'bold',
		margin: 3,
	},

	smallText: {
		color: '#6B7280',
		margin: 2,
	},

	status: {
		marginTop: 10,
		fontWeight: 'bold',
	},

	section: {
		border: '1px solid #E5E7EB',
		padding: 15,
		marginBottom: 20,
	},

	sectionTitle: {
		marginTop: 0,
		marginBottom: 10,
	},

	table: {
		width: '100%',
		borderCollapse: 'collapse',
	},

	th: {
		border: '1px solid #E5E7EB',
		padding: 10,
		background: '#F9FAFB',
	},

	thSmall: {
		width: '15%',
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

	footer: {
		marginTop: 80,
		display: 'flex',
		justifyContent: 'space-between',
	},

	signatureBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	line: {
		width: 220,
		borderTop: '1px solid #111827',
		marginBottom: 8,
	},
}
