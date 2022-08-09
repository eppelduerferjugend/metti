
import type { NextApiRequest, NextApiResponse } from 'next'
import { ExportedProduct } from '../../../../types/types'
import { prisma } from '../../../../prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExportedProduct[]>
) {
  switch (req.method) {
    case 'GET': {
      const products = await prisma.product.findMany({
        orderBy: {
          position: 'asc'
        },
        include: {
          store: true,
          categories: true
        }
      })
      res.status(200).end(JSON.stringify(products))
      break
    }
    default: {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} not allowed`)
    }
  }
}
