export interface ButtonProps {
	children: string | unknown
	color?: string
	outlined?: boolean
	width?: string
	margin?: string
	onClick?: (e?: React.MouseEvent) => void
}
