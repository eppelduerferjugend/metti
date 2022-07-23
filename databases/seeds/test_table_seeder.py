"""DestinationTableSeeder Seeder."""

from masoniteorm.seeds import Seeder

from app.models.Category import Category
from app.models.Destination import Destination
from app.models.Item import Item
from app.models.Order import Order
from app.models.ItemOrder import ItemOrder


class TestTableSeeder(Seeder):
  def run(self):
    """Run the database seeds."""
    kitchen = Destination.create({
      'name'       : 'kitchen',
      'description': 'Kichen fir ze kachen... u know?',
    })
    bar = Destination.create({
      'name'       : 'bar',
      'description': 'Drinks, desserts, etc... Mocktails 4tw :3',
    })
    food = Category.create({
      'name'       : 'food',
      'description': 'Alles fir z\'iessen',
    })
    drinks = Category.create({
      'name'       : 'drinks',
      'description': 'Alles fir ze drénken',
    })
    dessert = Category.create({
      'name'       : 'dessert',
      'description': 'Alles mat Zocker :D',
    })

    sm = Item.create({
      'name'          : 'Bolognese kleng',
      'slug'          : 'Bolo sm',
      'price'         : 6,
      'sorting_nr'    : 1,
      'destination_id': kitchen.id,
      'category_id'   : food.id,
    })
    Item.create({
      'name'          : 'Carbonara kleng',
      'slug'          : 'Carbo sm',
      'price'         : 6,
      'sorting_nr'    : 2,
      'destination_id': kitchen.id,
      'category_id'   : food.id,
    })
    Item.create({
      'name'          : 'Bolognese All you can eat',
      'slug'          : 'Bolo xl',
      'price'         : 9,
      'sorting_nr'    : 3,
      'destination_id': kitchen.id,
      'category_id'   : food.id,
    })
    xl = Item.create({
      'name'          : 'Carbonara All you can eat',
      'slug'          : 'Carbo xl',
      'price'         : 9,
      'sorting_nr'    : 4,
      'destination_id': kitchen.id,
      'category_id'   : food.id,
    })
    # Drinks
    platt = Item.create({
      'name'          : 'Platt Waasser',
      'slug'          : 'platt',
      'price'         : 2.5,
      'sorting_nr'    : 1,
      'destination_id': bar.id,
      'category_id'   : drinks.id,
    })
    Item.create({
      'name'          : 'Spruddel Waasser',
      'slug'          : 'spruddel',
      'price'         : 2.5,
      'sorting_nr'    : 2,
      'destination_id': bar.id,
      'category_id'   : drinks.id,
    })
    cola = Item.create({
      'name'          : 'Coca-Cola',
      'slug'          : 'cola',
      'price'         : 3,
      'sorting_nr'    : 3,
      'destination_id': bar.id,
      'category_id'   : drinks.id,
    })

    mousse = Item.create({
      'name'          : 'Schokelas Mousse',
      'slug'          : 'mousse',
      'price'         : 5,
      'sorting_nr'    : 1,
      'destination_id': bar.id,
      'category_id'   : dessert.id,
    })

    order = Order.create({
      'number'        : 1,
      'waiter'        : 'TD',
      'table'         : 'A1',
      'comment'       : 'test1',
      'destination_id': kitchen.id,
    })
    order2 = Order.create({
      'number'        : 2,
      'waiter'        : 'TD',
      'table'         : 'B2',
      'comment'       : 'test2',
      'destination_id': kitchen.id,
    })
    order3 = Order.create({
      'number'        : 1,
      'waiter'        : 'TD',
      'table'         : 'X1',
      'comment'       : 'tst3',
      'destination_id': bar.id,
    })

    ItemOrder.create({
      'quantity': 1,
      'order_id': order.id,
      'item_id' : sm.id,
    })
    ItemOrder.create({
      'quantity': 3,
      'order_id': order.id,
      'item_id' : xl.id,
    })
    ItemOrder.create({
      'quantity': 1337,
      'order_id': order2.id,
      'item_id' : sm.id,
    })

    ItemOrder.create({
      'quantity': 2,
      'order_id': order3.id,
      'item_id' : cola.id,
    })
    ItemOrder.create({
      'quantity': 1,
      'order_id': order3.id,
      'item_id' : mousse.id,
    })
    ItemOrder.create({
      'quantity': 1,
      'order_id': order3.id,
      'item_id' : platt.id,
    })

    pass
