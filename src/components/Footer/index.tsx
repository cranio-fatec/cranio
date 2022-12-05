import Image from 'next/image'
import React from 'react'

import { Link } from '../Link'
import { Container, Content, LeftWrapper, RightWrapper } from './styles'

const Footer: React.FC = () => {
	return (
		<Container>
			<Content>
				<LeftWrapper>
					<Link href="/">
						<Image
							src="/cranio.png"
							alt="Crânio Logo"
							width={171}
							height={83}
							priority
						/>
					</Link>
					<Link href="/about">
						Conheça o projeto
						<br />
						Sobre os autores
					</Link>
				</LeftWrapper>
				<RightWrapper>
					<h3>Mapa do site</h3>
					<div>
						<Link href="/dashboard">Disciplinas</Link>
						<Link href="/teachers">Busque professores</Link>
						<Link href="/dashboard">Postagens Recentes</Link>
					</div>
				</RightWrapper>
			</Content>
		</Container>
	)
}

export default Footer
