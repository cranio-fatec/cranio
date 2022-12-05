import React from 'react'

import { Link } from '../Link'
import UserAvatar from '../UserAvatar'
import { Content, UserInfo, Container } from './styles'
import { PostItemProps } from './types'

const PostItem: React.FC<PostItemProps> = ({ content, isOdd }) => {
	return (
		<Container isOdd={isOdd} isLoading={content.loading}>
			<UserInfo className="user-info">
				<Link href={`/profile/${content.authorId}`}>
					<UserAvatar user={content.author} />
					<span>{content.author.username ?? content.author.name}</span>
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
