import { GetStaticPaths, GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import React, { useCallback, useRef } from 'react'
import { MdEdit } from 'react-icons/md'
import useSWR from 'swr'

import { getPostById } from '../api/posts/[id]'
import { Container } from '../../styles/pages/Post'
import PostItem from '../../components/PostItem'
import Textarea from '../../components/Textarea'
import { Button } from '../../components/Button/styles'
import { api } from '../../services/api'
import { PostWithAuthorSubjectAnswers } from '../../components/PostTable/types'
import { DEFAULT_OPTIONS } from '../../config/swr'
import { PostLike } from '../../components/PostItem/types'
import { prisma } from '../../lib/prismadb'

interface PostPageProps {
	post: PostWithAuthorSubjectAnswers
}

const bodyMaxLength = 500

const Post: React.FC<PostPageProps> = ({ post }) => {
	const { data: answers = [], mutate } = useSWR<PostLike[]>(
		`/posts/${post.id}/answers`,
		{
			fallbackData: post.answers,
			...DEFAULT_OPTIONS
		}
	)

	const bodyInputRef = useRef<HTMLTextAreaElement>(null)
	const { data: session } = useSession()

	const user = session?.user

	const handleAnswer = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault()
			if (!user) {
				return
			}

			if ((bodyInputRef.current?.value.length ?? 9999) > bodyMaxLength) {
				alert("Please respect answer's body length.")
				return
			}

			const data = {
				postId: post.id,
				body: bodyInputRef.current?.value.trim(),
				authorId: user.id
			}

			await api.post(`/posts/${post.id}/answers`, data)

			mutate()
			bodyInputRef.current && (bodyInputRef.current.value = '')
		},
		[mutate, post.id, user]
	)

	return (
		<Container>
			<ol>
				<PostItem content={post} isOdd />
				{answers.map((answer, index) => (
					<PostItem
						key={answer.id}
						content={answer}
						isOdd={Boolean(index % 2)}
					/>
				))}
			</ol>
			{user && (
				<form onSubmit={handleAnswer}>
					<h2>Adicione uma resposta para a discussão</h2>
					<Textarea
						required
						placeholder="Escreva aqui sua resposta"
						leftIcon={MdEdit}
						maxLength={bodyMaxLength}
						height="256px"
						ref={bodyInputRef}
					/>
					<Button
						type="submit"
						schema="darkblue"
						margin="24px 0 0 0"
						width="800px"
					>
						Publicar
					</Button>
				</form>
			)}
		</Container>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const id = (params as any).id

	const post = await getPostById(id)

	if (!post) {
		return {
			props: {},
			notFound: true
		}
	}

	return {
		props: {
			post
		}
		// revalidate: revalidation.timeInSeconds
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await prisma.post.findMany({
		select: {
			id: true
		}
		// where: {
		//   inativo: 0,
		//   divulgar_pagina: 1,
		// },
	})

	const paths = posts.map((post) => ({
		params: { id: String(post.id) }
	}))

	return {
		paths,
		fallback: 'blocking' // false or 'blocking'
	}
}

export default Post
