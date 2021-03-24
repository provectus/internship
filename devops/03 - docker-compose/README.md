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
Docker Compose is for running containers that depends on each other together and link them via network. Dockerfile is for building one container image.
I need docker compose in this example to run 3 app containers in proper start order (postgres,flask,nginx) and link them via network.

2. How do I parameterize compose for different environments?
Use shell environment variables in compose file (and/or provide .env file with variables)
docker-compose --env-file {file1.env}

3. What types of entities are used in docker-compose and for what purpose?
services: apps to run in containers, each service may include:
	build: specify dockerfile to build image or
	image: specify docker image to run
	ports: bind container and host machine to the port
	networks: set up networks for containers
	volumes: mounts host directory to container directory

4. `*` How to output application logs?
docker service logs {service}

4. `*` How to copy\upload a file from host machine to the container?
specify volumes in docker-compose file so you have binded directory with updated files or
login via ssh and use scp

5. `*` How to save file changes made inside the container?
use docker commit to create new image

## Tasks

* Docker-compose has a bug - investigate it! What would you improve?
done
* Docker-compose with an environment file. Create 2 different environment files for docker-compose
done
* `*` Change the `docker-compose.yml` to run through dockerstack with code reuse (don't repeat yourself)

