import { Answer, Post, Subject, User } from '@prisma/client'

export type PostWithAuthorSubjectAnswers = Post & {
	author: User
	subject: Subject
	answers: Answer[]
}

export interface PostTableProps {
	posts: PostWithAuthorSubjectAnswers[]
}

export interface PostStatusProps {
	closed: boolean
}
