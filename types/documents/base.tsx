export type Item = {
	unidad: number
	descripcion: string
	valorUnitario: number
}

export type Client = {
	nombre: string
	cuit?: string
	direccion: string
	observaciones?: string
}

export type DocumentBase = {
	numero: string
	fecha: string
	cliente: Client
	items: Item[]
}
