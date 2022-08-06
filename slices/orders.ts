
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ExportedOrder } from '../types/types'

interface OrdersState {
  orders: ExportedOrder[]
  updatedAt: string | undefined
}

const initialState: OrdersState = {
  orders: [],
  updatedAt: undefined
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrdersAction: (state, { payload }: PayloadAction<{
      orders: ExportedOrder[]
    }>) => {
      for (const updatedOrder of payload.orders) {
        const existingOrderIndex = state.orders.findIndex(order =>
          order.id === updatedOrder.id)
        if (existingOrderIndex !== -1) {
          // Update existing order
          state.orders[existingOrderIndex] = updatedOrder
        } else {
          // Add new order
          state.orders.push(updatedOrder)
        }
      }

      // Keep orders sorted by createdAt
      state.orders.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)

      // Keep updated at
      state.updatedAt = state.orders.reduce<string | undefined>((updatedAt, order) =>
        (updatedAt === undefined || updatedAt < order.updatedAt)
          ? order.updatedAt
          : updatedAt,
        undefined)
    }
  }
})

export const getOrders = (state: OrdersState): ExportedOrder[] =>
  state.orders

export const getStoreOrders = (state: OrdersState, storeId: number): ExportedOrder[] =>
  state.orders.filter(order => order.storeId === storeId)

export const getUpdatedAt = (state: OrdersState): string | undefined =>
  state.updatedAt

export const {
  updateOrdersAction
} = ordersSlice.actions

export default ordersSlice.reducer
