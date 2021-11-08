import { GetServerSideProps } from 'next'
import React from 'react'

// import { Container } from './styles';

const Post: React.FC = () => {
  return <div />
}

export const getServerSideProps: GetServerSideProps = async context => {
  console.log(context.query)

  return {
    props: {}
  }
}

export default Post
