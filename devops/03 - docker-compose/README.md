## Prerequsite

Docker 19.03 or grather

Docker-compose 1.26 or grather

## Legend

Docker compose with 3 applications (front + backend + DB).

### Instructions for running

1 Bootstrap the DB:

`docker-compose up -d db`

`docker-compose run --rm flaskapp /bin/bash -c "cd /opt/services/flaskapp/src && python -c  'import database; database.init_db()'"`

2 Bring up the cluster

`docker-compose up -d`

3 Browse to localhost:8080 to see the app in action.

## Questions

1 What is the difference between Docker compoz and dockerfile? Why do I need compose?

2 how do I parameterize compos for different environments?

3 What types of entities are used in docker-compose and for what purpose?

`*` 4 What command to output application logs and how to copy\upload the file to the container?

`*` 5 how to save changes made inside the container?


## Tasks

* Docker-compose with some bug - invistigate it! what you improve?

* Docker-compose with environment file. Create 2 different environment file and params docker-compose

`*` Change the docker-compose.yaml to run through dockerstack with code reuse (don't repeat yourself)

