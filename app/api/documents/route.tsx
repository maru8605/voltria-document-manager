import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		console.log('📥 BODY RECIBIDO:', JSON.stringify(body, null, 2))
		if (!body.type || !body.data) {
			return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
		}

		// 🔥 buscar último documento SOLO del mismo tipo
		const lastDoc = await prisma.document.findFirst({
			where: {
				type: body.type,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		// 🔢 calcular próximo número (seguro)
		let nextNumber = 1

		if (lastDoc?.number) {
			const parsed = parseInt(lastDoc.number, 10)

			if (!isNaN(parsed)) {
				nextNumber = parsed + 1
			}
		}

		// 🧾 formato fijo 000000001
		const formattedNumber = String(nextNumber).padStart(9, '0')

		// 💾 crear documento
	
		const document = await prisma.document.create({
			data: {
				type: body.type,

				number: formattedNumber,

				data: {
					...body.data,

					numero: formattedNumber,
				},
			},
		})
		console.log('✅ DOCUMENTO GUARDADO:', JSON.stringify(document, null, 2))
		const documentData = {
			...body.data,
			numero: formattedNumber,
		}

		console.log('💾 DATA A GUARDAR:', JSON.stringify(documentData, null, 2))

		return NextResponse.json(document)
	} catch (error) {
		console.error('🔥 ERROR POST DOCUMENT:', error)

		return NextResponse.json(
			{
				error: 'Error al guardar documento',
				detail: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		)
	}
}

export async function GET() {
	try {
		const documents = await prisma.document.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		})

		return NextResponse.json(documents)
	} catch (error) {
		console.error('🔥 ERROR GET DOCUMENTS:', error)

		return NextResponse.json(
			{
				error: 'Error al obtener documentos',
				detail: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		)
	}
}
