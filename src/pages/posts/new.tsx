import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'
import { MdEdit, MdExtension, MdFormatColorText } from 'react-icons/md'
import { Subject } from '../../@types/Post'
import { SelectOption } from '../../@types/Select'
import { Button } from '../../components/Button/styles'
import Input from '../../components/Input'
import PageSkeleton from '../../components/PageSkeleton'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import { api } from '../../services/api'

import { Container } from '../../styles/pages/NewPost'
import { getSubjects } from '../api/subjects'

interface NewPostProps {
  question?: string
  subjects: Subject[]
  userId: string
}

const titleMaxLength = 120
const bodyMaxLength = 500

const NewPost: React.FC<NewPostProps> = ({ question, subjects, userId }) => {
  const titleInputRef = useRef<HTMLInputElement>(null)
  const bodyInputRef = useRef<HTMLTextAreaElement>(null)
  const [isSubjectErrored, setIsSubjectErrored] = useState(false)
  const [subject, setSubject] = useState<SelectOption>(null)

  const router = useRouter()

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!subject) {
        alert('Please fill all fields.')
        setIsSubjectErrored(true)
        return
      }

      let error = false
      if (titleInputRef.current.value.length > titleMaxLength) {
        error = true
      }
      if (bodyInputRef.current.value.length > bodyMaxLength) {
        error = true
      }

      if (error) {
        alert("Please respect post's title and body length.")
        return
      }

      const data = {
        title: titleInputRef.current.value.trim(),
        subjectId: subject.value,
        body: bodyInputRef.current.value.trim(),
        userId
      }

      const response = await api.post('/posts', data)
      console.log(response)

      router.push(`/posts/${response.data.ref['@ref'].id}`)
    },
    [router, subject, userId]
  )

  return (
    <PageSkeleton title="Nova postagem">
      <Container>
        <h1>Criar Postagem</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            defaultValue={question ?? ''}
            label="T??tulo"
            labelRequired
            placeholder="Digite o t??tulo da postagem"
            leftIcon={MdFormatColorText}
            maxLength={titleMaxLength}
            ref={titleInputRef}
          />
          <Select
            options={subjects.map(option => ({
              value: option.id,
              label: option.name
            }))}
            labelRequired
            label="Mat??ria"
            placeholder="Selecione a mat??ria relacinada com a postagem"
            maxMenuHeight={170}
            leftIcon={MdExtension}
            value={subject}
            margin="0 0 16px 0"
            onChange={(option: SelectOption) => {
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
      </Container>
    </PageSkeleton>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ ctx: context })
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  const subjects = await getSubjects()
  return {
    props: {
      question: context.query.question ?? null,
      subjects,
      userId: session.user.id
    }
  }
}

export default NewPost
