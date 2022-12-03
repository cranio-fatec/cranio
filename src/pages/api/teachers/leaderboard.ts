import { NextApiRequest, NextApiResponse } from 'next'
import { lastDayOfMonth } from 'date-fns'
import { User } from '@prisma/client'

import { prisma } from '../../../lib/prismadb'

export type UserWithAnswers = User & { answers: number }

export default async function teachersRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const subjects = await getTeacherLeaderboard()

		return res.status(200).json(subjects)
	} else {
		res.setHeader('Allow', 'GET')
		res.status(405).end('Method not allowed')
	}
}

export async function getTeacherLeaderboard() {
	const firstDayOfMonth = new Date()
	firstDayOfMonth.setDate(1)

	const lastDayOfMonthDate = lastDayOfMonth(new Date())

	const answers = await prisma.answer.findMany({
		where: {
			createdAt: {
				lte: lastDayOfMonthDate,
				gte: firstDayOfMonth
			}
		},
		include: {
			author: {
				include: {
					graduations: true
				}
			}
		}
		// orderBy: {
		// 	createdAt: ''
		// }
	})

	const parsedData = answers.reduce((acc, answer) => {
		if (!answer.author.graduations.length) return acc

		const existingUser = acc.find(
			(searchUser) => searchUser.id === answer.authorId
		)

		if (existingUser) {
			existingUser.answers++
		} else {
			acc.push({ ...answer.author, answers: 1 })
		}

		return acc
	}, [] as UserWithAnswers[]) as UserWithAnswers[]

	return parsedData.sort((a, b) => a.answers - b.answers)
}

//
