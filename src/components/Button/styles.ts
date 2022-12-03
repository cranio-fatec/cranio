import styled, { css } from 'styled-components'
import { shade } from 'polished'

import theme from '../../styles/theme'
import { ButtonProps } from './types'

const { colors } = theme

interface Theme {
	text: string
	hoverText?: string
	background?: string
	hoverBackground?: string
	border?: string
	hoverBorder?: string
}

const buttonSchemas: { [name: string]: Theme } = {
	primary: {
		text: 'black',
		background: colors.yellow,
		hoverBackground: shade(0.1, colors.yellow)
	},
	darkblue: {
		text: 'white',
		background: colors.blue_1,
		hoverBackground: shade(0.1, colors.blue_1)
	},
	secondary: {
		text: 'black',
		background: 'white',
		hoverBackground: shade(0.1, 'white')
	},
	info: {
		text: colors.blue_1,
		background: colors.blue__1,
		hoverBackground: shade(0.1, colors.blue__1)
	}
}

const buttonSizes = {
	big: '47px',
	medium: '44px',
	small: '40px'
}

const getSchema = ({
	schema = 'primary',
	outlined,
	alternative,
	disabled
}: ButtonProps) => {
	const parsedSchema = `${schema}${alternative ? 'Alt' : ''}${
		outlined ? 'Out' : ''
	}`
	const schemaObj = buttonSchemas[parsedSchema]

	if (disabled) {
		// return css`
		//   cursor: not-allowed;
		//   color: ${!outlined
		//     ? colors.grey_3
		//     : alternative
		//     ? colors.grey_5
		//     : colors.grey_4};
		//   background-color: ${!outlined ? colors.grey_5 : 'transparent'};
		//   border: 1px solid ${outlined ? colors.grey_5 : colors.grey_5};
		// `
	}

	return css`
		color: ${schemaObj.text};
		border: 1px solid ${schemaObj.border ?? 'transparent'};
		background-color: ${schemaObj.background ?? 'transparent'};

		&:hover {
			${schemaObj.hoverBackground &&
			css`
				background-color: ${schemaObj.hoverBackground};
			`}
			${schemaObj.hoverBorder &&
			css`
				border-color: ${schemaObj.hoverBorder};
			`}
      ${schemaObj.hoverText &&
			css`
				color: ${schemaObj.hoverText};
			`}
		}
	`
}

export const Button = styled.button<ButtonProps>`
	width: ${({ width }) => width ?? '100%'};
	height: ${({ size }) => buttonSizes[size ?? 'medium']};
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${({ size }) => (size === 'small' ? '14px' : '20px')};
	line-height: 30px;
	cursor: pointer;
	margin: ${({ margin }) => margin ?? 0};
	padding: 11px
		${({ size, width }) => (width ? '0' : size === 'small' ? '16px' : '20px')};
	transition: background-color 200ms, border-color 200ms;
	font-weight: 500;

	box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.2), 0px 3px 16px rgba(0, 0, 0, 0.12),
		0px 9px 12px rgba(0, 0, 0, 0.14);
	border-radius: 4px;

	${({ upper }) =>
		upper &&
		css`
			text-transform: uppercase;
		`}

	${getSchema}
`
