import styled from 'styled-components'

export const Container = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	h2 {
		margin-bottom: 32px;
	}

	h3 {
		align-self: flex-start;
	}

	> div {
		width: 100%;
		display: flex;
		flex-direction: column;

		> span {
			font-weight: 500;
			font-size: 14px;
			line-height: 21px;
			align-self: flex-end;
			cursor: pointer;

			letter-spacing: 0.1px;

			color: #888888;
		}

		> div {
			display: flex;
			margin-bottom: 32px;
			width: 100%;
			gap: 80px;
		}

		.input-container {
			gap: unset;
		}
	}

	ul {
		display: flex;
		flex-direction: column;

		li {
			display: flex;
			align-items: center;
			svg {
				cursor: pointer;
				width: 20px;
				height: auto;
				margin-left: 16px;
			}
		}
	}
`
