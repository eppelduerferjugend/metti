"""CreateItemsTable Migration."""

from masoniteorm.migrations import Migration


class CreateItemsTable(Migration):
  def up(self):
    """
    Run the migrations.
    """
    with self.schema.create('items') as table:
      table.increments('id')
      table.string('name')
      table.string('slug').nullable()
      table.string('color').nullable()
      table.double('price').nullable()
      table.integer('sorting_nr')
      table.unsigned_integer('destination_id')
      table.foreign('destination_id').references('id').on('destinations')
      table.unsigned_integer('category_id')
      table.foreign('category_id').references('id').on('categories')
      table.soft_deletes()

      table.timestamps()

  def down(self):
    """
    Revert the migrations.
    """
    self.schema.drop('items')
