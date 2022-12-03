import React from 'react'

import * as Styled from './styles'
import { ButtonProps } from './types'

export const GoogleOAuthButton = ({
	children,
	color,
	width,
	margin,
	onClick,
	...props
}: React.PropsWithChildren<ButtonProps>) => {
	return (
		<Styled.GoogleButton
			{...props}
			onClick={onClick}
			color={color}
			width={width}
			margin={margin}
			type="button"
		>
			<Styled.Google />
			{children}
		</Styled.GoogleButton>
	)
}
