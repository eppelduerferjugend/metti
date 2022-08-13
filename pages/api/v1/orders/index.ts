
import type { NextApiRequest, NextApiResponse } from 'next'
import { CreateOrderResponse, orderDraftSchema } from '../../../../types/types'
import { OrderState, PrinterJobState, Prisma, Product } from '@prisma/client'
import { composeReceiptContent } from '../../../../lib/printer'
import { prisma } from '../../../../prisma'
import { z } from 'zod'

// TODO: Move to database
export const paperWidth = 42

const ordersQuerySchema = z.object({
  state: z.nativeEnum(OrderState).optional(),
  updatedAfter: z.string().transform((string) => new Date(string)).optional(),
  storeId: z.string().regex(/^\d+$/).transform(Number).optional()
})

type OrdersQuery = z.infer<typeof ordersQuerySchema>

export const createOrderPayloadSchema = z.object({
  draft: orderDraftSchema
})

export type CreateOrderPayload = z.infer<typeof createOrderPayloadSchema>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateOrderResponse>
) {
  switch (req.method) {
    case 'GET': {
      let query: OrdersQuery
      try {
        query = ordersQuerySchema.parse(req.query)
      } catch (error) {
        res.status(400).end('Bad request')
        console.error(error)
        return
      }

      const orders = await prisma.order.findMany({
        where: {
          storeId: query.storeId,
          state: query.state,
          updatedAt: query.updatedAfter !== undefined
            ? { gt: query.updatedAfter }
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
      let payload: CreateOrderPayload
      try {
        payload = createOrderPayloadSchema.parse(req.body)
      } catch (error) {
        res.status(400).end(`Bad request`)
        console.error(error)
        return
      }

      const orderDraft = payload.draft

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

      if (orderDraft.table === null || orderDraft.table === '') {
        res.status(400).json({
          error: true,
          message: 'Et gouf keng Destinatioun uginn.'
        })
        return
      }

      // Find existing or create new table
      const table = await prisma.table.upsert({
        where: { name: orderDraft.table },
        update: {},
        create: { name: orderDraft.table }
      })

      // Find existing or create new assignee
      const assignee = await prisma.user.upsert({
        where: { name: orderDraft.orderer },
        update: {},
        create: { name: orderDraft.orderer }
      })

      // Sum up the number of items previously ordered in each store
      const storeOrderedItemCount = (await Promise.all(stores.map(store =>
        prisma.lineItem.aggregate({
          _sum: {
            quantity: true
          },
          where: {
            product: { storeId: store.id }
          }
        })
      )))
        .map(aggregation => aggregation._sum.quantity ?? 0)

      // Order date
      const orderDate = new Date()

      // Create an order per store
      const orders = await prisma.$transaction(
        stores.map((store, storeIndex) => {
          // Compose number
          const orderedItemsCount = storeOrderedItemCount[storeIndex]
          const rawNumber = (orderedItemsCount + 1).toString()
          const number = store.numberPrefix + rawNumber.padStart(4, '0')

          // Gather products and quantities in this order
          const quantifiedProducts = products
            // Filter products for this store
            .filter(product => product.storeId === store.id)
            .map((product): { product: Product, quantity: number } => ({
              product,
              // Use quantity in line item for this product
              quantity: orderDraft.lineItems.find(lineItem =>
                lineItem.productId === product.id
              )?.quantity ?? 0
            }))

          // Gather note
          const note = orderDraft.storeNotes.find(storeNote =>
            storeNote.storeId === store.id)?.note

          return prisma.order.create({
            data: {
              store: { connect: { id: store.id } },
              number,
              state: OrderState.pending,
              table: { connect: { id: table.id } },
              assignee: { connect: { id: assignee.id } },
              note,
              items: {
                createMany: {
                  data:
                    quantifiedProducts.map((quantifiedProduct): Prisma.LineItemCreateManyOrderInput => ({
                      productId: quantifiedProduct.product.id,
                      quantity: quantifiedProduct.quantity
                    }))
                }
              },
              printerJobs:
                store.newOrderReceiptPrinter !== null
                ? {
                  create: {
                    state: PrinterJobState.pending,
                    printer: store.newOrderReceiptPrinter,
                    content: composeReceiptContent({
                      number,
                      date: orderDate,
                      table: table.name,
                      quantifiedProducts,
                      orderer: assignee.name,
                      note,
                      paperWidth
                    })
                  }
                }
                : {},
              test: orderDraft.test,
              createdAt: orderDate
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
