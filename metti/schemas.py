from typing import Union
from pydantic import BaseModel


class CategoryBase(BaseModel):
  name: str
  description: Union[str, None] = None


class CategoryCreate(CategoryBase):
  pass


class Category(CategoryBase):
  id: int

  class Config:
    orm_mode = True


class DestinationBase(BaseModel):
  name: str
  description: Union[str, None] = None


class DestinationCreate(DestinationBase):
  pass


class Destination(DestinationBase):
  id: int

  class Config:
    orm_mode = True


class ItemBase(BaseModel):
  name: str
  color: Union[str, None] = None
  price: Union[float, None] = None


class ItemCreate(ItemBase):
  category: Category
  slug: str
  destination: Destination


class Item(ItemBase):
  id: int
  sorting_nr: int

  class Config:
    orm_mode = True


class OrderBase(BaseModel):
  number: int
  waiter: str
  table: str
  comment: Union[str, None] = None
  completed_at: Union[str, None] = None
  destination_id: int


class Order(OrderBase):
  id: int
  items: list[Item] = []

  class Config:
    orm_mode = True
