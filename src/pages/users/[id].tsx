import { GetServerSideProps } from 'next'
import React from 'react'
import { Subject } from '@prisma/client'

import { prisma } from '../../lib/prismadb'
import * as S from '../../styles/pages/Profile'
import ProfileContent from '../../components/ProfileContent'
import { getSubjects } from '../api/subjects'
import { ProfileUser } from '../../components/ProfileContent/types'

interface ProfileProps {
	user: ProfileUser
	subjects: Subject[]
	postsSubjectsCount: Record<string, number>
	answersSubjectsCount: Record<string, number>
	reactionsSubjectsCount: Record<string, number>
}

const Profile: React.FC<ProfileProps> = (props) => {
	return (
		<>
			<S.Container>
				<S.Content>
					<ProfileContent {...props} />
				</S.Content>
			</S.Container>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const userId = context.params?.id as string | undefined

	if (!userId) {
		return {
			props: {},
			redirect: {
				destination: '/dashboard'
			}
		}
	}

	const userPromise = prisma.user.findFirst({
		where: {
			id: userId
		},
		include: {
			favoriteSubject: true,
			posts: {
				select: {
					id: true,
					subjectId: true
				}
			},
			answers: {
				where: {
					post: {
						authorId: {
							not: userId
						}
					}
				},
				select: {
					id: true,
					post: {
						select: {
							subjectId: true
						}
					}
				}
			},
			graduations: true
		}
	})

	const reactionsPromise = prisma.reaction.findMany({
		select: {
			post: {
				select: {
					id: true,
					subjectId: true
				}
			},
			answer: {
				select: {
					id: true,
					post: {
						select: {
							subjectId: true
						}
					}
				}
			}
		},
		where: {
			OR: [
				{
					post: {
						authorId: userId
					}
				},
				{
					answer: {
						authorId: userId,
						post: {
							authorId: {
								not: userId
							}
						}
					}
				}
			],
			value: 1
		}
	})

	const [user, subjects, reactions] = await Promise.all([
		userPromise,
		getSubjects(),
		reactionsPromise
	])

	if (!user) {
		return {
			props: {},
			redirect: {
				destination: '/dashboard'
			}
		}
	}

	const postsSubjectsCount = user.posts.reduce((acc, post) => {
		const { subjectId } = post

		return acc[subjectId]
			? { ...acc, [subjectId]: acc[subjectId] + 1 }
			: { ...acc, [subjectId]: 1 }
	}, {} as Record<string, number>)

	const answersSubjectsCount = user.answers.reduce((acc, answer) => {
		const { subjectId } = answer.post

		return acc[subjectId]
			? { ...acc, [subjectId]: acc[subjectId] + 1 }
			: { ...acc, [subjectId]: 1 }
	}, {} as Record<string, number>)

	const reactionsSubjectsCount = reactions.reduce((acc, reaction) => {
		const subjectId =
			reaction.answer?.post.subjectId ?? reaction.post?.subjectId

		if (!subjectId) return acc

		return acc[subjectId]
			? { ...acc, [subjectId]: acc[subjectId] + 1 }
			: { ...acc, [subjectId]: 1 }
	}, {} as Record<string, number>)

	return {
		props: {
			user,
			subjects,
			postsSubjectsCount,
			answersSubjectsCount,
			reactionsSubjectsCount
		}
	}
}

export default Profile
