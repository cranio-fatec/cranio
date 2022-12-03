import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../lib/prismadb'

export default async function postRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		try {
			const posts = await getPostsBySubjectId(req.query.id as string)

			return res.status(200).json(posts)
		} catch (err: any) {
			return res.status(400).json({ error: err.message })
		}
	} else {
		res.setHeader('Allow', 'GET')
		res.status(405).end('Method not allowed')
	}
}
export async function getPostsBySubjectId(id: string) {
	const posts = await prisma.post.findMany({
		where: {
			subjectId: id
		},
		include: {
			author: true,
			subject: true,
			answers: true
		}
	})

	return posts
}
