
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrinterJobState } from '@prisma/client'
import { composeReceiptContent } from '../../../../../lib/printer'
import { paperWidth } from '..'
import { prisma } from '../../../../../prisma'
import { z } from 'zod'

const printOrderReceiptQuerySchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number).optional()
})

type PrintOrderReceiptQuery = z.infer<typeof printOrderReceiptQuerySchema>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case 'POST': {
      let payload: PrintOrderReceiptQuery
      try {
        payload = printOrderReceiptQuerySchema.parse(req.query)
      } catch (error) {
        res.status(400).end(`Bad request`)
        console.error(error)
        return
      }

      const order = await prisma.order.findUnique({
        where: { id: payload.id },
        include: {
          assignee: true,
          store: true,
          table: true,
          items: {
            include: {
              product: true
            }
          }
        }
      })

      if (order === null) {
        res.status(404).end(JSON.stringify(null))
        return
      }

      const printerJob = await prisma.printerJob.create({
        data: {
          printer: order.store.slug,
          state: PrinterJobState.pending,
          order: { connect: { id: order.id } },
          content: composeReceiptContent({
            number: order.number,
            date: order.createdAt,
            // TODO: Fix table being optional here
            table: order.table?.name ?? '??',
            quantifiedProducts: order.items.map(({ product, quantity }) =>
              ({ product, quantity })),
            orderer: order.assignee.name,
            note: order.note ?? undefined,
            paperWidth
          })
        }
      })

      res.status(200).end(JSON.stringify(printerJob))
      break
    }
    default: {
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} not allowed`)
    }
  }
}
