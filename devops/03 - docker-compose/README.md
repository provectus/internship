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

> I defenetly know the diff but better explained here — https://dockerlabs.collabnix.com/beginners/difference-compose-dockerfile.html

2. How do I parameterize compose for different environments?

> using environments vars?

3. What types of entities are used in docker-compose and for what purpose?

> sorry, don't get the questions, there are a lot of entities :)
> Usually I'm using `service`, `volume`, `environment`
> More info https://docs.docker.com/compose/

4. `*` How to output application logs?

> docker-compose logs flaskapp

5. `*` How to copy\upload a file from host machine to the container?

> docker cp or using `COPY hom* /mydir/` in Dockerfile

6. `*` How to save file changes made inside the container?

> using volumes?

## Tasks

* Docker-compose has a bug - investigate it! What would you improve?

* Docker-compose with an environment file. Create 2 different environment files for docker-compose

> for the prod env run would be `source env_file.prod && docker-compose up -d`, not sure this is a valid solution

* `*` Change the `docker-compose.yml` to run through dockerstack with code reuse (don't repeat yourself)

> sorry, didn't do it

