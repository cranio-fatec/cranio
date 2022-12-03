import React from 'react'
import { AppProps } from 'next/app'
import NProgress from 'nprogress'
import { ThemeProvider } from 'styled-components'
import Modal from 'react-modal'
import Router from 'next/router'
import { DefaultSeo } from 'next-seo'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import * as S from '../styles/Main'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { api } from '../services/api'

Modal.setAppElement('#__next')

Router.events.on('routeChangeStart', () => {
	NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
	NProgress.done()
})

Router.events.on('routeChangeError', () => {
	NProgress.done()
})

const MyApp: React.FC<AppProps> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	return (
		<ThemeProvider theme={theme}>
			<SWRConfig
				value={{ fetcher: (url) => api.get(url).then((res) => res.data) }}
			>
				<SessionProvider session={session}>
					<S.Container>
						<Header />
						<S.Main>
							<DefaultSeo
								title="Crânio"
								description="Crânio é um fórum para alunos e professores se comunicarem na melhor maneira."
								openGraph={{
									type: 'website',
									locale: 'pt_BR',
									url: 'https://cranio.vercel.app/',
									siteName: 'Crânio'
								}}
								// twitter={{
								// 	handle: '@handle',
								// 	site: '@site',
								// 	cardType: 'summary_large_image'
								// }}
							/>
							<Component {...pageProps} />
						</S.Main>
						<Footer />
					</S.Container>
				</SessionProvider>
			</SWRConfig>
			<GlobalStyle />
		</ThemeProvider>
	)
}

export default MyApp
