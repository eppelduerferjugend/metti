
import { AnyAction, Middleware } from '@reduxjs/toolkit'
import { RootState } from '../slices'

/**
 * Middleware persisting the order draft in local storage.
 */
export const persistDraftMiddleware: Middleware<{}, RootState> = store => next => (action: AnyAction) => {
  const preState = store.getState()
  const result = next(action)
  const postState = store.getState()

  const preDraftJson = JSON.stringify(preState.order.draft)
  const postDraftJson = JSON.stringify(postState.order.draft)

  if (preDraftJson !== postDraftJson) {
    window.localStorage.setItem('draft', postDraftJson)
  }

  return result
}
