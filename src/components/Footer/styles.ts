import styled from 'styled-components'

import { containerCenter } from '../../styles/utils/containerCenter'

export const Container = styled.footer`
	background-color: ${({ theme }) => theme.colors.blue_0};
	height: 200px;
`

export const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	padding: 26px 0;
	${containerCenter}

	a {
		font-weight: 500;
		font-size: 20px;
		line-height: 30px;

		text-align: center;
		letter-spacing: 0.15px;

		color: #ffffff;
	}
`

export const LeftWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 100%;

	/* a {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  } */
`

export const RightWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	h3 {
		font-style: normal;
		font-weight: 500;
		font-size: 24px;
		line-height: 30px;

		text-align: center;
		letter-spacing: 0.15px;
		margin-bottom: 36px;

		color: #ffffff;
	}

	> div {
		display: flex;
		justify-content: space-between;
		width: 680px;
	}
`
