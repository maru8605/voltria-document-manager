import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
	if (!(await isAuthenticated())) {
		return Response.json({ error: 'No autorizado' }, { status: 401 })
	}
	const { id } = await context.params

	const document = await prisma.document.findFirst({
		where: {
			id,
			deletedAt: null,
		},
	})

	if (!document) {
		return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 })
	}

	return NextResponse.json(document)
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
	if (!(await isAuthenticated())) {
		return Response.json({ error: 'No autorizado' }, { status: 401 })
	}
	try {
		const { id } = await context.params

		const body = await req.json()

		const updatedDocument = await prisma.document.update({
			where: {
				id,
			},
			data: {
				data: body.data,
			},
		})

		return NextResponse.json(updatedDocument)
	} catch (error) {
		console.error('ERROR UPDATE DOCUMENT:', error)

		return NextResponse.json(
			{
				error: 'Error actualizando documento',
			},
			{
				status: 500,
			}
		)
	}
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
	if (!(await isAuthenticated())) {
		return Response.json({ error: 'No autorizado' }, { status: 401 })
	}
	try {
		const { id } = await context.params

		const document = await prisma.document.update({
			where: {
				id,
			},
			data: {
				deletedAt: new Date(),
			},
		})

		return NextResponse.json(document)
	} catch (error) {
		console.error('DELETE DOCUMENT ERROR:', error)

		return NextResponse.json({ error: 'Error eliminando documento' }, { status: 500 })
	}
}
