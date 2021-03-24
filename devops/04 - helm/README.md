## Prerequsite

* Minikube v1.6.2 or greater with ingress plugin enabled

* Helm 3.2.3 or greater

## Questions

1. What is Kubernetes and what is it for?
Kubernetes is containerized app orchestration tool.
Kubernetes is used for deployment, scaling and coordination of containerized apps.

2. What Kubernetes entities can you list and what is their purpose?
Kubernetes *master* is used for communication (user interacts with master, master interacts with nodes) and load distribution between cluster nodes.
Kubernetes *nodes* are running app containers under *master* management.
*pod* - group of containers with shared storage and network, smallest deploy unit.
*service* - network service that have entry point, load-balanced between pod.
*volume* - to share files between pods and saving state when pod crashes.
*Namespaces* are a way to divide cluster resources between multiple users (via resource quota)

3. What tools did you use to work with Kubernetes and what tasks did you solve?
create helm chart from docker-compose:
kompose convert -c

4. What is helm chart?
Helm is package manager for kubernetes.
Helm chart is set of files that describes kubernetes resources.

5. What is an umbrella chart?
Combination of helm charts.

## Tasks

* create helm charts for applications from [docker-compose](../03%20-%20docker-compose) task
done

* create an umbrella helm chart for you helm charts

* `*` Lint and deploy the umbrella helm chart

* `*` Deploy logging and monitoring tools for your users



