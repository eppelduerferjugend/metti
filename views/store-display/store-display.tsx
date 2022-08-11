
import IconView from '../icon/icon'
import useAppDispatch from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import useOrdersSync from '../../hooks/useOrdersSync'
import { Order, OrderState } from '@prisma/client'
import { formatTime } from '../../utils/format'
import { getStoreOrders, updateOrdersAction } from '../../slices/orders'
import { useEffect, useRef, useState } from 'react'
import { usePrintOrderReceiptMutation, useUpdateOrderMutation } from '../../slices/api'

export default function StoreDisplayView (props: {
  storeId: number
}): JSX.Element {
  const dispatch = useAppDispatch()
  const [dispatchUpdateOrder] = useUpdateOrderMutation()
  const [dispatchPrintOrderReceipt] = usePrintOrderReceiptMutation()
  const alertAudioRef = useRef<HTMLAudioElement | null>(null)

  // Keep syncing local orders state with the server
  useOrdersSync()

  // Retrieve orders from state
  const orders = useAppSelector(state => getStoreOrders(state.orders, props.storeId))

  // Manage pointers to order elements
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number | undefined>(undefined)
  const orderRefs = useRef<{ [name: number]: HTMLButtonElement | undefined }>({})
  const onOrderRef = (index: number, element: HTMLButtonElement) => {
    if (element !== null) {
      orderRefs.current[index] = element
    } else {
      orderRefs.current[index] = undefined
    }
  }

  // If selection changes focus it and move it into view
  useEffect(() => {
    if (selectedOrderIndex !== undefined) {
      orderRefs.current[selectedOrderIndex]?.focus()
      orderRefs.current[selectedOrderIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [orderRefs, selectedOrderIndex])

  const onBlur = () => {
    setSelectedOrderIndex(undefined)
  }

  const onFocus = (index: number) => {
    setSelectedOrderIndex(index)
  }

  useEffect(() => {
    if (orders.length > 0) {
      alertAudioRef.current?.play()
      if (selectedOrderIndex === undefined) {
        setSelectedOrderIndex(orders.length - 1)
      }
    }
  }, [orders.length])

  const changeOrderState = async (order: Order, newState: OrderState) => {
    const result = await dispatchUpdateOrder({
      orderId: order.id,
      payload: {
        state: newState
      }
    })
    if ('data' in result) {
      const updatedOrder = result.data
      dispatch(updateOrdersAction({ orders: [updatedOrder] }))
    }
  }

  const printOrder = async (order: Order) => {
    const result = await dispatchPrintOrderReceipt({
      orderId: order.id
    })
  }

  const onKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case ' ':
      case 'Enter': {
        if (selectedOrderIndex !== undefined) {
          changeOrderState(
            orders[selectedOrderIndex],
            orders[selectedOrderIndex].state === 'pending' ? 'completed' : 'pending'
          )
        }
        event.preventDefault()
        break
      }
      case 'Backspace':
      case 'Delete': {
        if (selectedOrderIndex !== undefined) {
          changeOrderState(orders[selectedOrderIndex], 'canceled')
        }
        event.preventDefault()
        break
      }
      case 'd':
      case 'p': {
        if (selectedOrderIndex !== undefined) {
          printOrder(orders[selectedOrderIndex])
        }
        event.preventDefault()
        break
      }
      case 'ArrowDown':
      case 'ArrowRight':
      case 's':
      case 'd': {
        setSelectedOrderIndex(((selectedOrderIndex ?? -1) + 1) % orders.length)
        event.preventDefault()
        break
      }
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'w':
      case 'a': {
        setSelectedOrderIndex(((selectedOrderIndex ?? 1) + orders.length - 1) % orders.length)
        event.preventDefault()
        break
      }
    }
  }

  const onKeyPressRef = useRef<typeof onKeyPress | undefined>()
  useEffect(() => {
    onKeyPressRef.current = onKeyPress
  }, [onKeyPress])

  useEffect(() => {
    if (onKeyPressRef.current !== undefined) {
      const onKeyPress = (event: KeyboardEvent) => {
        onKeyPressRef.current?.(event)
      }
      window.addEventListener('keydown', onKeyPress)
      return () => {
        window.removeEventListener('keydown', onKeyPress)
      }
    }
  }, [onKeyPressRef])

  return (
    <div className='store-display'>
      <audio ref={alertAudioRef} preload='auto'>
        <source src='/assets/alert.mp3' type='audio/mpeg' />
      </audio>
      <ul className='store-display__orders' onBlur={onBlur}>
        {orders.map((order, index) => (
          <li key={order.id}>
            <button
              className={`store-display__order store-display__order--${order.state.toLowerCase()}`}
              onFocus={onFocus.bind(null, index)}
              ref={onOrderRef.bind(null, index)}
            >
              <header className='store-display__order-header'>
                <div className='store-display__order-head'>
                  <span className='store-display__order-number'>
                    {order.number}
                  </span>
                  <span className='store-display__order-icon'>
                    {order.state === OrderState.pending && (
                      <IconView icon='hourglass' />
                    )}
                    {order.state === OrderState.canceled && (
                      <IconView icon='errorCircle' />
                    )}
                    {order.state === OrderState.completed && (
                      <IconView icon='checkCircle' />
                    )}
                  </span>
                </div>
                <span className='store-display__order-table'>
                  {order.table.name}
                </span>
                <span className='store-display__order-time'>
                  {formatTime(new Date(order.createdAt))}
                </span>
              </header>
              <div className='store-display__order-body'>
                <ul className='store-display__items'>
                  {order.items.map(lineItem => (
                    <li
                      key={lineItem.productId}
                      className='store-display__item'
                      style={{ ['--product-color' as string]: lineItem.product.color }}
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
                      {`„${order.note}“`}
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
