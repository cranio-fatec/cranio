import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { FaunaDocument } from '../../../../../@types/faunadb'
import { Post } from '../../../../../@types/Post'
import CustomUser from '../../../../../@types/User'
import { fauna } from '../../../../../services/fauna'

interface AnswerDTO {
  postId: string
  body: string
  userId: string
  likes: number
  dislikes: number
}

interface Answer extends AnswerDTO {
  id: string
  user: CustomUser
}

export default async function answersRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const post = await getAnswers(req.query.id as string)

      return res.status(200).json(post)
    } catch (err) {
      return res.status(400).json({ error: err.description })
    }
  } else if (req.method === 'POST') {
    try {
      const post = await createAnswer({ ...req.body, dislikes: 0, likes: 0 })

      return res.status(200).json(post)
    } catch (err) {
      return res.status(400).json({ error: err.description })
    }
  } else {
    res.setHeader('Allow', 'GET, POST')
    res.status(405).end('Method not allowed')
  }
}

export async function getAnswers(postId: string): Promise<Answer[]> {
  const response = await fauna.query<{
    data: {
      answer: FaunaDocument<Omit<AnswerDTO, 'id'>>
      user: FaunaDocument<Omit<CustomUser, 'id'>>
    }[]
  }>(
    q.Map(
      q.Paginate(q.Match(q.Index('answers_by_postId'), q.Casefold(postId))),
      q.Lambda(
        'answerRef',
        q.Let(
          {
            answer: q.Get(q.Var('answerRef')),
            user: q.Get(
              q.Ref(
                q.Collection('users'),
                q.Select(['data', 'userId'], q.Var('answer'))
              )
            )
          },
          {
            answer: q.Var('answer'),
            user: q.Var('user')
          }
        )
      )
    )
  )

  return response.data.map(({ answer, user }) => ({
    ...answer.data,
    id: answer.ref.id,
    user: user.data
  }))
}

export async function createAnswer(data: AnswerDTO): Promise<Answer> {
  // const answer = await fauna.query<FaunaDocument<AnswerDTO>>(

  // )

  const { answer, user } = await fauna.query<{
    answer: FaunaDocument<Omit<AnswerDTO, 'id'>>
    user: FaunaDocument<Omit<CustomUser, 'id'>>
  }>(
    q.Let(
      {
        answer: q.Create(q.Collection('answers'), {
          data: { ...data, createdAt: q.ToString(q.Now()) }
        }),
        user: q.Get(
          q.Ref(
            q.Collection('users'),
            q.Select(['data', 'userId'], q.Var('answer'))
          )
        )
      },
      {
        answer: q.Var('answer'),
        user: q.Var('user')
      }
    )
  )
  return {
    ...answer.data,
    id: answer.ref.id,
    user: { ...user.data, id: user.ref.id }
  }
}
