import React, { useCallback, useRef } from 'react'
import { MdSearch } from 'react-icons/md'
import Image from 'next/image'
// import { getSession } from 'next-auth/react'
// import Button from '../components/Button'
// import { Link } from '../components/Link'
// import { SignInButton } from '../components/SignInButton'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import PeopleSVG from '../assets/peaple.svg'
import * as S from '../styles/pages/Home'
import theme from '../styles/theme'
import { Link } from '../components/Link'
import Button from '../components/Button'
import { SignInButton } from '../components/SignInButton'
import Input from '../components/Input'
import { useAuth } from '../hooks/auth'
import { DEFAULT_OPTIONS } from '../config/swr'
import { PostWithAuthorSubject } from './api/posts/recents'
import UserAvatar from '../components/UserAvatar'
// import Input from '../components/Input'
// import PageSkeleton from '../components/PageSkeleton'

const Home: React.FC = () => {
	const { user } = useAuth()
	const router = useRouter()
	const questionInputRef = useRef<HTMLInputElement>(null)

	const handleAsk = useCallback(
		async (e?: React.FormEvent) => {
			if (!user) {
				router.push('/signup')
				return
			}

			e?.preventDefault()
			router.push(
				`/posts/new?question=${questionInputRef.current?.value}`,
				'/posts/new'
			)
			questionInputRef.current && (questionInputRef.current.value = '')
		},
		[router, user]
	)

	const { data: recentPosts, isValidating } = useSWR<PostWithAuthorSubject[]>(
		`/posts/recents`,
		DEFAULT_OPTIONS
	)

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
							{!user ? (
								<>
									<Link href="/signup">
										<Button width="205px">Cadastre-se agora</Button>
									</Link>
									<SignInButton />
								</>
							) : (
								<Link href="/dashboard">
									<Button width="205px">Acesse agora</Button>
								</Link>
							)}
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
						<form
							onSubmit={(e) => {
								e.preventDefault()
								handleAsk()
							}}
						>
							<Input
								type="text"
								name="search"
								id="search"
								placeholder="Faça uma pergunta..."
								rightIcon={MdSearch}
								onClickIcon={handleAsk}
								ref={questionInputRef}
							/>
						</form>
						<span>ou</span>
						<form
							onSubmit={(e) => {
								e.preventDefault()
								router.push('/teachers')
							}}
						>
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
						<S.RecentPostsContainer>
							<h3>Perguntas recentes</h3>
							{!isValidating ? (
								<S.PostsList>
									{recentPosts?.map((post) => (
										<li key={post.id}>
											<S.PostHeader>
												<Link href={`/users/${post.authorId}`}>
													<UserAvatar user={post.author} />
												</Link>
												<div>
													<Link href={`/posts/${post.id}`}>
														<strong>{post.title}</strong>
													</Link>
													<br />
													<Link href={`/users/${post.authorId}`}>
														<span>
															{post.author.name ?? post.author.username ?? ''}
														</span>
													</Link>
												</div>
												<S.SubjectItem subjectId={post.subject.id as any}>
													{post.subject.name}
												</S.SubjectItem>
											</S.PostHeader>
											<Link href={`/posts/${post.id}`}>
												<S.PostBody>{post.body}</S.PostBody>
											</Link>
										</li>
									))}
									<S.SeeMore href="/dashboard">Ver mais</S.SeeMore>
								</S.PostsList>
							) : (
								<S.LoadingDots className="dots-spinner">
									<div className="bounce1"></div>
									<div className="bounce2"></div>
									<div className="bounce3"></div>
								</S.LoadingDots>
							)}
						</S.RecentPostsContainer>
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
