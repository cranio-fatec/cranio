import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

import { prisma } from '../../../lib/prismadb'
import { getAuthOptions } from '../auth/[...nextauth]'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, getAuthOptions(res))

	if (!session?.user?.email) {
		return res.status(401).end()
	}

	const subject = req.query.subject as string | undefined

	const posts = await prisma.post.findMany({
		where: {
			author: {
				email: session.user.email
			},
			subject: subject
				? {
						id: subject
				  }
				: undefined
		},
		include: {
			author: true,
			subject: true,
			answers: true
		}
	})

	res.json(posts)
}

export default handler