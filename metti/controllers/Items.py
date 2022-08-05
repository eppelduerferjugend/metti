""" Item Controller"""

from models.Item import Item
from controllers.Base import BaseController
from metti.config.database import DB
import re


def handle_new_item(item):
  # Start a proper database transaction
  with DB.transaction():
    sorting_nr = Item.where('category_id', item['category_id']).all(['id', 'sorting_nr']).max('sorting_nr') + 1

    return Item.create({
      'name'          : item['name'],
      'destination_id': item['destination_id'],
      'category_id'   : item['category_id'],
      'slug'          : item['slug'] if 'slug' in item else re.sub(r'[\W_]+', '-', item['name'].lower()),
      'color'         : item['color'] if 'color' in item else None,
      'price'         : item['price'] if 'price' in item else None,
      'sorting_nr'    : sorting_nr
    })


def handle_item_move(direction: str, item_id):
  current_item = Item.find(item_id)

  with DB.transaction():
    if direction == 'up':
      # Check if not already first in line
      if current_item.sorting_nr == 1:
        return
      # Increment the higher sorted item
      Item \
        .where('category_id', current_item.category_id) \
        .where('sorting_nr', current_item.sorting_nr - 1) \
        .first() \
        .increment('sorting_nr')

      current_item.decrement('sorting_nr')

    elif direction == 'down':
      max_sorting_nr = Item \
        .where('category_id', current_item.category_id) \
        .all() \
        .max('sorting_nr')
      # Check if not already last in line
      if current_item.sorting_nr == max_sorting_nr:
        return

      Item \
        .where('category_id', current_item.category_id) \
        .where('sorting_nr', current_item.sorting_nr + 1) \
        .first() \
        .decrement('sorting_nr')

      current_item.increment('sorting_nr')


def get_all():
  return Item.order_by('id').all().serialize()


class ItemsResource(BaseController):

  def on_get(self, req, resp):
    resp.media = get_all()

  def on_get_single(self, req, resp, item_id):
    item = Item.find(item_id)
    if not item:
      resp.status = falcon.HTTP_404
      return
    resp.media = item.serialize()

  def on_post(self, req, resp):
    resp.media = handle_new_item(req.media).serialize()

  def on_put_move(self, req, resp, direction, item_id):
    handle_item_move(direction, item_id)
    resp.media = get_all()
