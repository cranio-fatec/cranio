import styled, { css } from 'styled-components'

import { ContainerStyleProps, ContentStyleProps } from './types'

export const Container = styled.li<ContainerStyleProps>`
	display: flex;
	min-height: 230px;

	${({ isOdd, theme }) =>
		isOdd &&
		css`
			background-color: ${theme.colors.blue__1};
		`}
`

export const UserInfo = styled.div`
	width: 240px;
	border-right: 1px solid black;
	padding-top: 40px;
	> a {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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

	span {
		font-weight: 500;
		font-size: 14px;
		line-height: 21px;

		letter-spacing: 0.1px;

		color: #000000;
	}
`

export const Content = styled.div<ContentStyleProps>`
	flex: 1;
	padding: ${({ isTopic }) =>
		isTopic ? '0 32px 20px 32px' : '0 16px 20px 16px'};
	h4 {
		width: 100%;
		font-weight: bold;
		font-size: 20px;
		line-height: 56px;
		padding-left: 32px;
		box-shadow: inset 0px -1px 0px #e5e5e5;

		letter-spacing: 0.1px;
	}

	p {
		font-size: 20px;
		line-height: 21px;
		margin-top: 20px;
		/* or 105% */

		letter-spacing: 0.1px;
	}
`
