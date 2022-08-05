
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { OrderResponse, OrderDraft, PublicProduct } from '../types/types'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/'
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<PublicProduct[], void>({
      query: () => 'products'
    }),
    createOrder: builder.mutation<OrderResponse, {
      draft: OrderDraft
    }>({
      query: (args) => ({
        url: 'orders',
        method: 'POST',
        body: args.draft
      })
    })
  })
})

export const {
  useGetProductsQuery,
  useCreateOrderMutation
} = apiSlice
