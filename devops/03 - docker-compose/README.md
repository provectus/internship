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

    A Dockerfile is a document that contains all the commands to assemble an image.

    Docker Compose is a tool for defining and running multi-container Docker applications on one machine. With compose we use a YAML file to configure all application’s services(including networks, volumes, ports, dependencies and etc.). Then, with a single command, we are able to create and start all the services from the configuration. 

2. How do I parameterize compose for different environments?

    For each environment we having different docker compose that include appropriate environment files.
    A common naming for docker composes:
    ```python
    docker-compose.yml # basic configuration
    docker-compose.dev.yml # configuration for development
    docker-compose.prod.yml # configuration for production
    ```
    There are a lot of others for staging, CI and etc. However we will look at this example.

    To deploy with development compose file:

    `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

    To deploy with production compose file:

    `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

3. What types of entities are used in docker-compose and for what purpose?

    **services**: list of services that will be used

    **image**: the image name built from Dockerfile or the image from DockerHub

    **build**: contains a path to the build context

    **volumes**: maps folders/files to our machine

    **networks**: run containers in one network

    **depends_on**: wait for another service to start up

    **env_file**: upload environment file

    **ports**: maps machine ports to docker ports

4. `*` How to output application logs?

4. `*` How to copy\upload a file from host machine to the container?

5. `*` How to save file changes made inside the container?


## Tasks

* Docker-compose has a bug - investigate it! What would you improve?

    Remove flask app sources, they are already present in the dockerfile image of that app:
    ```docker
    volumes:
      - .:/opt/services/flaskapp/src
    ```

    Nginx config also has a bug. Host is defined twice.

    There was another bug in `database.py`:
    ```python
    engine = create_engine('postgres://%s:%s@%s:%s/%s' % (user, pwd, host, port, db))
    # changed to postgresql, because there is no postgres engine
    engine = create_engine('postgresql://%s:%s@%s:%s/%s' % (user, pwd, host, port, db))
    ```

* Docker-compose with an environment file. Create 2 different environment files for docker-compose

    I assume that 2 different environment files for docker-compose are for development and production purposes.

    For production:
    `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
    For development:
    `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

* `*` Change the `docker-compose.yml` to run through dockerstack with code reuse (don't repeat yourself)

