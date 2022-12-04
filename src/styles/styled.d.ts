/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components'

import theme from './theme'

export type Theme = typeof theme & { fonts: Record<string, string> }

declare module 'styled-components' {
	export interface DefaultTheme extends Theme {}
}
