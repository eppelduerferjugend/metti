
import AppView from '../views/app/app'
import Head from 'next/head'
import type { GetStaticProps, NextPage } from 'next'

type OrderPageProps = {}

const OrderPage: NextPage<OrderPageProps> = () => {
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

export const getStaticProps: GetStaticProps<OrderPageProps> = async (context) => {
  return {
    props: {}
  }
}

export default OrderPage
