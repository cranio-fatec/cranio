import { prisma } from '../../../../../lib/prismadb'
import ApiError from '../../../../../utils/ApiError'
import { apiHandler } from '../../../../../utils/apiHandler'
import { revalidatePostRelated } from '../../../../../utils/revalidatePostRelated'
import { BODY_MAX_LENGTH } from '../../../../posts/new'

interface CreateAnswerDTO {
	postId: string
	body: string
	authorId: string
}

export default apiHandler(async (req, res) => {
	if (req.method === 'GET') {
		try {
			const post = await getAnswers(req.query.id as string)

			return res.status(200).json(post)
		} catch (err: any) {
			return res.status(400).json({ error: err.message })
		}
	} else if (req.method === 'POST') {
		try {
			const [answer] = await Promise.all([
				createAnswer({ ...req.body }),
				revalidatePostRelated(res, req.query.id as string)
			])

			return res.status(200).json(answer)
		} catch (err: any) {
			return res.status(400).json({ error: err.message })
		}
	} else {
		res.setHeader('Allow', 'GET, POST')
		res.status(405).end('Method not allowed')
	}
})

export async function getAnswers(postId: string) {
	const answers = await prisma.answer.findMany({
		where: {
			postId
		},
		include: {
			author: true
		}
	})

	return answers
}

export async function createAnswer(data: CreateAnswerDTO) {
	if (data.body.length > BODY_MAX_LENGTH) {
		throw new ApiError('Max body length reached.')
	}

	const answer = await prisma.answer.create({
		data,
		include: {
			author: true
		}
	})

	return answer
}
