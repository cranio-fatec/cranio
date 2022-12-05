import styled from 'styled-components'

import type { Theme } from '../styled'
import { containerCenter } from '../utils/containerCenter'

export interface SubjectItemProps {
	active?: boolean
	subjectId: keyof Theme['colors']['subjects']
}

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.blue_0};
`

export const Content = styled.div`
	flex: 1;
	${containerCenter}
	padding: 100px 0;
	padding-top: 0;
	display: flex;
	flex-direction: column;
	/* min-height: 900px; */
	align-items: center;

	p {
		margin-top: 38px;
		font-style: normal;
		font-weight: 900;
		font-size: 24px;
		line-height: 30px;
		/* or 125% */

		text-align: justify;
		letter-spacing: 0.15px;

		/* WHITE */

		color: #ffffff;
	}
`

export const PortraitList = styled.ul`
	width: 100%;
	max-width: 1188px;
	margin-left: auto;
	margin-right: auto;
	padding: 45px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;

	list-style: none;
`

export const Portrait = styled.li`
	width: 326px;
	border-radius: 25px;
	background-color: ${({ theme }) => theme.colors.blue_0};

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px 16px;

	img {
		border-radius: 50%;
		margin-bottom: 27px;
	}

	strong {
		font-weight: 900;
		font-size: 36px;
		line-height: 30px;
		/* or 83% */

		text-align: center;
		letter-spacing: 0.15px;

		color: ${({ theme }) => theme.colors.yellow};
	}

	p {
		font-weight: 900;
		font-size: 24px;
		line-height: 30px;
		/* or 125% */

		text-align: center;
		letter-spacing: 0.15px;

		/* WHITE */

		color: #ffffff;

		span {
			font-size: 18px;
			line-height: 24px;
		}
	}
`
