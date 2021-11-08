import React from 'react'
import { AppProps } from 'next/app'
import NProgress from 'nprogress'
import { ThemeProvider } from 'styled-components'
import Modal from 'react-modal'
import Router from 'next/router'

import { SessionProvider } from 'next-auth/react'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

Modal.setAppElement('#__next')

Router.events.on('routeChangeStart', () => {
  // console.log('onRouteChangeStart triggered')
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
  // console.log('onRouteChangeComplete triggered')
  NProgress.done()
})

Router.events.on('routeChangeError', () => {
  // console.log('onRouteChangeError triggered')
  NProgress.done()
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp
