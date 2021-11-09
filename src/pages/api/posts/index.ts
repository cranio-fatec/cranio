import { userInfo } from 'os'
import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseISO } from 'date-fns'
import { FaunaDocument } from '../../../@types/faunadb'
import { Post } from '../../../@types/Post'
import CustomUser from '../../../@types/User'
import { fauna } from '../../../services/fauna'
import { parseFaunaDoc } from '../../../styles/utils/parseFaunaDoc'

interface PostDTO {
  title: string
  subjectId: string
  body: string
  userId: string
}

export default async function postRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const posts = await getPosts(
        req.query.limit ? Number(req.query.limit) : undefined
      )

      return res.status(200).json(posts)
    } catch (err) {
      return res.status(400).json({ error: err.description })
    }
  } else if (req.method === 'POST') {
    try {
      const post = await createPost(req.body)

      return res.status(200).json(post)
    } catch (err) {
      return res.status(400).json({ error: err.description })
    }
  } else {
    res.setHeader('Allow', 'GET, POST')
    res.status(405).end('Method not allowed')
  }
}
export async function getPosts(limit?: number): Promise<Post[]> {
  const response = await fauna.query<{
    data: {
      post: FaunaDocument
      user: FaunaDocument
      subject: FaunaDocument
    }[]
  }>(
    q.Map(
      q.Paginate(q.Documents(q.Collection('posts')), { size: limit }),
      q.Lambda(
        'postRef',
        q.Let(
          {
            post: q.Get(q.Var('postRef')),
            user: q.Get(
              q.Ref(
                q.Collection('users'),
                q.Select(['data', 'userId'], q.Var('post'))
              )
            ),
            subject: q.Get(
              q.Ref(
                q.Collection('subjects'),
                q.Select(['data', 'subjectId'], q.Var('post'))
              )
            )
          },
          {
            post: q.Var('post'),
            user: q.Var('user'),
            subject: q.Var('subject')
          }
        )
      )
    )
  )

  return response.data
    .map(({ post, subject, user }) => ({
      ...parseFaunaDoc(post),
      user: { ...parseFaunaDoc(user), password: null },
      subject: parseFaunaDoc(subject)
    }))
    .sort(
      (a: any, b: any) =>
        parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime()
    ) as any[]
}

export async function createPost(data: PostDTO): Promise<Record<string, any>> {
  return fauna.query(
    q.Create(q.Collection('posts'), {
      data: { ...data, createdAt: q.ToString(q.Now()) }
    })
  )
}
