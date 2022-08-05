
import { Store, Product, ProductCategory } from '@prisma/client'

export type PublicProduct = Product & {
  categories: ProductCategory[]
  store: Store
}

export interface OrderDraftLineItem {
  productId: number
  quantity: number
}

export interface OrderDraftStoreNote {
  storeId: number
  note: string
}

export interface OrderDraft {
  lineItems: OrderDraftLineItem[]
  storeNotes: OrderDraftStoreNote[]
  table: string
  orderer: string
  note: string
  test: boolean
}
