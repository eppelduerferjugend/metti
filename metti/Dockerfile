FROM python:3.9
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./metti /code/metti
CMD ['uvicorn', 'metti.server:app', '--proxy-headers', '--host', '0.0.0.0', '--port', '3911']