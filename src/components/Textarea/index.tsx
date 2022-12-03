import React, { forwardRef, useCallback, useEffect, useState } from 'react'

import Label from '../Label'
import { BaseInputProps } from './types'
import * as Styled from './styles'

export const maskDict = {
	phone: {
		delimiters: ['(', ') ', '-'],
		blocks: [0, 2, 4, 4],
		numericOnly: true,
		delimiterLazyShow: true
	},
	cellphone: {
		delimiters: ['(', ') ', '-'],
		blocks: [0, 2, 5, 4],
		numericOnly: true,
		delimiterLazyShow: true
	},
	cnpj: {
		delimiters: ['.', '.', '/', '-'],
		blocks: [2, 3, 3, 4, 2],
		numericOnly: true,
		delimiterLazyShow: true
	},
	url: {
		prefix: 'https://'
	}
}

const Textarea = (
	{
		label,
		leftIcon: LeftIcon,
		rightIcon: RightIcon,
		required,
		placeholder,
		value,
		onChange,
		onClickIcon,
		type,
		name,
		id,
		defaultValue,
		isErrored,
		mask,
		labelRequired,
		disabled,
		maxLength,
		...rest
	}: BaseInputProps,
	ref: any
) => {
	const [isCellphone] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(!!value || !!defaultValue)
	const [internalValue, setInternalValue] = useState(
		value ?? defaultValue ?? ''
	)

	useEffect(() => {
		// a
	}, [isCellphone])

	const handleTogglePassword = useCallback(() => {
		setShowPassword((prev) => !prev)
	}, [])

	const handleInputFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleInputBlur = useCallback(() => {
		setIsFocused(false)
		const inputRef = ref as React.MutableRefObject<HTMLTextAreaElement>
		setIsFilled(!!inputRef?.current?.value)
	}, [ref])

	const handleOnChange = useCallback(
		(e: any) => {
			setInternalValue(e.target.value)
			onChange && onChange(e)
		},
		[onChange]
	)

	return (
		<Styled.Container>
			{!!label && <Label required={labelRequired}>{label}</Label>}
			<Styled.InputContainer
				isErrored={isErrored}
				outlined={isFilled || isFocused}
				isFocused={isFocused}
				disabled={disabled}
				{...rest}
			>
				{LeftIcon && (
					<Styled.IconBox onClick={onClickIcon}>
						<LeftIcon />
					</Styled.IconBox>
				)}
				<textarea
					name={name}
					placeholder={placeholder}
					// type="text"
					value={value}
					onChange={handleOnChange}
					ref={ref}
					id={id}
					defaultValue={defaultValue}
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					required={required}
					disabled={disabled}
				/>
				{RightIcon ? (
					<Styled.IconBox onClick={onClickIcon}>
						<RightIcon />
					</Styled.IconBox>
				) : (
					type === 'password' && (
						<Styled.IconBox onClick={handleTogglePassword}>
							{showPassword ? <Styled.Visible /> : <Styled.Hidden />}
						</Styled.IconBox>
					)
				)}
				{maxLength && (
					<Styled.MaxLengthTooltip
						isAbove={maxLength - internalValue.length < 0}
					>
						{maxLength - internalValue.length}
					</Styled.MaxLengthTooltip>
				)}
			</Styled.InputContainer>
		</Styled.Container>
	)
}

export default forwardRef(Textarea)
