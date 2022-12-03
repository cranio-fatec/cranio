import styled from 'styled-components'

export const Container = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 526px;

	h2 {
		margin-bottom: 32px;
	}

	> div {
		width: 100%;

		> div:first-child {
			margin-bottom: 32px;
		}
	}
`
