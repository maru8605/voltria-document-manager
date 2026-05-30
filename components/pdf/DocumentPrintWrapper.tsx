'use client'

import { CSSProperties, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

type Props = {
	children: React.ReactNode
	buttonLabel?: string
}

export default function DocumentPrintWrapper({ children, buttonLabel = 'Descargar PDF' }: Props) {
	const contentRef = useRef<HTMLDivElement>(null)

	const handlePrint = useReactToPrint({
		contentRef,
		documentTitle: 'documento',
	})

	return (
		<>
			<button onClick={handlePrint} style={styles.printBtn}>{buttonLabel}</button>

			<div
				style={{
					position: 'absolute',
					left: '-9999px',
					top: 0,
				}}
			>
				<div ref={contentRef}>{children}</div>
			</div>
		</>
	)
}
const styles: Record<string, CSSProperties> = {
	printBtn: {
		padding: '10px 15px',
		border: '1px solid #000594',
		background: '#000594',
		color: 'white',
		cursor: 'pointer',
	},
}
