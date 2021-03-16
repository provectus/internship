FROM python:3

MAINTAINER Ameya Lokare <lokare.ameya@gmail.com>

ENV PYTHONUNBUFFERED 1

WORKDIR /opt/services/flaskapp/src

# We copy the requirements.txt file first to avoid cache invalidations
COPY requirements.txt .

RUN pip install -r requirements.txt

COPY *.py ./

COPY templates ./templates/

EXPOSE 5090

CMD ["/usr/local/bin/python", "app.py"]
