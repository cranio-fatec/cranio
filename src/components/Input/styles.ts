import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi'
import styled, { css } from 'styled-components'

import theme from '../../styles/theme'
import { BaseInputProps, MaxLengthTooltipProps } from './types'

const variantThemeColor = theme.colors.text
const variantThemeColorHighlight = '#ffffff'

const outlined = css`
	border: 1px solid ${variantThemeColor};
	/* background-color: transparent; */
`

export const Container = styled.div`
	display: flex;
	flex-direction: column;
`

export const InputContainer = styled.div.attrs(
	(props: BaseInputProps) => props
)`
	color: ${variantThemeColor};
	background-color: ${variantThemeColorHighlight};
	border: 1px solid ${({ theme }) => theme.colors.grey_4};
	width: fit-content;
	height: 44px;
	box-sizing: border-box;
	width: 100%;
	display: flex;
	align-items: center;
	overflow: hidden;
	position: relative;

	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24);
	${(props) => props.outlined && outlined};
	${({ isFocused, theme }) =>
		isFocused &&
		css`
  box-shadow: 0 0 0 1px ${theme.colors.blue_0} !important} ;`}
	${({ maxWidth }) => `max-width: ${maxWidth};`}
  ${({ theme, isErrored }) =>
		isErrored && `border-color: ${theme.colors.red} !important;`};

	transition: border-color 200ms, box-shadow 200ms;
	background-color: ${({ disabled, theme }) =>
		disabled ? theme.colors.grey_6 : 'white'};
	${({ disabled }) =>
		disabled &&
		css`
			cursor: not-allowed;
			input {
				cursor: not-allowed;
			}
		`}

	&:hover {
		border: 1px solid ${({ theme }) => theme.colors.blue_0};
	}

	input {
		color: ${(props) => props.theme.colors.text};
		width: 100%;
		height: 100%;
		font-size: 14px;
		line-height: 17px;
		padding: 0;
		padding-left: 1em;
		outline: none;
		border: none;
		flex: 1;
		background-color: transparent;
		&::placeholder {
			color: #cccccc;
			/* opacity: 0.6; */
		}
	}
`

export const InputText = styled.input<BaseInputProps>`
	color: ${(props) => props.theme.colors.text};
	width: 100%;
	height: 100%;
	font-size: 14px;
	line-height: 17px;
	padding: 0;
	padding-left: 1em;
	outline: none;
	border: none;
	background-color: transparent;
	flex: 1;
	&::placeholder {
		color: ${(props) => props.theme.colors.text};
		opacity: 0.6;
	}
`

export const IconBox = styled.div`
	color: inherit;
	width: 50px;
	height: 100%;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: transparent;
	position: relative;
	user-select: none;

	svg {
		width: 20px;
		height: 20px;
	}
`

export const Lock = styled(FiLock)`
	color: inherit;
	width: 17px;
	height: 17px;
	min-width: 17px;
	min-height: 17px;
	margin-left: 10px;
	transform: translateY(-1px);
`
export const Visible = styled(FiEye)`
	width: 27px;
	height: 24px;
	min-width: 27px;
	min-height: 24px;
	transform: translateY(-1px);
	position: absolute;
	color: ${(props) => props.theme.colors.text};
`
export const Hidden = styled(FiEyeOff)`
	position: absolute;
	width: 27px;
	height: 24px;
	min-width: 27px;
	min-height: 24px;
	transform: translateY(-1px);
	color: ${(props) => props.theme.colors.text};
`

export const MaxLengthTooltip = styled.span<MaxLengthTooltipProps>`
	position: absolute;
	font-family: ${({ theme }) => theme.fonts.secondary};
	font-weight: ${({ isAbove }) => (isAbove ? 'bold' : 'normal')};
	font-size: 12px;
	line-height: 16px;
	/* or 133% */

	display: flex;
	align-items: center;
	letter-spacing: 0.4px;
	right: 30px;

	color: ${({ theme, isAbove }) => (isAbove ? theme.colors.red : '#9c9c9c')};
`
