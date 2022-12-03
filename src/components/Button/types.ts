export interface ButtonProps {
	children: string | unknown
	width?: string
	margin?: string
	schema?:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'danger'
		| 'warning'
		| 'info'
		| 'darkblue'
	outlined?: boolean
	alternative?: boolean
	size?: 'big' | 'medium' | 'small'
	type?: 'button' | 'submit'
	disabled?: boolean
	upper?: boolean

	onClick?: (e?: React.MouseEvent) => void
}
