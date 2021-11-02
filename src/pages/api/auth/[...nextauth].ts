import { query as q } from 'faunadb'

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { fauna } from '../../../services/fauna'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Providers.Credentials({
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
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      }
    })
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const { email } = user

      console.log(account.provider)
      if (account.provider === 'google') {
        try {
          // await fauna.query(
          //   q.If(
          //     q.Not(
          //       q.Exists(
          //         q.Match(q.Index('user_by_email'), q.Casefold(user.email))
          //       )
          //     ),
          //     q.Create(q.Collection('users'), { data: { email } }),
          //     q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.email)))
          //   )
          // )

          const userExists = await fauna.query(
            q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email)))
          )
          if (userExists) {
            return true
          }

          return '/signup'
        } catch (err) {
          console.log(err)
          return false
        }
      } else if (account.provider === undefined) {
        console.log(user)
        return false
      }

      return false
    }
  }
})
