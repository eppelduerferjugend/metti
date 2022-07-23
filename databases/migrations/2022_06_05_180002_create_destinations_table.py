"""CreateDestinationsTable Migration."""

from masoniteorm.migrations import Migration


class CreateDestinationsTable(Migration):
  def up(self):
    """
    Run the migrations.
    """
    with self.schema.create('destinations') as table:
      table.increments('id')
      table.string('name')
      table.text('description').nullable()
      table.soft_deletes()

      table.timestamps()

  def down(self):
    """
    Revert the migrations.
    """
    self.schema.drop('destinations')
