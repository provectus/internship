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

    Dockerfile contains all commands to build the docker image.
    Docker Compose is a tool for defining and running multi-container Docker applications.
    We need docker compose to build and/or run our docker images together in an isolated environment.

2. How do I parameterize compose for different environments?

    To parameterize compose for different environments we can use environment files and call them when running the compose for required environment
    For example, if we want to run docker-compose for production environment and we have production.env file with all production variables inside, with the following command: docker-compose --env-file=production.env up -d

3. What types of entities are used in docker-compose and for what purpose?

    version - docker compose version
    services - contains configuration that is applied to each container started for that service
    volumes - contains volumes that should be created and/or mounted
    secrets - contains secrets definition
    networks - contains network definition

    For more information visit https://docs.docker.com/compose/compose-file/compose-file-v3/

4. `*` How to output application logs?

    To output application logs the application itself should be able or should be configured to write its logs into /dev/stdout of the docker container, and then these logs will be accessible via docker logs <container-id> command
    To show logs in the realtime use the following command: docker logs -f <container-id>

4. `*` How to copy\upload a file from host machine to the container?

    To copy\upload a file from host machine to the container use the following command: docker cp <path to file on host machine> <container id>:<path on container>
    Example: docker cp dev.env 380decf20f47:/tmp/

5. `*` How to save file changes made inside the container?

    To save file changes made inside the container there are two ways:
    1. commit changes and create a new container from the new docker image:

    docker commit <container_id> <new_image_name>:<tag_name>

    2. attache volume from host to container so all changes in this volume will be persistent as they are storing on the host machine

## Tasks

* Docker-compose has a bug - investigate it! What would you improve?
    Completed. Docker-compose manifest improved
* Docker-compose with an environment file. Create 2 different environment files for docker-compose
    Completed. Environment files are dev.env and stg.env

    Run start_with_docker_compose.sh with one of the .env files as input:
    bash start_with_docker_compose.sh dev.env

* `*` Change the `docker-compose.yml` to run through dockerstack with code reuse (don't repeat yourself)
