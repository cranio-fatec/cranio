import styled from 'styled-components'

export const TopTeachers = styled.aside`
	width: 244px;
	height: fit-content;
	margin-left: 44px;
	background-color: white;
	padding: 20px;
	margin-top: 150px;

	h3 {
		max-width: 200px;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;

		text-align: center;
		letter-spacing: 0.1px;
		margin: 0 auto;
		margin-bottom: 24px;

		color: #2196f3;
	}

	ol {
		display: flex;
		flex-direction: column;
		align-items: center;
		list-style: none;
		width: 100%;

		.icon-container {
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

		li {
			position: relative;

			&:nth-child(1) svg {
				color: #ffff00;
			}
			&:nth-child(2) svg {
				color: #888888;
			}
			&:nth-child(3) svg {
				color: #d96c45;
			}
			&:not(:last-child) {
				margin-bottom: 32px;
			}

			span {
				display: block;
				font-style: normal;
				font-weight: 500;
				font-size: 14px;
				line-height: 21px;
				text-align: center;

				letter-spacing: 0.1px;
			}
		}
	}
`

export const CrownBox = styled.div`
	position: absolute;
	left: -10px;
	transform: rotate(-20deg);
`
