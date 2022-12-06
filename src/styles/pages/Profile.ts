import { shade } from 'polished'
import styled, { css } from 'styled-components'

import { containerCenter } from '../utils/containerCenter'
import { SubjectItemProps } from './Dashboard'

export const Container = styled.div`
	display: flex;
	${containerCenter}
	padding-top: 40px;
	background-color: #fbfcfd;
`

export const Content = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 900px;
	h1 {
		font-weight: 500;
		font-size: 32px;
		line-height: 16px;

		letter-spacing: 1.25px;
		text-transform: uppercase;
		margin-bottom: 32px;

		color: #000000;
	}

	nav {
		margin-bottom: 32px;
		ul {
			width: 100%;
			display: flex;
			justify-content: space-between;
			list-style: none;
		}
	}
`

export const SubjectItem = styled.li<SubjectItemProps>`
	width: 86px;
	height: 23px;
	background-color: ${({ subjectId, theme }) =>
		theme.colors.subjects[subjectId].background};
	color: ${({ subjectId, theme }) => theme.colors.subjects[subjectId].text};
	font-weight: 500;
	font-size: 10px;
	line-height: 16px;

	display: flex;
	align-items: center;
	justify-content: center;
	letter-spacing: 1.25px;
	text-transform: uppercase;
	box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12),
		0px 2px 4px rgba(0, 0, 0, 0.14);
	border-radius: 4px;
	cursor: pointer;
	user-select: none;
	border: 1px solid transparent;

	transition: border-color 0.2s;
	${({ active, theme }) =>
		active &&
		css`
			border-color: ${theme.colors.red};
		`}
`

export const ButtonsWrapper = styled.div<{ show?: boolean }>`
	align-self: flex-end;
	margin-bottom: 12px;

	${({ show }) =>
		!show &&
		css`
			visibility: hidden;
		`}

	button,
a {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		border: none;
		outline: none;
		background-color: #e5e5e5;
		border-radius: 4px;
		width: 40px;
		height: 40px;

		transition: background-color 0.2s;
		&:hover {
			background-color: ${shade(0.1, '#e5e5e5')};
		}
	}
`
