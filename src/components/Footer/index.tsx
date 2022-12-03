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
					<Link href="/">Conheça o projeto</Link>
					<Link href="/">Sobre os autores</Link>
				</LeftWrapper>
				<RightWrapper>
					<h3>Mapa do site</h3>
					<div>
						<Link href="/">Disciplinas</Link>
						<Link href="/">Busque professores</Link>
						<Link href="/">Postagens Recentes</Link>
					</div>
				</RightWrapper>
			</Content>
		</Container>
	)
}

export default Footer
