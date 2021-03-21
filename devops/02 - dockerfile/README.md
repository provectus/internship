## Prerequsite

* Docker 19.03 or greater

## Legend

A node.js application that outputs "Hello world!". 
There is a dockerfile and application code in example/app.js.
You need to optimize the Dockerfile by correcting or adding steps, rewrite the dockerfile to output `Hello ${ENV}`, where `${ENV}` is set via ENV in dockerfile and it is set to the ip address of the running container.

## Questions

1. What is Docker? Which technology is it based on?

Docker is the name for both a company and a technology that is based on containerization, in other words, it virtualizes OS. This technology allows making the best use of infrastructure in the need of running several processes separately from each other.

2. Look at the Docker file – what would you change in it?

Following the guidelines from Dockerfile best practices (https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

Get rid of node and use alpine
Create requirements.txt and relocate the installs there
Sort multiline arguments
That is already listed in the task - use multi-stage builds 

3. How do I pass variables to the Docker file when building and running the container?

Setting ENV Values either statically (hardcoding) or dynamically (using ARG, command line substitution)

## Tasks

* Dockerfile - Hello ${ENV}, where env is the ip address

Since the ENV values are set before the ip address is assigned to the container, the only way to complete the specified task is to use some pre-defined ip:

In the Dockerfile specify:
ENV HOST 10.10.10.10

Run the container with the following parameters
docker run -itd --network=my-net --ip=10.10.10.10 my_container 

* Multi-stage build – change the Dockerfile to make it multi-stage.

