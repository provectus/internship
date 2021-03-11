## Prerequsite

* Docker 19.03 or greater

## Legend

A node.js application that outputs "Hello world!". 
There is a dockerfile and application code in example/app.js.
You need to optimize the Dockerfile by correcting or adding steps, rewrite the dockerfile to output `Hello ${ENV}`, where `${ENV}` is set via ENV in dockerfile and it is set to the ip address of the running container.

## Questions

1. What is Docker? Which technology is it based on?

    Docker is container runtime tool for applications. Based on containerization technologies like LXC, uses kernel features like namespaces and cgroups to isolate its resources.

2. Look at the Docker file – what would you change in it?

    Delete unnecessary packages. Why do we need to run ssh daemon? It's security leak, we don't need it. Container should stay as simple as possible, and also leightweight. Thats why I used slim image. Use particular image version to avoid compatibility problems in a future. As best practice, run it with non-root user. 

3. How do I pass variables to the Docker file when building and running the container?

    when building - using `--build-arg` option and passing `ARG` to dockerfile. It's available only during build.

    Another option - to define `ENV ENV_VAR=value` in docker file or use `-e ENV_VAR=value` when you run it.

## Tasks

* Dockerfile - Hello ${ENV}, where env is the ip address

    ip address is available only once container is started, so as workaround, I passed it in bash script when I run it

* Multi-stage build – change the Dockerfile to make it multi-stage.

    not really useful in this case, but done
