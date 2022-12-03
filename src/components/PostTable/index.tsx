import React from 'react'
import { format } from 'date-fns'

import { Link } from '../Link'
import { Container, PostStatus } from './styles'
import { PostTableProps } from './types'

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
						<Link href={`/posts/${post.id}`}>
							<td className="date">{format(post.createdAt, 'dd/MM/yyyy')}</td>
							<td className="status">
								<PostStatus closed={post.closed}>
									{post.closed ? 'Fechada' : 'Aberta'}
								</PostStatus>
							</td>
							<td className="title">{post.title}</td>
							<td>{post.subject.name}</td>
						</Link>
					</tr>
				))}
			</tbody>
		</Container>
	)
}

export default PostTable
