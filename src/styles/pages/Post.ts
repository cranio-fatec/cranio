import styled from 'styled-components'

import { containerCenter } from '../utils/containerCenter'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	${containerCenter}
	padding: 100px 0;

	ol {
		border: 1px solid #000000;
		list-style: none;
		margin-bottom: 30px;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		h2 {
			font-family: Montserrat;
			font-style: normal;
			font-weight: normal;
			font-size: 20px;
			line-height: 16px;

			letter-spacing: 0.4px;
			align-self: flex-start;

			color: #000000;
			margin-bottom: 16px;
		}
	}
`
