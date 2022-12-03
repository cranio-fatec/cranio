import { User } from '@prisma/client'

export interface PostLike {
	id: string
	title?: string
	body: string
	authorId: string
	author: User
}

export interface PostItemProps {
	content: PostLike
	isOdd: boolean
}

export interface ContainerStyleProps {
	isOdd: boolean
}

export interface ContentStyleProps {
	isTopic?: boolean
}
