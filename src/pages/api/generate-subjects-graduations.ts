import { query as q } from 'faunadb'
import { fauna } from '../../services/fauna'

export default async function teste(req, res) {
  const disciplines = [
    'Matemática',
    'Português',
    'História',
    'Geografia',
    'Biologia',
    'Química',
    'Filosofia',
    'Sociologia',
    'Física'
  ]
  const graduations = [
    'Análise e Desenvolvimento de Sistemas',
    'Segurança da Informação',
    'Comércio Exterior',
    'Jogos Digitais',
    'Direito',
    'Psicologia',
    'Ciência da Computação',
    'Engenharia da Computação',
    'Letras'
  ]

  for (const a of graduations) {
    await fauna.query(
      q.Create(q.Collection('graduations'), { data: { name: a } })
    )
  }
  for (const b of disciplines) {
    await fauna.query(q.Create(q.Collection('subjects'), { data: { name: b } }))
    await fauna.query(
      q.Create(q.Collection('graduations'), { data: { name: b } })
    )
  }

  return res.status(200).json({ ok: true })
}
