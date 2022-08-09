
import type { NextApiRequest, NextApiResponse } from 'next'
import { Store } from '@prisma/client'
import { prisma } from '../../../../prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Store[]>
) {
  switch (req.method) {
    case 'GET': {
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
