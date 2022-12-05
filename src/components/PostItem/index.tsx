import React, { useCallback, useMemo } from 'react'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'

import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'
import theme from '../../styles/theme'
import { Link } from '../Link'
import UserAvatar from '../UserAvatar'
import * as S from './styles'
import { PostItemProps } from './types'

const PostItem: React.FC<PostItemProps> = ({
	content,
	isOdd,
	reactions,
	mutateReactions
}) => {
	const { user } = useAuth()

	const status = useMemo(() => {
		if (!user || !reactions) return

		const reaction = reactions.find(
			(reaction) =>
				content.id === reaction.answerId && reaction.userId === user.id
		)

		if (!reaction) return

		return reaction.value === -1
			? 'dislike'
			: reaction.value === 1
			? 'like'
			: undefined
	}, [content.id, reactions, user])

	const handleLike = useCallback(async () => {
		await api.post(`/like/${content.id}`)

		mutateReactions?.()
	}, [content.id, mutateReactions])

	const handleDislike = useCallback(async () => {
		await api.post(`/dislike/${content.id}`)

		mutateReactions?.()
	}, [content.id, mutateReactions])

	return (
		<S.Container isOdd={isOdd} isLoading={content.loading}>
			<S.UserInfo className="user-info">
				<Link href={`/profile/${content.authorId}`}>
					<UserAvatar user={content.author} />
					<span>{content.author.username ?? content.author.name}</span>
				</Link>
				<S.ReactionsWrapper
					hidden={!!content.title || (!!user && user.id === content.authorId)}
				>
					<button
						type="button"
						disabled={!user || !!status}
						onClick={handleDislike}
					>
						<FiThumbsDown
							size={20}
							color={theme.colors.red}
							fill={status === 'dislike' ? theme.colors.red : 'none'}
						/>
					</button>
					<button
						type="button"
						disabled={!user || !!status}
						onClick={handleLike}
					>
						<FiThumbsUp
							size={20}
							color={theme.colors.green}
							fill={status === 'like' ? theme.colors.green : 'none'}
						/>
					</button>
				</S.ReactionsWrapper>
			</S.UserInfo>
			<S.Content isTopic={!!content.title}>
				{content.title && <h4>{content.title}</h4>}
				<p>{content.body}</p>
			</S.Content>
		</S.Container>
	)
}

export default PostItem
