import React, { useCallback, useRef } from 'react'
import Modal from 'react-modal'
import { signIn } from 'next-auth/react'
import { FiX } from 'react-icons/fi'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

import Button from '../Button'
import { Link } from '../Link'
import Input from '../Input'
import { GoogleOAuthButton } from '../GoogleOAuthButton'
import theme from '../../styles/theme'
import * as S from './styles'
import { useAuth } from '../../hooks/auth'

interface LoginModalProps {
	isOpen: boolean
	onRequestClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onRequestClose }) => {
	const emailInputRef = useRef<HTMLInputElement | null>(null)
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const { push } = useRouter()
	const { mutate } = useAuth()

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault()
			const data = {
				email: emailInputRef.current?.value,
				password: passwordInputRef.current?.value,
				redirect: false
			}
			const response = await signIn('credentials', data)

			if (response?.error) {
				console.log(response)
				toast.error(response.error)
				return
			}

			mutate()
			onRequestClose()
			push('/dashboard')
		},
		[mutate, onRequestClose, push]
	)

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
		>
			<S.Container>
				<Image
					src="/cranio.png"
					alt="Crânio Logo"
					width={171}
					height={83}
					priority
				/>
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
							<Button
								size="small"
								schema="info"
								type="button"
								upper
								onClick={onRequestClose}
							>
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
