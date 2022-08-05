"""Models"""
from metti.database import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Float, Text, DateTime
from sqlalchemy.orm import relationship


class Category(Base):
  """Category Model"""
  __tablename__ = 'categories'
  id = Column(Integer, autoincrement=True, primary_key=True)
  name = Column(String, unique=True, index=True, nullable=False)
  description = Column(Text)
  # table.soft_deletes()


class Destination(Base):
  """Destination Model"""
  __tablename__ = 'destinations'
  id = Column(Integer, autoincrement=True, primary_key=True)
  name = Column(String, unique=True, index=True, nullable=False)
  description = Column(String)

  #  table.soft_deletes()


class Order_item(Base):
  __tablename__ = "order_items"
  order_id = Column(ForeignKey("orders.id"), primary_key=True)
  item_id = Column(ForeignKey("items.id"), primary_key=True)
  quantity = Column(Integer, nullable=False)


class Order(Base):
  """Order Model"""
  __tablename__ = 'orders'
  id = Column(Integer, autoincrement=True, primary_key=True)
  number = Column(Integer, nullable=False, index=True)
  waiter = Column(String, nullable=False, index=True)
  table = Column(String, nullable=False, index=True)
  comment = Column(Text)
  completed_at = Column(DateTime)
  destination_id = Column(Integer, ForeignKey('destinations.id'), nullable=False)

  destination = relationship('Destination')
  items = relationship('Order_item')
  # table.soft_deletes()


class Item(Base):
  """Item Model"""

  __tablename__ = 'items'
  id = Column(Integer, autoincrement=True, primary_key=True)
  name = Column(String, unique=True, index=True, nullable=False)
  slug = Column(String, unique=True, index=True, nullable=False)
  color = Column(String)
  price = Column(Float)
  sorting_nr = Column(Integer, nullable=False)
  destination_id = Column(Integer, ForeignKey('destinations.id'), nullable=False)
  category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)
  destination = relationship('Destination')
  category = relationship('Category')
  orders = relationship('Order_item')
  # table.soft_deletes()
