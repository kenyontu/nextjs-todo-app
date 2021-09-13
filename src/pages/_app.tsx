import Head from 'next/head'
import Modal from 'react-modal'
import { Provider } from 'react-redux'
import { useEffect } from 'react'

import 'normalize.css'
import 'focus-visible'
import 'tailwindcss/tailwind.css'
import './app.css'

import { store } from '../app/store'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Modal.setAppElement('#home')
  }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="description"
          content="Responsive todo app made with Next.js + RTK + Tailwind CSS"
        />
      </Head>
      <Provider store={store}>
        <div id="home" className="h-full">
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  )
}

export default MyApp
