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

Dockerfile is a text file that contains commands to build an image. Docker Compose is a tool to build and run multi-container dockers applications.
We need Docker Compose here because we want to put database, the app itself and ngnix server in separate containers.

2. How do I parameterize compose for different environments?

- Put `${VARIABLE}` in docker-compose.yaml instead of desired value, where `VARIABLE` is the key from `.env` file.
- Use `export VARIABLE=new` in command line to set new value of `VARIABLE`.
- Use `docker-compose --env-file [path].env.dev up` in command line to substitute default env file by `[path].env.dev`.

3. What types of entities are used in docker-compose and for what purpose?

- version - version of the Compose file format
- services - list of containers we want to run
- image - pull image for the container
- volumes - map files from host to container
- networks - specify custom network for service
- depends-on - dependency between services
- ports - define ports for the service

4. `*` How to output application logs?

- `docker logs` - see information logged by a running container
- `docker service logs` - see information logged by all containers participating in a service
- set up logging from docker-compose.yaml:
```
logging:
  driver: 
  options:
```

4. `*` How to copy\upload a file from host machine to the container?

- using command line

`docker cp <src-path> <container>:<dest-path> `

- using docker-compose.yml

```    
volumes:
  - <src-path>:<dest-path>
```

5. `*` How to save file changes made inside the container?

- copy a file from the container to the local file system via command line

`docker cp <container>:<src-path> <local-dest-path>`

-  commit the changes made to the container

`docker commit <container_id> <repo>[:<tag>]`

## Tasks

* Docker-compose has a bug - investigate it! What would you improve?

I could not find any bugs

* Docker-compose with an environment file. Create 2 different environment files for docker-compose

I created two environment files: `.env` and `.env.dev`. By default docker uses values from `.env` file, 
but we can use the following command to use values from another environment file:
`docker-compose --env-file .env.dev up`

* `*` Change the `docker-compose.yml` to run through dockerstack with code reuse (don't repeat yourself)

