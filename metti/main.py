from fastapi import FastAPI

from metti import models
from metti.database import engine
from metti.routers import category, destination

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
  title='Spaghettisfest - Metti',
  description='Serving your spaghetti',
  version='2.0.0',
  contact={
    'name' : 'Thierry',
    'email': 't@io.lu',
  }
)

app.include_router(category.router, prefix='/category')
app.include_router(destination.router, prefix='/destination')
