import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function GET() {
	const browser = await puppeteer.launch({
		headless: true,
	})

	const page = await browser.newPage()

	await page.setContent(`
    <html>
      <body style="font-family: Arial; padding: 40px;">
        <h1>Primer PDF</h1>

        <p>Generado con Next.js + Puppeteer</p>

        <table 
          border="1" 
          cellpadding="10" 
          cellspacing="0"
          width="100%"
        >
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
          </tr>

          <tr>
            <td>Cable 4x16</td>
            <td>2</td>
          </tr>
        </table>
      </body>
    </html>
  `)

	const pdf = await page.pdf({
		format: 'A4',
	})

	await browser.close()

	return new NextResponse(Buffer.from(pdf), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'inline; filename="remito.pdf"',
		},
	})
}
