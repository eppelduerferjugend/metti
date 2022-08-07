
import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderResponse, OrderDraft, orderDraftSchema } from '../../../../types/types'
import { OrderState, Prisma, PrismaClient } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderResponse>
) {
  switch (req.method) {
    case 'GET': {
      const updatedAfter = typeof req.query.updatedAfter === 'string'
        ? new Date(req.query.updatedAfter)
        : undefined

      const prisma = new PrismaClient()
      const orders = await prisma.order.findMany({
        where: {
          updatedAt: updatedAfter !== undefined
            ? { gt: updatedAfter }
            : undefined
        },
        orderBy: {
          createdAt: 'asc'
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
      res.status(200).end(JSON.stringify(orders))
      break
    }
    case 'POST': {
      let orderDraft: OrderDraft
      try {
        orderDraft = orderDraftSchema.parse(req.body)
      } catch (error) {
        res.status(400).end(`Bad request`)
        console.error(error)
        return
      }

      // Connect to database
      const prisma = new PrismaClient()

      // Gather products mentioned in the order draft
      const products = await prisma.product.findMany({
        where: {
          id: { in: orderDraft.lineItems.map(lineItem => lineItem.productId) }
          // TODO: Add availability conditions
        },
        include: {
          store: true
        }
      })

      // Check if the number of products match the number of line items
      // If not, at least one product is no longer available
      if (orderDraft.lineItems.length !== products.length) {
        res.status(400).json({
          error: true,
          message:
            'Een oder méi Produiten si net méi verfügbar. ' +
            'Deng Bestellung gouf ugepasst.',
          amendedDraft: {
            ...orderDraft,
            // Filter out line items with products that are not available
            lineItems: orderDraft.lineItems.filter(lineItem =>
              undefined !== products.find(product =>
                product.id === lineItem.productId))
          }
        })
        return
      }

      // TODO: Transform order draft by trimming values

      // Gather stores mentioned in the order draft
      const stores = products
        .map(product => product.store)
        // Make store array unique
        .filter((store, index, stores) =>
          stores.findIndex(({ id }) =>
            store.id === id) === index)

      // Find existing or create new assignee
      const assignee = await prisma.user.upsert({
        where: { name: orderDraft.orderer },
        update: {},
        create: { name: orderDraft.orderer }
      })

      // Find existing or create new table
      const table = await prisma.table.upsert({
        where: { name: orderDraft.table },
        update: {},
        create: { name: orderDraft.table }
      })

      // Create an order per store
      const orders = await prisma.$transaction(
        stores.map(store => {
          return prisma.order.create({
            data: {
              store: { connect: { id: store.id } },
              number: 'UNASSIGNED',
              state: OrderState.Pending,
              table: { connect: { id: table.id } },
              assignee: { connect: { id: assignee.id } },
              note: orderDraft.storeNotes.find(storeNote =>
                storeNote.storeId === store.id)?.note,
              items: {
                createMany: {
                  data: products
                    // Filter products for this store
                    .filter(product => product.storeId === store.id)
                    .map((product): Prisma.LineItemCreateManyOrderInput => ({
                      productId: product.id,
                      // Use quantity in line item for this product
                      quantity: orderDraft.lineItems.find(lineItem =>
                        lineItem.productId === product.id
                      )?.quantity ?? 0
                    }))
                }
              },
              test: orderDraft.test
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
        })
      )

      res.status(200).end(JSON.stringify(orders))
      break
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} not allowed`)
    }
  }
}
