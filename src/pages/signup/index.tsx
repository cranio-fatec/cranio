import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useCallback, useState, useRef } from 'react'
import { FiUser } from 'react-icons/fi'
import { MdLock, MdMail } from 'react-icons/md'
import nookies, { destroyCookie } from 'nookies'
import Input from '../../components/Input'
import PageSkeleton from '../../components/PageSkeleton'

import { Container } from '../../styles/pages/Signup'
import StudentSignupForm from '../../components/StudentSignupForm'
import TeacherSignupForm from '../../components/TeacherSignupForm'
import { getSubjects } from '../api/subjects'
import Button from '../../components/Button'
import { api } from '../../services/api'

interface SignupProps {
  googleData?: {
    email: string
    name: string
    image: string
  }
  subjects?: {
    id: string
    name: string
  }[]
}

const Signup: React.FC<SignupProps> = ({ googleData, subjects }) => {
  const [formData, setFormdata] = useState<Record<string, any>>({})
  const emailInputRef = useRef(null)
  const usernameInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  const confirmPasswordInputRef = useRef(null)
  const [isFavoriteSubjectSelectErrored, setIsFavoriteSubjectSelectErrored] =
    useState(false)
  const formMaps = {
    student: (
      <StudentSignupForm setFormdata={setFormdata} subjects={subjects} />
    ),
    teacher: (
      <TeacherSignupForm
        setFormdata={setFormdata}
        subjects={subjects}
        // isFavoriteSubjectSelectErrored={isFavoriteSubjectSelectErrored}
      />
    )
  }

  const [currentForm, setCurrentForm] =
    useState<keyof typeof formMaps>('student')
  const [email, setEmail] = useState(googleData?.email)
  const [username, setUsername] = useState(googleData?.name)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { push } = useRouter()

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (password !== confirmPassword) {
        alert('Passwords do not match.')
        return
      }

      if (
        (currentForm === 'teacher' && !formData.graduations) ||
        formData?.graduations?.length === 0
      ) {
        alert('Please add at least one graduation.')
        return
      }

      try {
        const response = await api.post('users', {
          email,
          username,
          password,
          image: googleData?.image,
          ...formData
        })

        const user = response.data.data

        const signResponse = await signIn('credentials', {
          email: user.email,
          password
          // redirect: false
        })

        if (signResponse.error) {
          alert(signResponse.error)
          return
        }

        push('/profile')
        destroyCookie(undefined, 'cranio.pendentGoogleSignupData')
      } catch (err) {
        console.log(err)
        alert(err.response.data.error)
      }
    },
    [
      confirmPassword,
      currentForm,
      email,
      formData,
      googleData?.image,
      password,
      push,
      username
    ]
  )

  return (
    <PageSkeleton title="Cadastro">
      <Container onSubmit={handleSubmit}>
        {!googleData && (
          <article className="signup">
            <h1>Cadastrar-se</h1>
            <div>
              <section>
                <Input
                  type="email"
                  label="E-mail"
                  required
                  labelRequired
                  placeholder="Digite seu e-mail"
                  leftIcon={MdMail}
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  ref={emailInputRef}
                />
                <Input
                  type="username"
                  placeholder="Digite seu nome ou um nome de usuário"
                  required
                  labelRequired
                  label="Nome de Usuário"
                  leftIcon={FiUser}
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  ref={usernameInputRef}
                />
              </section>
              <section>
                <Input
                  type="password"
                  label="Senha"
                  labelRequired
                  required
                  placeholder="Digite sua senha"
                  leftIcon={MdLock}
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  ref={passwordInputRef}
                />
                <Input
                  type="password"
                  placeholder="Confirme sua senha"
                  required
                  labelRequired
                  label="Confirmar Senha"
                  leftIcon={MdLock}
                  onChange={e => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  ref={confirmPasswordInputRef}
                />
              </section>
            </div>
          </article>
        )}
        <article className="second-part">
          <h1>
            Cadastrar-se como{' '}
            <span onClick={() => setCurrentForm('student')}>aluno</span> ou{' '}
            <span onClick={() => setCurrentForm('teacher')}>professor</span>?
          </h1>
          <div>{formMaps[currentForm]}</div>
          <Button
            width="400px"
            schema="darkblue"
            margin="84px 0 0 0"
            type="submit"
          >
            Cadastrar-se
          </Button>
        </article>
      </Container>
    </PageSkeleton>
  )
}

export default Signup

export const getServerSideProps: GetServerSideProps<SignupProps> =
  async context => {
    const session = await getSession({ ctx: context })
    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: true
        }
      }
    }

    const subjects = await getSubjects()

    const cookieStr = nookies.get(context)['cranio.pendentGoogleSignupData']
    const cookie = JSON.parse(cookieStr ?? '{}')
    return {
      props: {
        googleData: cookie.email ? cookie : null,
        subjects
      }
    }
  }
