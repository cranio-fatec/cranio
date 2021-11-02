import NextLink from 'next/link'
import React from 'react'
import { MyLinkProps } from './types'

// import { Container } from './styles';

export const Link: React.FC<MyLinkProps> = ({
  disabled,
  children,
  ...rest
}) => {
  return disabled ? <>{children}</> : <NextLink {...rest}>{children}</NextLink>
}
