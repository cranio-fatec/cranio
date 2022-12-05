import { prisma } from '../../../lib/prismadb'
import { handler } from '../../../utils/handler'
import { revalidatePostRelated } from '../../../utils/revalidatePostRelated'
import { BODY_MAX_LENGTH, POST_TITLE_MAX_LENGTH } from '../../posts/new'
import ApiError from '../../../utils/ApiError'

interface CreatePostDTO {
	title: string
	subjectId: string
	body: string
	authorId: string
}

export default handler
	.get(async (req, res) => {
		const posts = await getPosts(
			req.query.limit ? Number(req.query.limit) : undefined
		)

		return res.status(200).json(posts)
	})
	.post(async (req, res) => {
		const post = await createPost(req.body)

		await revalidatePostRelated(res, post.id)

		return res.status(200).json(post)
	})

export async function getPosts(limit?: number) {
	const posts = await prisma.post.findMany({
		include: {
			author: true,
			answers: true,
			subject: true
		},
		orderBy: {
			createdAt: 'desc'
		},
		take: !!limit ? limit : undefined
	})

	return posts
}

export async function createPost(data: CreatePostDTO) {
	if (data.title.length > POST_TITLE_MAX_LENGTH) {
		throw new ApiError('Max title length reached.')
	}
	if (data.body.length > BODY_MAX_LENGTH) {
		throw new ApiError('Max body length reached.')
	}

	const post = await prisma.post.create({
		data
	})

	return post
}
