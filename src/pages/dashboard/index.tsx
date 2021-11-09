import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import { MdAdd, MdSettings } from 'react-icons/md'

import { Post, Subject } from '../../@types/Post'
import { UserWithAnswers } from '../../@types/User'
import { Link } from '../../components/Link'
import PageSkeleton from '../../components/PageSkeleton'
import PostTable from '../../components/PostTable'
import UserAvatar from '../../components/UserAvatar'
import { api } from '../../services/api'

import {
  ButtonsWrapper,
  Container,
  Content,
  CrownBox,
  SubjectItem,
  TopTeachers
} from '../../styles/pages/Dashboard'
import { getPosts } from '../api/posts'
import { getSubjects } from '../api/subjects'
import { getTeacherLeaderboard } from '../api/teachers/leaderboard'

import CrownIcon from '../../assets/crown.svg'

interface DashboardProps {
  subjects: Subject[]
  posts: Post[]
  leaderboard: UserWithAnswers[]
}

const Dashboard: React.FC<DashboardProps> = ({
  posts: postsSsr,
  subjects,
  leaderboard
}) => {
  const [posts, setPosts] = useState(postsSsr)
  const [activeSubject, setActiveSubject] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubjectClick = useCallback(
    async (id: string) => {
      if (loading) return
      setLoading(true)
      const newSubject = id === activeSubject ? null : id
      setActiveSubject(newSubject)

      const response = await api.get(
        newSubject ? `/subjects/${newSubject}/posts` : '/posts'
      )

      setPosts(response.data)
      setLoading(false)
    },
    [activeSubject, loading]
  )

  return (
    <PageSkeleton title="Dashboard">
      <Container>
        <Content>
          <h1>Postagens mais recentes</h1>
          <nav>
            <ul>
              {subjects.map(subject => (
                <SubjectItem
                  key={subject.id}
                  id={subject.id}
                  onClick={() => handleSubjectClick(subject.id)}
                  active={subject.id === activeSubject}
                >
                  {subject.name}
                </SubjectItem>
              ))}
            </ul>
          </nav>
          <ButtonsWrapper>
            {/* <button type="button">
              <MdSettings color="#323232" size={24} />
            </button> */}
            <Link href="/posts/new">
              <a>
                <MdAdd color="#323232" size={24} />
              </a>
            </Link>
          </ButtonsWrapper>
          {!loading ? (
            <PostTable posts={posts} />
          ) : (
            <div className="dots-spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          )}
        </Content>
        <TopTeachers>
          <h3>Professores mais participativos no mês</h3>
          <ol>
            {leaderboard.map(user => (
              <li key={user.id}>
                <CrownBox>
                  <CrownIcon />
                </CrownBox>
                <UserAvatar user={user} />
                <span>{user.username}</span>
              </li>
            ))}
          </ol>
        </TopTeachers>
      </Container>
    </PageSkeleton>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  // const session = await getSession({ ctx: context })
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: true
  //     }
  //   }
  // }

  const [subjects, posts, leaderboard] = await Promise.all([
    getSubjects(),
    getPosts(),
    getTeacherLeaderboard()
  ])

  return {
    props: {
      subjects,
      posts,
      leaderboard: leaderboard.filter((_, index) => index < 3)
    }
  }
}

export default Dashboard
