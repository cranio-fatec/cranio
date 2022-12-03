import { css } from 'styled-components'

export const containerCenter = css`
	width: 100%;
	max-width: ${({ theme }) => theme.sizes.container};
	margin-left: auto;
	margin-right: auto;
`
