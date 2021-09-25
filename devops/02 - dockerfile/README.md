## Prerequsite

* Docker 19.03 or greater

## Legend

A go web application that outputs container_id(hostname) and access count.
There is a dockerfile and application code in current folder.
You need to optimize the Dockerfile by correcting or adding steps.

## Questions

1. What is Docker? Which technology is it based on?

Docker is an application manager with container support. It is based on the LXC technology.

2. Look at the Docker file – what would you change in it?

I've added Multi-staging and creating .env file inside container.

3. How do I pass variables to the Docker file when building and running the container?

Through the .env file.

4. Why do we need multistage build ?

Because we don't need golang environment in a resulting image. One container - one application.

## Tasks

* Dockerfile - generate .env file inside Dockerfile, provide value of port at build step.

Done

* Multi-stage build – change the Dockerfile to make it multi-stage. Try to get the lowest container size.

6.7 MB

* Compare size of docker images with and without multistage build.

without multi-staging it was 858 MB, but with this one it became 6.7 MB

* Write down all commands which you have used.

cat .env

nano Dockerfile

docker pull golang:1.15

rm .env

docker build -t webcounter:1.0 .

docker run -d --name worker -p80:8888 webcounter:1.0

docker stop worker

nano README.md

git add .

git commit -m "02 - dockerfile"
