import { LinkProps } from 'next/link'

export interface MyLinkProps extends LinkProps {
	disabled?: boolean
}
