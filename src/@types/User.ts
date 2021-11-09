import { User } from 'next-auth'

export interface Graduation {
  level: string
  subject: string
  area: string
}

export default interface CustomUser {
  id?: string
  email: string
  image: string
  username: string
  favoriteSubject?: string
  isGoogle?: boolean
  graduations?: Graduation[]
}

export interface UserWithAnswers extends CustomUser {
  answers: number
}
