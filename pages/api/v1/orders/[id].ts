
import type { NextApiRequest, NextApiResponse } from 'next'
import { ExportedOrder, UpdateOrderPayload, updateOrderPayloadSchema } from '../../../../types/types'
import { PrismaClient } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExportedOrder>
) {
  if (!['GET', 'PUT'].includes(req.method ?? 'unknown')) {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} not allowed`)
    return
  }

  // Read order id from dynamic route
  const id = typeof req.query.id === 'string'
    ? parseInt(req.query.id)
    : undefined
  if (id === undefined || isNaN(id)) {
    res.status(404).end()
    return
  }

  switch (req.method) {
    case 'GET': {
      const prisma = new PrismaClient()
      const order = await prisma.order.findUnique({
        where: {
          id
        },
        include: {
          table: true,
          assignee: true,
          items: {
            include: {
              product: true
            }
          }
        }
      })
      res.status(200).end(JSON.stringify(order))
      break
    }
    case 'PUT': {
      let payload: UpdateOrderPayload
      try {
        payload = updateOrderPayloadSchema.parse(req.body)
      } catch (error) {
        res.status(400).end('Bad request')
        console.error(error)
        return
      }

      const prisma = new PrismaClient()
      const order = await prisma.order.update({
        where: {
          id
        },
        data: {
          state: payload.state
        },
        include: {
          table: true,
          assignee: true,
          items: {
            include: {
              product: true
            }
          }
        }
      })
      res.status(200).end(JSON.stringify(order))
      break
    }
  }
}
