import React from 'react'
import * as Styled from './styles'
import { ButtonProps } from './types'

export const GoogleOAuthButton: React.FC<ButtonProps> = ({
  children,
  color,
  width,
  margin,
  onClick,
  ...props
}) => {
  return (
    <Styled.GoogleButton
      {...props}
      onClick={onClick}
      color={color}
      width={width}
      margin={margin}
    >
      <Styled.Google />
      {children}
    </Styled.GoogleButton>
  )
}
