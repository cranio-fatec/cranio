import React, { useCallback } from 'react'
import { format } from 'date-fns'

import { Link } from '../Link'
import { Container, PostStatus } from './styles'
import { PostTableProps } from './types'

const PostTable: React.FC<PostTableProps> = ({ posts }) => {
  const parseDate = useCallback((str: string) => {
    return format(new Date(str), 'dd/MM/yyyy')
  }, [])

  return (
    <Container>
      <tr className="header">
        <th className="date">Data</th>
        <th className="status">Status</th>
        <th className="title">Título</th>
        <th>Matéria</th>
      </tr>
      {posts.map(post => (
        <tr key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <a>
              <td className="date">{parseDate(post.createdAt)}</td>
              <td className="status">
                <PostStatus closed={post.closed}>
                  {post.closed ? 'Fechada' : 'Aberta'}
                </PostStatus>
              </td>
              <td className="title">{post.title}</td>
              <td>{post.subject.name}</td>
            </a>
          </Link>
        </tr>
      ))}
    </Container>
  )
}

export default PostTable
