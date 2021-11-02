import React from 'react'
import Modal from 'react-modal'
import { signIn } from 'next-auth/client'
import { FiX } from 'react-icons/fi'

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
        <form>
          <Input
            type="text"
            placeholder="Digite seu e-mail..."
            label="E-mail"
          />
          <Input
            type="password"
            placeholder="Digite sua senha..."
            label="Senha"
          />
          <Link href="/forgot">Esqueci minha senha</Link>
        </form>
        <S.ButtonsContainer>
          <Link href="/signup">
            <Button size="small" schema="info" upper>
              Cadastrar-se
            </Button>
          </Link>
          <Button
            onClick={() =>
              signIn('credentials', { email: 'teste', password: '1234' })
            }
            size="small"
            schema="info"
            upper
            width="fit-content"
          >
            Entrar
          </Button>
        </S.ButtonsContainer>
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
