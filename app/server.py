import json
import logging
import uuid
from wsgiref import simple_server

import falcon
import requests

from app.controllers.Items import ItemsResource
from app.controllers.Orders import OrderResource


class StorageEngine:
  def get_things(self, marker, limit):
    return [{'id': str(uuid.uuid4()), 'color': 'green'}]

  def add_thing(self, thing):
    thing['id'] = str(uuid.uuid4())
    return thing


class StorageError(Exception):
  @staticmethod
  def handle(ex, req, resp, params):
    # TODO: Log the error, clean up, etc. before raising
    raise falcon.HTTPInternalServerError()


class SinkAdapter:
  engines = {
    'ddg': 'https://duckduckgo.com',
    'y'  : 'https://search.yahoo.com/search',
  }

  def __call__(self, req, resp, engine):
    url = self.engines[engine]
    params = {'q': req.get_param('q', True)}
    result = requests.get(url, params=params)

    resp.status = falcon.code_to_http_status(result.status_code)
    resp.content_type = result.headers['content-type']
    resp.text = result.text


class MettiHeader:
  def process_request(self, req, resp):
    resp.set_header('Powered-By', 'Eppelduerfer H4ck3rz')


def max_body(limit):
  def hook(req, resp, resource, params):
    length = req.content_length
    if length is not None and length > limit:
      msg = (
          'The size of the request is too large. The body must not '
          'exceed ' + str(limit) + ' bytes in length.'
      )

      raise falcon.HTTPPayloadTooLarge(
        title='Request body is too large', description=msg
      )

  return hook


class ThingsResource:
  def __init__(self, db):
    self.db = db
    self.logger = logging.getLogger('thingsapp.' + __name__)

  def on_get(self, req, resp, user_id):
    marker = req.get_param('marker') or ''
    limit = req.get_param_as_int('limit') or 50

    try:
      result = self.db.get_things(marker, limit)
    except Exception as ex:
      self.logger.error(ex)

      description = (
        'Aliens have attacked our base! We will '
        'be back as soon as we fight them off. '
        'We appreciate your patience.'
      )

      raise falcon.HTTPServiceUnavailable(
        title='Service Outage', description=description, retry_after=30
      )

    # NOTE: Normally you would use resp.media for this sort of thing;
    # this example serves only to demonstrate how the context can be
    # used to pass arbitrary values between middleware components,
    # hooks, and resources.
    resp.context.result = result

    resp.set_header('Powered-By', 'Eppelduerfer H4ck3rz')
    resp.status = falcon.HTTP_200

  @falcon.before(max_body(64 * 1024))
  def on_post(self, req, resp, user_id):
    try:
      doc = req.context.doc
    except AttributeError:
      raise falcon.HTTPBadRequest(
        title='Missing thing',
        description='A thing must be submitted in the request body.',
      )

    proper_thing = self.db.add_thing(doc)

    resp.status = falcon.HTTP_201
    resp.location = '/%s/things/%s' % (user_id, proper_thing['id'])


# Configure your WSGI server to load "things.app" (app is a WSGI callable)
application = app = falcon.App(
  middleware=[
    # AuthMiddleware(),
    MettiHeader(),
  ]
)

db = StorageEngine()
things = ThingsResource(db)
items = ItemsResource()
orders = OrderResource()
app.add_route('/{user_id}/things', things)
app.add_route('/items', items)
app.add_route('/items/{item_id}', items, suffix='single')
app.add_route('/items/move/{direction}/{item_id}', items, suffix='move')
app.add_route('/orders', orders)
app.add_route('/orders/{order_id}', orders, suffix='single')

# If a responder ever raises an instance of StorageError, pass control to
# the given handler.
app.add_error_handler(StorageError, StorageError.handle)

# Proxy some things to another service; this example shows how you might
# send parts of an API off to a legacy system that hasn't been upgraded
# yet, or perhaps is a single cluster that all data centers have to share.
sink = SinkAdapter()
app.add_sink(sink, r'/search/(?P<engine>ddg|y)\Z')

# Useful for debugging problems in your API; works with pdb.set_trace(). You
# can also use Gunicorn to host your app. Gunicorn can be configured to
# auto-restart workers when it detects a code change, and it also works
# with pdb.
if __name__ == '__main__':
  httpd = simple_server.make_server('127.0.0.1', 8000, app)
  httpd.serve_forever()
