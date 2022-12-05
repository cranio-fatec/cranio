import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../../lib/prismadb'

export type AnswerReactions = Record<
	string,
	{
		likes: number
		dislikes: number
	}
>

export type AnswerReactionsData = {
	summary: AnswerReactions
	reactions: Array<{ value: number; answerId: string; userId: string }>
}

export default async function answersRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		try {
			const post = await getReactions(req.query.id as string)

			return res.status(200).json(post)
		} catch (err: any) {
			return res.status(400).json({ error: err.message })
		}
	} else {
		res.setHeader('Allow', 'GET')
		res.status(405).end('Method not allowed')
	}
}

export async function getReactions(postId: string) {
	const reactions = await prisma.reaction.findMany({
		select: {
			value: true,
			answerId: true,
			userId: true
		},
		where: {
			answer: {
				postId
			}
		}
	})

	const parsedReactions = reactions.reduce((acc, reaction) => {
		if (!reaction.answerId) {
			return acc
		}

		const existingReaction = acc[reaction.answerId]

		if (!existingReaction) {
			return {
				...acc,
				[reaction.answerId]: {
					dislikes: reaction.value === -1 ? 1 : 0,
					likes: reaction.value === 1 ? 1 : 0
				}
			}
		}

		if (reaction.value === 1) existingReaction.likes++
		if (reaction.value === -1) existingReaction.dislikes++

		return acc
	}, {} as AnswerReactions)

	return { summary: parsedReactions, reactions }
}
