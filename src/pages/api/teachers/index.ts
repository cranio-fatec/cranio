import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../lib/prismadb'

export default async function teachersRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const subjects = await getTeachers()

		return res.status(200).json(subjects)
	} else {
		res.setHeader('Allow', 'GET')
		res.status(405).end('Method not allowed')
	}
}

export async function getTeachers() {
	const teachers = await prisma.user.findMany({
		where: {
			graduations: {
				some: {}
			}
		}
	})

	return teachers
}
