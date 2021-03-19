## Prerequsite

* Minikube v1.6.2 or greater with ingress plugin enabled

* Helm 3.2.3 or greater

## Questions

1. What is Kubernetes and what is it for?

The Kubernetes, is also known as K8s, is an open-source system for automating deployment, scaling, and management of containerized applications. Essentially Kubernetes helps us to deploy containers across a pool of compute resources, such as servers. Kubernetes is also handles networking between containers, manages security features, it offers some configuration management features and a lot more than that.  

2. What Kubernetes entities can you list and what is their purpose?

High-level:

- Control pane - a collection of services that control the cluster. Users interact with the cluster using the control plane. It also monitors the state of the cluster.  
- Worker node - a machine that runs and manages containers within the cluster. It also monitors the state of the containers on the node and reports the status back to the control plane. The worker nodes require a container runtime to manage containers, and use a component called kubelet to manage Kubernetes activity on the node.   
- Pod - a set of running containers in the cluster

Low-level:

1) Control Plane components:

- kube-apiserver - The Kubernetes API server acts as a front-end for the control plane. It also validates and configures data for the api objects which include pods, services, replication controllers, and others. The kube-apiserver is running as a Docker container on our master node.
- etcd - basically reliably and highly-available data storage which store data in key-value format. Primarily it is used as the main storage of all cluster configuration data in Kubernetes. One of the main things to remember about this object - it needs to be protected by one of the 2 methods:
   - built-in snapshot - to make consistent snapshot we could use either "etcdctl snapshot save" on running etcd or just copying the member/snap/db but this directory shouldn't be used by the etcd process. 
   - volume shanshots - in case if etcd is running to external storage which supports snapshots for example NetApp volumes. 
- kube-scheduler - watches for newly created Pods with no assigned node, and selects a node for them to run on.
- kube-controller-manager - component that runs controller processes. Each controller is a separate process, and all these processes are compiled into one binary file and executed in one process. These controllers include:
   - Node controller
   - Job controller
   - Endpoints controller
   - Service Account & Token controllers
- cloud-controller-manager - component that runs controllers to interact with cloud provider APIs.

2) Node components:

- kubelet - an agent that runs on each node in the cluster. It makes sure that containers are running in a Pod.
- kube-proxy - performs pretty much the same function as network proxy - maintains network rules on nodes.
- Container runtime - is the software that is responsible for running containers. For example, the Docker is a container runtime. 

3. What tools did you use to work with Kubernetes and what tasks did you solve?

Previously I have never used neither Kubernetes nor Docker. Some time ago I tried to automate my routine work with Ansible so this is the only DevOps tool I used before. During my work on the test for this internship, it was my first time I have ever touched Git and Docker :)      

4. What is helm chart?

The helm - is a package for Kubernetes pretty much the same as yum or apt for Linux. The main function of the helm is to package YAML files and distribute them in public and private repositories. 
The helm chart is a bundle of YAML files. For example, we would like to deploy an Elastic stack for logging. In order to deploy in our Kubernetes cluster it we will need a couple of K8s components like: 
- stateful state which is for stateful applications like databases
- config map for external configuration
- secret for secret data such as credentials
- k8s user with respective permissions
- and also a couple of other services. 
So it makes perfect sense that we could create these YAML files once and package them up and made them available via different repositories for others. So this bundle of YAML files is called helm chart. By using helm install <chart-name> we can deploy the application like Elastic Stack.  

Another feature of the helm chart is a templating engine. Let's say we have an application that was made up of multiple microservices. So instead of writing a YAML file for each microservice, we can define a common blueprint for all the microservices and dynamic values that can be replaced by placeholders. For example, we use the following syntax: name:{{.Value name}} where .Value name will be picked up from external configuration. Where the external configuration comes from an additional YAML file where we define all those values.

5. What is an umbrella chart?

The umbrella charts are charts of charts. They add an extra layer of complexity in case if one helm chart is not enough to deploy an application. 


## Tasks

* create helm charts for applications from [docker-compose](../03%20-%20docker-compose) task

* create an umbrella helm chart for you helm charts

* `*` Lint and deploy the umbrella helm chart

* `*` Deploy logging and monitoring tools for your users



