## Prerequsite

* Docker 19.03 or greater

## Legend

A go web application that outputs container_id(hostname) and access count.
There is a dockerfile and application code in current folder.
You need to optimize the Dockerfile by correcting or adding steps.

## Questions

1. What is Docker? Which technology is it based on?
	- Docker is a tool that allows developers to delploy their applications in containers (simulation) to run on th host operating system. Docker is written in Go, uses several features of the Linux kernel, uses `namespace` to provide container

2. Look at the Docker file – what would you change in it?
	- Based on my current limited knowledge, I'll change `FROM golang:1.15`  to `FROM golang:alpine` for smaller size

3. How do I pass variables to the Docker file when building and running the container?
	- When  running `-e name=value`, when building `docker build --build-arg PORT=8888` must have `ARG ${PORT}` in the Dockerfile


4. Why do we need multistage build ?
	- Multistage build will result in a smaller image, which leaves less room for potential security vulnerability and surface area for attack

## Tasks

* Dockerfile - generate .env file inside Dockerfile, provide value of port at build step. (Done)

* Multi-stage build – change the Dockerfile to make it multi-stage. Try to get the lowest container size. (Done)

* Compare size of docker images with and without multistage build.
	* Without multistage build: **858MB**, with multistage build **11.9MB**

* Write down all commands which you have used.
	* `docker build -t simple-webpage`
	* `docker images | grep simple-webpage`
	* `docker run -d -P -p 8080:8080 --name simple-website simple-website`
	* `docker run -d -P -p 8888:8888 --name multistaged multistaged-website`
	* `docker ps`
	* `docker container prune`
	* `docker port simple-website`
	* `docker stop simple-website`
	* `docker build -t c1 --build-arg PORT=8888 .`
	* `docker rmi -f c1`