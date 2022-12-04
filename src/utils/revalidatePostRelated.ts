import { NextApiResponse } from 'next'

export const revalidatePostRelated = (res: NextApiResponse, postId?: string) =>
	Promise.all([
		postId && res.revalidate(`/posts/${postId}`),
		res.revalidate(`/dashboard`),
		res.revalidate(`/teachers`)
	])
