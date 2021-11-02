import React from 'react'
import * as Styled from './styles'
import { LabelProps } from './types'

const Label: React.FC<LabelProps> = ({
  labelFor,
  children,
  margin,
  required,
  bold
}) => {
  return (
    <Styled.Label
      htmlFor={labelFor}
      margin={margin}
      required={required}
      bold={bold}
    >
      {children}
    </Styled.Label>
  )
}

export default Label
