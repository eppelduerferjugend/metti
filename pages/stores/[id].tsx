
import Head from 'next/head'
import type { GetServerSideProps, NextPage } from 'next'
import StoreDisplayView from '../../views/store-display/store-display'

interface StorePageProps {
  storeId: number
}

const StorePage: NextPage<StorePageProps> = (props: {
  storeId: number
}) => {
  return (
    <main>
      <Head>
        <title>Spaghettisfest Metti</title>
        <meta name='robots' content='noindex' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StoreDisplayView storeId={props.storeId} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps<StorePageProps> = async (context) => {
  const storeId = parseInt(context.params?.id as string)
  return {
    props: { storeId }
  }
}

export default StorePage
