## Prerequsite

* Docker 19.03 or greater

## Legend

A node.js application that outputs "Hello world!". 
There is a dockerfile and application code in example/app.js.
You need to optimize the Dockerfile by correcting or adding steps, rewrite the dockerfile to output `Hello ${ENV}`, where `${ENV}` is set via ENV in dockerfile and it is set to the ip address of the running container.

## Questions

1. What is Docker? Which technology is it based on?
Linux app that isolates apps and environment in container for easy deployment. Lightweight alternative for VMs. Host CPU must support Virtualization.

2. Look at the Docker file – what would you change in it?
Use slim image of node.
No need to include apache because we run node.js app in this example.

3. How do I pass variables to the Docker file when building and running the container?
--build-arg VAR="var"
-e VAR="var"

## Tasks

* Dockerfile - Hello ${ENV}, where env is the ip address
docker run -dp 3000:3000 -e HOST="127.0.0.1" image

* Multi-stage build – change the Dockerfile to make it multi-stage.
1st stage - install node modules for app # no time to think and do smth meaningful