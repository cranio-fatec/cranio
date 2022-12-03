/* eslint-disable @typescript-eslint/ban-types */
import { CSSProperties, ReactElement } from 'react'

import { maskDict } from '.'

export type BaseInputProps = Partial<
	ReactElement<HTMLInputElement> & BaseInputPropsClean
>

export type InputMask = keyof typeof maskDict

export interface BaseInputPropsClean {
	label?: string
	placeholder?: string
	outlined?: boolean
	rounded?: boolean
	selected?: boolean
	required?: boolean
	onClick?: () => void
	onClickIcon?: () => void | Promise<void>
	lock?: boolean
	leftIcon?: React.FC | string
	rightIcon?: React.FC | string
	style?: CSSProperties
	value?: string
	onChange?: (inputEvent: React.ChangeEvent<HTMLInputElement>) => void
	name?: string
	width?: string
	maxWidth?: string
	id?: string
	defaultValue?: string
	isErrored?: boolean
	isFocused?: boolean
	labelRequired?: boolean
	disabled?: boolean
	mask?: InputMask
	type?: string
	maxLength?: number

	ref?: any
}
export interface MaxLengthTooltipProps {
	isAbove?: boolean
}
