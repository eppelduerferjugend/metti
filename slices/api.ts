
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PublicProduct } from '../types/types'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/'
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<PublicProduct[], void>({
      query: () => 'products'
    })
  })
})

export const {
  useGetProductsQuery
} = apiSlice
