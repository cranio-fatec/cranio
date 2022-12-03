import styled from 'styled-components'
import { FcGoogle } from 'react-icons/fc'

interface ButtonProps {
	margin?: string
	width?: string
	height?: string
}

export const GoogleButton = styled.button<ButtonProps>`
	width: ${({ width }) => width ?? '100%'};
	height: 46px;
	color: ${({ color, theme }) => color ?? theme.colors.text};
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
	line-height: 19px;
	background-color: #ffffff;
	border: 1px solid transparent;
	border-radius: 4px;
	cursor: pointer;
	margin: ${({ margin }) => margin ?? 0};
	padding: 11px 25px;
	transition: border-color 200ms;

	box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.2), 0px 3px 16px rgba(0, 0, 0, 0.12),
		0px 9px 12px rgba(0, 0, 0, 0.14);

	&:hover {
		border: 1px solid ${({ theme }) => theme.colors.blue_1};
	}
`

export const Google = styled(FcGoogle)`
	width: 23px;
	height: 23px;
	min-width: 23px;
	min-height: 23px;
	margin-right: 12px;
`
