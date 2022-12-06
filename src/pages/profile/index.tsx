import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import React from 'react'
import { Subject } from '@prisma/client'
import { NextSeo } from 'next-seo'

import { prisma } from '../../lib/prismadb'
import { getAuthOptions } from '../api/auth/[...nextauth]'
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
			<NextSeo title="Meu perfil" noindex nofollow />
			<S.Container>
				<S.Content>
					<ProfileContent {...props} />
				</S.Content>
			</S.Container>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await unstable_getServerSession(req, res, getAuthOptions(res))

	if (!session?.user?.email) {
		return {
			props: {},
			redirect: {
				destination: '/dashboard'
			}
		}
	}

	const userPromise = prisma.user.findFirst({
		where: {
			email: session.user.email
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
						author: {
							email: {
								not: session.user.email
							}
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
						author: {
							email: session.user.email
						}
					}
				},
				{
					answer: {
						author: {
							email: session.user.email
						}
					},
					post: {
						author: {
							email: {
								not: session.user.email
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
