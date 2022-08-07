
import useAppSelector from '../../hooks/useAppSelector'
import useOrdersSync from '../../hooks/useOrdersSync'
import { getStoreOrders, updateOrdersAction } from '../../slices/orders'
import { useRef } from 'react'
import { useUpdateOrderMutation } from '../../slices/api'
import useAppDispatch from '../../hooks/useAppDispatch'

export default function StoreDisplayView (props: {
  storeId: number
}): JSX.Element {
  const dispatch = useAppDispatch()
  const [dispatchUpdateOrder] = useUpdateOrderMutation()

  // Keep syncing local orders state with the server
  useOrdersSync()

  // Retrieve orders from state
  const orders = useAppSelector(state => getStoreOrders(state.orders, props.storeId))

  // Manage pointers to order elements
  const orderRefs = useRef<{ [name: number]: HTMLButtonElement | undefined }>({})
  const onOrderRef = (orderId: number, element: HTMLButtonElement) => {
    if (element !== null) {
      orderRefs.current[orderId] = element
    } else {
      orderRefs.current[orderId] = undefined
    }
  }

  // Focus handler
  const onFocus = (orderId: number) => {
    // Move into view
    orderRefs.current[orderId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  // Key handler
  const onKeyPress = (orderId: number, event: React.KeyboardEvent) => {
    switch (event.key) {
      case ' ':
      case 'Enter': {
        event.preventDefault()
        const order = orders.find(order => order.id === orderId)
        if (order !== undefined) {
          ;(async () => {
            // Toggle state between pending and completed
            const newState = order.state === 'Pending' ? 'Completed' : 'Pending'
            const result = await dispatchUpdateOrder({
              orderId,
              payload: {
                state: newState
              }
            })
            if ('data' in result) {
              const updatedOrder = result.data
              dispatch(updateOrdersAction({ orders: [updatedOrder] }))
            }
          })()
        }
        break
      }
      case 'ArrowDown':
      case 'ArrowRight':
      case 's':
      case 'd': {
        const orderIndex = orders.findIndex(order => order.id === orderId)
        if (orderIndex !== -1) {
          const nextOrder = orders[(orderIndex + 1) % orders.length]
          orderRefs.current[nextOrder.id]?.focus()
          event.preventDefault()
        }
        break
      }
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'w':
      case 'a': {
        const orderIndex = orders.findIndex(order => order.id === orderId)
        if (orderIndex !== -1) {
          const previousOrder = orders[(orders.length + (orderIndex - 1)) % orders.length]
          orderRefs.current[previousOrder.id]?.focus()
          event.preventDefault()
        }
        break
      }
    }
  }

  return (
    <div className='store-display'>
      <ul className='store-display__orders'>
        {orders.map(order => (
          <li>
            <button
              className={`store-display__order store-display__order--${order.state.toLowerCase()}`}
              key={order.id}
              onFocus={onFocus.bind(null, order.id)}
              onKeyDown={onKeyPress?.bind(null, order.id)}
              ref={onOrderRef.bind(null, order.id)}
            >
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
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
