import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { format } from 'date-fns'
import { FaunaDocument } from '../../../@types/faunadb'
import { Post } from '../../../@types/Post'
import { fauna } from '../../../services/fauna'
import { parseFaunaDoc } from '../../../styles/utils/parseFaunaDoc'
import { UserWithAnswers } from '../../../@types/User'

export default async function teachersRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const subjects = await getTeacherLeaderboard()

    return res.status(200).json(subjects)
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
  }
}

export async function getTeacherLeaderboard(): Promise<UserWithAnswers[]> {
  const firstDayOfMonth = format(new Date(), "yyyy-MM-'01'")

  const response = await fauna.query<{
    data: {
      answer: FaunaDocument
      user: FaunaDocument
    }[]
  }>(
    q.Map(
      q.Paginate(
        q.Range(
          q.Match(q.Index('answers_by_created_date_range')),
          q.Date(firstDayOfMonth),
          q.ToDate(q.Now())
        )
      ),
      q.Lambda(
        'answerArr',
        q.Let(
          {
            answer: q.Get(q.Select(1, q.Var('answerArr'))),
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

  const formattedData = response.data.map(({ answer, user }) => ({
    ...parseFaunaDoc(answer),
    user: parseFaunaDoc(user)
  })) as Post[]

  const parsedData = formattedData.reduce((acc, answer) => {
    if (!answer.user.graduations) return acc

    const existingUser = acc.find(searchUser => searchUser.id === answer.userId)

    if (existingUser) {
      existingUser.answers++
    } else {
      acc.push({ ...answer.user, answers: 1 })
    }

    return acc
  }, [] as UserWithAnswers[]) as UserWithAnswers[]

  return parsedData.sort((a, b) => a.answers - b.answers)
}

//
