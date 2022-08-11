
import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderResponse } from '../../../../types/types'
import { PrinterJobState } from '@prisma/client'
import { prisma } from '../../../../prisma'
import { z } from 'zod'

const printerJobsQuerySchema = z.object({
  state: z.nativeEnum(PrinterJobState).optional(),
  printer: z.string().optional()
})

type PrinterJobsQuery = z.infer<typeof printerJobsQuerySchema>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderResponse>
) {
  switch (req.method) {
    case 'GET': {
      let query: PrinterJobsQuery
      try {
        query = printerJobsQuerySchema.parse(req.query)
      } catch (error) {
        res.status(400).end('Bad request')
        console.error(error)
        return
      }
      const printerJobs = await prisma.printerJob.findMany({
        where: {
          printer: query.printer,
          state: query.state
        },
        orderBy: {
          createdAt: 'asc'
        }
      })
      res.status(200).end(JSON.stringify(printerJobs))
      break
    }
    default: {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} not allowed`)
    }
  }
}
