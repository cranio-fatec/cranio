import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'
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
import { HeaderProps } from './types'

const Header: React.FC<HeaderProps> = ({ title }) => {
  const profilePopoutRef = useRef<any>(null)
  const questionInputRef = useRef<HTMLInputElement>(null)
  const [isProfilePopoutOpen, setIsProfilePopoutOpen] = useState(false)
  const { data: session } = useSession()
  console.log('Sessão', session)
  const router = useRouter()

  const nameArr = session ? session.user.username.split('/')[0].split(' ') : []
  // const nameArr = ['teste', 'a']
  const fullName = session
    ? nameArr.length > 1
      ? `${nameArr[0]} ${nameArr[1]}`
      : `${nameArr[0]}`
    : ''

  useOutsideClick(profilePopoutRef, () => {
    if (isProfilePopoutOpen) {
      setIsProfilePopoutOpen(false)
    }
  })

  const handleAsk = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault()
      router.push(
        `/posts/new?question=${questionInputRef.current.value}`,
        '/posts/new'
      )
      questionInputRef.current.value = ''
    },
    [router]
  )

  return (
    <Container>
      <Head>
        <title>{title ? `${title} - Crânio` : 'Crânio'}</title>
      </Head>
      <Content>
        <Link href="/">
          <a>
            <img src="/cranio.png" alt="Crânio Logo" />
          </a>
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
        {session ? (
          <UserDataContainer>
            <UserDataContent onClick={() => setIsProfilePopoutOpen(true)}>
              <strong>{fullName}</strong>

              <UserAvatar user={session.user} />
            </UserDataContent>
            <ProfilePopout
              isOpen={isProfilePopoutOpen}
              ref={profilePopoutRef}
            ></ProfilePopout>
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
