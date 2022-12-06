import styled, { css } from 'styled-components'

import { Link } from '../../components/Link'
import { containerCenter } from '../utils/containerCenter'
import { SubjectItemProps } from './Dashboard'

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

export const TeachersGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 46px;
	row-gap: 26px;
`

export const TeacherItem = styled(Link)`
	height: 330px;
	border-radius: 25px;
	background-color: ${({ theme }) => theme.colors.blue_0};
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 13px 8px 13px;
	transition: background-color 0.3s;

	&:hover {
		background-color: ${({ theme }) => theme.colors.blue_1};
	}

	ul {
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;
		width: 100%;

		${SubjectItem} {
			cursor: default;
		}
	}

	.icon-container {
		position: relative;
		font-size: 60px;
		background-color: ${({ theme }) => theme.colors.blue_2};
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
		width: 200px;
		height: 200px;
		margin-bottom: 6px;
		img {
			width: 100%;
			height: 100%;

			line-height: 130px;
			text-align: center;
		}
	}
`

export const TeacherName = styled.span`
	font-weight: 900;
	font-size: 28px;
	line-height: 30px;
	/* or 83% */

	text-align: center;
	letter-spacing: 0.15px;
	margin-top: 16px;

	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;

	color: ${({ theme }) => theme.colors.yellow};
`
