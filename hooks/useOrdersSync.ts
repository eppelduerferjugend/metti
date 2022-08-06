
import { useEffect, useRef } from 'react'
import { useLazyGetOrdersQuery } from '../slices/api'
import { getUpdatedAt, updateOrdersAction } from '../slices/orders'
import useAppDispatch from './useAppDispatch'
import useAppSelector from './useAppSelector'

const pullInterval = 5_000

let pullIntervalInstance: ReturnType<typeof setInterval>
let referenceCounter = 0

const useOrdersSync = () => {
  const syncStateRef = useRef({
    updatedAt: undefined as string | undefined,
    isFetching: false
  })

  const dispatch = useAppDispatch()
  const [dispatchGetOrders, getOrdersResult] = useLazyGetOrdersQuery()

  const updatedAt = useAppSelector(state => getUpdatedAt(state.orders))
  useEffect(() => {
    syncStateRef.current = {
      updatedAt,
      isFetching: getOrdersResult.isFetching
    }
  }, [updatedAt, getOrdersResult.isFetching])

  useEffect(() => {
    const tick = async () => {
      // Skip tick if still fetching
      if (!syncStateRef.current.isFetching) {
        // Trigger new sync
        const updatedOrders = await dispatchGetOrders({
          updatedAfter: syncStateRef.current.updatedAt,
        }).unwrap()
        if (updatedOrders.length > 0) {
          // Update orders in state
          dispatch(updateOrdersAction({
            orders: updatedOrders
          }))
          console.log('Update for orders received', updatedOrders)
        }
      }
    }

    // Mount callback
    referenceCounter++
    if (referenceCounter === 1) {
      pullIntervalInstance = setInterval(tick, pullInterval)
      tick()
    }

    return () => {
      // Unmount callback
      referenceCounter--
      if (referenceCounter === 0) {
        clearInterval(pullIntervalInstance)
      }
    }
  }, [dispatch, syncStateRef])
}

export default useOrdersSync
