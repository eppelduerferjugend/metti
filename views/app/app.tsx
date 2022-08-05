
import React from 'react'
import ScreenCompletionView from '../screen-completion/screen-completion'
import ScreenOrderView from '../screen-order/screen-order'
import ScreenPreviewView from '../screen-preview/screen-preview'
import useAppDispatch from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import { getOrderDraft, getOrderStep, setOrderLineItemAction, setOrderStepAction, resetOrderDraftAction, setStoreNoteAction, setOrderOrdererAction, setOrderTableAction } from '../../slices/order'
import { useGetProductsQuery } from '../../slices/api'

export default function AppView (): JSX.Element {
  const dispatch = useAppDispatch()
  const draft = useAppSelector(state => getOrderDraft(state.order))
  const step = useAppSelector(state => getOrderStep(state.order))
  const { data: products, isLoading } = useGetProductsQuery()

  const onOrderDone = () => {
    console.log('Place order', draft)
    dispatch(resetOrderDraftAction({}))
  }

  const onLineItemChange = (productId: number, quantity: number) => {
    dispatch(setOrderLineItemAction({ productId, quantity }))
  }

  const onStoreNoteChange = (storeId: number, note: string) => {
    dispatch(setStoreNoteAction({ storeId, note }))
  }

  const onTableChange = (table: string) => {
    dispatch(setOrderTableAction({ table }))
  }

  const onOrdererChange = (orderer: string) => {
    dispatch(setOrderOrdererAction({ orderer }))
  }

  return (
    <div className='app'>
      {step === 'order' && (
        <ScreenOrderView
          products={products ?? []}
          lineItems={draft.lineItems}
          onDoneClick={() => dispatch(setOrderStepAction({ step: 'preview' }))}
          onLineItemChange={onLineItemChange}
        />
      )}
      {step === 'preview' && (
        <ScreenPreviewView
          products={products ?? []}
          draft={draft}
          onBackClick={() => dispatch(setOrderStepAction({ step: 'order' }))}
          onDoneClick={() => dispatch(setOrderStepAction({ step: 'completion' }))}
          onLineItemChange={onLineItemChange}
          onStoreNoteChange={onStoreNoteChange}
          onTableChange={onTableChange}
          onOrdererChange={onOrdererChange}
        />
      )}
      {step === 'completion' && (
        <ScreenCompletionView
          state='success'
          onBackClick={() => dispatch(setOrderStepAction({ step: 'preview' }))}
          onDoneClick={onOrderDone}
          onRetryClick={undefined}
        />
      )}
    </div>
  )
}
