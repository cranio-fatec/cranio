import CustomUser from './User'

export interface Post {
  title: string
  subjectId: string
  subject?: Subject
  body: string
  userId: string
  id: string
  user: CustomUser
  createdAt: string
  closed?: boolean
}

export interface Subject {
  id: string
  name: string
}
