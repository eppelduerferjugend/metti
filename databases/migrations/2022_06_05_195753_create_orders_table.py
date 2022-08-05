"""CreateOrdersTable Migration."""

from masoniteorm.migrations import Migration


class CreateOrdersTable(Migration):
  def up(self):
    """
    Run the migrations.
    """
    with self.schema.create('orders') as table:
      table.increments('id')
      table.integer('number')
      table.string('waiter')
      table.string('table')
      table.text('comment').nullable()
      table.datetime('completed_at').nullable()
      table.unsigned_integer('destination_id')
      table.foreign('destination_id').references('id').on('destinations')
      table.soft_deletes()

  def down(self):
    """
    Revert the migrations.
    """
    self.schema.drop('orders')
