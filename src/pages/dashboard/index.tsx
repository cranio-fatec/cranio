import { GetStaticProps } from 'next'
import React, { useCallback, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { Subject } from '@prisma/client'
import useSWR from 'swr'

import { Link } from '../../components/Link'
import PostTable from '../../components/PostTable'
import UserAvatar from '../../components/UserAvatar'
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
import {
	getTeacherLeaderboard,
	UserWithAnswers
} from '../api/teachers/leaderboard'
import CrownIcon from '../../assets/crown.svg'
import { PostWithAuthorSubjectAnswers } from '../../components/PostTable/types'
import { DEFAULT_OPTIONS } from '../../config/swr'

interface DashboardProps {
	subjects: Subject[]
	posts: PostWithAuthorSubjectAnswers[]
	leaderboard: UserWithAnswers[]
}

const Dashboard: React.FC<DashboardProps> = ({
	posts: postsSsr,
	subjects,
	leaderboard
}) => {
	const [activeSubject, setActiveSubject] = useState<string | null>(null)

	const { data: posts = [], isValidating: loading } = useSWR(
		activeSubject ? `/subjects/${activeSubject}/posts` : null,
		{
			fallbackData: postsSsr,
			...DEFAULT_OPTIONS
		}
	)

	const handleSubjectClick = useCallback(async (id: string) => {
		setActiveSubject((old) => (id === old ? null : id))
	}, [])

	return (
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
				<ButtonsWrapper>
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
			{!!leaderboard.length && (
				<TopTeachers>
					<h3>Professores mais participativos no mês</h3>
					<ol>
						{leaderboard.map((user) => (
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
			)}
		</Container>
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
	}
}

export default Dashboard
