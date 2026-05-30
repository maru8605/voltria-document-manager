export type Item = {
	unidad: number
	descripcion: string
	valorUnitario: number
}

export type Cliente = {
	nombre: string
	cuit?: string
	direccion: string
	observaciones?: string
}

export type DocumentBase = {
	numero: string
	fecha: string
	cliente: Cliente
	items: Item[]
}

export type RemitoData = DocumentBase

export type PresupuestoData = DocumentBase

export type OrdenTrabajoData = {
	numero: string
	fecha: string

	cliente: {
		nombre: string
		direccion: string
		telefono?: string
		email?: string
	}

	tareas: string[]

	tecnico?: string
	estado?: string
	observaciones?: string
}
