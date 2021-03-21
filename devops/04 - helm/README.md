## Prerequsite

* Minikube v1.6.2 or greater with ingress plugin enabled

* Helm 3.2.3 or greater

## Questions

1. What is Kubernetes and what is it for?
Kubenetes is a container-orchestration system for automating application deployment, scaling and management

2. What Kubernetes entities can you list and what is their purpose?
Pods are minimal deplyment units
Services are sets of pods working together to provide som service
ReplicaSets are used to guarantee availability of a specified number of identical pods

3. What tools did you use to work with Kubernetes and what tasks did you solve?
This was my first time working with Kubernetes and I used `minikube` with `kubectl` to provision my cluster and I tried using `kompose` to create `helm` charts but ran out of time =(

4. What is helm chart?
It is a collection of files that describe a related set of K8s resources, in my understanding it is somewhat analogous to docker-compose but for Kubernetes

5. What is an umbrella chart?
An umbrella chart is a collection of subcharts each of which describes one component of a multicontainer apppication

## Tasks

* create helm charts for applications from [docker-compose](../03%20-%20docker-compose) task

* create an umbrella helm chart for you helm charts

* `*` Lint and deploy the umbrella helm chart

* `*` Deploy logging and monitoring tools for your users



