import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React, { useCallback, useRef, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { Post as PostType } from '../../@types/Post'
import CustomUser from '../../@types/User'
import PageSkeleton from '../../components/PageSkeleton'
import { getPostById } from '../api/posts/[id]'

import { Container } from '../../styles/pages/Post'
import PostItem from '../../components/PostItem'
import Textarea from '../../components/Textarea'
import { Button } from '../../components/Button/styles'
import { api } from '../../services/api'
import { getAnswers } from '../api/posts/[id]/answers'

interface PostPageProps {
  post: PostType
  user: CustomUser
  answers?: PostType[]
}

const bodyMaxLength = 500

const Post: React.FC<PostPageProps> = ({ post, user, answers: answersSsr }) => {
  const [answers, setAnswers] = useState(answersSsr)
  const bodyInputRef = useRef<HTMLTextAreaElement>(null)

  const handleAnswer = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (bodyInputRef.current.value.length > bodyMaxLength) {
        alert("Please respect answer's body length.")
        return
      }

      const data = {
        postId: post.id,
        body: bodyInputRef.current.value.trim(),
        userId: user.id
      }

      const response = await api.post(`/posts/${post.id}/answers`, data)

      setAnswers(oldValue => [...oldValue, response.data])
      bodyInputRef.current.value = ''
    },
    [post.id, user.id]
  )

  return (
    <PageSkeleton title={post.title}>
      <Container>
        <ol>
          <PostItem content={post} user={post.user} isOdd={true} />
          {answers.map((answer, index) => (
            <PostItem
              key={answer.id}
              content={answer}
              user={answer.user}
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
    </PageSkeleton>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ ctx: context })

  try {
    const post = await getPostById(context.params.id as string)
    const answers = await getAnswers(context.params.id as string)
    return {
      props: { post, user: session.user ?? null, answers }
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }
}

export default Post
