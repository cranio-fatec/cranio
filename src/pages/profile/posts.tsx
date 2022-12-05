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
import { getSubjects } from '../api/subjects'
import { DEFAULT_OPTIONS } from '../../config/swr'
import { useAuth } from '../../hooks/auth'

interface ProfilePostsProps {
	subjects: Subject[]
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({ subjects }) => {
	const [activeSubject, setActiveSubject] = useState<string | null>(null)

	const { user } = useAuth()

	const { data: posts = [], isValidating: loading } = useSWR(
		`/profile/posts${activeSubject ? `?subject=${activeSubject}` : ''}`,
		DEFAULT_OPTIONS
	)

	const handleSubjectClick = useCallback(async (id: string) => {
		setActiveSubject((old) => (id === old ? null : id))
	}, [])

	return (
		<>
			<NextSeo title="Minhas Postagens" noindex nofollow />
			<Container>
				<Content>
					<h1>Minhas postagens</h1>
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

export default ProfilePosts
