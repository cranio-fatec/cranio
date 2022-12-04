import { shade } from 'polished'
import styled, { css } from 'styled-components'

import type { Theme } from '../styled'
import { containerCenter } from '../utils/containerCenter'

interface SubjectItemProps {
	active?: boolean
	subjectId: keyof Theme['colors']['subjects']
}

export const Container = styled.div`
	display: flex;
	${containerCenter}
	padding: 100px 0;
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

export const TopTeachers = styled.aside`
	width: 244px;
	height: 200px;
	margin-left: 44px;
	background-color: white;
	padding: 20px;
	margin-top: 150px;

	h3 {
		max-width: 200px;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;

		text-align: center;
		letter-spacing: 0.1px;
		margin: 0 auto;
		margin-bottom: 24px;

		color: #2196f3;
	}

	ol {
		display: flex;
		flex-direction: column;
		align-items: center;
		list-style: none;
		width: 100%;

		.icon-container {
			font-size: 60px;
			background-color: ${({ theme }) => theme.colors.blue_2};
			color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			overflow: hidden;
			cursor: pointer;
			width: 130px;
			height: 130px;
			margin-bottom: 6px;
			img {
				width: 100%;
				height: 100%;

				line-height: 130px;
				text-align: center;
			}
		}

		li {
			position: relative;

			&:nth-child(1) svg {
				color: #ffff00;
			}
			&:nth-child(2) svg {
				color: #888888;
			}
			&:nth-child(3) svg {
				color: #d96c45;
			}
			&:not(:last-child) {
				margin-bottom: 32px;
			}

			span {
				display: block;
				font-style: normal;
				font-weight: 500;
				font-size: 14px;
				line-height: 21px;
				text-align: center;

				letter-spacing: 0.1px;
			}
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

export const CrownBox = styled.div`
	position: absolute;
	left: -10px;
	transform: rotate(-20deg);
`
