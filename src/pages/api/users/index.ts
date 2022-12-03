import { hash } from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../lib/prismadb'

interface UserDTO {
	username: string
	email: string
	password?: string
	image?: string
	favoriteSubjectId?: string
	institution?: string
	graduations?: {
		level: any
		subjectId: string
		area: string
	}[]

	isGoogle?: boolean
}

export default async function subjects(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		try {
			const user = await createUser(req.body)

			return res.status(200).json(user)
		} catch (err: any) {
			return res.status(400).json({ error: err?.message })
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method not allowed')
	}
}

export async function createUser(data: UserDTO): Promise<Record<string, any>> {
	if (data.password) {
		const hashedPassword = await hash(data.password, 8)
		data.password = hashedPassword
	} else {
		data.isGoogle = true
	}

	const checkIfExists = await prisma.user.findFirst({
		where: {
			email: data.email
		}
	})

	if (checkIfExists) {
		throw new Error('This e-mail already exists.')
	}

	const { graduations, ...restData } = data

	const user = await prisma.user.create({
		data: {
			...restData,

			graduations: {
				createMany: {
					data: graduations ?? []
				}
			}
		}
	})

	return user
}
