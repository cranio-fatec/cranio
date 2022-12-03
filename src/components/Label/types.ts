export interface LabelStyleProps {
	bold?: boolean
	required?: boolean
	margin?: string
}

export interface LabelProps extends LabelStyleProps {
	children: string
	margin?: string
	labelFor?: string
}
