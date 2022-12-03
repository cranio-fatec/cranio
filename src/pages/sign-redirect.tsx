import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import React, { useEffect } from 'react'
import nookies, { destroyCookie } from 'nookies'
import { useRouter } from 'next/router'

interface SignRedirectProps {
	email?: string
}

const SignRedirect: React.FC<SignRedirectProps> = ({ email }) => {
	const { replace } = useRouter()

	useEffect(() => {
		if (!email) {
			replace('/')
			return
		}
		destroyCookie(undefined, 'cranio.pendentGoogleSigninData')
		signIn('credentials', { email })
	}, [email, replace])

	return <div>Redirecting</div>
}

export default SignRedirect

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession({ ctx: context })
	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: true
			}
		}
	}

	const signupCookieStr = nookies.get(context)['cranio.pendentGoogleSignupData']

	if (signupCookieStr) {
		return {
			redirect: {
				destination: '/signup',
				permanent: true
			}
		}
	}

	const signinCookieStr = nookies.get(context)['cranio.pendentGoogleSigninData']

	if (signinCookieStr) {
		return {
			props: { email: JSON.parse(signinCookieStr).email }
		}
	}

	return {
		props: {}
	}
}
