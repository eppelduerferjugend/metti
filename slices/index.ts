
import { apiSlice } from './api'
import { combineReducers } from 'redux'
import { orderSlice } from './order'
import { ordersSlice } from './orders'

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  order: orderSlice.reducer,
  orders: ordersSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>
