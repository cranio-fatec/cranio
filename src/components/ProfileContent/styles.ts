import { shade } from 'polished'
import { Pie } from 'react-chartjs-2'
import styled from 'styled-components'

import { SubjectItemProps } from '../../styles/pages/Dashboard'

export const Container = styled.div`
	display: flex;
`

export const LeftContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 406px;

	margin-right: 26px;
	padding-right: 26px;
	padding-bottom: 80px;
	padding-top: 40px;
	border-right: 1px solid rgba(0, 0, 0, 0.54);

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
		margin-bottom: 30px;
		img {
			width: 100%;
			height: 100%;

			line-height: 130px;
			text-align: center;
		}
	}
`

export const UserName = styled.h1`
	font-weight: 500 !important;
	font-size: 26px !important;
	line-height: 32px !important;
	margin-bottom: 43px !important;
	text-transform: none !important;

	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
`

export const SubjectInfoList = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;

	font-weight: 500;
	font-size: 20px;
	line-height: 21px;

	margin-bottom: 82px;

	li {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
`

export const SubjectParticipationsTitle = styled.h2`
	font-weight: 500;
	font-size: 26px;
	line-height: 21px;
	margin-bottom: 32px;
`

export const SubjectParticipationsList = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 16px;

	/* font-weight: 500;
	font-size: 20px;
	line-height: 21px; */

	li {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
`

export const SubjectItem = styled.div<SubjectItemProps>`
	width: 100%;
	height: 35px;
	background-color: ${({ subjectId, theme }) =>
		theme.colors.subjects[subjectId].background};
	color: ${({ subjectId, theme }) => theme.colors.subjects[subjectId].text};
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;

	display: flex;
	align-items: center;
	justify-content: center;
	letter-spacing: 1.25px;
	text-transform: uppercase;
	box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12),
		0px 2px 4px rgba(0, 0, 0, 0.14);
	border-radius: 4px;
	user-select: none;
	margin-bottom: 24px;
`
export const CountsWrapper = styled.div`
	display: flex;
	padding: 0 16px;
	margin-bottom: 20px;
	align-items: center;
	justify-content: space-between;
`
export const CountItemWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;

	font-weight: 500;
	font-size: 20px;
	line-height: 21px;
`

export const RightContainer = styled.div`
	display: flex;
	flex-direction: column;

	flex: 1;
	margin-top: 80px;
`
export const RightTopWrapper = styled.div`
	display: flex;
	gap: 40px;
	height: 350px;
	margin-bottom: 32px;
`

export const PostsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;

	h2 {
		font-family: ${({ theme }) => theme.fonts.secondary};
		font-style: normal;
		font-weight: 700;
		font-size: 24px;
		line-height: 132%;
		margin: 0;
		text-transform: none;
	}

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

export const RightTopItem = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	border: 1px solid #e5e5e5;
	border-radius: 4px;

	h2,
	strong {
		font-weight: 700;
		font-size: 24px;
		line-height: 132%;
		font-family: ${({ theme }) => theme.fonts.secondary};
	}
`

export const ChartWrapper = styled(RightTopItem)`
	padding: 32px;
	padding-bottom: 22px;
	flex: 1;

	h2 {
		margin-bottom: 8px;
	}
`

export const GraduationsInstitutionWrapper = styled(RightTopItem)`
	position: relative;
	padding: 32px 32px 42px 32px;
	justify-content: space-between;
	align-items: center;
	width: 350px;
`

export const GraduationButton = styled.button`
	position: absolute;
	outline: none;
	border: none;
	background-color: transparent;
	cursor: pointer;
	width: 26px;
	height: 26px;
	transition: color 0.3s;

	&:hover {
		color: ${({ theme }) => theme.colors.grey_4};
	}

	top: 50%;
	transform: translateY(-50%);
`

export const GraduationNextButton = styled(GraduationButton)`
	right: 8px;
`

export const GraduationPrevButton = styled(GraduationButton)`
	left: 8px;
`

export const StyledPieChart = styled(Pie)`
	/* margin-bottom: 40px; */
`
