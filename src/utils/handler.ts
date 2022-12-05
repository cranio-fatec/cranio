import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import ApiError from './ApiError'

const originalHandler = () => {
	const router = createRouter<NextApiRequest, NextApiResponse>()

	const handler = router.handler.bind(router)
	// rewrite router.handler so that when you call it, it is called with the options
	router.handler = () =>
		handler({
			onError: (err, req, res) => {
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
		})
	return router
}

export const handler = originalHandler()
