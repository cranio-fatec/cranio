import {
  GetServerSidePropsResult,
  GetServerSideProps,
  GetServerSidePropsContext
} from 'next'
import { getSession } from 'next-auth/client'

interface User {
  email?: string
}

type IncomingGSSP<P> = (
  ctx: GetServerSidePropsContext,
  user: User
) => Promise<P>

type WithAuthServerSidePropsResult = GetServerSidePropsResult<{
  [key: string]: any
}>

type WithAuthServerSidePropsOptions = {
  // any options you eventually would like to pass (required role...)
}

export function withAuthServerSideProps(
  incomingGSSP?: IncomingGSSP<WithAuthServerSidePropsResult> | null,
  options?: WithAuthServerSidePropsOptions
): GetServerSideProps {
  return async (context: GetServerSidePropsContext) => {
    // const { req } = context
    // const user = req?.session?.get('user')
    // const {
    //   'pluslab-admin.token': token,
    //   'pluslab-admin.user': userStr
    // } = parseCookies(context)
    // console.log(user)
    const session = await getSession({ ctx: context })

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: '/login'
        }
      }
    }

    const { user } = session

    if (incomingGSSP) {
      const incomingGSSPResult = await incomingGSSP(context, user)

      if ('props' in incomingGSSPResult) {
        return { props: { ...incomingGSSPResult.props, user } }
      }

      if ('redirect' in incomingGSSPResult) {
        return { redirect: { ...incomingGSSPResult.redirect } }
      }

      if ('notFound' in incomingGSSPResult) {
        return { notFound: incomingGSSPResult.notFound }
      }
    }
    return {
      props: {
        user
      }
    }
  }
}
