
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
  const noteWidth = paperWidth - 6

  const nameWrapOptions = {
    width: nameWidth,
    trim: true,
    newline: '\n',
    indent: ''
  }

  const noteWrapOptions = {
    width: noteWidth,
    trim: true,
    newline: '\n',
    indent: ''
  }

  let content = ''

  // Render table
  if (table !== undefined && table !== 'N/A') {
    content += centerAlignString(`╔${'═'.repeat(14)}╗`, paperWidth) + '\n'
    content += centerAlignString(`║${centerAlignString(`Dësch ${table}`, 14)}║`, paperWidth) + '\n'
    content += centerAlignString(`╚${'═'.repeat(14)}╝`, paperWidth) + '\n'
    content += '\n'
  }

  // Render date and number
  content += `┌────────────┬─${'─'.repeat(paperWidth - 25)}─────────┐\n`
  content += `│ ${number.padEnd(10, ' ')} │ ${formatDateTime(date).padStart(paperWidth - 17)} │\n`
  content += `├─────┬──────┴─${'─'.repeat(paperWidth - 25)}─┬───────┤\n`

  for (let i = 0; i < quantifiedProducts.length; i++) {
    const { product, quantity } = quantifiedProducts[i]
    const decimalUnitPrice = product.unitPrice / 100.0
    const nameLines = wrap(product.name, nameWrapOptions).split('\n')

    for (let j = 0; j < nameLines.length; j++) {
      // Render quantity column
      if (j === 0) {
        content += `│ ${`${quantity.toString()}x`.padEnd(4, ' ')}│ `
      } else {
        content += '│     │ '
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

  // Render orderer and optional note
  content += `┌${'─'.repeat(paperWidth - 2)}┐\n`
  content += `│ Zerwéiert vum ${leftAlignString(orderer, paperWidth - 18)} │\n`

  if (note !== undefined) {
    const noteLines = wrap(note, noteWrapOptions).split('\n')
    content += `├${'─'.repeat(paperWidth - 2)}┤\n`

    for (let i = 0; i < noteLines.length; i++) {
      if (i === 0) {
        content += '│ „'
      } else {
        content += '│  '
      }

      content += leftAlignString(noteLines[i], noteWidth)

      if (i < noteLines.length - 1) {
        content += '  │\n'
      } else {
        content += '“ │\n'
      }
    }
  }

  content += `└${'─'.repeat(paperWidth - 2)}┘\n`

  return content
}

export const centerAlignString = (string: string, width: number): string => {
  const length = Math.min(string.length, width)
  const padding = Math.floor((width - length) / 2)
  return ' '.repeat(padding) + leftAlignString(string, length) + ' '.repeat(width - padding - length)
}

export const leftAlignString = (string: string, length: number): string => {
  if (string.length <= length) {
    return string + ' '.repeat(length - string.length)
  }
  return string.substring(0, length - 1) + '…'
}
