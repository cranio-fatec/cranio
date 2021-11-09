import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { FaunaDocument } from '../../../../@types/faunadb'
import { Post } from '../../../../@types/Post'
import CustomUser from '../../../../@types/User'
import { fauna } from '../../../../services/fauna'
import { parseFaunaDoc } from '../../../../styles/utils/parseFaunaDoc'

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
      const posts = await getPostsBySubjectId(req.query.id as string)

      return res.status(200).json(posts)
    } catch (err) {
      return res.status(400).json({ error: err.description })
    }
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
  }
}
export async function getPostsBySubjectId(id: string): Promise<Post[]> {
  const response = await fauna.query<{
    data: {
      post: FaunaDocument
      user: FaunaDocument
      subject: FaunaDocument
    }[]
  }>(
    q.Map(
      q.Paginate(q.Match(q.Index('posts_by_subjectId'), q.Casefold(id))),
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

  return response.data.map(({ post, subject, user }) => ({
    ...parseFaunaDoc(post),
    user: { ...parseFaunaDoc(user), password: null },
    subject: parseFaunaDoc(subject)
  })) as any[]
}
