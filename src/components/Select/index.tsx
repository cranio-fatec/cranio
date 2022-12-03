import React, { forwardRef, useState } from 'react'
import ReactSelect, { components } from 'react-select'

import Label from '../Label'
import { Container, IconBox } from './styles'
import { SelectProps } from './types'

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

const Control = ({ leftIcon: LeftIcon }: any) =>
	function NewControl({ children, ...rest }: any) {
		return (
			<components.Control {...rest}>
				{LeftIcon && (
					<IconBox>
						<LeftIcon />
					</IconBox>
				)}
				{children}
			</components.Control>
		)
	}

const Select = ({
	placeholder,
	onChange,
	label,
	theme,
	margin,
	defaultValue,
	value,
	leftIcon,
	isErrored,
	labelRequired,
	...rest
}: SelectProps) => {
	const [isFilled, setIsFilled] = useState(!!defaultValue || !!value)

	return (
		<Container margin={margin} isFilled={isFilled} isErrored={isErrored}>
			{!!label && <Label required={labelRequired}>{label}</Label>}
			<ReactSelect
				className="select"
				classNamePrefix="select"
				placeholder={placeholder ?? 'Selecione'}
				defaultValue={defaultValue}
				value={value}
				onChange={(v, a) => {
					setIsFilled(true)
					onChange && onChange(v, a)
				}}
				components={{
					Control: Control({ leftIcon })
				}}
				{...rest}
				// theme={
				//   {
				//     colors: {
				//       ...defaultTheme.colors,
				//       ...theme.colors,
				//       primary: theme.colors.primary_0,
				//       primary75: theme.colors.primary__1,
				//       primary50: theme.colors.primary__2,
				//       primary25: theme.colors.grey_5
				//     },
				//     sizes: { ...defaultTheme.spacing }
				//   } as any
				// }
			/>
		</Container>
	)
}

export default forwardRef(Select)
