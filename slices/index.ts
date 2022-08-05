
import { apiSlice } from './api'
import { combineReducers } from 'redux'
import { orderSlice } from './order'

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  order: orderSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>
