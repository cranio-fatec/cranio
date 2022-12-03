// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

type PrismaUser = import('@prisma/client').User

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */

	interface Session {
		user: PrismaUser
	}
}
