""" User Model """

from masoniteorm.models import Model
from masoniteorm.scopes import SoftDeletesMixin


class Category(Model, SoftDeletesMixin):
  """Category Model"""
  __hidden__ = ['deleted_at']

  pass
