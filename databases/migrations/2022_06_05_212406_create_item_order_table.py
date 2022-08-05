"""CreateItemOrderTable Migration."""

from masoniteorm.migrations import Migration


class CreateItemOrderTable(Migration):
  def up(self):
    """
    Run the migrations.
    """
    with self.schema.create('item_order') as table:
      table.increments('id')
      table.integer('quantity')
      table.unsigned_integer('order_id')
      table.foreign('order_id').references('id').on('orders')
      table.unsigned_integer('item_id')
      table.foreign('item_id').references('id').on('items')
      table.soft_deletes()

  def down(self):
    """
    Revert the migrations.
    """
    self.schema.drop('item_order')
