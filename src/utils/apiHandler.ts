import type { NextApiRequest, NextApiResponse } from 'next'

import ApiError from './ApiError'

export const apiHandler = (
	handler: (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>
) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			await handler(req, res)
		} catch (err) {
			if (err instanceof ApiError) {
				return res.status(err.statusCode).json({
					status: 'error',
					message: err.message
				})
			}

			console.error(err)

			return res.status(500).json({
				status: 'error',
				message: 'Internal server error'
			})
		}
	}
}
