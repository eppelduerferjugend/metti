from fastapi import APIRouter, Depends, HTTPException

from metti import crud
from sqlalchemy.orm import Session
from metti.database import SessionLocal
from metti.schemas import Destination

router = APIRouter()


# Dependency
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()


@router.get('/', response_model=list[Destination])
async def read_destinations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
  return crud.get_destinations(db, skip=skip, limit=limit)


@router.get('/{destination_id}', response_model=Destination)
async def get_destination(destination_id: int, db: Session = Depends(get_db)):
  destination = crud.get_destination(db, destination_id)
  if not destination:
    raise HTTPException(status_code=404, detail="Not found")
  return destination
