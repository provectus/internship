## Prerequsite

* Docker 19.03 or greater

## Legend

A node.js application that outputs "Hello world!". 
There is a dockerfile and application code in example/app.js.
You need to optimize the Dockerfile by correcting or adding steps, rewrite the dockerfile to output `Hello ${ENV}`, where `${ENV}` is set via ENV in dockerfile and it is set to the ip address of the running container.

## Questions

1. What is Docker? Which technology is it based on?
```
A platform that uses OS level virtualization for packing apps in containers
Namespaces, cgroups, overlay filesystems
```

2. Look at the Docker file – what would you change in it?
```
Use slimmer base image
Move up static instructions like CMD, WORKDIR or EXPOSE. So that when we change source files only the last layers get updated
```

3. How do I pass variables to the Docker file when building and running the container?
```
When building:
ARG KEY1=VAL1
ENV KEY1 ${KEY1}
docker build --build-arg KEY1=MY_NEW_VAL1 .

When running:
docker run --env KEY1=VAL1 --env KEY2=VAL2 -ti ubuntu
```

## Tasks

* Dockerfile - Hello ${ENV}, where env is the ip address

```
!!!
There is now way to get the IP address of the running container and set it in Dockerfile as ENV because this IP is unknown when building image.
It's assigned after launching the container.
```

* Multi-stage build – change the Dockerfile to make it multi-stage.

```
2 stages:
- prod, that just runs the app
docker build --target prod -t provectus-prod .
docker run -ti -p 4000:3000 provectus-prod

- test, that uses supervisord for logging via new endpoints
docker build --target test -t provectus-test .
docker run -ti -p 4000:3000 provectus-test

Use alpine instead of fat ubuntu
No need for apache server here
Installing the ssh server in docker is a bad practice. You can connect via `docker/kubectl exec`
For just reading logs use the new endpoints in test build:
- http://localhost:4000/logs/app
- http://localhost:4000/logs/supervisord
Supervisor package depends on python so to keep it slim better use a Go binary instead

original: 987MB
test: 74.2MB
prod: 64.2MB
```
