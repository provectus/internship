## Prerequsite

* Docker 19.03 or greater

## Legend

A go web application that outputs container_id(hostname) and access count.
There is a dockerfile and application code in current folder.
You need to optimize the Dockerfile by correcting or adding steps.

## Questions

1. What is Docker? Which technology is it based on?
- Docker is a software development platform, the idea of it is that you can develope and deploy your apps (codes) and package them into a unit called a container.
- Docker is written in Go, uses several features of the Linux kernel

2. Look at the Docker file – what would you change in it?
 - I would use alpine, make all the copies at the same line and apply multi-stages

3. How do I pass variables to the Docker file when building and running the container?
- when building you use `docker build --build-arg <variable>=<value>` and inside Docker file `ARG=${<variable>}`
- when running, `docker run -e <variable>=<value>`

4. Why do we need multistage build ?
- To minimize the size of the final container, improve run time performance, allow for better organization of Docker 

## Tasks

* Dockerfile - generate .env file inside Dockerfile, provide value of port at build step. Done in Dockerfile

* Multi-stage build – change the Dockerfile to make it multi-stage. Try to get the lowest container size. Done in Dockerfile

* Compare size of docker images with and without multistage build.<br />
without multistage build the size was 858MB but with the multistage build the size became 11.9MB <br />
Note: In addition, we could use FROM scratch instead of FROM alpine, it would decrease the size more (until  6.34MB) but at the same time, but alpine still have sh shell so you can still have more debugging stabilities and of course you can install packages because alpine has a package manager so I prefer to go with alpine <br />

* Write down all commands which you have used.
- `docker build -t webserver`
- `docker images | grep webserver`  you can here check the size
- `vime Dockerfile`
- `docker run -d -P -p 8080:8080 --name webserver webserver`
- `docker ps`
