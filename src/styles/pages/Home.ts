import styled, { css } from 'styled-components'

import { Link } from '../../components/Link'
import { containerCenter } from '../utils/containerCenter'
import { SubjectItemProps } from './Dashboard'

interface ArticleProps {
	background?: string
}

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100%;
	min-height: 100vh;
`

export const Main = styled.main`
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
`

export const Article = styled.article<ArticleProps>`
	min-height: 650px;
	display: flex;
	${({ background }) =>
		background &&
		css`
			background-color: ${background};
		`}

	> div {
		flex: 1;
		display: flex;
		justify-content: space-around;
		${containerCenter}
	}

	&.first {
		.left {
			padding: 40px 0;
			margin-top: 70px;
		}
	}

	&.second {
		.left {
			width: 670px;
			height: 510px;
			margin-top: auto;
			margin-bottom: 20px;

			svg {
				overflow: visible;
			}
		}
		.right {
			max-width: 480px;
			/* margin-left: 90px; */
			margin-top: 90px;
			p {
				font-size: 20px;
			}
		}
	}
	&.third {
		flex-direction: column;
		margin-top: 70px;
		margin-bottom: 52px;
		> div {
			margin-top: 74px;
		}
		h1 {
			font-weight: 6600;
			font-size: 36px;
			line-height: 30px;
			align-self: center;

			text-align: center;
			letter-spacing: 0.15px;
			text-transform: uppercase;

			color: #000000;
		}

		.left {
			flex: 1;
			padding: 120px 0;

			form {
				width: 514px;
				> div > div {
					background-color: #fbfcfd;
					box-shadow: none;
				}
			}
			span {
				font-weight: 500;
				font-size: 40px;
				line-height: 30px;
				text-transform: uppercase;

				letter-spacing: 0.15px;
			}
		}
		.right {
			width: 100%;
			h2 {
				font-weight: 500;
				font-size: 36px;
				line-height: 30px;
				/* or 83% */

				text-align: center;
				letter-spacing: 0.15px;
			}
		}
	}

	section {
		max-width: 560px;
		color: ${({ background, theme }) =>
			background ? '#ffffff' : theme.colors.text};
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;

		h1 {
			font-style: normal;
			font-weight: 900;
			font-size: 48px;
			text-transform: uppercase;

			text-align: center;
			letter-spacing: 0.15px;
		}

		p {
			font-style: normal;
			font-weight: 900;
			font-size: 24px;
			line-height: 30px;
			/* or 125% */

			text-align: center;
			letter-spacing: 0.15px;
		}

		> div {
			display: flex;
			gap: 77px;
		}
	}
`

export const VerticalDivider = styled.div`
	width: 1px;
	height: 650px;
	background-color: rgba(0, 0, 0, 0.54);
`

export const Title = styled.h1`
	font-size: 40px;
`

export const RecentPostsContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	border: 1px solid ${({ theme }) => theme.colors.grey_5};
	border-radius: 4px;

	padding: 16px 24px;
	gap: unset !important;

	h3 {
		font-weight: 500;
		font-size: 20px;
		line-height: 30px;
		margin-bottom: 20px;
	}
`
export const LoadingDots = styled.div`
	height: 345px;
	margin: auto !important;

	display: flex;
	align-items: center;
	justify-content: center;
`

export const PostsList = styled.ul`
	display: flex;
	flex-direction: column;

	list-style: none;

	li {
		&:not(:first-child) {
			margin-top: 24px;
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

export const PostHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 12px;

	.icon-container {
		position: relative;
		font-size: 24px;
		background-color: ${({ theme }) => theme.colors.blue_2};
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
		width: 40px;
		height: 40px;
		margin: 0 10px;
		img {
			width: 100%;
			height: 100%;

			line-height: 40px;
			text-align: center;
		}
	}

	strong {
		font-weight: 500;
		font-size: 14px;
		line-height: 10px;
	}

	span {
		font-weight: 400;
		font-size: 12px;
		line-height: 10px;
		margin-top: -4px;
	}

	${SubjectItem} {
		margin-left: auto;
		margin-top: auto;
	}
`

export const PostBody = styled.p`
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	font-weight: 400 !important;
	font-size: 12px !important;
	line-height: 15px !important;
	height: 30px;
	text-align: left !important;

	letter-spacing: 0.1px !important;
`

export const SeeMore = styled(Link)`
	font-weight: 500;
	font-size: 20px;
	line-height: 30px;
	/* or 150% */

	letter-spacing: 0.15px;
	margin-left: auto;

	color: ${({ theme }) => theme.colors.blue_0};
`
