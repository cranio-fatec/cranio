import { GetStaticProps } from 'next'
import React, { useCallback, useMemo, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { Subject, User, UserGraduation } from '@prisma/client'
import useSWR from 'swr'
import { NextSeo } from 'next-seo'

import { Link } from '../components/Link'
import { getTeacherLeaderboard } from './api/teachers/leaderboard'
import { DEFAULT_OPTIONS } from '../config/swr'
import { useAuth } from '../hooks/auth'
import TeacherRanking from '../components/TeacherRanking'
import { getTeachers } from './api/teachers'
import { getSubjects } from './api/subjects'
import * as S from '../styles/pages/Teachers'
import UserAvatar from '../components/UserAvatar'

type UserWithGraduations = User & { graduations: UserGraduation[] }

interface DashboardProps {
	subjects: Subject[]
	teachers: UserWithGraduations[]
	leaderboard: UserWithGraduations[]
}

const Teachers: React.FC<DashboardProps> = ({
	subjects,
	teachers: staleTeachers,
	leaderboard
}) => {
	const [activeSubject, setActiveSubject] = useState<string | null>(null)
	// const [page] = useState(1)

	const { user } = useAuth()

	const searchParams = useMemo(() => {
		const params = new URLSearchParams()
		activeSubject && params.append('subject', activeSubject)
		// params.append('page', String(page))

		return params.toString()
	}, [activeSubject])

	const { data: rawTeachers = [], isValidating: loading } = useSWR<
		UserWithGraduations[]
	>(`/teachers?${searchParams}`, {
		fallbackData: staleTeachers,
		...DEFAULT_OPTIONS
	})

	const teachers = useMemo(
		() =>
			rawTeachers.map((teacher) => ({
				...teacher,
				graduations: teacher.graduations.map((graduation) => ({
					...graduation,
					subject: subjects.find(
						(subject) => subject.id === graduation.subjectId
					)
				}))
			})),
		[rawTeachers, subjects]
	)

	const handleSubjectClick = useCallback(async (id: string) => {
		setActiveSubject((old) => (id === old ? null : id))
	}, [])

	return (
		<>
			<NextSeo title="Encontre Professores" />
			<S.Container>
				<S.Content>
					<h1>Postagens mais recentes</h1>
					<nav>
						<ul>
							{subjects.map((subject) => (
								<S.SubjectItem
									key={subject.id}
									subjectId={subject.id as any}
									onClick={() => handleSubjectClick(subject.id)}
									active={subject.id === activeSubject}
								>
									{subject.name}
								</S.SubjectItem>
							))}
						</ul>
					</nav>
					<S.ButtonsWrapper show={!!user}>
						{/* <button type="button">
              <MdSettings color="#323232" size={24} />
            </button> */}
						<Link href="/posts/new">
							<MdAdd color="#323232" size={24} />
						</Link>
					</S.ButtonsWrapper>
					{!loading ? (
						<S.TeachersGrid>
							{teachers.map((teacher) => (
								<S.TeacherItem key={teacher.id} href={`/profile/${teacher.id}`}>
									<ul>
										{teacher.graduations.map(({ subject }, index) => {
											if (!subject || index > 2) {
												return null
											}

											return (
												<S.SubjectItem
													key={subject.id}
													subjectId={subject.id as any}
												>
													{subject.name}
												</S.SubjectItem>
											)
										})}
									</ul>
									<UserAvatar user={teacher} />
									<S.TeacherName>
										{teacher.name ?? teacher.username}
									</S.TeacherName>
								</S.TeacherItem>
							))}
						</S.TeachersGrid>
					) : (
						<div className="dots-spinner">
							<div className="bounce1"></div>
							<div className="bounce2"></div>
							<div className="bounce3"></div>
						</div>
					)}
				</S.Content>
				{!!leaderboard.length && <TeacherRanking leaderboard={leaderboard} />}
			</S.Container>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const [teachers, subjects, leaderboard] = await Promise.all([
		getTeachers(),
		getSubjects(),
		getTeacherLeaderboard()
	])

	return {
		props: {
			teachers,
			subjects,
			leaderboard: leaderboard.filter((_, index) => index < 3)
		}
	}
}

export default Teachers
