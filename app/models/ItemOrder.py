""" Item Order Model """

from masoniteorm.models import Model
from masoniteorm.scopes import SoftDeletesMixin


class ItemOrder(Model, SoftDeletesMixin):
  """ItemOrder Model"""
  __table__ = 'item_order'
  __timestamps__ = False

  pass
