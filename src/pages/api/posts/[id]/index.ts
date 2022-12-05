import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../lib/prismadb'

export default async function postRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const post = await getPostById(req.query.id as string)

		return res.status(200).json(post)
	} else {
		res.setHeader('Allow', 'GET')
		res.status(405).end('Method not allowed')
	}
}

export async function getPostById(id: string) {
	const post = await prisma.post.findFirst({
		where: {
			id
		},
		include: {
			author: true,
			subject: true,
			answers: {
				include: {
					author: true
				}
			}
		}
	})

	return post
}
