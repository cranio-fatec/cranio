import { User } from '@prisma/client'
import Image from 'next/image'
import React, { useMemo } from 'react'

// import { Container } from './styles';

interface UserAvatarProps {
	user: User
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
	const acronym = useMemo(() => {
		const nomecompleto = (user.name ?? user.username ?? '').replace(
			/\s(de|da|do|dos|das)\s/g,
			' '
		) // Remove os de,da, dos,das.
		const iniciais = nomecompleto.match(/\b(\w)/gi) ?? [] // Iniciais de cada parte do nome.
		// const nome = nomecompleto.split(' ')[0].toLowerCase() // Primeiro nome.
		// const sobrenomes = iniciais
		// 	.splice(1, iniciais.length - 1)
		// 	.join('')
		// 	.toLowerCase() // Iniciais

		return iniciais.join('')
	}, [user.name, user.username])

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
