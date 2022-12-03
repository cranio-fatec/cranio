import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../lib/prismadb'

interface CreatePostDTO {
	title: string
	subjectId: string
	body: string
	authorId: string
}

export default async function postRoute(
	req: NextApiRequest,
	res: NextApiResponse
) {
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

			return res.status(200).json(post)
		} catch (err: any) {
			return res.status(400).json({ error: err.message })
		}
	} else {
		res.setHeader('Allow', 'GET, POST')
		res.status(405).end('Method not allowed')
	}
}
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
	const post = await prisma.post.create({
		data
	})

	return post
}
