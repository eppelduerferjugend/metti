"""Order Observer"""

from masoniteorm.models import Model


class OrderObserver:
    def created(self, order):
        """Handle the Order "created" event.

        Args:
            order (masoniteorm.models.Model): Order model.
        """
        pass

    def creating(self, order):
        """Handle the Order "creating" event.

        Args:
            order (masoniteorm.models.Model): Order model.
        """
        pass

    def saving(self, order):
        """Handle the Order "saving" event.

        Args:
            order (masoniteorm.models.Model): Order model.
        """
        pass

    def saved(self, order):
        """Handle the Order "saved" event.

        Args:
            order (masoniteorm.models.Model): Order model.
        """
        pass

    def updating(self, order):
        """Handle the Order "updating" event.

        Args:
            order (masoniteorm.models.Model): Order model.
        """
        pass

    def updated(self, order):
        """Handle the Order "updated" event.

        Args:
            order (masoniteorm.models.Model): Order model.
        """
        pass

    def booted(self, order):
        """Handle the Order "booted" event.

        Args:
            order (masoniteorm.models.Model): Order model.
        """
        pass

    def booting(self, order):
        """Handle the Order "booting" event.

        Args:
            order (masoniteorm.models.Model): Order model.
        """
        pass

    def hydrating(self, order):
        """Handle the Order "hydrating" event.

        Args:
            order (masoniteorm.models.Model): Order model.
        """
        pass

    def hydrated(self, order):
        """Handle the Order "hydrated" event.

        Args:
            order (masoniteorm.models.Model): Order model.
        """
        pass

    def deleting(self, order):
        """Handle the Order "deleting" event.

        Args:
            order (masoniteorm.models.Model): Order model.
        """
        pass

    def deleted(self, order):
        """Handle the Order "deleted" event.

        Args:
            order (masoniteorm.models.Model): Order model.
        """
        pass
