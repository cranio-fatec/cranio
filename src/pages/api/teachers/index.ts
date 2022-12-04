import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../lib/prismadb'

export default async function teachersRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const pageNumber = Number(req.query.page)
		const teachers = await getTeachers(
			isNaN(pageNumber) ? undefined : pageNumber,
			req.query.subject as string | undefined
		)

		return res.status(200).json(teachers)
	} else {
		res.setHeader('Allow', 'GET')
		res.status(405).end('Method not allowed')
	}
}

export async function getTeachers(page?: number, subject?: string) {
	const teachers = await prisma.user.findMany({
		where: {
			graduations: {
				some: subject ? { subjectId: subject } : {}
			}
		},

		include: {
			graduations: true
		},

		take: page !== undefined ? 6 : undefined,
		skip: page !== undefined ? (page - 1) * 6 : undefined,

		orderBy: { answers: { _count: 'desc' } }
	})

	return teachers
}
