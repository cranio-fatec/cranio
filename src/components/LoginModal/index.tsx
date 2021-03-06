import React, { useCallback, useRef } from 'react'
import Modal from 'react-modal'
import { signIn } from 'next-auth/react'
import { FiX } from 'react-icons/fi'

import { useRouter } from 'next/router'
import Button from '../Button'
import { Link } from '../Link'

import Input from '../Input'
import { GoogleOAuthButton } from '../GoogleOAuthButton'
import theme from '../../styles/theme'
import * as S from './styles'

interface LoginModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onRequestClose }) => {
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  const { push } = useRouter()

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const data = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        redirect: false
      }
      const response = await signIn('credentials', data)

      if (response.error) {
        console.log(response)
        alert(response.error)
        return
      }

      push('/dashboard')
    },
    [push]
  )

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <S.Container>
        <img src="cranio.png" alt="Crânio" />
        {/* <S.Title>Login</S.Title> */}
        <S.TextWrapper>
          <S.Text>
            Efetue seu login agora mesmo para interagir com a comunidade do
            Crânio!
          </S.Text>
        </S.TextWrapper>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Digite seu e-mail..."
            label="E-mail"
            required
            ref={emailInputRef}
          />
          <Input
            type="password"
            placeholder="Digite sua senha..."
            label="Senha"
            required
            ref={passwordInputRef}
          />
          <Link href="/forgot">Esqueci minha senha</Link>
          <S.ButtonsContainer>
            <Link href="/signup">
              <Button size="small" schema="info" type="button" upper>
                Cadastrar-se
              </Button>
            </Link>
            <Button
              size="small"
              schema="info"
              upper
              width="fit-content"
              type="submit"
            >
              Entrar
            </Button>
          </S.ButtonsContainer>
        </form>
        <GoogleOAuthButton
          onClick={() => signIn('google')}
          color={theme.colors.blue_1}
        >
          Continuar com o Google
        </GoogleOAuthButton>
        <FiX size={36} onClick={onRequestClose} />
      </S.Container>
    </Modal>
  )
}

export default LoginModal
