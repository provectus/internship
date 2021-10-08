## Prerequsite

Docker 19.03 or greater

Docker-compose 1.26 or greater

## Legend

Docker compose with 3 applications (frontend + backend + DB).

### Instructions for running

1. Bootstrap the DB:

`docker-compose up -d db`

`docker-compose run --rm flaskapp /bin/bash -c "cd /opt/services/flaskapp/src && python -c  'import database; database.init_db()'"`

2. Boot up the cluster

`docker-compose up -d`

3. Browse to localhost:8080 to see the app in action.

## Questions

1. What is the difference between Docker Compose and dockerfile? Why do I need Docker Compose?
   - Dockerfile is an instruction on how to build an image, Docker Compose is a tool for defining how to run and run multiple Docker containers

2. How do I parameterize compose for different environments?
   - Put `VAR=VAL` in the `.env` file and replace `VAR=VAL` with `${VAR}`in the `docker-compose.yml`, compose will automatically look for the `.env` files to fill in the values

3. What types of entities are used in docker-compose and for what purpose? (I'm not sure I understand the task correctly, my best guess here is the world "entities" means "keywords elements")
   - services: containers' configuration
   - images: for pulling an image
   - build: for building image
   - expose: configure networking
   - volumes: configure persistence data
   - depend_on: configure dependencies
   - ...

4. `*` How to output application logs?

5. `*` How to copy\upload a file from host machine to the container?

6. `*` How to save file changes made inside the container? Specify which file of the container to mount to the local host by `volume`


## Tasks

* Docker-compose has a bug - investigate it! What would you improve? Based on my current limited knowledge, I couldn't find any bug with in the `docker-compose.yml` file, but when I was messing around with the login form I discover that I can not submit the form, and the server throws an error. For start, I would change the path volumes to "named volume"

* Docker-compose with an environment file. Create 2 different environment files for docker-compose. (This task is not clear for me)

* `*` Change the `docker-compose.yml` to run through dockerstack with code reuse (don't repeat yourself)

