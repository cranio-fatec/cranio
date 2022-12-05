import { User } from '@prisma/client'
import { KeyedMutator } from 'swr'

import { AnswerReactionsData } from '../../pages/api/posts/[id]/answers/reactions'

export interface PostLike {
	id: string
	title?: string
	body: string
	authorId: string
	author: User
	loading?: boolean
}

export interface PostItemProps {
	content: PostLike
	isOdd: boolean
	reactions?: AnswerReactionsData['reactions']
	mutateReactions?: KeyedMutator<any>
}

export interface ContainerStyleProps {
	isOdd: boolean
	isLoading?: boolean
}

export interface ContentStyleProps {
	isTopic?: boolean
}
