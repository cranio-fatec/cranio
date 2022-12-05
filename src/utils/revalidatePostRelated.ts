import axios from 'axios'
import { NextApiResponse } from 'next'

export const revalidatePostRelated = (
	res: NextApiResponse,
	postId?: string
) => {
	const path = `/api/revalidate${postId ? `?postId=${postId}` : ''}`

	return axios.get(
		process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}${path}`
			: 'http://localhost:3000${path}'
	)
}
