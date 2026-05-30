export type Item = {
	unidad: number
	cantidad?: number
	descripcion: string
	valorUnitario: number
}

export type OrdenTrabajoData = {
	numero: string
	fecha: string
	fechaProgramada?: string

	cliente: {
		nombre: string
		direccion: string
		telefono?: string
		email?: string
		cuit?: string
	}

	items: Item[]

	tipoServicio: string

	descripcionProblema?: string

	tareasRealizar?: string

	observaciones?: string
	observacionesTecnico?: string

	tecnico?: string

	horaInicio?: string
	horaFin?: string

	estado?: 'Pendiente' | 'En proceso' | 'Completada' | 'Cancelada'
}
