# pull the official docker image
FROM python:3.9.13-slim

# set work directory
WORKDIR /app

# install dependencies
COPY . .
RUN pip install -e .