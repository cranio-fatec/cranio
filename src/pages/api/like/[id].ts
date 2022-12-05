import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

import { prisma } from '../../../lib/prismadb'
import { getAuthOptions } from '../auth/[...nextauth]'

export default async function postRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const answerId = req.query.id as string

		const session = await unstable_getServerSession(
			req,
			res,
			getAuthOptions(res)
		)

		if (!session?.user?.email) {
			return res.status(401).end()
		}

		const user = await prisma.user.findFirst({
			select: {
				id: true
			},
			where: {
				email: session.user.email
			}
		})

		if (!user) {
			return res.status(401).end()
		}

		const reaction = await prisma.reaction.create({
			data: {
				answerId,
				value: 1,
				userId: user.id
			}
		})

		return res.status(201).json(reaction)
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method not allowed')
	}
}
