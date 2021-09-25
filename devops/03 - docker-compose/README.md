## Prerequsite

Docker 19.03 or greater

Docker-compose 1.26 or greater

## Legend

Docker compose with 3 applications (frontend + backend + DB).

### Instructions for running

1. Bootstrap the DB and boot up the cluster

`docker-compose up -d`

2. Browse to localhost:8080 to see the app in action.

## Questions

1. What is the difference between Docker Compose and dockerfile? Why do I need Docker Compose?

dockerfile is needed to describe how to build images, but docker compose is needed to describe how to run containers.

2. How do I parameterize compose for different environments?

create .env file with environment variables and use the vars from this file in docker-compose.yml file.

3. What types of entities are used in docker-compose and for what purpose?

version - version of docker-compose

services - services/applications to start in docker containers

db/flaskapp/nginx - containers names

image - docker images for services

volumes - volumes that storaged in docker outside containers for using inside containers

env_file - file in which described environment variables to export them inside container.

networks - networks in which container will have interface

depends_on - services which needed to be started before starting current service

command - command which will be executed after starting conatiner

ports - describing port translations

db_nw/web_nw - describing networks

driver - selecting driver for network interfaces in used network

4. `*` How to output application logs?

sudo docker-compose logs SERVICE

5. `*` How to copy\upload a file from host machine to the container?

in Dockerfile: COPY /srcPath/srcFile ./dstPath

in dockercompose: volumes: - /srcPath/srcFile:/dstPath/dstFile

on run: docker cp /srcPath/srcFile containerName:/dstPath

6. `*` How to save file changes made inside the container?

we can use volume, upload file from container to host machine, use shared folder, save container to image


## Tasks

* Docker-compose has a bug - investigate it! What would you improve?

There is a little bug with NGINX config. Also I edited Dockerfile and docker-compose.yml
to build and run application with only "docker-compose up -d" 
(but I added wait-for-it.sh script, recommended on docs.docker.com to make dependences between services and
execute commands on flaskapp to create DB after database start)

* Docker-compose with an environment file. Create 2 different environment files for docker-compose

I added environments to docker-compose file. Now it uses env_file and .env files.

* `*` Change the `docker-compose.yml` to run through dockerstack with code reuse (don't repeat yourself)

I edited docker-compose.yml, so now it can work with docker-compose and docker-stack (check this with
docker swarm with 1 host)
