
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { PublicProduct } from '../../../../types/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublicProduct[]>
) {
  switch (req.method) {
    case 'GET': {
      const prisma = new PrismaClient()
      const products = await prisma.product.findMany({
        orderBy: {
          position: 'asc'
        },
        include: {
          store: true,
          categories: true
        }
      })
      res.status(200).json(products)
      break
    }
    default: {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} not allowed`)
    }
  }
}
