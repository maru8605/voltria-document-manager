'use client'

import type { CSSProperties, ReactNode } from 'react'

type Props = {
	open: boolean
	title: string
	children: ReactNode
	onClose: () => void
}

export default function Modal({ open, title, children, onClose }: Props) {
	if (!open) return null

	return (
		<div style={styles.overlay}>
			<div style={styles.modal}>
				<div style={styles.header}>
					<h2 style={styles.title}>{title}</h2>

					<button style={styles.closeBtn} onClick={onClose}>
						✕
					</button>
				</div>

				<div>{children}</div>
			</div>
		</div>
	)
}

const styles: Record<string, CSSProperties> = {
	overlay: {
		position: 'fixed',
		inset: 0,
		background: 'rgba(0,0,0,0.45)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 9999,
	},

	modal: {
		background: 'white',
		width: '100%',
		maxWidth: 500,
		borderRadius: 12,
		padding: 24,
		boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
	},

	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},

	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#111827',
	},

	closeBtn: {
		border: 'none',
		background: 'transparent',
		fontSize: 22,
		cursor: 'pointer',
		color: '#6B7280',
	},
}
