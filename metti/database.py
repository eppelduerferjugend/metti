from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .utils import config
import os

db = config['db']

# SQLALCHEMY_DATABASE_URL = f'postgresql://{db["user"]}:{db["password"]}@{db["host"]}/{db["database"]}'


engine = create_engine(os.environ['DATABASE_URL'])
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
