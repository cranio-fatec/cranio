import React from 'react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

import * as S from '../styles/pages/About'
import { Link } from '../components/Link'

const About: React.FC = () => {
	return (
		<>
			<NextSeo title="Sobre nós" />
			<S.Container>
				<S.Content>
					<Link href="/">
						<Image
							src="/cranio-full.png"
							alt="Crânio Logo"
							width={341}
							height={230}
							priority
						/>
					</Link>
					<p>
						Com a pandemia da Covid 19, muitos locais de convívio públicos e
						privados ficaram impossibilitados de ter a livre circulação de
						pessoas, devido às restrições impostas pelos governos municipais e
						estaduais, conforme recomendação da Organização Mundial da Saúde. Um
						dos locais mais impactados por estas restrições foram as
						instituições de ensino. Dentro desse contexto, surgiu, como objetivo
						desse trabalho, a criação de uma plataforma educacional chamada
						Crânio, para disponibilizar as informações e conteúdo de questões,
						documentos e até trabalhos de forma simples e organizada, que
						facilite alguns processos educacionais de estudantes, professores e
						gestores educacionais. Tal plataforma visa maior integração entre
						estudantes dos ensinos público e privado, de diferentes faixas
						etárias. Uma plataforma educacional comunitária, como a Crânio,
						torna possível o acesso universal em qualquer lugar que tenha
						computadores disponíveis conectados a Web, o que permite a qualquer
						pessoa ler, estudar, aprender e interagir com um universo de outros
						estudantes, além de possuir acesso a muitas informações e arquivos.
						Permite, aos estudantes e professores de todo o mundo, o acesso
						direto (ou através de download) a arquivos no formato eletrônico.
					</p>
				</S.Content>
			</S.Container>
			<S.PortraitList>
				<S.Portrait>
					<Image
						src="/bruno.jpg"
						alt="Bruno"
						width={200}
						height={200}
						priority
					/>
					<strong>Bruno</strong>
					<p>
						Desenvolvedor
						<br />
						<span>
							<a
								href="https://www.linkedin.com/in/brunight/"
								target="_blank"
								rel="noreferrer"
							>
								@linkedin
							</a>
							{' - '}
							<a
								href="https://github.com/Brunight"
								target="_blank"
								rel="noreferrer"
							>
								@github
							</a>
							{' - '}
							<a
								href="https://twitter.com/thebrunight"
								target="_blank"
								rel="noreferrer"
							>
								@twitter
							</a>
						</span>
					</p>
				</S.Portrait>
				<S.Portrait>
					<Image
						src="/eduardo.jpg"
						alt="Eduardo"
						width={200}
						height={200}
						priority
					/>
					<strong>Eduardo</strong>
					<p>
						Desenvolvedor
						<br />
						<span>
							<a
								href="https://www.linkedin.com/in/eduardo-reis-b96a2a179/"
								target="_blank"
								rel="noreferrer"
							>
								@linkedin
							</a>
							{' - '}
							<a
								href="https://github.com/edureis999"
								target="_blank"
								rel="noreferrer"
							>
								@github
							</a>
							{' - '}
							<a
								href="https://twitter.com/eduuhh990"
								target="_blank"
								rel="noreferrer"
							>
								@twitter
							</a>
						</span>
					</p>
				</S.Portrait>
				<S.Portrait>
					<Image
						src="/ytalo.png"
						alt="Ytalo"
						width={200}
						height={200}
						priority
					/>
					<strong>Ytalo</strong>
					<p>
						Desenvolvedor
						<br />
						<span>
							<a
								href="https://www.linkedin.com/in/ytalowilliam/"
								target="_blank"
								rel="noreferrer"
							>
								@linkedin
							</a>
							{' - '}
							<a
								href="https://github.com/YtaloWill"
								target="_blank"
								rel="noreferrer"
							>
								@github
							</a>
							{' - '}
							<a
								href="https://twitter.com/YtaloWill"
								target="_blank"
								rel="noreferrer"
							>
								@twitter
							</a>
						</span>
					</p>
				</S.Portrait>
			</S.PortraitList>
		</>
	)
}

export default About
