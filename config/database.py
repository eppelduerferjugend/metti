from masoniteorm.connections import ConnectionResolver

from app.utils import config

DATABASES = {
  'default' : 'postgres',
  'postgres': {
    'driver': 'postgres',
    **config['db']
  }
}

DB = ConnectionResolver().set_connection_details(DATABASES)
