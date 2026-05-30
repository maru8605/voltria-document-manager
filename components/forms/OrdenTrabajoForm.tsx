import type { OrdenTrabajoData } from '@/types/documents/orden'
import type { CSSProperties} from 'react'

type Props = {
	data: OrdenTrabajoData
	setData: React.Dispatch<React.SetStateAction<OrdenTrabajoData>>
}

export default function OrdenTrabajoForm({ data, setData }: Props) {
	return (
		<div>
			<h3>Orden de trabajo</h3>

			{/* CLIENTE */}

			<div style={styles.section}>
				<label>Cliente:</label>
				<input
					style={styles.input}
					placeholder='Nombre del Cliente'
					value={data.cliente.nombre}
					onChange={(e) =>
						setData({
							...data,
							cliente: {
								...data.cliente,
								nombre: e.target.value,
							},
						})
					}
				/>
				<label>CUIT / DNI:</label>
				<input
					style={styles.input}
					placeholder='CUIT / DNI'
					value={data.cliente.cuit || ''}
					onChange={(e) =>
						setData({
							...data,
							cliente: {
								...data.cliente,
								cuit: e.target.value,
							},
						})
					}
				/>

				<label>Teléfono:</label>
				<input
					style={styles.input}
					placeholder='Teléfono'
					value={data.cliente.telefono || ''}
					onChange={(e) =>
						setData({
							...data,
							cliente: {
								...data.cliente,
								telefono: e.target.value,
							},
						})
					}
				/>

				<label>Email:</label>
				<input
					style={styles.input}
					placeholder='Email'
					value={data.cliente.email || ''}
					onChange={(e) =>
						setData({
							...data,
							cliente: {
								...data.cliente,
								email: e.target.value,
							},
						})
					}
				/>

				<label>Dirección:</label>
				<input
					style={styles.input}
					placeholder='Dirección'
					value={data.cliente.direccion}
					onChange={(e) =>
						setData({
							...data,
							cliente: {
								...data.cliente,
								direccion: e.target.value,
							},
						})
					}
				/>

				{/* SERVICIO */}
				<label>Tipo de servicio:</label>
				<input
					style={styles.input}
					placeholder='Tipo de servicio'
					value={data.tipoServicio}
					onChange={(e) =>
						setData({
							...data,
							tipoServicio: e.target.value,
						})
					}
				/>
				<label>Descripción:</label>
				<textarea
					style={styles.input}
					placeholder='Descripción del problema'
					value={data.descripcionProblema || ''}
					onChange={(e) =>
						setData({
							...data,
							descripcionProblema: e.target.value,
						})
					}
				/>

				<label>Tareas:</label>
				<textarea
					style={styles.input}
					placeholder='Tareas a realizar'
					value={data.tareasRealizar || ''}
					onChange={(e) =>
						setData({
							...data,
							tareasRealizar: e.target.value,
						})
					}
				/>

				{/* PERSONAL */}
				<label>Técnico:</label>
				<input
					style={styles.input}
					placeholder='Técnico asignado'
					value={data.tecnico || ''}
					onChange={(e) =>
						setData({
							...data,
							tecnico: e.target.value,
						})
					}
				/>

				{/* HORARIOS */}
				<label>Horarios:</label>
				<input
					style={styles.input}
					placeholder='Hora inicio'
					value={data.horaInicio || ''}
					onChange={(e) =>
						setData({
							...data,
							horaInicio: e.target.value,
						})
					}
				/>

				<input
					style={styles.input}
					placeholder='Hora finalización'
					value={data.horaFin || ''}
					onChange={(e) =>
						setData({
							...data,
							horaFin: e.target.value,
						})
					}
				/>

				{/* OBSERVACIONES */}
				<label>Observaciones técnicas:</label>
				<textarea
					style={styles.input}
					placeholder='Observaciones técnicas'
					value={data.observacionesTecnico || ''}
					onChange={(e) =>
						setData({
							...data,
							observacionesTecnico: e.target.value,
						})
					}
				/>
			</div>
		</div>
	)
}

const styles: Record<string, CSSProperties> = {
	section: {
		marginBottom: 20,
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
	},

	itemRow: {
		display: 'flex',
		gap: 10,
		alignItems: 'center',
	},

	input: {
		border: '1px solid #ccc',
		padding: 8,
		borderRadius: 4,
	},

	smallInput: {
		width: 80,
		border: '1px solid #ccc',
		padding: 8,
		borderRadius: 4,
	},

	button: {
		padding: '8px 12px',
		border: '1px solid #111827',
		background: 'white',
		cursor: 'pointer',
		borderRadius: 4,
	},

	total: {
		marginTop: 10,
		fontWeight: 'bold',
	},
}
