import { Post, Subject, User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../lib/prismadb'

export type PostWithAuthorSubject = Post & { author: User; subject: Subject }

export default async function postRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		try {
			const posts = await prisma.post.findMany({
				where: {
					closed: false
				},
				include: {
					author: true,
					subject: true
				},
				orderBy: {
					createdAt: 'desc'
				},
				take: 3
			})

			return res.status(200).json(posts)
		} catch (err: any) {
			return res.status(400).json({ error: err.message })
		}
	} else {
		res.setHeader('Allow', 'GET')
		res.status(405).end('Method not allowed')
	}
}
