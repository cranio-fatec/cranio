// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	name: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	await new Promise<Record<any, any>>((resolve) => setTimeout(resolve, 1000))

	res.status(200).json({ name: 'John Doe' })
}
