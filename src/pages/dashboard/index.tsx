import { GetStaticProps } from 'next'
import React, { useCallback, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { Subject } from '@prisma/client'
import useSWR from 'swr'
import { NextSeo } from 'next-seo'

import { Link } from '../../components/Link'
import PostTable from '../../components/PostTable'
import {
	ButtonsWrapper,
	Container,
	Content,
	SubjectItem
} from '../../styles/pages/Dashboard'
import { getPosts } from '../api/posts'
import { getSubjects } from '../api/subjects'
import {
	getTeacherLeaderboard,
	UserWithAnswers
} from '../api/teachers/leaderboard'
import { PostWithAuthorSubjectAnswers } from '../../components/PostTable/types'
import { DEFAULT_OPTIONS } from '../../config/swr'
import { useAuth } from '../../hooks/auth'
import TeacherRanking from '../../components/TeacherRanking'

interface DashboardProps {
	subjects: Subject[]
	posts: PostWithAuthorSubjectAnswers[]
	leaderboard: UserWithAnswers[]
}

const Dashboard: React.FC<DashboardProps> = ({
	posts: stalePosts,
	subjects,
	leaderboard
}) => {
	const [activeSubject, setActiveSubject] = useState<string | null>(null)

	const { user } = useAuth()

	const { data: posts = [], isValidating: loading } = useSWR(
		activeSubject ? `/subjects/${activeSubject}/posts` : null,
		{
			fallbackData: stalePosts,
			...DEFAULT_OPTIONS
		}
	)

	const handleSubjectClick = useCallback(async (id: string) => {
		setActiveSubject((old) => (id === old ? null : id))
	}, [])

	return (
		<>
			<NextSeo title="Postagens Recentes" />
			<Container>
				<Content>
					<h1>Postagens mais recentes</h1>
					<nav>
						<ul>
							{subjects.map((subject) => (
								<SubjectItem
									key={subject.id}
									subjectId={subject.id as any}
									onClick={() => handleSubjectClick(subject.id)}
									active={subject.id === activeSubject}
								>
									{subject.name}
								</SubjectItem>
							))}
						</ul>
					</nav>
					<ButtonsWrapper show={!!user}>
						{/* <button type="button">
              <MdSettings color="#323232" size={24} />
            </button> */}
						<Link href="/posts/new">
							<MdAdd color="#323232" size={24} />
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
				{!!leaderboard.length && <TeacherRanking leaderboard={leaderboard} />}
			</Container>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
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
		// revalidate: 60 * 60
	}
}

export default Dashboard
