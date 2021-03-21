## Prerequsite

* Docker 19.03 or greater

## Legend

A node.js application that outputs "Hello world!". 
There is a dockerfile and application code in example/app.js.
You need to optimize the Dockerfile by correcting or adding steps, rewrite the dockerfile to output `Hello ${ENV}`, where `${ENV}` is set via ENV in dockerfile and it is set to the ip address of the running container.

## Questions

1. What is Docker? Which technology is it based on?

    Docker is a software platform for building applications based on containers — small and lightweight execution environments that make shared use of the operating system kernel in much the same way that machine virtualization enables multiple virtual machines to share the resources of a single hardware server but otherwise run in isolation from one another.
2. Look at the Docker file – what would you change in it?

    1. latest version of the NodeJS image will change over time and could introduce breaking changes. We can easily fix this by using a more specific tag for the base image. In addition we can use slimmer version of node, this action decreases the size of our image.
    2. By dividing the copy of the application into 2 COPY instructions (one for the `package.json` file and the other for the rest of the files) and running the `npm install` instruction before adding the actual code, any code change will not trigger the `RUN npm install` instruction, only changes of the `package.json` will trigger it.
    3. Delete unnecessary package `apache2`. It is not used anywhere.
    4. In `supervisord.conf` we have sshd daemon, so we we need to expose port for this process in order to connect.
    5. Move installation of the packages to the beginning, so if we change something in the code, it will not install packages again.

    Suggestion of optimized `Dockerfile`:
    ```docker
    FROM node:15.12.0-buster-slim
    RUN apt-get update && apt-get install -y openssh-server supervisor
    RUN mkdir -p /var/run/sshd /var/log/supervisor
    COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
    WORKDIR /usr/src/app
    COPY example/package*.json ./
    RUN npm install
    COPY example/app.js ./
    EXPOSE 22 3000
    CMD ["/usr/bin/supervisord"]
    ```

3. How do I pass variables to the Docker file when building and running the container?

    While building:

    ```docker
    ARG VAR1=1
    ENV HOST=$VAR1
    ```

    `docker build --build-arg VAR1=VAL1 -t <imagename> .`


    While running:

    `docker run --env HOST=VAL1 -t <imagename>`


## Tasks

* Dockerfile - Hello ${ENV}, where env is the ip address

    Dockerfile:
    ```docker
    FROM node:15.12.0-buster-slim
    RUN apt-get update && apt-get install -y openssh-server supervisor
    RUN mkdir -p /var/run/sshd /var/log/supervisor
    COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
    WORKDIR /usr/src/app
    COPY example/package*.json ./
    RUN npm install
    COPY example/app.js ./
    ENV HOST=
    EXPOSE 22 3000
    CMD ["/usr/bin/supervisord"]
    ```

    For this question I assumed that I am asked to assign static IP address to newly created container. Usually this work is done automatically by docker Daemon, it serves as a DHCP server for running containers and assigns IP addresses from the available address pool.

    In order to make this by my own hands I need to create subnetwork and assign static IP address to the newly created container from the pool of addresses of this subnetwork.

    Commands for passing the ip of the docker container as ENV variable:
    `docker build -t 02 .`
    `docker network create --subnet=192.18.0.0/16 mynet123`
    `docker run --net mynet123 --ip 192.18.0.22 -p 3000:3000 --env HOST=192.18.0.22 -t 02`
* Multi-stage build – change the Dockerfile to make it multi-stage.
    ```docker
    # Basic image configuration
    FROM node:15.12.0-buster-slim AS base
    RUN apt-get update && apt-get install -y openssh-server supervisor
    RUN mkdir -p /var/run/sshd /var/log/supervisor
    WORKDIR /usr/src/app
    # Set empty HOST variable, will be set on docker run command execution
    ENV HOST=
    COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

    # Installing node dependencies
    FROM base AS dependencies
    # Copy the dependencies
    COPY example/package*.json ./
    # Install dependencies
    RUN npm install

    # Run application
    FROM dependencies AS run
    # Copy the application source code
    COPY example/app.js ./
    # Expose 22 port for SSHd and 3000 port for node.js
    EXPOSE 22 3000
    # Run application and ssh daemon
    CMD ["/usr/bin/supervisord"]
    ```


