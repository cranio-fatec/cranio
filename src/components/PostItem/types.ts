import { Post } from '../../@types/Post'
import CustomUser from '../../@types/User'

interface Answer extends Omit<Post, 'title'> {
  title?: string
}

export interface PostItemProps {
  user: CustomUser
  content: Answer
  isOdd: boolean
}

export interface ContainerStyleProps {
  isOdd: boolean
}

export interface ContentStyleProps {
  isTopic?: boolean
}
