import React from 'react'
import * as Styled from './styles'
import { ButtonProps } from './types'

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  ...props
}) => {
  return (
    <Styled.Button type={type} {...props}>
      {children}
    </Styled.Button>
  )
}

export default Button
