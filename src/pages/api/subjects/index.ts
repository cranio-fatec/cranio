import { query as q, Ref } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { fauna } from '../../../services/fauna'

export default async function subjects(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const subjects = await getSubjects()

    return res.status(200).json(subjects)
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
  }
}

export async function getSubjects(): Promise<any[]> {
  const { data } = await fauna.query<{ data: any[] }>(
    q.Map(
      q.Paginate(q.Documents(q.Collection('subjects'))),
      q.Lambda(x => q.Get(x))
    )
  )
  return data.map(doc => ({ id: doc.ref.id, name: doc.data.name }))
}
export async function teste(): Promise<any[]> {
  const { data } = await fauna.query<{ data: any[] }>(
    q.Map(
      q.Filter(
        q.Paginate(q.Documents(q.Collection('users'))),
        q.Lambda(x => q.ContainsPath('graduations', q.Select('data', q.Get(x))))
      ),
      q.Lambda(x => q.Get(x))
    )
  )
  return data.map(doc => ({ id: doc.ref.id, name: doc.data.name }))
}
