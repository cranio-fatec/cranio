import styled from 'styled-components'

import { containerCenter } from '../utils/containerCenter'

export const Container = styled.article`
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
		margin-bottom: 16px;
	}

	form {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		> button {
		}
	}

	.input-container {
		width: 100%;
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
`
