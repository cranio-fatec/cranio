import React from 'react'
import { format, parseISO } from 'date-fns'

import { Link } from '../Link'
import { Container, PostStatus } from './styles'
import { PostTableProps } from './types'

export const parseDate = (date: string | Date) => {
	if (typeof date === 'string') {
		return parseISO(date)
	}

	return date
}

const PostTable: React.FC<PostTableProps> = ({ posts }) => {
	return (
		<Container>
			<thead>
				<tr className="header">
					<th className="date">Data</th>
					<th className="status">Status</th>
					<th className="title">Título</th>
					<th>Matéria</th>
				</tr>
			</thead>
			<tbody>
				{posts.map((post) => (
					<tr key={post.id}>
						<td colSpan={4}>
							<Link href={`/posts/${post.id}`}>
								<div className="date">
									{format(parseDate(post.createdAt), 'dd/MM/yyyy')}
								</div>
								<div className="status">
									<PostStatus closed={post.closed}>
										{post.closed ? 'Fechada' : 'Aberta'}
									</PostStatus>
								</div>
								<div className="title">{post.title}</div>
								<div>{post.subject.name}</div>
							</Link>
						</td>
					</tr>
				))}
			</tbody>
		</Container>
	)
}

export default PostTable
