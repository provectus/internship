## Prerequsite

* Minikube v1.6.2 or greater with ingress plugin enabled

* Helm 3.2.3 or greater

## Questions

1. What is Kubernetes and what is it for?

It is a container orchestration platform. It is used to automate manual processes so that it would be possible to easily and efficiently manage, deploy and scale containerized apps. It enables to schedule and run containers on clusters.

2. What Kubernetes entities can you list and what is their purpose?

Cluster - a set of physical or virtual that are connected to work as a single unit
    Node - VM or a physical computer that serves as a worker machine
    Control Pane - to coordinate cluster work

3. What tools did you use to work with Kubernetes and what tasks did you solve?

I do not have a serious experience working with Kubernetes. The only devOps-related software I have used are Docker, Ansible and Jenkins

4. What is helm chart?

A chart is a collection of files that describe a set of Kubernetes resources. Chart can be used to deploy a full web app stack, a simple website or whatever you can imagine. Charts are created as files laid out in a particular directory tree.

5. What is an umbrella chart?

This is the name for several Helm charts. Usually it is applicable for a collection of some services that should be treated as a single unit, but each of them has its own Helm chart.

## Tasks

* create helm charts for applications from [docker-compose](../03%20-%20docker-compose) task

* create an umbrella helm chart for you helm charts

* `*` Lint and deploy the umbrella helm chart

* `*` Deploy logging and monitoring tools for your users



