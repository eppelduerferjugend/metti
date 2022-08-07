
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { OrderResponse, OrderDraft, ExportedProduct, ExportedOrder, UpdateOrderPayload } from '../types/types'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/'
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ExportedProduct[], void>({
      query: () => 'products'
    }),
    getOrders: builder.query<ExportedOrder[], {
      updatedAfter: string | undefined
    }>({
      query: (args) => {
        return ({
          url: 'orders',
          params: args.updatedAfter !== undefined
            ? { updatedAfter: args.updatedAfter }
            : {}
        })
      }
    }),
    createOrder: builder.mutation<OrderResponse, {
      draft: OrderDraft
    }>({
      query: (args) => ({
        url: 'orders',
        method: 'POST',
        body: args.draft
      })
    }),
    updateOrder: builder.mutation<ExportedOrder, {
      orderId: number,
      payload: UpdateOrderPayload
    }>({
      query: (args) => ({
        url: `orders/${args.orderId}`,
        method: 'PUT',
        body: args.payload
      })
    })
  })
})

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation
} = apiSlice
