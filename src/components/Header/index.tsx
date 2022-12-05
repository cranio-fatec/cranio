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

const NAME_DIVS = ['de', 'da', 'do', 'dos', 'das']

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
		const name = user?.username ?? user?.name ?? ''

		const nameArr = user
			? name
					.replace(/\s(de|da|do|dos|das)\s/g, ' ')
					.split('/')[0]
					.split(' ')
			: []

		const div = NAME_DIVS.find((divFind) => name.includes(divFind))

		return user
			? nameArr.length > 1
				? `${nameArr[0]} ${div ? `${div} ` : ''}${nameArr[1]}`
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
			if (!user) {
				router.push('/signup')
				return
			}

			e?.preventDefault()
			router.push(
				`/posts/new?question=${questionInputRef.current?.value}`,
				'/posts/new'
			)
			questionInputRef.current && (questionInputRef.current.value = '')
		},
		[router, user]
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
							<Link href="/dashboard">Disciplinas</Link>
						</li>
						<li>
							<Link href="/teachers">Encontre professores</Link>
						</li>
					</ul>
				</nav>
				<form onSubmit={handleAsk}>
					<Input
						type="text"
						name="ask-header"
						id="ask-header"
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
