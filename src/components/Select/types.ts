import { Props } from 'react-select'

export interface SelectProps extends Props {
	isErrored?: boolean
	label?: string
	margin?: string
	leftIcon?: React.FC | string
	labelRequired?: boolean
}

export interface SelectComponentProps {
	isErrored?: boolean
	isFilled?: boolean
}

export interface ContainerProps extends SelectComponentProps {
	margin?: string
}
