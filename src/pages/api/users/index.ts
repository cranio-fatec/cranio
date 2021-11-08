import { hash } from 'bcryptjs'
import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { fauna } from '../../../services/fauna'

interface UserDTO {
  username: string
  email: string
  password?: string
  image?: string
  favoriteSubject?: string
  institution?: string
  graduations?: {
    level: string
    subject: string
    course: string
  }[]

  isGoogle?: boolean
}

export default async function subjects(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const user = await createUser(req.body)

      return res.status(200).json(user)
    } catch (err) {
      return res.status(400).json({ error: err.description })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}

export async function createUser(data: UserDTO): Promise<Record<string, any>> {
  if (data.password) {
    const hashedPassword = await hash(data.password, 8)
    data.password = hashedPassword
  } else {
    data.isGoogle = true
  }

  return fauna.query(
    q.If(
      q.Not(
        q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(data.email)))
      ),
      q.Create(q.Collection('users'), { data }),
      q.Abort('This e-mail already exists.')
    )
  )
}
