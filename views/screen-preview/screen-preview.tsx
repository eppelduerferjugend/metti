
import Button from '../button/button'
import FieldText from '../field-text/field-text'
import Header from '../header/header'
import ItemList from '../item-list/item-list'
import React from 'react'
import { OrderDraft, ExportedProduct } from '../../types/types'

export default function ScreenPreviewView (props: {
  products: ExportedProduct[]
  draft: OrderDraft
  onLineItemChange: (productId: number, newQuantity: number) => void
  onStoreNoteChange: (storeId: number, note: string) => void
  onTableChange: (table: string) => void
  onOrdererChange: (orderer: string) => void
  onBackClick: React.MouseEventHandler
  onDoneClick: React.MouseEventHandler
}): JSX.Element {
  const { products, draft } = props

  const productMap = new Map<number, ExportedProduct>()
  for (const product of products) {
    productMap.set(product.id, product)
  }

  const lineItemProducts = (
    draft.lineItems.map(lineItem => productMap.get(lineItem.productId))
      .filter(productOrUndefined => productOrUndefined !== undefined)
  ) as ExportedProduct[]

  const stores =
    lineItemProducts
      .map(product => product.store)
      .filter((store, index, stores) =>
        stores.findIndex(({ id }) => store.id === id) === index)

  // Verify order
  let submitEnabled = true
  let submitLabel = 'Bestellung opginn'

  if (draft.table.length === 0) {
    submitEnabled = false
    submitLabel = 'Dësch fehlt'
  } else if (!draft.table.match('^[A-Za-z][0-9]{1,2}$')) {
    submitEnabled = false
    submitLabel = 'Dësch falsch'
  } else if (draft.orderer.length < 2) {
    submitEnabled = false
    submitLabel = 'Service fehlt'
  } else if (draft.lineItems.length === 0) {
    submitEnabled = false
    submitLabel = 'Näischt ausgewielt'
  }

  return (
    <div className='screen screen-preview'>
      <Header
        title='Spaghettisfest Metti'
        onBackClick={props.onBackClick}
      />
      {stores.map(store => {
        const lineItems = draft.lineItems.filter(lineItem =>
          productMap.get(lineItem.productId)?.storeId === store.id)
        const lineItemProducts = lineItems.map(lineItem =>
          productMap.get(lineItem.productId)) as ExportedProduct[]
        const note = draft.storeNotes.find(storeNote =>
          storeNote.storeId === store.id)?.note ?? ''
        return (
          <div className='screen-preview__section' key={store.id}>
            <h3 className='screen-preview__section-headline'>{store.name}</h3>
            <ItemList
              products={lineItemProducts}
              lineItems={lineItems}
              onLineItemChange={props.onLineItemChange}
            />
            <div className='screen-preview__field'>
              <FieldText
                placeholder={`${store.name} Kommentar bäisetzen`}
                value={note}
                onChange={props.onStoreNoteChange.bind(null, store.id)} />
            </div>
          </div>
        )
      })}
      <div className='screen-preview__section' key='table'>
        <h3 className='screen-preview__section-headline'>Dësch</h3>
        <div className='screen-preview__field'>
          <FieldText
            placeholder='Dësch'
            value={draft.table}
            onChange={props.onTableChange}
          />
        </div>
      </div>
      <div className='screen-preview__section' key='waiter'>
        <h3 className='screen-preview__section-headline'>Service</h3>
        <div className='screen-preview__field'>
          <FieldText
            placeholder='Service'
            value={draft.orderer}
            onChange={props.onOrdererChange}
          />
        </div>
      </div>
      <div className='screen-preview__submit'>
        <Button
          label={submitLabel}
          enabled={submitEnabled}
          onClick={props.onDoneClick}
        />
      </div>
    </div>
  )
}
