## Prerequsite

* Docker 19.03 or greater

## Legend

A go web application that outputs container_id(hostname) and access count.
There is a dockerfile and application code in current folder.
You need to optimize the Dockerfile by correcting or adding steps.

## Questions

1. What is Docker? Which technology is it based on?

> Docker is an open source containerization platform based on cgroups and namespaces

2. Look at the Docker file – what would you change in it?

> Did some changes in docker file and tested it

3. How do I pass variables to the Docker file when building and running the container?

> like `docker build --build-arg PORT=5000 -t test .`

4. Why do we need multistage build?

> All things about building images is keeping the image size down and layer control of your dockerfile

## Tasks

* Dockerfile - generate .env file inside Dockerfile, provide value of port at build step.

* Multi-stage build – change the Dockerfile to make it multi-stage. Try to get the lowest container size.

* Compare size of docker images with and without multistage build.

>12283750
> vs
>858480705

* Write down all commands which you have used.

> docker build --build-arg PORT=5000 -t test .
> 
> docker run -it --entrypoint=/bin/sh test
> 
> docker inspect 742fef8ed9de e08865d7a924
