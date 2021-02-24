## Prerequsite

* Docker 19.03 or greater

## Legend

A node.js application that outputs "Hello world!". 
There is a dockerfile and application code in example/app.js.
You need to optimize the Dockerfile by correcting or adding steps, rewrite the dockerfile to output `Hello ${ENV}`, where `${ENV}` is set via ENV in dockerfile and it is set to the ip address of the running container.

## Questions

1. What is Docker? Which technology is it based on?

2. Look at the Docker file – what would you change in it?

3. How do I pass variables to the Docker file when building and running the container?

## Tasks

* Dockerfile - Hello ${ENV}, where env is the ip address

* Multi-stage build – change the Dockerfile to make it multi-stage.

