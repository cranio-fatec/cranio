import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import nookies from 'nookies'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'

import { prisma } from '../../../lib/prismadb'

export const getAuthOptions = (res: NextApiResponse): NextAuthOptions => ({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
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

					const { password, ...userWithoutPassword } = user

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
		async signIn({ user, account }) {
			const { email } = user

			if (account?.provider === 'google') {
				const userData = await prisma.user.count({
					where: {
						email: email ?? ''
					}
				})

				if (userData) {
					return true
				}

				nookies.set(
					{ res },
					`cranio.pendentGoogleSignupData`,
					JSON.stringify(user),
					{
						maxAge: 30 * 24 * 60 * 60,
						path: '/'
					}
				)

				return '/signup'
			} else if (account?.provider === 'credentials') {
				console.log('credentials', { user })
				return true
			}
			return false
		}
	}
})

export default function nextAuth(
	req: NextApiRequest,
	res: NextApiResponse
): void | Promise<void> {
	return NextAuth(req, res, getAuthOptions(res))
}
