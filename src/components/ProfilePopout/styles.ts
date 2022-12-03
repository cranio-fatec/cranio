import styled, { css } from 'styled-components'

import { ProfilePopoutProps } from './types'

export const Container = styled.div<ProfilePopoutProps>`
	position: absolute;
	width: 230px;
	display: flex;
	max-height: 0;
	background-color: white;
	overflow: hidden;
	transition: max-height 0.3s;
	border-radius: 5px;
	border: none;

	${({ isOpen }) =>
		isOpen &&
		css`
			max-height: 200px;
			border: 1px solid #dddddd;
		`}

	nav {
		width: 100%;
		ul {
			display: flex;
			flex-direction: column;
			list-style: none;

			li {
				padding: 0 24px;
				height: 42px;
				font-weight: 500;
				font-size: 14px;
				line-height: 21px;

				letter-spacing: 0.1px;
				cursor: pointer;
				transition: background-color 0.2s;

				&,
				a {
					display: flex;
					align-items: center;
				}

				svg {
					margin-right: 30px;
				}

				&:hover {
					background-color: #dddddd;
				}

				&:last-child {
					border-top: 1px solid #e5e5e5;
				}
			}
		}
	}
`
