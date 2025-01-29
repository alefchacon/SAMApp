FROM python:3.11

RUN mkdir /dependencias
COPY requeriments.txt /dependencias
RUN pip install -r /dependencias/requeriments.txt

ENV PATH_PREFIX=""
ENV DATABASE_HOST=""
ENV DATABASE_NAME=""
ENV DATABASE_USER=""
ENV DATABASE_PASSWORD=""
ENV DATABASE_PORT=5432
ENV SECRET_KEY=""

RUN mkdir /code
COPY . /code
WORKDIR /code



RUN useradd -s /bin/bash desarrollador
RUN chown -R desarrollador /code

COPY run.sh /code/run.sh
RUN chmod +x /code/run.sh

CMD ./run.sh

