import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../lib/prismadb'

export default async function subjectsRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const teachers = await getTeachersBySubject(req.query.id as string)

		return res.status(200).json(teachers)
	} else {
		res.setHeader('Allow', 'GET')
		res.status(405).end('Method not allowed')
	}
}

export async function getTeachersBySubject(id: string) {
	const teachersWithSubject = await prisma.user.findMany({
		where: {
			graduations: {
				some: {
					subjectId: id
				}
			}
		}
	})

	return teachersWithSubject
}
