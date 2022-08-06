
import React from 'react'
import Spinner from '../spinner/spinner'
import { OrderDraftLineItem, ExportedProduct } from '../../types/types'

export default function ItemListView (props: {
  products: ExportedProduct[]
  lineItems: OrderDraftLineItem[]
  viewCategories?: boolean
  onLineItemChange: (productId: number, quantity: number) => void
}): JSX.Element {
  const { products, lineItems, viewCategories = false, onLineItemChange } = props

  const categories =
    viewCategories
      ? products
        .map(product => product.categories)
        .flat(1)
        .filter((category, index, categories) =>
          categories.findIndex(({ id }) => id === category.id) === index)
      : []

  const productsWithoutCategory =
    viewCategories
      ? products.filter(product => product.categories.length === 0)
      : products

  const ItemView = (props: {
    product: ExportedProduct
  }): JSX.Element => {
    const lineItem = lineItems.find(lineItem =>
      lineItem.productId === props.product.id)
    const quantity = lineItem?.quantity ?? 0
    return (
      <li className='item-list__item'>
        <span className='item-list__item-label'>{props.product.name}</span>
        <div className='item-list__spinner'>
          <Spinner
            value={quantity}
            onChange={onLineItemChange.bind(null, props.product.id)}
          />
        </div>
      </li>
    )
  }

  return (
    <ul className='item-list'>
      <li className='item-list__section' key='empty'>
        <ul className='item-list__items'>
          {productsWithoutCategory.map(product => (
            <ItemView key={product.id} product={product} />
          ))}
        </ul>
      </li>
      {categories.map(category => {
        const categoryProducts =
          props.products
            // Filter products that are part of this category
            .filter(product =>
              product.categories.find(({ id }) => category.id === id) !==
                undefined)
        return (
          <li className='item-list__section' key={category.id}>
            <h3 className='item-list__section-header'>
              {category.name}
            </h3>
            <ul className='item-list__items'>
              {categoryProducts.map(product => (
                <ItemView key={product.id} product={product} />
              ))}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}
