
import { apiSlice } from './slices/api'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { emptyOrderDraft } from './slices/order'
import { persistDraftMiddleware } from './middlewares/persist-draft'
import { rootReducer, RootState } from './slices'
import { OrderDraft, orderDraftSchema } from './types/types'

export const store = (() => {
  // Load draft from local storage
  const persistedDraftJson = typeof window !== 'undefined'
    ? window.localStorage.getItem('draft')
    : null

  // Try to load existing draft
  let persistedDraft: OrderDraft | undefined
  if (persistedDraftJson !== null) {
    try {
      persistedDraft = orderDraftSchema.parse(JSON.parse(persistedDraftJson))
    } catch (error) {
    }
  }

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      apiSlice.middleware,
      persistDraftMiddleware,
    ),
    preloadedState: {
      order: persistedDraft !== undefined
        ? {
          step: persistedDraft.lineItems.length > 0 ? 'preview' : 'order',
          draft: {
            ...emptyOrderDraft,
            ...persistedDraft
          }
        }
        : undefined
    }
  })
})()

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = never> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
