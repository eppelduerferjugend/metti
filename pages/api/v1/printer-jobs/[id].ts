
import type { NextApiRequest, NextApiResponse } from 'next'
import { ExportedOrder } from '../../../../types/types'
import { PrinterJobState } from '@prisma/client'
import { prisma } from '../../../../prisma'
import { z } from 'zod'

const printerJobQuerySchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number)
})

type PrinterJobQuery = z.infer<typeof printerJobQuerySchema>

const updatePrinterJobPayloadSchema = z.object({
  state: z.nativeEnum(PrinterJobState)
})

type UpdatePrinterJobPayload = z.infer<typeof updatePrinterJobPayloadSchema>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExportedOrder>
) {
  if (!['GET', 'PUT'].includes(req.method ?? 'unknown')) {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} not allowed`)
    return
  }

  let query: PrinterJobQuery
  try {
    query = printerJobQuerySchema.parse(req.query)
  } catch (error) {
    res.status(400).end('Bad request')
    console.error(error)
    return
  }

  switch (req.method) {
    case 'GET': {
      const printerJob = await prisma.printerJob.findUnique({
        where: { id: query.id }
      })
      res.status(200).end(JSON.stringify(printerJob))
      break
    }
    case 'PUT': {
      let payload: UpdatePrinterJobPayload
      try {
        payload = updatePrinterJobPayloadSchema.parse(req.body)
      } catch (error) {
        res.status(400).end('Bad request')
        console.error(error)
        return
      }

      const printerJob = await prisma.printerJob.update({
        where: { id: query.id },
        data: {
          state: payload.state
        }
      })
      res.status(200).end(JSON.stringify(printerJob))
      break
    }
  }
}
