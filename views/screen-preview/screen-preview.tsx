
import Button from '../button/button'
import FieldText from '../field-text/field-text'
import Header from '../header/header'
import ItemList from '../item-list/item-list'
import React from 'react'
import { OrderDraft, ExportedProduct } from '../../types/types'
import { formatCurrency } from '../../utils/format'

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

  if (draft.orderer.length < 2) {
    submitEnabled = false
    submitLabel = 'Service net uginn'
  }

  if (draft.table?.length === 0) {
    submitEnabled = false
    submitLabel = 'Dëschnummer net uginn'
  } else if (!draft.table?.match('^[A-Za-z][0-9]{1,2}$')) {
    submitEnabled = false
    submitLabel = 'Ongëlteg Dëschnummer'
  }

  return (
    <div className='screen screen-preview'>
      <Header
        title='Metti'
        onBackClick={props.onBackClick}
      />
      <div className='screen-preview__section'>
        <h2 className='screen-preview__section-headline'>
          Bestellung
        </h2>
        <div className='screen-preview__stores'>
          {stores.map(store => {
            const lineItems = draft.lineItems.filter(lineItem =>
              productMap.get(lineItem.productId)?.storeId === store.id)
            const lineItemProducts = lineItems.map(lineItem =>
              productMap.get(lineItem.productId)) as ExportedProduct[]
            const note = draft.storeNotes.find(storeNote =>
              storeNote.storeId === store.id)?.note ?? ''
            return (
              <div className='screen-preview__store' key={store.id}>
                <h3 className='screen-preview__store-headline'>
                  {store.name}
                </h3>
                <div className='screen-preview__store-items'>
                  <ItemList
                    products={lineItemProducts}
                    lineItems={lineItems}
                    onLineItemChange={props.onLineItemChange}
                  />
                </div>
                <div className='screen-preview__store-total'>
                  {formatCurrency(lineItems.reduce((sum, lineItem, index) =>
                    sum + lineItem.quantity * lineItemProducts[index].unitPrice, 0))}
                </div>
                <div className='screen-preview__store-note'>
                  <FieldText
                    placeholder='Kommentar'
                    value={note}
                    onChange={props.onStoreNoteChange.bind(null, store.id)} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='screen-preview__section'>
        <h2 className='screen-preview__section-headline'>
          Detailer
        </h2>
        <div className='screen-preview__field'>
          <FieldText
            label='Dësch'
            placeholder='Dësch'
            value={draft.table ?? ''}
            onChange={props.onTableChange}
          />
        </div>
        <div className='screen-preview__field'>
          <FieldText
            label='Service'
            placeholder='Service'
            value={draft.orderer}
            onChange={props.onOrdererChange}
          />
        </div>
        <div className='screen-preview__section-actions'>
          <Button
            label={submitLabel}
            enabled={submitEnabled}
            onClick={props.onDoneClick}
          />
        </div>
      </div>
    </div>
  )
}
