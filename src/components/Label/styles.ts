import styled, { css } from 'styled-components'

import { LabelStyleProps } from './types'

export const Label = styled.label<LabelStyleProps>`
	color: ${({ theme }) => theme.colors.text};
	${({ margin }) =>
		margin
			? css`
					margin: ${margin};
			  `
			: css`
					margin-bottom: 6px;
			  `};
	line-height: 17px;
	font-size: 16px;
	font-weight: ${({ bold }) => (bold ? 700 : 400)};
	font-weight: 500;

	${({ theme, required }) =>
		required &&
		css`
			&:after {
				content: '*';
				color: ${theme.colors.red};
			}
		`}
`
