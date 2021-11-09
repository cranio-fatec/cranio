import { query as q, Ref } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { FaunaDocument } from '../../../../@types/faunadb'
import { Post } from '../../../../@types/Post'
import CustomUser from '../../../../@types/User'
import { fauna } from '../../../../services/fauna'

export default async function postRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const post = await getPostById(req.query.id as string)

    return res.status(200).json(post)
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
  }
}

export async function getPostById(id: string): Promise<Post> {
  const response = await fauna.query<{
    post: FaunaDocument<Omit<Post, 'id'>>
    user: FaunaDocument<Omit<CustomUser, 'id'>>
  }>(
    q.Let(
      {
        post: q.Get(q.Ref(q.Collection('posts'), id)),
        user: q.Get(
          q.Ref(
            q.Collection('users'),
            q.Select(['data', 'userId'], q.Var('post'))
          )
        )
      },
      {
        post: q.Var('post'),
        user: q.Var('user')
      }
    )
  )

  return {
    ...response.post.data,
    id: response.post.ref.id,
    user: response.user.data
  }
}
