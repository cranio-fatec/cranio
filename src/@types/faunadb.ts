export interface FaunaDocument<T = Record<string, any>> {
  ref: {
    id: string
  }
  data: T
}
