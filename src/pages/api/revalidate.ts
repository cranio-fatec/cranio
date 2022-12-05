// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { revalidatePostRelated } from '../../utils/revalidatePostRelated'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const postId = req.query.postId as string | undefined

	await revalidatePostRelated(res, postId)

	res.status(200).json({ revalidated: true })
}
