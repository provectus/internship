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

    docker compose is a small container orchestrator tool to bind all our project containers together along with all volumes, networks, env variables, startup order etc. It accepts instructions to build and run our containers in declarative form (yml file). We need it for easier maintaining of our applications running together. Dockerfile is just an instruction to build particular container image.

2. How do I parameterize compose for different environments?

    Store all basic settings in `docker-compose.yml`. Add additional compose file for each env like `docker-compose.staging.yml`, `docker-compose.prod.yml` and declare necessary settings like database link, environment variables etc. in those files. Deploy apps with passing additional file, for example for staging env: `docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d`

    Another option is to use different environment files and pass it dynamically (part of my task #2)

3. What types of entities are used in docker-compose and for what purpose?

    In our case:

    services - containers and instructions how to build and run them

    networks - network names and types, used to isolate or communicate containers

    volumes - used to store persistent data, for example database or external logs

4. `*` How to output application logs?

    Use service name and `logs` command, our case: `docker-compose logs -f flaskapp`

5. `*` How to copy\upload a file from host machine to the container?

    `docker cp` or, better way (docker-compose volume way):

    Use volume mounts from host dir to container dir, like in our example: `./conf.d:/etc/nginx/conf.d`. Put any file to host dir (conf.d) and file will appear in container.

6. `*` How to save file changes made inside the container?

    Use volumes to save data even when container dies.


## Tasks

* Docker-compose has a bug - investigate it! What would you improve?

    Bug in nginx config - incorrect redirect (fixed now). Application code should be consistent, no need to mount host volume with application code to container, code is copied during docker build process already. Another improvement can be - specify compose minor version, '3' is equal to '3.0', so to be able to use all latest features its better to specify it like '3.8' for example. If we want to run containers together non-locally (in cluster), we should avoid using bridge network and use overlay instead.

* Docker-compose with an environment file. Create 2 different environment files for docker-compose

    Added 2 env files - dev and stg. Instructions to run is to add `ENVIRON=value` before each command:

    `ENVIRON=dev docker-compose up -d db`

    `ENVIRON=dev docker-compose run --rm flaskapp /bin/bash -c "cd /opt/services/flaskapp/src && python -c 'import database; database.init_db()'"`

    `ENVIRON=dev docker-compose up -d`

* `*` Change the `docker-compose.yml` to run through dockerstack with code reuse (don't repeat yourself)

    New file is created - `docker-stack.yml`

    1. Switch docker to swarm mode `docker swarm init`

    2. Build flaskapp image (docker stack dont support `build` section): `docker build -t flaskapp .`

    3. Deploy stack `ENVIRON=dev docker stack deploy --compose-file docker-stack.yml appstack`

    4. Init DB `docker exec -it CHANGE_THIS_TO_FLASKAPP_CONTAINER_NAME /bin/bash -c "cd /opt/services/flaskapp/src && python -c  'import database; database.init_db()'"`

    5. Browse to localhost:8080 to see the app in action.
