import React, { forwardRef } from 'react'
import { FaUser, FaUserCog } from 'react-icons/fa'
import { IoMdDocument } from 'react-icons/io'
import { MdLogout } from 'react-icons/md'
import { signOut } from 'next-auth/react'

import { Link } from '../Link'
import { Container } from './styles'
import { ProfilePopoutProps } from './types'

const ProfilePopout = ({ isOpen }: ProfilePopoutProps, ref: any) => {
	const size = 24

	return (
		<Container isOpen={isOpen} ref={ref}>
			<nav>
				<ul>
					<li>
						<Link href="/profile">
							<FaUser size={size} />
							Meu perfil
						</Link>
					</li>
					<li>
						{/* <Link href="/settings"> */}
						<Link href="/profile">
							<FaUserCog size={size} />
							Configurações
						</Link>
					</li>
					<li>
						<Link href="/profile/posts">
							<IoMdDocument size={size} /> Minhas postagens
						</Link>
					</li>
					<li onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
						<MdLogout size={size} />
						Sair da conta
					</li>
				</ul>
			</nav>
		</Container>
	)
}

export default forwardRef(ProfilePopout)
