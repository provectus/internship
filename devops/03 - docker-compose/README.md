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

Docker Compose is a tool for defining and running multi-container Docker applications, it is used to decribe a network of containers. It is convenient to organize several containers that work together to provide some service.

2. How do I parameterize compose for different environments?

Use environment variables inside compose file, they can be pulled from .env by default or some other specified file

3. What types of entities are used in docker-compose and for what purpose?

services describe the containers to be deployed and actions to be performed on them
volumes are used for presistent data
networks are used for communication between containers

4. `*` How to output application logs?
`docker logs <container-name>` or `docker-compose logs` or `docker-compose logs <service name>`

4. `*` How to copy\upload a file from host machine to the container?
* use COPY directive in Dockerfile
* mount the directory in which the file resides onto the container

5. `*` How to save file changes made inside the container?
define a volume for the container

## Tasks

* Docker-compose has a bug - investigate it! What would you improve?
configuration file for nginx had a bug - it set the Host header twice which caused flask to redirect to a wrong redirect.

Also using `postgres://` in `create_engine()` is long depricated and is no longer supported in the newest version of sqlalchemy (released on March 19) So I had to change it to `'postgresql://'` for the application to be able to run

* Docker-compose with an environment file. Create 2 different environment files for docker-compose
Done if I understood the task correctly

* `*` Change the `docker-compose.yml` to run through dockerstack with code reuse (don't repeat yourself)

