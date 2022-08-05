""" User Model """

from masoniteorm.models import Model
from masoniteorm.scopes import SoftDeletesMixin
from app.models.Destination import Destination
from app.models.ItemOrder import ItemOrder
from app.models.Item import Item
from masoniteorm.relationships import belongs_to_many, belongs_to, has_many


class Order(Model, SoftDeletesMixin):
  """Order Model"""
  __hidden__ = ['deleted_at']
  __with__ = ['items', 'item_order']
  __timestamps__ = False

  @belongs_to_many(
    'order_id',
    'item_id',
  )
  def items(self):
    return Item

  @has_many(
    'id',
    'order_id',
  )
  def item_order(self):
    return ItemOrder

  @belongs_to(
    'destination_id'
  )
  def destination(self):
    return Destination

  pass
