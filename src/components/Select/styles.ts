import styled, { css } from 'styled-components'

import { ContainerProps } from './types'

export const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: ${({ margin }) => margin ?? 0};

	.select {
		&__placeholder {
			font-size: 14px;
			color: ${({ theme }) => theme.colors.grey_4};
		}

		&__single-value {
			font-size: 14px;
		}

		&__control {
			height: 47px;
			border-radius: 4px;
			border-color: ${({ theme, isFilled }) =>
				isFilled ? theme.colors.blue_0 : theme.colors.grey_4};
			${({ isErrored, theme }) =>
				isErrored &&
				css`
					border-color: ${theme.colors.danger_0} !important;
				`};
			&--menu-is-open,
			&--is-focused {
				border-color: ${({ theme }) => theme.colors.blue_0};
				box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.blue_0};
			}
			&:hover {
				border-color: ${({ theme }) => theme.colors.blue_0};
			}
		}

		&__indicator-separator {
			display: none;
		}

		&__menu {
			margin: 0;
			margin-top: 3px;

			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04),
				0px 4px 16px rgba(0, 0, 0, 0.08);
			border-radius: 4px;

			&-list {
				&::-webkit-scrollbar {
					width: 7px; /* width of the entire scrollbar */
				}

				&::-webkit-scrollbar-track {
					background: ${({ theme }) => theme.colors.grey_5};
				}

				&::-webkit-scrollbar-thumb {
					background-color: ${({ theme }) => theme.colors.grey_3};
					border-radius: 20px; /* roundness of the scroll thumb */
					/* border: 3px solid orange; */
				}
			}
		}

		&__option {
			font-size: 16px;
			line-height: 20px;
			padding: 10px 20px;
			/* color: ${({ theme }) => theme.colors.grey_2}; */
			border-top: 1px solid transparent;

			&:not(:first-child) {
				border-top: 1px solid ${({ theme }) => theme.colors.grey_5};
			}

			&:hover {
				background-color: ${({ theme }) => theme.colors.grey_6};
			}

			&--is-selected {
				background-color: white;
				/* background-color: red; */
				font-weight: bold;
				color: ${({ theme }) => theme.colors.blue_0};
				position: relative;

				&::after {
					font-size: 18px;
					position: absolute;
					right: 20px;
					font-weight: 600;
					color: ${({ theme }) => theme.colors.grey_2};
					content: '\u2713';
					margin-left: auto;
				}
			}

			&--is-focused {
				background-color: white;
			}
		}
	}
	> div {
		/* background-color: red; */
	}
`

export const IconBox = styled.div`
	color: inherit;
	width: 50px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: transparent;
	position: relative;
	user-select: none;
	margin-right: 5px;

	svg {
		width: 20px;
		height: 20px;
	}
`
