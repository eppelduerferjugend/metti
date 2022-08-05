from fastapi import APIRouter, Depends, HTTPException

from metti import crud
from sqlalchemy.orm import Session
from metti import schemas
from metti.dependencies import get_db

router = APIRouter()


@router.get('/', response_model=list[schemas.Category])
async def read_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
  return crud.get_categories(db, skip=skip, limit=limit)


@router.get('/{category_id}', response_model=schemas.Category)
async def get_category(category_id: int, db: Session = Depends(get_db)):
  category = crud.get_category(db, category_id)
  if not category:
    raise HTTPException(status_code=404, detail="Not found")

  return category
