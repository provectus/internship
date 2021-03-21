## Prerequsite

* Minikube v1.6.2 or greater with ingress plugin enabled

* Helm 3.2.3 or greater

## Questions

1. What is Kubernetes and what is it for?

    Kubernetes is an open source container orchestration platform that automates the manual processes involved in deploying, managing, and scaling containerized applications.

2. What Kubernetes entities can you list and what is their purpose?

    **Pod** - the smallest deployable unit of computing that can be created and managed in Kubernetes. It is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers. 

    **Service** - abstract way to expose an application running on a set of Pods as a network service. Kubernetes gives Pods their own IP addresses and a single DNS name for a set of Pods, and can load-balance across them.

    **Volume** - abstraction that solves the following problems:
    * The loss of files when a container crashes
    * Sharing files between containers running together in a Pod

    **Namespace** - multiple virtual clusters backed by the same physical cluster. Namespaces are intended for use in environments with many users spread across multiple teams, or projects.


3. What tools did you use to work with Kubernetes and what tasks did you solve?

    In order to use with kubernetes I used kompose tool which automatically can create helm charts from the docker-compose.yaml file.


4. What is helm chart?

    Helm Chart is a collection of files that describe a related set of Kubernetes resources. A single helm chart might be used to deploy something simple, like a memcached pod, or something complex, like a full web app stack with HTTP servers, databases, caches and etc.

5. What is an umbrella chart?

    Umbrella Chart is a combination of multiple Helm Charts.


## Tasks

* create helm charts for applications from [docker-compose](../03%20-%20docker-compose) task

    Command that automatically generates helm charts:
    `kompose convert -c`

* create an umbrella helm chart for you helm charts

* `*` Lint and deploy the umbrella helm chart

* `*` Deploy logging and monitoring tools for your users



