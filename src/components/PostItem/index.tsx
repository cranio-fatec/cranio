import React from 'react'
import { Link } from '../Link'
import UserAvatar from '../UserAvatar'
import { Content, UserInfo, Container } from './styles'

import { PostItemProps } from './types'

const PostItem: React.FC<PostItemProps> = ({ content, user, isOdd }) => {
  return (
    <Container isOdd={isOdd}>
      <UserInfo className="user-info">
        <Link href={`/profile/${content.userId}`}>
          <a>
            <UserAvatar user={user} />
            <span>{user.username}</span>
          </a>
        </Link>
      </UserInfo>
      <Content isTopic={!!content.title}>
        {content.title && <h4>{content.title}</h4>}
        <p>{content.body}</p>
      </Content>
    </Container>
  )
}

export default PostItem
