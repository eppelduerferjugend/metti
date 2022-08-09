
import Head from 'next/head'
import type { GetStaticProps, NextPage } from 'next'
import dynamic from 'next/dynamic'

type OrderPageProps = {}

const DynamicAppView = dynamic(() => import('../views/app/app'), {
  ssr: false
})

const OrderPage: NextPage<OrderPageProps> = () => {
  return (
    <main>
      <Head>
        <title>Spaghettisfest Metti</title>
        <meta name='robots' content='noindex' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <DynamicAppView />
    </main>
  )
}

export const getStaticProps: GetStaticProps<OrderPageProps> = async (context) => {
  return {
    props: {}
  }
}

export default OrderPage
