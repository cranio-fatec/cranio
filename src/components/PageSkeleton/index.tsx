import React from 'react'
import Footer from '../Footer'
import Header from '../Header'

import { Container, Main } from './styles'
import { PageSkeletonProps } from './types'

const PageSkeleton: React.FC<PageSkeletonProps> = ({ children, title }) => {
  return (
    <Container>
      <Header title={title} />
      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}

export default PageSkeleton
