import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import nookies from 'nookies'
import { compare } from 'bcryptjs'

import { fauna } from '../../../services/fauna'

export default function nextAuth(
  req: NextApiRequest,
  res: NextApiResponse
): void | Promise<void> {
  return NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
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
        async authorize(credentials, req) {
          const response = await fauna
            .query<{
              ref: { id: string }
              data: Record<string, any>
            }>(
              q.If(
                q.Exists(
                  q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(credentials.email)
                  )
                ),
                q.Get(
                  q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(credentials.email)
                  )
                ),
                q.Abort('Incorrect email/password combination.')
              )
            )
            .catch(err => {
              throw Error(err.description)
            })

          // const response = await fauna.query<{ data: Record<string, any> }>(
          //   q.Get(
          //     q.Map(
          //       q.Paginate(
          //         q.Join(
          //           q.Match(
          //             q.Index('spellbooks_by_owner'),
          //             q.Ref(q.Collection('characters'), '181388642114077184')
          //           ),
          //           q.Index('spells_by_spellbook')
          //         )
          //       ),
          //       q.Lambda('ref', q.Get(q.Var('ref')))
          //     )
          //   )
          // )

          const user = { ...response.data, id: response.ref.id } as Record<
            string,
            any
          >

          if (user) {
            if (!user.isGoogle) {
              const passwordMatched = await compare(
                credentials.password,
                user.password
              )

              if (!passwordMatched) {
                throw new Error('Incorrect email/password combination.')
              }
            } else if (credentials.password) {
              throw new Error('E-mail is registered with Google OAuth.')
            }

            delete user.password
            return user
          }
          throw new Error('Incorrect email/password combination.')
        }
      })
    ],

    callbacks: {
      async signIn({ user, account, profile }) {
        const { email } = user
        console.log('user, ', user)

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

            let isGoogle = false
            try {
              const { data: userData } = await fauna.query<{
                data: Record<string, any>
              }>(q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email))))

              console.log('userData', userData)
              isGoogle = userData && userData.isGoogle
            } catch {
              //
            }

            nookies.set(
              { res },
              `cranio.pendentGoogleSign${isGoogle ? 'in' : 'up'}Data`,
              JSON.stringify(user),
              {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
              }
            )

            return '/sign-redirect'
          } catch (err) {
            console.log(err)
            return false
          }
        } else if (account.provider === 'credentials') {
          console.log('credentials', user)
          return true
        }

        return false
      },
      jwt: async ({ token, user }) => {
        user && (token.user = user)
        return token
      },
      session: async ({ session, token }) => {
        session.user = token.user as any
        return session
      }
    }
  })
}
