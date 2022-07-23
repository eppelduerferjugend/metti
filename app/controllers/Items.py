""" Item Controller"""

from app.models.Item import Item
from app.controllers.Base import BaseController
import falcon


class ItemsResource(BaseController):

  def on_get(self, req, resp):
    resp.media = Item.all().serialize()

  def on_get_single(self, req, resp, item_id):
    item = Item.find(item_id)
    if not item:
      resp.status = falcon.HTTP_404
      return
    resp.media = item.serialize()

  def on_post(self, req, resp):
    resp.media = handle_new_item(req.media)
