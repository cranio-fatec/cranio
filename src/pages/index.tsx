import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import * as S from '../styles/pages/Home'

const Home: React.FC = () => {
  return (
    <S.Container>
      <Header></Header>
      <S.Main>
        <S.Title>Corpo</S.Title>
      </S.Main>
      <Footer></Footer>
    </S.Container>
  )
}

export default Home
