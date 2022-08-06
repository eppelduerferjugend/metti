
import useAppSelector from '../../hooks/useAppSelector'
import useOrdersSync from '../../hooks/useOrdersSync'
import { getStoreOrders } from '../../slices/orders'

export default function StoreDisplayView (props: {
  storeId: number
}): JSX.Element {
  useOrdersSync()
  const orders = useAppSelector(state => getStoreOrders(state.orders, props.storeId))
  return (
    <div className='store-display'>
      <ul className='store-display__orders'>
        {orders.map(order => (
          <li className='store-display__order' key={order.id}>
            <header className='store-display__order-header'>
              <span className='store-display__order-table'>
                {order.table.name}
              </span>
              <span className='store-display__order-time'>
                {new Date(order.createdAt).toLocaleTimeString('de-DE')}
              </span>
            </header>
            <div className='store-display__order-body'>
              <ul className='store-display__items'>
                {order.items.map(lineItem => (
                  <li
                    className='store-display__item'
                    key={lineItem.productId}
                  >
                    <span className='store-display__item-quantity'>
                      {lineItem.quantity}
                    </span>
                    <span className='store-display__item-name'>
                      {lineItem.product.name}
                    </span>
                  </li>
                ))}
              </ul>
              <footer className='store-display__order-footer'>
                <span className='store-display__order-assignee'>
                  {order.assignee.name}
                </span>
                {order.note && (
                  <span className='store-display__order-note'>
                    {order.note}
                  </span>
                )}
              </footer>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
