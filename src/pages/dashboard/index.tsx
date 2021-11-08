import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'

// import { Container } from './styles';

const Dashboard: React.FC = () => {
  return <div />
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ ctx: context })
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  return {
    props: {}
  }
}

export default Dashboard
