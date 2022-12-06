import React, { useMemo } from 'react'
import { MdAdd, MdInfoOutline } from 'react-icons/md'
import dynamic from 'next/dynamic'
import useSWR from 'swr'

import { DEFAULT_OPTIONS } from '../../config/swr'
import { useAuth } from '../../hooks/auth'
import { Link } from '../Link'
import PostTable from '../PostTable'
import UserAvatar from '../UserAvatar'
import * as S from './styles'
import IconQuestion from '../../assets/question.svg'
import IconArrowUpBold from '../../assets/arrow_up_bold.svg'
import { ProfileContentProps, SubjectWithCounts } from './types'

const Chart = dynamic(() => import('./Chart'), { ssr: false })

const ProfileContent: React.FC<ProfileContentProps> = ({
	user,
	answersSubjectsCount,
	postsSubjectsCount,
	reactionsSubjectsCount,
	subjects
}) => {
	const { data: posts = [], isValidating: loading } = useSWR<any[]>(
		`/profile/posts?userId=${user.id}`,
		DEFAULT_OPTIONS
	)

	const { user: loggedUser } = useAuth()

	const answersSubjectsCountEntries = useMemo(
		() => Object.entries(answersSubjectsCount).sort(([, a], [, b]) => b - a),
		[answersSubjectsCount]
	)

	const bestSubjectName = useMemo(() => {
		const [id] = answersSubjectsCountEntries?.[0] ?? [{ id: '' }]

		return subjects.find((subject) => subject.id === id)?.name
	}, [subjects, answersSubjectsCountEntries])

	const reactionsSubjectsCountEntries = useMemo(
		() => Object.entries(reactionsSubjectsCount).sort(([, a], [, b]) => b - a),
		[reactionsSubjectsCount]
	)

	const bestReactedSubjectName = useMemo(() => {
		const [id] = reactionsSubjectsCountEntries?.[0] ?? [{ id: '' }]

		return subjects.find((subject) => subject.id === id)?.name
	}, [subjects, reactionsSubjectsCountEntries])

	const parsedParticipation = useMemo(() => {
		return subjects
			.reduce((acc, subject) => {
				const postsParticipations = postsSubjectsCount[subject.id] ?? 0
				const answers = answersSubjectsCount[subject.id] ?? 0
				const reactions = reactionsSubjectsCount[subject.id] ?? 0

				if (postsParticipations || answers || reactions) {
					acc.push({
						...subject,
						posts: postsParticipations ?? 0,
						answers,
						reactions
					})
				}

				return acc
			}, [] as SubjectWithCounts[])
			.sort((a, b) => b.answers - b.reactions - (a.answers - a.reactions))
	}, [
		answersSubjectsCount,
		postsSubjectsCount,
		reactionsSubjectsCount,
		subjects
	])

	return (
		<S.Container>
			<S.LeftContainer>
				<UserAvatar user={user} />
				<S.UserName>{user.name ?? user.username}</S.UserName>
				<S.SubjectInfoList>
					{bestSubjectName && (
						<li>
							<span>Melhor matéria:</span>
							<span>{bestSubjectName}</span>
						</li>
					)}
					{bestReactedSubjectName && (
						<li>
							<span>Matéria com mais positivos:</span>
							<span>{bestReactedSubjectName}</span>
						</li>
					)}
					{user.favoriteSubject && (
						<li>
							<span>Matéria preferida:</span>
							<span>{user.favoriteSubject.name}</span>
						</li>
					)}
				</S.SubjectInfoList>
				{!!parsedParticipation.length && (
					<>
						<S.SubjectParticipationsTitle>
							Participações nas matérias
						</S.SubjectParticipationsTitle>
						<S.SubjectParticipationsList>
							{parsedParticipation.map((participation) => (
								<li key={participation.id}>
									<S.SubjectItem subjectId={participation.id as any}>
										{participation.name}
									</S.SubjectItem>
									<S.CountsWrapper>
										<S.CountItemWrapper>
											<IconQuestion />
											{participation.posts}
										</S.CountItemWrapper>
										<S.CountItemWrapper>
											<MdInfoOutline size={24} />
											{participation.answers}
										</S.CountItemWrapper>
										<S.CountItemWrapper>
											<IconArrowUpBold />
											{participation.reactions}
										</S.CountItemWrapper>
									</S.CountsWrapper>
								</li>
							))}
						</S.SubjectParticipationsList>
					</>
				)}
			</S.LeftContainer>
			<S.RightContainer>
				<Chart subjectsWithCounts={parsedParticipation} />
				<S.PostsHeader>
					<h2>Postagens</h2>
					{/* <button type="button">
              <MdSettings color="#323232" size={24} />
            </button> */}
					{loggedUser?.id === user.id && (
						<Link href="/posts/new">
							<MdAdd color="#323232" size={24} />
						</Link>
					)}
				</S.PostsHeader>
				{!loading ? (
					<PostTable posts={posts} />
				) : (
					<div className="dots-spinner">
						<div className="bounce1"></div>
						<div className="bounce2"></div>
						<div className="bounce3"></div>
					</div>
				)}
			</S.RightContainer>
		</S.Container>
	)
}

export default ProfileContent
