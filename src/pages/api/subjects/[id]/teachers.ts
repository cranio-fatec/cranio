import { query as q, Ref } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import CustomUser from '../../../../@types/User'
import { fauna } from '../../../../services/fauna'
import { getTeachers } from '../../teachers'

export default async function subjectsRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const teachers = await getTeachersBySubject(req.query.id as string)

    return res.status(200).json(teachers)
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
  }
}

export async function getTeachersBySubject(id: string): Promise<CustomUser[]> {
  const teachers = await getTeachers()
  return teachers.filter(teacher =>
    teacher.graduations.some(graduation => graduation.subject === id)
  )
}
