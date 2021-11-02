import React from 'react'
import Header from '../components/Header'

import * as S from '../styles/pages/Home'

const Home: React.FC = () => {
  return (
    <S.Container>
      <Header></Header>
      <S.Title>Teste boilerplate</S.Title>
    </S.Container>
  )
}

export default Home
