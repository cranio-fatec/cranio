import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

// import { Container } from './styles';

interface UserAvatarProps {
	user: User
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
	const nameArr = (user.username ?? user.name ?? '').split('/')[0].split(' ')
	const acronym =
		nameArr.length > 1
			? `${nameArr[0][0]}${nameArr[1][0]}`.toUpperCase()
			: `${nameArr[0][0]}${nameArr[0][1]}`.toUpperCase()

	return (
		<div className="icon-container">
			{user.image ? (
				<Image src={user.image} alt={acronym} crossOrigin="anonymous" fill />
			) : (
				acronym
			)}
		</div>
	)
}

export default UserAvatar
