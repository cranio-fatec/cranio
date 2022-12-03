import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
// import nookies from 'nookies'
import { compare } from 'bcryptjs'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { prisma } from '../../../lib/prismadb'

export default function nextAuth(
	req: NextApiRequest,
	res: NextApiResponse
): void | Promise<void> {
	return NextAuth(req, res, {
		adapter: {
			...PrismaAdapter(prisma)
			// createUser(data) {
			// 	return prisma.user.create({ data: { ...data, isGoogle: !!data.image } })
			// }
		},
		providers: [
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT_ID ?? '',
				clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
				// profile: (profile) => {
				// 	const { email, name, picture } = profile

				// 	return {
				// 		email,
				// 		name,
				// 		image: picture,
				// 		id: profile.sub,
				// 		teste: 'offfasdasda'
				// 	}
				// }
			}),
			CredentialsProvider({
				// The name to display on the sign in form (e.g. 'Sign in with...')
				name: 'Crânio',
				// The credentials is used to generate a suitable form on the sign in page.
				// You can specify whatever fields you are expecting to be submitted.
				// e.g. domain, username, password, 2FA token, etc.
				// You can pass any HTML attribute to the <input> tag through the object.
				credentials: {
					email: {
						label: 'E-mail',
						type: 'text',
						placeholder: 'Digite seu e-mail...'
					},
					password: {
						label: 'Senha',
						type: 'password',
						placeholder: 'Digite sua senha...'
					}
				},
				async authorize(credentials) {
					const user = await prisma.user.findFirst({
						where: {
							email: credentials?.email
						},
						include: {
							graduations: true
						}
					})
					console.log('authorize')

					if (user) {
						if (!user.isGoogle) {
							const passwordMatched = await compare(
								credentials?.password ?? '',
								user.password ?? ''
							)

							if (!passwordMatched) {
								throw new Error('Incorrect email/password combination.')
							}
						} else if (credentials?.password) {
							throw new Error('E-mail is registered with Google OAuth.')
						}

						const {
							password: _,
							createdAt,
							updatedAt,
							graduations,
							...userWithoutPassword
						} = user

						return userWithoutPassword
					}
					throw new Error('Incorrect email/password combination.')
				}
			})
		],

		// callbacks: {
		// 	session({ session, token, user }) {
		// 		console.log({ session, token, user })

		// 		return { ...session, teste: '123' } // The return type will match the one returned in `useSession()`
		// 	}
		// }

		callbacks: {
			// async signIn({ user, account }) {
			// 	const { email } = user
			// 	console.log({ user })
			// 	if (account?.provider === 'google') {
			// 		try {
			// 			// await fauna.query(
			// 			//   q.If(
			// 			//     q.Not(
			// 			//       q.Exists(
			// 			//         q.Match(q.Index('user_by_email'), q.Casefold(user.email))
			// 			//       )
			// 			//     ),
			// 			//     q.Create(q.Collection('users'), { data: { email } }),
			// 			//     q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.email)))
			// 			//   )
			// 			// )
			// 			let isGoogle = false
			// 			try {
			// 				const userData = await prisma.user.findFirst({
			// 					where: {
			// 						email: email ?? ''
			// 					}
			// 				})
			// 				console.log('userData', userData)
			// 				isGoogle = !!userData && userData.isGoogle
			// 			} catch {
			// 				console.log('não')
			// 			}
			// 			nookies.set(
			// 				{ res },
			// 				`cranio.pendentGoogleSign${isGoogle ? 'in' : 'up'}Data`,
			// 				JSON.stringify(user),
			// 				{
			// 					maxAge: 30 * 24 * 60 * 60,
			// 					path: '/'
			// 				}
			// 			)
			// 			return '/sign-redirect'
			// 		} catch (err) {
			// 			console.log(err)
			// 			return false
			// 		}
			// 	} else if (account?.provider === 'credentials') {
			// 		console.log('credentials', { user })
			// 		return true
			// 	}
			// 	return false
			// }
			// jwt: async ({ token, user }) => {
			// 	if (user) {
			// 		token.user = user
			// 		token.accessToken = user.id
			// 	}
			// 	console.log('jwt')
			// 	return token
			// },
			// session: async ({ session, token }) => {
			// 	console.log('session', { session, token })
			// 	session.user = token.user as any
			// 	return session
			// }
		}
	})
}
