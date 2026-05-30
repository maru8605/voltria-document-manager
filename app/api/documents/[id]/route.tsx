import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params

	const document = await prisma.document.findUnique({
		where: { id },
	})

	if (!document) {
		return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 })
	}

	return NextResponse.json(document)
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
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
