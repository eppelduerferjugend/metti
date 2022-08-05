""" User Model """

from masoniteorm.models import Model
from masoniteorm.scopes import SoftDeletesMixin


class Destination(Model, SoftDeletesMixin):
  """Destination Model"""
  __hidden__ = ['deleted_at']
  __timestamps__ = False

  pass
