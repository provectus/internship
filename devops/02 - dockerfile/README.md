## Prerequsite

* Docker 19.03 or greater

## Legend

A node.js application that outputs "Hello world!". 
There is a dockerfile and application code in example/app.js.
You need to optimize the Dockerfile by correcting or adding steps, rewrite the dockerfile to output `Hello ${ENV}`, where `${ENV}` is set via ENV in dockerfile and it is set to the ip address of the running container.

## Questions

1. What is Docker? Which technology is it based on?

Docker is a lightweight virtualization framework, it was based on the Linux Containers technology (which is based on cgroups and chroot provided by linux kernel). Docker containers are run in isolation but on a single kernel.

2. Look at the Docker file – what would you change in it?

#### Answer
* apache2 is never used and the app seems to work without it, so I'd leave it out, but maybe I don't know something
* It is better to put directives that install dependecies towards the beginning of `Dockerfile`. Since they don't change often docker daemon will mostly use cached layers on these statements reducing build time significantly.
* We can separate `Dockerfile` into two stages: creating a base image for the application and installing and running the application

3. How do I pass variables to the Docker file when building and running the container?

#### Answer
* you can pass build arguments to using `--build-arg` flag on `docker build`
* `-e` or `env` flag to pass environment variables on `docker run` as well as flags to pass environment variables from a file

## Tasks

* Dockerfile - Hello ${ENV}, where env is the ip address

* Multi-stage build – change the Dockerfile to make it multi-stage.

