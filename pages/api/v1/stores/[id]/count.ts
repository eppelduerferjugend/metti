
import type { NextApiRequest, NextApiResponse } from 'next'
import { Store } from '@prisma/client'
import { z } from 'zod'
import { prisma } from '../../../../../prisma'

const storeCountQuerySchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number).optional()
})

type StoreCountQuery = z.infer<typeof storeCountQuerySchema>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Store[]>
) {
  switch (req.method) {
    case 'GET': {
      // Read query
      let query: StoreCountQuery
      try {
        query = storeCountQuerySchema.parse(req.query)
      } catch (error) {
        res.status(400).end(`Bad request`)
        console.error(error)
        return
      }

      // Aggregate sum over line item quantities in this store
      const aggregate = await prisma.lineItem.aggregate({
        _sum: {
          quantity: true
        },
        where: {
          product: { storeId: query.id }
        }
      })

      const count = aggregate._sum.quantity
      res.status(200).end(JSON.stringify({ count }))
      break
    }
    default: {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} not allowed`)
    }
  }
}
