
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderDraft } from '../types/types'

export const emptyOrderDraft: OrderDraft = {
  lineItems: [],
  storeNotes: [],
  table: '',
  orderer: '',
  test: false
}

type OrderStep = 'order' | 'preview' | 'completion'

interface OrderState {
  step: OrderStep
  draft: OrderDraft
}

const initialState: OrderState = {
  step: 'order',
  draft: emptyOrderDraft
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderStepAction: (state, { payload }: PayloadAction<{
      step: OrderStep
    }>) => {
      state.step = payload.step
    },
    setOrderLineItemAction: (state, { payload }: PayloadAction<{
      productId: number
      quantity: number
    }>) => {
      const { productId, quantity } = payload
      if (quantity < 0) {
        throw new Error('Negative line item quantity is not supported')
      }
      if (quantity === 0) {
        // Remove matching line item
        state.draft.lineItems = state.draft.lineItems.filter(lineItem =>
          lineItem.productId !== productId)
      } else {
        const existingLineItem = state.draft.lineItems.find(lineItem =>
          lineItem.productId === productId)
        if (existingLineItem === undefined) {
          // Add line item
          state.draft.lineItems.push({ productId, quantity })
        } else {
          // Change existing line item
          existingLineItem.quantity = quantity
        }
      }
    },
    setStoreNoteAction: (state, { payload }: PayloadAction<{
      storeId: number
      note: string
    }>) => {
      const { storeId, note } = payload
      if (note === '') {
        // Remove matching store note
        state.draft.storeNotes = state.draft.storeNotes.filter(storeNote =>
          storeNote.storeId !== storeId)
      } else {
        const existingStoreNote = state.draft.storeNotes.find(storeNote =>
          storeNote.storeId === storeId)
        if (existingStoreNote === undefined) {
          // Add store note
          state.draft.storeNotes.push({ storeId, note })
        } else {
          // Change existing store note
          existingStoreNote.note = note
        }
      }

      state.draft.storeNotes
    },
    setOrderTableAction: (state, { payload }: PayloadAction<{
      table: string
    }>) => {
      state.draft.table = payload.table
    },
    setOrderOrdererAction: (state, { payload }: PayloadAction<{
      orderer: string
    }>) => {
      state.draft.orderer = payload.orderer
    },
    setOrderTestAction: (state, { payload }: PayloadAction<{
      test: boolean
    }>) => {
      state.draft.test = payload.test
    },
    amendOrderDraftAction: (state, { payload }: PayloadAction<{
      amendedDraft: OrderDraft
    }>) => {
      state.step = 'preview'
      state.draft = payload.amendedDraft
    },
    resetOrderDraftAction: (state, { payload }: PayloadAction<{}>) => {
      state.draft = {
        ...emptyOrderDraft,
        // Keep orderer intact
        orderer: state.draft.orderer
      }
    }
  }
})

export const getOrderDraft = (state: OrderState): OrderDraft => state.draft
export const getOrderStep = (state: OrderState): OrderStep => state.step

export const {
  setOrderStepAction,
  setOrderLineItemAction,
  setStoreNoteAction,
  setOrderTableAction,
  setOrderOrdererAction,
  setOrderTestAction,
  amendOrderDraftAction,
  resetOrderDraftAction
} = orderSlice.actions

export default orderSlice.reducer
