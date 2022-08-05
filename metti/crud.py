from sqlalchemy.orm import Session

from metti import models, schemas


def get_category(db: Session, category_id: int):
  return db.query(models.Category) \
    .filter(models.Category.id == category_id) \
    .first()


def get_categories(db: Session, skip: int = 0, limit: int = 0):
  return db.query(models.Category) \
    .offset(skip) \
    .limit(limit) \
    .all()


def create_category(db: Session, category: schemas.CategoryCreate):
  db_category = models.Category(**category)
  db.add(db_category)
  db.commit()
  db.refresh(db_category)
  return db_category


def get_destination(db: Session, destination_id: int):
  return db.query(models.Destination) \
    .filter(models.Destination.id == destination_id) \
    .first()


def get_destinations(db: Session, skip: int = 0, limit: int = 0):
  return db.query(models.Destination) \
    .offset(skip) \
    .limit(limit) \
    .all()


def create_destination(db: Session, destination: schemas.DestinationCreate):
  db_destination = models.Destination(**destination)
  db.add(db_destination)
  db.commit()
  db.refresh(db_destination)
  return db_destination
