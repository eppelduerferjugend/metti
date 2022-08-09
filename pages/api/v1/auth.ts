
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler (req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('WWW-authenticate', 'Basic realm="Crew login", charset="UTF-8"')
  res.statusCode = 401
  res.end('Authentication is required.')
}
