import React from 'react'

import * as Styled from './styles'
import { LabelProps } from './types'

const Label = ({
	labelFor,
	children,
	margin,
	required,
	bold
}: React.PropsWithChildren<LabelProps>) => {
	return (
		<Styled.Label
			htmlFor={labelFor}
			margin={margin}
			required={required}
			bold={bold}
		>
			{children}
		</Styled.Label>
	)
}

export default Label
