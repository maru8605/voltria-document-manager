import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params

	console.log('ID RECIBIDO:', id)

	const document = await prisma.document.findUnique({
		where: { id },
	})

	if (!document) {
		return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 })
	}

	return NextResponse.json(document)
}
