
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Store } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Store[]>
) {
  switch (req.method) {
    case 'GET': {
      const prisma = new PrismaClient()
      const stores = await prisma.store.findMany()
      res.status(200).end(JSON.stringify(stores))
      break
    }
    default: {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} not allowed`)
    }
  }
}
