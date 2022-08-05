
import type { NextPage } from 'next'
import Head from 'next/head'
import AppView from '../views/app/app'

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Spaghettisfest Metti</title>
        <meta name='robots' content='noindex' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppView />
    </main>
  )
}

export default Home
