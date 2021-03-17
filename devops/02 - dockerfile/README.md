## Prerequsite

* Docker 19.03 or greater

## Legend

A node.js application that outputs "Hello world!".
There is a dockerfile and application code in example/app.js.
You need to optimize the Dockerfile by correcting or adding steps, rewrite the dockerfile to output `Hello ${ENV}`, where `${ENV}` is set via ENV in dockerfile and it is set to the ip address of the running container.

## Questions

1. What is Docker? Which technology is it based on?
    Docker is an open platform for developing, shipping, and running applications.
    The Docker technology uses the Linux kernel and features of the kernel, like Cgroups and namespaces, to segregate processes so they can run independently.

2. Look at the Docker file – what would you change in it?
    In the docker file I would change the following things:
    1) I'd define the node version and put the same version what was used when the app was written and tested by developer. In long project I would use LTS Node.
    2) I'd also use smaller/lightweight image
    3) I'd remove all steps that aren't belong to the current application
    4) I'd split Build of the app and Build of the container with app inside stages by using Multi-Stage build
    5) I'd use Entrypoint instead of CMD if the app would have several options to run it
    6) I'd add Maintainer field to know who is the developer of the app

3. How do I pass variables to the Docker file when building and running the container?
    ARG VAR

    and then build the docker file with the --build-arg "VAR=value"

    ENV VAR VALUE to set the value for environment variable inside docker file

    When running,
    docker run -e VAR='value'

## Tasks

* Dockerfile - Hello ${ENV}, where env is the ip address
  Completed
* Multi-stage build – change the Dockerfile to make it multi-stage.
  Completed
