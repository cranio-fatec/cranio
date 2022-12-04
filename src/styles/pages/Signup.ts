import styled from 'styled-components'

import { containerCenter } from '../utils/containerCenter'

export const Container = styled.form`
	display: flex;
	flex-direction: column;
	${containerCenter}
	padding: 100px 0;

	h1 {
		font-family: ${({ theme }) => theme.fonts.secondary};
		font-style: normal;
		font-weight: bold;
		font-size: 24px;
		line-height: 132%;

		color: #333333;

		span {
			text-decoration: underline;
			color: ${({ theme }) => theme.colors.blue_1};
			cursor: pointer;
		}
	}

	article {
		display: flex;
		flex-direction: column;

		&.signup {
			margin-bottom: 60px;
		}

		.input-container {
			&:not(:last-child) {
				margin-bottom: 16px;
			}
			> div {
				height: 52px;
				box-shadow: none;
				border-radius: 4px;
			}
			svg {
				width: 20px;
			}
		}

		.select__control {
			height: 52px;
		}

		> div {
			margin-top: 16px;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;

			section {
				display: flex;
				gap: 80px;
				width: 100%;

				> div {
					flex: 1;
				}

				label {
					/* color: ${({ theme }) => theme.colors.red}; */
					margin-left: 12px;
					margin-bottom: 4px;
				}
			}
		}

		&.second-part {
			align-items: center;

			button {
				font-size: 16px;
			}
		}
	}
`
