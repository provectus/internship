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

Dockerfile is focused on dealing with images - the commands needed to assemble an images is written in a single file in order not to execute them one by one each time.

Docker Compose is more focused on the entire application - it defines the services and their dependencies, so that they could be run together.

Dockerfile and Docker Compose are related in the following way:
First, it is necessary to create a Dockerfile for every image
Second, use Compose to assemble the images to be able to run the app by simply executing docker-compose up

2. How do I parameterize compose for different environments?

In addition to standart docker-compose.yml file create one or several override files. Then provide the necessary ones via docker-compose-up -f overridefile1.yml overridefile2.yml .... overridefileN.yml

3. What types of entities are used in docker-compose and for what purpose?

networks - specifies the networks to be created
services - contains configuration that is applied to each container started for that service
volumes - creates named volumes that can be reused across multiple services

4. `*` How to output application logs?

docker-compose logs <parameter>

parameter could be service name, container id

4. `*` How to copy\upload a file from host machine to the container?

docker cp path/on/the/host/machine.txt container:/path/in/the/container.txt

5. `*` How to save file changes made inside the container?

use volumes or docker commit


## Tasks

* Docker-compose has a bug - investigate it! What would you improve?

The bug that I found is not directly in Docker Compose - after user submits name and email the website redirects him to http://localhost%2Clocalhost:8080/success, while it should simply be http://localhost:8080/success. This is fixed in flaskapp.conf.

* Docker-compose with an environment file. Create 2 different environment files for docker-compose

* `*` Change the `docker-compose.yml` to run through dockerstack with code reuse (don't repeat yourself)

