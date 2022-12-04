import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'

import { useAuth } from '../../hooks/auth'
import useOutsideClick from '../../hooks/useOutsideClick'
import Button from '../Button'
import Input from '../Input'
import { Link } from '../Link'
import ProfilePopout from '../ProfilePopout'
import { SignInButton } from '../SignInButton'
import UserAvatar from '../UserAvatar'
import {
	ButtonsContainer,
	Container,
	Content,
	UserDataContainer,
	UserDataContent
} from './styles'

const Header = () => {
	const profilePopoutRef = useRef<any>(null)
	const questionInputRef = useRef<HTMLInputElement>(null)
	const [isProfilePopoutOpen, setIsProfilePopoutOpen] = useState(false)
	const { user } = useAuth()
	const router = useRouter()

	// useEffect(() => {
	// 	if (
	// 		session &&
	// 		!session.user.type &&
	// 		!window?.location.pathname.includes('signup')
	// 	) {
	// 		// sessionStorage?.setItem('@Cranio:redirecting', 'true')
	// 		router.push('/signup').then(() => {
	// 			// setInterval(
	// 			// 	() => sessionStorage?.removeItem('@Cranio:redirecting'),
	// 			// 	2000
	// 			// )
	// 		})
	// 	}
	// }, [session, router])

	const fullName = useMemo(() => {
		const nameArr = user
			? (user.username ?? user.name ?? '').split('/')[0].split(' ')
			: []

		return user
			? nameArr.length > 1
				? `${nameArr[0]} ${nameArr[1]}`
				: `${nameArr[0]}`
			: ''
	}, [user])

	useOutsideClick(profilePopoutRef, () => {
		if (isProfilePopoutOpen) {
			setIsProfilePopoutOpen(false)
		}
	})

	const handleAsk = useCallback(
		async (e?: React.FormEvent) => {
			e?.preventDefault()
			router.push(
				`/posts/new?question=${questionInputRef.current?.value}`,
				'/posts/new'
			)
			questionInputRef.current && (questionInputRef.current.value = '')
		},
		[router]
	)

	return (
		<Container>
			<Content>
				<Link href="/">
					<Image
						src="/cranio.png"
						alt="Crânio Logo"
						width={171}
						height={83}
						priority
					/>
				</Link>
				<nav>
					<ul>
						<li>
							<Link href="/">Disciplinas</Link>
						</li>
						<li>
							<Link href="/">Encontre professores</Link>
						</li>
					</ul>
				</nav>
				<form onSubmit={handleAsk}>
					<Input
						type="text"
						name="search"
						id="search"
						placeholder="Faça uma pergunta..."
						rightIcon={MdSearch}
						ref={questionInputRef}
						onClickIcon={() => handleAsk()}
					/>
				</form>
				{user ? (
					<UserDataContainer ref={profilePopoutRef}>
						<UserDataContent
							onClick={() => setIsProfilePopoutOpen((old) => !old)}
						>
							<strong>{fullName}</strong>

							<UserAvatar user={user} />
						</UserDataContent>
						<ProfilePopout isOpen={isProfilePopoutOpen} />
					</UserDataContainer>
				) : (
					<ButtonsContainer>
						<Link href="/signup">
							<Button width="150px">Cadastre-se</Button>
						</Link>
						<SignInButton />
					</ButtonsContainer>
				)}
			</Content>
		</Container>
	)
}

export default Header
