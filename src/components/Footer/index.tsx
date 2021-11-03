import React from 'react'
import { Link } from '../Link'

import { Container, Content, LeftWrapper, RightWrapper } from './styles'

const Footer: React.FC = () => {
  return (
    <Container>
      <Content>
        <LeftWrapper>
          <Link href="/">
            <img src="cranio.png" alt="Crânio Logo" />
          </Link>
          <Link href="/">Conheça o projeto</Link>
          <Link href="/">Sobre os autores</Link>
        </LeftWrapper>
        <RightWrapper>
          <h3>Mapa do site</h3>
          <div>
            <Link href="/">Disciplinas</Link>
            <Link href="/">Busque professores</Link>
            <Link href="/">Postagens Recentes</Link>
          </div>
        </RightWrapper>
      </Content>
    </Container>
  )
}

export default Footer
