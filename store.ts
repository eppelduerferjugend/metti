
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { rootReducer, RootState } from './slices'

export const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = never> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
