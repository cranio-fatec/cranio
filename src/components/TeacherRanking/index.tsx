import React from 'react'

import * as S from './styles'
import { TeacherRankingProps } from './types'
import CrownIcon from '../../assets/crown.svg'
import UserAvatar from '../UserAvatar'

const TeacherRanking: React.FC<TeacherRankingProps> = ({ leaderboard }) => {
	return (
		<S.TopTeachers>
			<h3>Professores mais participativos no mês</h3>
			<ol>
				{leaderboard.map((user) => (
					<li key={user.id}>
						<S.CrownBox>
							<CrownIcon />
						</S.CrownBox>
						<UserAvatar user={user} />
						<span>{user.username}</span>
					</li>
				))}
			</ol>
		</S.TopTeachers>
	)
}

export default TeacherRanking
