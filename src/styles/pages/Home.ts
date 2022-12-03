import styled, { css } from 'styled-components'

import { containerCenter } from '../utils/containerCenter'

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
			flex: 1;
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
