""" User Model """

from masoniteorm.models import Model
from masoniteorm.relationships import belongs_to_many, belongs_to
from masoniteorm.scopes import SoftDeletesMixin
from app.models.Category import Category
from app.models.Destination import Destination


class Item(Model, SoftDeletesMixin):
  """Item Model"""

  __timestamps__ = False

  @belongs_to_many(
    'item_id',
    'order_id',
    with_fields=['quantity']
  )
  def order(self):
    from app.models.Order import Order
    return Order

  @belongs_to(
    'category_id',
    'id'
  )
  def category(self):
    return Category

  @belongs_to(
    'destination_id',
    'id'
  )
  def destination(self):
    return Destination

  pass
