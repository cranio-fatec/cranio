import { prisma } from '../../../lib/prismadb'
import ApiError from '../../../utils/ApiError'
import { apiHandler } from '../../../utils/apiHandler'
import { revalidatePostRelated } from '../../../utils/revalidatePostRelated'
import { BODY_MAX_LENGTH, POST_TITLE_MAX_LENGTH } from '../../posts/new'

interface CreatePostDTO {
	title: string
	subjectId: string
	body: string
	authorId: string
}

export default apiHandler(async (req, res) => {
	if (req.method === 'GET') {
		try {
			const posts = await getPosts(
				req.query.limit ? Number(req.query.limit) : undefined
			)

			return res.status(200).json(posts)
		} catch (err: any) {
			return res.status(400).json({ error: err.message })
		}
	} else if (req.method === 'POST') {
		try {
			const post = await createPost(req.body)

			await revalidatePostRelated(res, post.id)

			return res.status(200).json(post)
		} catch (err: any) {
			return res.status(400).json({ error: err.message })
		}
	} else {
		res.setHeader('Allow', 'GET, POST')
		res.status(405).end('Method not allowed')
	}
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
