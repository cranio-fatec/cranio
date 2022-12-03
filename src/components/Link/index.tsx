import NextLink from 'next/link'
import React from 'react'

import { MyLinkProps } from './types'

// import { Container } from './styles';

export const Link = ({
	disabled,
	children,
	...rest
}: React.PropsWithChildren<MyLinkProps>) => {
	return disabled ? <>{children}</> : <NextLink {...rest}>{children}</NextLink>
}
