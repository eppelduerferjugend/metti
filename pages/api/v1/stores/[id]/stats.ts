
import type { NextApiRequest, NextApiResponse } from 'next'
import { Store } from '@prisma/client'
import { z } from 'zod'
import { prisma } from '../../../../../prisma'

const storeStatsQuerySchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number).optional()
})

type StoreStatsQuery = z.infer<typeof storeStatsQuerySchema>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Store[]>
) {
  switch (req.method) {
    case 'GET': {
      // Read query
      let query: StoreStatsQuery
      try {
        query = storeStatsQuerySchema.parse(req.query)
      } catch (error) {
        res.status(400).end('Bad request')
        console.error(error)
        return
      }

      // Aggregate sum over pending line item quantities in this store
      const pendingAggregate = await prisma.lineItem.aggregate({
        _sum: {
          quantity: true
        },
        where: {
          order: { state: 'Pending' },
          product: { storeId: query.id }
        }
      })

      // Aggregate sum over completed line item quantities in this store
      const completedAggregate = await prisma.lineItem.aggregate({
        _sum: {
          quantity: true
        },
        where: {
          order: { state: 'Completed' },
          product: { storeId: query.id }
        }
      })

      const pendingCount = pendingAggregate._sum.quantity
      const completedCount = completedAggregate._sum.quantity
      res.status(200).end(JSON.stringify({ pendingCount, completedCount }))
      break
    }
    default: {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} not allowed`)
    }
  }
}
