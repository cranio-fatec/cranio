// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const postId = req.query.postId

	await Promise.all([
		postId && res.revalidate(`/posts/${postId}`),
		res.revalidate(`/dashboard`),
		res.revalidate(`/teachers`)
	])

	res.status(200).json({ revalidated: true })
}
