""" Order Controller"""
from masoniteorm.collection import Collection

from app.models.Order import Order
from app.models.Item import Item
from app.models.ItemOrder import ItemOrder
from app.controllers.Base import BaseController
import falcon
from metti.config.database import DB


def add_quantity_and_price_to_order(order):
  item_quantities = {}
  total_price = 0

  for quantity in order['item_order']:
    item_quantities[quantity.item_id] = quantity.quantity

  for item in order.items:
    item.quantity = item_quantities[item.id]
    total_price += item.price * item.quantity

  order.total_price = total_price
  return order


def remove_pivot_meta(order):
  order = order.serialize()
  # Clean the returned data from cluttering on the pivot tables
  del order['item_order']
  for item in order['items']:
    del item['item_order_id']

  return order


def handle_ordered_items(orders):
  if isinstance(orders, Collection):
    for idx, order in enumerate(orders):
      order = add_quantity_and_price_to_order(order)
      orders[idx] = remove_pivot_meta(order)
  else:
    orders = add_quantity_and_price_to_order(orders)
    orders = remove_pivot_meta(orders)

  return orders


def handle_new_order(order):
  # Start a proper database transaction
  with DB.transaction():
    destination_ids = {}
    for item in order['items']:
      destination_id = Item.find(item['id']).destination_id
      if not destination_id in destination_ids:
        destination_ids[destination_id] = []
      destination_ids[destination_id].append(item)

    new_orders = []
    for destination_id, order_items in destination_ids.items():
      # increment the latest order_number by one
      order_number = Order.where('destination_id', destination_id).all(['id', 'number']).max('number') + 1
      new_order = Order.create({
        'number'        : order_number,
        'destination_id': destination_id,
        'waiter'        : order['waiter'],
        'table'         : order['table'],
        'comment'       : order['comment'] or None,
      })

      for order_item in order_items:
        ItemOrder.create({
          'order_id': new_order.id,
          'quantity': order_item['quantity'],
          'item_id' : order_item['id'],
        })

      new_orders.append(new_order.serialize())

    return {
      'orders': new_orders
    }


class OrderResource(BaseController):

  def on_get(self, req, resp):
    orders = handle_ordered_items(Order.all())
    resp.media = orders.serialize()

  def on_get_single(self, req, resp, order_id):
    order = Order.find(order_id)
    if not order:
      resp.status = falcon.HTTP_404
      return
    orders = handle_ordered_items(order)
    resp.media = orders

  def on_post(self, req: falcon.request.Request, resp):
    resp.media = handle_new_order(req.media)
