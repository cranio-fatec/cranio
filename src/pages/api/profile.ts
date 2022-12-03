import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const session = getSession({ req })

	res.json({ session })
}

export default handler
