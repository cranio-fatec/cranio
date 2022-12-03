import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi'
import styled, { css } from 'styled-components'

import theme from '../../styles/theme'
import { MaxLengthTooltipProps } from '../Input/types'
import { BaseInputProps } from './types'

const variantThemeColor = theme.colors.text
const variantThemeColorHighlight = '#ffffff'

const outlined = css`
	border: 1px solid ${variantThemeColor};
	/* background-color: transparent; */
`

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

export const InputContainer = styled.div.attrs(
	(props: BaseInputProps) => props
)`
	color: ${variantThemeColor};
	background-color: ${variantThemeColorHighlight};
	border: 1px solid ${({ theme }) => theme.colors.grey_4};
	border-radius: 4px;
	${({ height }) => (height ? `height: ${height}` : 'height: 83px')};
	box-sizing: border-box;
	${({ width }) => (width ? `width: ${width}` : 'width: 100%')};
	display: flex;
	align-items: center;
	overflow: hidden;
	position: relative;
	${(props) => props.outlined && outlined};
	${({ isFocused, theme }) =>
		isFocused &&
		css`
  box-shadow: 0 0 0 1px ${theme.colors.blue_0} !important} ;`}
	${({ maxWidth }) => `max-width: ${maxWidth};`}
  ${({ theme, isErrored }) =>
		isErrored && `border-color: ${theme.colors.danger_0} !important;`};

	transition: border-color 200ms, box-shadow 200ms;
	background-color: ${({ disabled, theme }) =>
		disabled ? theme.colors.grey_6 : 'white'};
	${({ disabled }) =>
		disabled &&
		css`
			cursor: not-allowed;
			textarea {
				cursor: not-allowed;
			}
		`}

	&:hover {
		border: 1px solid ${variantThemeColor};
	}

	textarea {
		color: ${(props) => props.theme.colors.text};
		width: 100%;
		height: 100%;
		font-size: 14px;
		line-height: 17px;
		padding: 0;
		padding: 15px 20px;
		padding-left: 1em;
		outline: none;
		border: none;
		flex: 1;
		border-style: none;
		border-color: transparent;
		overflow: auto;
		resize: none;
		background-color: transparent;
		font-family: 'Roboto';
		&::placeholder {
			color: ${(props) => props.theme.colors.text};
			opacity: 0.6;
		}

		&::-webkit-scrollbar {
			width: 7px;
		}

		&::-webkit-scrollbar-track {
			background: ${({ theme }) => theme.colors.grey_5};
		}

		&::-webkit-scrollbar-thumb {
			background-color: ${({ theme }) => theme.colors.grey_3};
			border-radius: 20px;
		}
	}
`

export const InputText = styled.textarea<BaseInputProps>`
	color: ${(props) => props.theme.colors.text};
	width: 100%;
	height: 100%;
	font-size: 14px;
	line-height: 17px;
	padding: 0;
	/* padding-left: 1em; */
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
	height: 50px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: transparent;
	position: relative;
	align-self: flex-start;

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
	color: ${(props) => props.theme.colors.grey_4};
`
export const Hidden = styled(FiEyeOff)`
	position: absolute;
	width: 27px;
	height: 24px;
	min-width: 27px;
	min-height: 24px;
	transform: translateY(-1px);
	color: ${(props) => props.theme.colors.grey_4};
`

export const MaxLengthTooltip = styled.span<MaxLengthTooltipProps>`
	position: absolute;
	font-family: Montserrat;
	font-weight: ${({ isAbove }) => (isAbove ? 'bold' : 'normal')};
	font-size: 12px;
	line-height: 16px;
	/* or 133% */

	display: flex;
	align-items: center;
	letter-spacing: 0.4px;
	right: 30px;
	bottom: 20px;

	color: ${({ theme, isAbove }) => (isAbove ? theme.colors.red : '#9c9c9c')};
`
