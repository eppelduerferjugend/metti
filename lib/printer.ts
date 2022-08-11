
import wrap from 'word-wrap'
import { Product } from '@prisma/client'
import { formatDateTime } from '../utils/format'

export const composeReceiptContent = (payload: {
  number: string
  date: Date
  table: string | undefined
  quantifiedProducts: Array<{ product: Product, quantity: number }>
  orderer: string
  note: string | undefined
  paperWidth: number
}): string => {
  const {
    number,
    date,
    table,
    quantifiedProducts,
    orderer,
    note,
    paperWidth
  } = payload

  // Sort quantified products by position
  quantifiedProducts.sort((a, b) => a.product.position - b.product.position)

  // Calculate order price
  const decimalOrderPrice =
    quantifiedProducts.reduce((sum, { product, quantity }) =>
      sum + quantity * product.unitPrice / 100.0, 0)

  // Layout paper
  const countWidth = 8
  const priceWidth = 10
  const nameWidth = paperWidth - countWidth - priceWidth

  const nameWrapOptions = {
    width: nameWidth,
    trim: true,
    cut: true,
    newline: '\n',
    indent: ''
  }

  let content = ''

  // Render table
  if (table !== undefined) {
    content += table + '\n\n'
  }

  // Render date and number
  content += `${formatDateTime(date)} ${number}\n\n`

  // Render items header
  content += `┌─────┬─${'─'.repeat(nameWidth)}─┬───────┐\n`

  for (let i = 0; i < quantifiedProducts.length; i++) {
    const { product, quantity } = quantifiedProducts[i]
    const decimalUnitPrice = product.unitPrice / 100.0
    const nameLines = wrap(product.name, nameWrapOptions).split('\n')

    for (let j = 0; j < nameLines.length; j++) {
      // Render quantity column
      if (j === 0) {
        content += `│${quantity.toString().padStart(3, ' ')}x │ `
      } else {
        content += '│    │ '
      }

      // Render item name column
      const padding = nameWidth - nameLines[j].length
      content += nameLines[j] + ' '.repeat(padding)

      // Render unit price column
      if (j === 0) {
        content += ` │${decimalUnitPrice.toFixed(2).padStart(6, ' ')} │\n`
      } else {
        content += ' │       │\n'
      }
    }

    if (i < quantifiedProducts.length - 1) {
      content += `├─────┼─${'─'.repeat(nameWidth)}─┼───────┤\n`
    } else {
      content += `╞═════╧═${'═'.repeat(nameWidth)}═╧═══════╡\n`
    }
  }

  // Render items footer
  content += `│ Total ${' '.repeat(paperWidth - 10 - 10)}${decimalOrderPrice.toFixed(2).padStart(10, ' ')} │\n`
  content += `└───────${'─'.repeat(nameWidth)}─────────┘\n`

  content += '\n'

  // Render optional note
  if (note !== undefined) {
    content += `Kommentar: ${note}\n`
  }

  // Render orderer
  content += `Service: ${orderer}\n`

  return content
}

export const applyEllipsis = (string: string, length: number): string => {
  if (string.length < length) {
    return string
  }
  return string.substring(0, length - 1) + '…'
}
