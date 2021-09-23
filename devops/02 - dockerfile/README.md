## Prerequsite

* Docker 19.03 or greater

## Legend

A go web application that outputs container_id(hostname) and access count.
There is a dockerfile and application code in current folder.
You need to optimize the Dockerfile by correcting or adding steps.

## Questions

1. What is Docker? Which technology is it based on?

2. Look at the Docker file – what would you change in it?

3. How do I pass variables to the Docker file when building and running the container?

4. Why do we need multistage build ?

## Tasks

* Dockerfile - generate .env file inside Dockerfile, provide value of port at build step.

* Multi-stage build – change the Dockerfile to make it multi-stage. Try to get the lowest container size.

* Compare size of docker images with and without multistage build.

* Write down all commands which you have used.
