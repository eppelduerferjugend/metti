
import { Store, Product, ProductCategory, Order, LineItem } from '@prisma/client'
import { z } from 'zod'

export type PublicProduct = Product & {
  categories: ProductCategory[]
  store: Store
}

export type PublicOrder = Order & {
  items: Array<LineItem & {
    product: Product
  }>
}

export const orderDraftLineItemSchema = z.object({
  productId: z.number().int(),
  quantity: z.number().int().min(1)
})

export type OrderDraftLineItem = z.infer<typeof orderDraftLineItemSchema>

export const orderDraftStoreNoteSchema = z.object({
  storeId: z.number().int(),
  note: z.string()
})

export type OrderDraftStoreNote = z.infer<typeof orderDraftStoreNoteSchema>

export const orderDraftSchema = z.object({
  lineItems: z.array(orderDraftLineItemSchema),
  storeNotes: z.array(orderDraftStoreNoteSchema),
  table: z.string(),
  orderer: z.string(),
  test: z.boolean()
})

export type OrderDraft = z.infer<typeof orderDraftSchema>

export const createOrderErrorResponseSchema = z.object({
  error: z.literal(true),
  message: z.string(),
  amendedDraft: orderDraftSchema
})

export type OrderErrorResponse =
  z.infer<typeof createOrderErrorResponseSchema>

export type OrderResponse =
  PublicOrder[] | OrderErrorResponse
