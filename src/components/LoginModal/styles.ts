import styled from 'styled-components'

export const Container = styled.div`
	position: relative;
	width: 400px;
	padding: 50px;
	padding-top: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: ${({ theme }) => theme.colors.blue_0};

	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04), 0px 4px 24px rgba(0, 0, 0, 0.12);
	border-radius: 30px;

	> img {
		margin-bottom: 30px;
	}

	> form {
		width: 100%;
		margin-bottom: 16px;
		> div {
			&:not(:first-child) {
				margin-top: 20px;
			}
		}

		> a {
			font-weight: 500;
			font-size: 16px;
			line-height: 30px;
			align-self: flex-start;

			color: white;
		}
	}
	label {
		color: white;
	}

	> svg {
		position: absolute;
		top: 10px;
		right: 16px;
		color: white;
		cursor: pointer;
	}
`

export const Title = styled.h2`
	font-size: 30px;
	line-height: 16px;
	text-transform: uppercase;

	text-align: center;

	color: ${({ theme }) => theme.colors.yellow};
	margin-bottom: 20px;
`

export const TextWrapper = styled.div`
	max-width: 300px;
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`

export const Text = styled.p`
	font-size: 16px;
	line-height: 130%;
	/* or 21px */
	color: white;
	text-align: center;
`

export const ButtonsContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	/* margin-bottom: 20px; */
	gap: 16px;
	button {
		flex: 1;
		letter-spacing: 1px;
	}
`
