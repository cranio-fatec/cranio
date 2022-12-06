import { Subject, User, UserGraduation } from '@prisma/client'

export type ProfileUser = User & {
	favoriteSubject: Subject | null
	graduations: UserGraduation[]
	posts: {
		id: string
	}[]
	answers: {
		id: string
	}[]
}

export interface ProfileContentProps {
	user: ProfileUser
	subjects: Subject[]
	postsSubjectsCount: Record<string, number>
	answersSubjectsCount: Record<string, number>
	reactionsSubjectsCount: Record<string, number>
}

export type SubjectWithCounts = Subject & {
	posts: number
	answers: number
	reactions: number
}

export interface ProfileChartProps {
	subjectsWithCounts: SubjectWithCounts[]
}
