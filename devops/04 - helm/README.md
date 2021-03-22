## Prerequsite

* Minikube v1.6.2 or greater with ingress plugin enabled

* Helm 3.2.3 or greater

## Questions

1. What is Kubernetes and what is it for?

    Kubernetes (k8s) is an open-source utility for automatically deploying, maintaining, updating, and orchestrating containers. Kubernetes is also responsible for load balancing and communication between services.

2. What Kubernetes entities can you list and what is their purpose?

    - Cotrol pane - a set of tools for controlling, monitoring and interacting with the cluster.

        Components:
        - kube-apiserver - kube-apiserver is designed to scale horizontally, it scales by deploying more instances.
        - etcd - storage of high reliability and availability of key-value format. Used to store all cluster data and configurations.
        - kube-scheduler - watches for newly created Pods with no assigned node, and selects a node for them to run on.
        - kube-controller-manager - Control Plane component that runs controller processes. 

            Some types of these controllers are:

            - Node controller: Responsible for noticing and responding when nodes go down.
            - Job controller: Watches for Job objects that represent one-off tasks, then creates Pods to run those tasks to completion.
            - Endpoints controller: Populates the Endpoints object (that is, joins Services & Pods).
            - Service Account & Token controllers: Create default accounts and API access tokens for new namespaces.

    - Node (worker) - a physical server that runs processes inside containers. Requires a container runtime and a kubelet component.

        Components:
        - kubelet - an agent that runs on each node in the cluster. It makes sure that containers are running in a Pod.
        - kube-proxy - kube-proxy maintains network rules on nodes. These network rules allow network communication to your Pods from network sessions inside or outside of your cluster.
        - Container runtime - The container runtime is the software that is responsible for running containers.
    - Pod - A standalone or set of containers is not meant to run forever, and when a Pod is terminated it cannot be returned. Typically, Pods do not disappear until they are removed by the user or controller. 
3. What tools did you use to work with Kubernetes and what tasks did you solve?

    I don’t have much experience with kubernetes, so I didn’t use any additional utilities. 
4. What is helm chart?

5. What is an umbrella chart?


## Tasks

* create helm charts for applications from [docker-compose](../03%20-%20docker-compose) task

* create an umbrella helm chart for you helm charts

* `*` Lint and deploy the umbrella helm chart

* `*` Deploy logging and monitoring tools for your users
