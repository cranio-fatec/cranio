import React from 'react'
import { MdSearch } from 'react-icons/md'
import Image from 'next/image'

// import { getSession } from 'next-auth/react'
// import Button from '../components/Button'
// import { Link } from '../components/Link'
// import { SignInButton } from '../components/SignInButton'
import PeopleSVG from '../assets/peaple.svg'
import * as S from '../styles/pages/Home'
import theme from '../styles/theme'
import { Link } from '../components/Link'
import Button from '../components/Button'
import { SignInButton } from '../components/SignInButton'
import Input from '../components/Input'
// import Input from '../components/Input'
// import PageSkeleton from '../components/PageSkeleton'

const Home: React.FC = () => {
	return (
		<>
			<S.Article className="first" background={theme.colors.blue_0}>
				<div>
					<section className="left">
						<h1>Eleve seu estudo para o próximo nível</h1>
						<p>
							Conheça professores, tire suas dúvidas, discuta e aprenda junto
							com outros estudantes em um ambiente agradável e seguro!
						</p>
						<div>
							<Link href="/signup">
								<Button width="205px">Cadastre-se agora</Button>
							</Link>
							<SignInButton />
						</div>
					</section>
					<section className="right">
						<Image
							src="/Studying.png"
							alt="Estudando"
							width={447}
							height={481}
							priority
						/>
					</section>
				</div>
			</S.Article>
			<S.Article className="second">
				<div>
					<section className="left">
						<PeopleSVG />
					</section>
					<section className="right">
						<p>
							Conecte-se com outras pessoas ao redor do país para discutir e
							entender melhor suas matérias.
						</p>
						<p>
							Encontre professores que estão prontos para te ajudar com suas
							dúvidas.
						</p>
						<p>
							É bom em alguma disciplina escolar ou é professor? Ajude
							estudantes tirando as dúvidas deles.
						</p>
					</section>
				</div>
			</S.Article>
			<S.Article className="third">
				<h1>Comece agora mesmo</h1>
				<div>
					<section className="left">
						<form>
							<Input
								type="text"
								name="search"
								id="search"
								placeholder="Faça uma pergunta..."
								rightIcon={MdSearch}
							/>
						</form>
						<span>ou</span>
						<form>
							<Input
								type="text"
								name="search"
								id="search"
								placeholder="Pesquise por algum professor..."
								rightIcon={MdSearch}
							/>
						</form>
					</section>
					<S.VerticalDivider />
					<section className="right">
						<h2>
							Dê uma olhada nas perguntas mais recentes, talvez você já consiga
							ajudar alguém :)
						</h2>
					</section>
				</div>
			</S.Article>
		</>
	)
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	// const session = await getSession({ ctx: context })
// 	// if (session) {
// 	// 	return {
// 	// 		redirect: {
// 	// 			destination: '/dashboard',
// 	// 			permanent: true
// 	// 		}
// 	// 	}
// 	// }

// 	return {
// 		props: {}
// 	}
// }

export default Home
