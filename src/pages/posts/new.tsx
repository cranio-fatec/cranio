import { Subject } from '@prisma/client'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import React, { useCallback, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { MdEdit, MdExtension, MdFormatColorText } from 'react-icons/md'

import { Button } from '../../components/Button/styles'
import Input from '../../components/Input'
import Select from '../../components/Select'
import { SelectOption } from '../../components/TeacherSignupForm'
import Textarea from '../../components/Textarea'
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'
import { Container } from '../../styles/pages/NewPost'
import { getSubjects } from '../api/subjects'

interface NewPostProps {
	subjects: Subject[]
}

export const POST_TITLE_MAX_LENGTH = 120
export const BODY_MAX_LENGTH = 500

const NewPost: React.FC<NewPostProps> = ({ subjects }) => {
	const titleInputRef = useRef<HTMLInputElement>(null)
	const bodyInputRef = useRef<HTMLTextAreaElement>(null)
	const [isSubjectErrored, setIsSubjectErrored] = useState(false)
	const [subject, setSubject] = useState<SelectOption | null>(null)

	const { user } = useAuth()

	const router = useRouter()

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault()

			if (!user) {
				return
			}

			if (!subject) {
				toast.error(`Preencha todos os campos!`)
				// alert('Please fill all fields.')
				setIsSubjectErrored(true)
				return
			}

			let error = false
			if (
				(titleInputRef.current?.value.length ?? 999) > POST_TITLE_MAX_LENGTH
			) {
				error = true
			}
			if ((bodyInputRef.current?.value.length ?? 999) > BODY_MAX_LENGTH) {
				error = true
			}

			if (error) {
				toast.error(`Por favor atente-se ao limite de caracteres dos campos!`)
				return
			}

			const data = {
				title: titleInputRef.current?.value.trim(),
				subjectId: subject.value,
				body: bodyInputRef.current?.value.trim(),
				authorId: user.id
			}

			nProgress.start()

			const response = await api.post('/posts', data)

			nProgress.done()

			toast.success('Postagem criada com sucesso!', {
				icon: '🎉'
			})

			router.push(`/posts/${response.data.id}`)
		},
		[router, subject, user]
	)

	return (
		<>
			<NextSeo title="Nova Postagem" noindex nofollow />
			<Container>
				<h1>Criar Postagem</h1>
				<form onSubmit={handleSubmit}>
					<Input
						type="text"
						defaultValue={(router.query.question as string) ?? ''}
						label="Título"
						labelRequired
						placeholder="Digite o título da postagem"
						leftIcon={MdFormatColorText}
						maxLength={POST_TITLE_MAX_LENGTH}
						ref={titleInputRef}
					/>
					<Select
						options={subjects.map((option) => ({
							value: option.id,
							label: option.name
						}))}
						labelRequired
						label="Matéria"
						placeholder="Selecione a matéria relacinada com a postagem"
						maxMenuHeight={170}
						leftIcon={MdExtension}
						value={subject}
						margin="0 0 16px 0"
						onChange={(option: any) => {
							setIsSubjectErrored(false)
							setSubject(option)
						}}
						isErrored={isSubjectErrored}
					/>
					<Textarea
						label="Corpo"
						labelRequired
						placeholder="Corpo da postagem"
						leftIcon={MdEdit}
						maxLength={BODY_MAX_LENGTH}
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
			</Container>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const subjects = await getSubjects()
	return {
		props: {
			subjects
		}
	}
}

export default NewPost
