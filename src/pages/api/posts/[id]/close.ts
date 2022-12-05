import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

import { prisma } from '../../../../lib/prismadb'
import { getAuthOptions } from '../../auth/[...nextauth]'

export default async function postRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'PATCH') {
		const postId = req.query.id as string

		const session = await unstable_getServerSession(
			req,
			res,
			getAuthOptions(res)
		)

		if (!session?.user?.email) {
			return res.status(401).end()
		}

		// const user = await prisma.user.findFirst({
		// 	select: {
		// 		id: true
		// 	},
		// 	where: {
		// 		email: session.user.email
		// 	}
		// })

		// if (!user) {
		// 	return res.status(401).end()
		// }

		const postToUpdate = await prisma.post.findFirst({
			select: {
				closed: true,
				author: {
					select: {
						email: true
					}
				}
			},
			where: {
				id: postId
			}
		})

		if (postToUpdate?.author.email !== session.user.email) {
			return res
				.status(400)
				.json({ error: true, message: 'Only the author can close.' })
		}

		if (postToUpdate?.closed) {
			return res.status(400).json({ error: true, message: 'Already closed.' })
		}

		const [updatedPost] = await Promise.all([
			(prisma.post.update({
				where: {
					id: postId
				},
				data: {
					closed: true
				}
			}),
			res.revalidate(`/posts/${postId}`),
			res.revalidate(`/dashboard`))
		])

		return res.status(200).json(updatedPost)
	} else {
		res.setHeader('Allow', 'PATCH')
		res.status(405).end('Method not allowed')
	}
}
