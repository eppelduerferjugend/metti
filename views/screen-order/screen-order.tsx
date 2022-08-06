
import Header from '../header/header'
import ItemList from '../item-list/item-list'
import React, { useState } from 'react'
import SegmentedControl from '../segmented-control/segmented-control'
import { OrderDraftLineItem, ExportedProduct } from '../../types/types'

export default function ScreenOrderView (props: {
  products: ExportedProduct[]
  lineItems: OrderDraftLineItem[]
  onLineItemChange: (productId: number, newQuantity: number) => void
  onDoneClick: React.MouseEventHandler
}): JSX.Element {
  const { products } = props

  const stores = products
    .map(product => product.store)
    .filter((store, index, stores) =>
      stores.findIndex(({ id }) => store.id === id) === index)

  const [selectedStoreIndex, setSelectedStoreIndex] = useState(0)
  const store = stores[selectedStoreIndex]

  const storeProducts = products.filter(product =>
    product.store.id === store.id)

  return (
    <div className='screen screen-order'>
      <Header
        title='Spaghettisfest Metti'
        doneLabel='Weider'
        doneEnabled={props.lineItems.length !== 0}
        onDoneClick={props.onDoneClick}
      />
      <div className='screen-order__destinations'>
        <SegmentedControl
          segments={stores.map(store => store.name)}
          selectedIndex={selectedStoreIndex}
          onChange={setSelectedStoreIndex}
        />
      </div>
      {store !== undefined && (
        <ItemList
          products={storeProducts}
          lineItems={props.lineItems}
          viewCategories
          onLineItemChange={props.onLineItemChange}
        />
      )}
    </div>
  )
}
