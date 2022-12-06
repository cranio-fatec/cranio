import { hash } from 'bcryptjs'

import { prisma } from '../../../lib/prismadb'
import { apiHandler } from '../../../utils/apiHandler'

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

export default apiHandler(async (req, res) => {
	if (req.method === 'GET') {
		return res.status(200).json({})
	} else if (req.method === 'POST') {
		try {
			const user = await createUser(req.body)

			return res.status(200).json(user)
		} catch (err: any) {
			return res.status(400).json({ error: err?.message })
		}
	} else {
		res.setHeader('Allow', 'GET, POST')
		res.status(405).end('Method not allowed')
	}
})

export async function createUser(data: UserDTO): Promise<Record<string, any>> {
	if (data.password) {
		const hashedPassword = await hash(data.password, 8)
		data.password = hashedPassword
	} else {
		data.isGoogle = true
	}

	if (data.image) {
		data.image = data.image.replace('=s96-', '=')
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
	const userType = graduations?.length ? 'TEACHER' : 'STUDENT'

	const finalData = {
		...restData,
		type: userType,

		graduations: {
			createMany: {
				data: graduations ?? []
			}
		}
	} as const

	const user = await prisma.user.create({
		data: finalData
	})

	return user
}
