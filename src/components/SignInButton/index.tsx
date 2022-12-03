import { useState } from 'react'

import Button from '../Button'
import LoginModal from '../LoginModal'

export const SignInButton: React.FC = () => {
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

	function handleOpenLoginModal() {
		setIsLoginModalOpen(true)
	}

	function handleCloseLoginModal() {
		setIsLoginModalOpen(false)
	}

	return (
		<>
			<Button onClick={handleOpenLoginModal} width="100px" schema="secondary">
				Entrar
			</Button>

			<LoginModal
				onRequestClose={handleCloseLoginModal}
				isOpen={isLoginModalOpen}
			/>
		</>
	)
}
