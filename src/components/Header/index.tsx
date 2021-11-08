import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import useOutsideClick from '../../hooks/useOutsideClick'
import Button from '../Button'
import Input from '../Input'
import { Link } from '../Link'
import ProfilePopout from '../ProfilePopout'
import { SignInButton } from '../SignInButton'

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
  const [isProfilePopoutOpen, setIsProfilePopoutOpen] = useState(false)
  const { data: session } = useSession()
  console.log('Sessão', session)

  const nameArr = session
    ? (session.user as any).username.split('/')[0].split(' ')
    : []
  // const nameArr = ['teste', 'a']
  const fullName = session
    ? nameArr.length > 1
      ? `${nameArr[0]} ${nameArr[1]}`
      : `${nameArr[0]}`
    : ''
  const acronym = session
    ? nameArr.length > 1
      ? `${nameArr[0][0]}${nameArr[1][0]}`.toUpperCase()
      : `${nameArr[0][0]}${nameArr[0][1]}`.toUpperCase()
    : ''

  useOutsideClick(profilePopoutRef, () => {
    if (isProfilePopoutOpen) {
      setIsProfilePopoutOpen(false)
    }
  })

  return (
    <Container>
      <Head>
        <title>{title ? `${title} - Crânio` : 'Crânio'}</title>
      </Head>
      <Content>
        <img src="cranio.png" alt="Crânio" />
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
        <form>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Faça uma pergunta..."
            rightIcon={MdSearch}
          />
        </form>
        {session ? (
          <UserDataContainer>
            <UserDataContent onClick={() => setIsProfilePopoutOpen(true)}>
              <strong>{fullName}</strong>

              <div className="icon-container">
                {session.user.image ? (
                  <img src={session.user.image} alt={session.user.username} />
                ) : (
                  acronym
                )}
              </div>
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
