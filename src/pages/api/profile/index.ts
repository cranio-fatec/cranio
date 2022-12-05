import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

import { prisma } from '../../../lib/prismadb'
import { getAuthOptions } from '../auth/[...nextauth]'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await unstable_getServerSession(req, res, getAuthOptions(res))

	if (!session?.user?.email) {
		return res.status(401).end()
	}

	const user = await prisma.user.findFirst({
		where: {
			email: session.user.email
		},
		include: {
			// favoriteSubject: true,
			graduations: true
		}
	})

	res.json(user)
}

export default handler
