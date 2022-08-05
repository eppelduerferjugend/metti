import argparse
import logging
import sys
from pathlib import Path
from datetime import datetime

import yaml
from colored import bg, fg, stylize


class ColoredFormatter(logging.Formatter):
  """Colorise the logging output."""

  COLORS = {'ERROR'  : bg('dark_red_2') + fg('white'),
            'WARNING': fg('yellow'), }

  def format(self,
      record):
    level_name = record.levelname
    record.levelname = record.levelname.ljust(7)
    line = logging.Formatter.format(self, record)

    if level_name in ColoredFormatter.COLORS:
      line = stylize(line, ColoredFormatter.COLORS[level_name])

    return line


log = logging.getLogger(__file__)
# log.setLevel(logging.INFO)
log.setLevel(logging.DEBUG)

ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = ColoredFormatter('%(levelname)-7s - %(message)s')
ch.setFormatter(formatter)
log.addHandler(ch)

parent_path = Path(__file__).parent

if "pytest" in sys.modules:
  config_file = parent_path.joinpath('config/config.sample.yml')
else:
  config_file = parent_path.joinpath('config/config.yml')

with open(config_file, 'r') as config_data:
  config = yaml.load(config_data,
                     Loader=yaml.SafeLoader)


def json_serialiser(data):
  if isinstance(data, datetime):
    return int(data.timestamp())


def set_log_level(level: int) -> None:
  global log
  if level == 0:
    log.setLevel(logging.WARNING)

  if level == 1:
    log.setLevel(logging.INFO)

  if level >= 3:
    log.setLevel(logging.DEBUG)


def parse_command_line(*args):
  parser = argparse.ArgumentParser(description='Metti Server')
  parser.add_argument('-v', action='count', dest='verbose', default=0,
                      help='Set verbose level. More info? use -vvv.')

  if args:
    return parser.parse_args(*args)

  return parser.parse_args()
