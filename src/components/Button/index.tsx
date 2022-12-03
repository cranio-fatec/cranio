import React from 'react'

import * as S from './styles'
import { ButtonProps } from './types'

const Button = ({
	children,
	type = 'button',
	...props
}: React.PropsWithChildren<ButtonProps>) => {
	return (
		<S.Button type={type} {...props}>
			{children}
		</S.Button>
	)
}

export default Button
