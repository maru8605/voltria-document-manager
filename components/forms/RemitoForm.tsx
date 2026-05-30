import type { CSSProperties, Dispatch, SetStateAction } from 'react'
import type { RemitoData } from '@/types/documents'

type Props = {
	data: RemitoData
	setData: Dispatch<SetStateAction<RemitoData>>
}

export default function RemitoForm({ data, setData }: Props) {
	const total = data.items.reduce((acc, item) => {
		return acc + item.unidad * item.valorUnitario
	}, 0)

	return (
		<div>
			<h3>Remito - Datos</h3>

			<div style={styles.section}>
				<label>Cliente</label>

				<input
					style={styles.input}
					placeholder='Nombre cliente'
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

				<label>CUIT</label>

				<input
					style={styles.input}
					placeholder='CUIT'
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

				<label>Dirección</label>

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

				<label>Observaciones</label>

				<input
					style={styles.input}
					placeholder='Observaciones'
					value={data.cliente.observaciones || ''}
					onChange={(e) =>
						setData({
							...data,
							cliente: {
								...data.cliente,
								observaciones: e.target.value,
							},
						})
					}
				/>
			</div>

			<div style={styles.section}>
				<h4>Items</h4>

				<button
					style={styles.button}
					onClick={() =>
						setData({
							...data,
							items: [
								...data.items,
								{
									unidad: 1,
									descripcion: '',
									valorUnitario: 0,
								},
							],
						})
					}
				>
					+ Agregar item
				</button>

				{data.items.map((item, index) => (
					<div key={index} style={styles.itemRow}>
						<input
							style={styles.smallInput}
							type='number'
							value={item.unidad}
							onChange={(e) => {
								const items = [...data.items]
								items[index].unidad = Number(e.target.value)
								setData({ ...data, items })
							}}
						/>

						<input
							style={styles.input}
							placeholder='Descripción'
							value={item.descripcion}
							onChange={(e) => {
								const items = [...data.items]
								items[index].descripcion = e.target.value
								setData({ ...data, items })
							}}
						/>

						<input
							style={styles.smallInput}
							type='number'
							value={item.valorUnitario}
							onChange={(e) => {
								const items = [...data.items]
								items[index].valorUnitario = Number(e.target.value)
								setData({ ...data, items })
							}}
						/>

						<button
							style={styles.button}
							onClick={() => {
								const items = data.items.filter((_, i) => i !== index)
								setData({ ...data, items })
							}}
						>
							Eliminar
						</button>
					</div>
				))}

				<div style={styles.total}>Total: ${total}</div>
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
