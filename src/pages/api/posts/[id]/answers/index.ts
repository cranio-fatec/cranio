import { prisma } from '../../../../../lib/prismadb'
import ApiError from '../../../../../utils/ApiError'
import { handler } from '../../../../../utils/handler'
import { revalidatePostRelated } from '../../../../../utils/revalidatePostRelated'
import { BODY_MAX_LENGTH } from '../../../../posts/new'

interface CreateAnswerDTO {
	postId: string
	body: string
	authorId: string
}

export default handler
	.get(async (req, res) => {
		const post = await getAnswers(req.query.id as string)

		return res.status(200).json(post)
	})
	.post(async (req, res) => {
		const [answer] = await Promise.all([
			createAnswer({ ...req.body }),
			revalidatePostRelated(res, req.query.id as string)
		])
		return res.status(200).json(answer)
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
