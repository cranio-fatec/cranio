import React from 'react'
import { AppProps } from 'next/app'
import NProgress from 'nprogress'
import { ThemeProvider } from 'styled-components'
import Modal from 'react-modal'
import Router from 'next/router'
import { DefaultSeo } from 'next-seo'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { Roboto, Montserrat } from '@next/font/google'
import { Toaster } from 'react-hot-toast'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import * as S from '../styles/Main'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { api } from '../services/api'
import AppProvider from '../hooks'

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

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '500', '700', '900']
})
const montserrat = Montserrat({ subsets: ['latin'] })

const MyApp: React.FC<AppProps> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	return (
		<ThemeProvider
			theme={{
				...theme,
				fonts: {
					primary: roboto.style.fontFamily,
					secondary: montserrat.style.fontFamily
				}
			}}
		>
			<SWRConfig
				value={{ fetcher: (url) => api.get(url).then((res) => res.data) }}
			>
				<SessionProvider session={session}>
					<AppProvider>
						<S.Container>
							<Header />
							<S.Main>
								<DefaultSeo
									titleTemplate="%s | Crânio"
									defaultTitle="Crânio"
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
							<Toaster />
						</S.Container>
					</AppProvider>
				</SessionProvider>
			</SWRConfig>
			<GlobalStyle />
		</ThemeProvider>
	)
}

export default MyApp
