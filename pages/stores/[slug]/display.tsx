
import Head from 'next/head'
import StoreDisplayView from '../../../views/store-display/store-display'
import type { GetServerSideProps, NextPage } from 'next'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const storeDisplayPageParamsSchema = z.object({
  slug: z.string()
})

interface StoreDisplayPageProps {
  storeId: number
}

const StoreDisplayPage: NextPage<StoreDisplayPageProps> = (props) => {
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

export const getServerSideProps: GetServerSideProps<StoreDisplayPageProps> = async (context) => {
  const params = storeDisplayPageParamsSchema.parse(context.params)

  const prisma = new PrismaClient()
  const store = await prisma.store.findUnique({
    where: { slug: params.slug }
  })

  if (store === null) {
    return { notFound: true }
  }

  return {
    props: {
      storeId: store.id
    }
  }
}

export default StoreDisplayPage
