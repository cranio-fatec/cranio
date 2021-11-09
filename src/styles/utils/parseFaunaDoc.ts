import { FaunaDocument } from '../../@types/faunadb'

interface ParsedFaunaDocument extends Record<string, any> {
  id: string
}

export const parseFaunaDoc = (doc: FaunaDocument): ParsedFaunaDocument => {
  return { ...doc.data, id: doc.ref.id }
}
