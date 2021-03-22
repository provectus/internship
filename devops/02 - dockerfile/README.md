## Prerequsite

* Docker 19.03 or greater

## Legend

A node.js application that outputs "Hello world!". 
There is a dockerfile and application code in example/app.js.
You need to optimize the Dockerfile by correcting or adding steps, rewrite the dockerfile to output `Hello ${ENV}`, where `${ENV}` is set via ENV in dockerfile and it is set to the ip address of the running container.
***
## Questions

1. What is Docker? Which technology is it based on?

    - Docker is an open platform for developing, shipping, and running applications. Docker allows to separate applications from infrastructure so it makes possible to deliver software quickly.

2. Look at the Docker file – what would you change in it?
    - create /app directory change workdir to it
    - change image fro latest to lts-alpine
        - reduces image size from 987MB to 119MB
    - change ADD syntax slightly
    - change user to node1

    - add .dockerignore to reduce the number of COPY commands and optimize build time
    - add VOLUME [ "/var/log/supervisor" ] to persist container logs

    - remove apache server because it is unnecessary and should be separated to another container
    - remove openSSH server because using SSH to connect to container is considered a security risk and bad practice

3. How do I pass variables to the Docker file when building and running the container?
    - Pass variables as arguments during build:

        We need to use an ARG statement to define an argument and optionally set a default value.

        Syntax:

            docker build --build-arg [argument]=[value] -t [image tag] [context(.)]

    - Pass variables as environment variables when running a container:
            
            docker run -e [varname]=[value] ...other arguments
***
## Tasks

- [X] * Dockerfile - Hello ${ENV}, where env is the ip address

- [X] * Multi-stage build – change the Dockerfile to make it multi-stage.
