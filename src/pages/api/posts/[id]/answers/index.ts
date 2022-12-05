import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../../lib/prismadb'
import { revalidatePostRelated } from '../../../../../utils/revalidatePostRelated'

interface CreateAnswerDTO {
	postId: string
	body: string
	authorId: string
}

export default async function answersRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		try {
			const post = await getAnswers(req.query.id as string)

			return res.status(200).json(post)
		} catch (err: any) {
			return res.status(400).json({ error: err.message })
		}
	} else if (req.method === 'POST') {
		try {
			const [answer] = await Promise.all([
				createAnswer({ ...req.body }),
				revalidatePostRelated(res, req.query.id as string)
			])

			return res.status(200).json(answer)
		} catch (err: any) {
			return res.status(400).json({ error: err.message })
		}
	} else {
		res.setHeader('Allow', 'GET, POST')
		res.status(405).end('Method not allowed')
	}
}

export async function getAnswers(postId: string) {
	const answers = await prisma.answer.findMany({
		where: {
			postId
		},
		include: {
			author: true
		}
	})

	return answers
}

export async function createAnswer(data: CreateAnswerDTO) {
	const answer = await prisma.answer.create({
		data,
		include: {
			reactions: true,
			author: true
		}
	})

	return answer
}
