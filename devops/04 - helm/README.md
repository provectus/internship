## Prerequsite

* Minikube v1.6.2 or greater with ingress plugin enabled

* Helm 3.2.3 or greater

## Questions

1. What is Kubernetes and what is it for?

```
Container orchestration system for large scale deployment and management
```

2. What Kubernetes entities can you list and what is their purpose?

```
Pod - Contains (usually one) container
Service - Direct traffic to a pod. Can be internal type ClusterIP or external LoadBalancer
Deployment - Controls specified number of pod replicas
Secret - Stores encrypted passwords/keys
```

3. What tools did you use to work with Kubernetes and what tasks did you solve?

```
kubectl - The main CLI tool for controlling the cluster
helm - package manager for K8s. Has a repository of charts(templates). Very popular and has a lot of good charts. Had some problems dealing with v2/v3 changes
tanka - K8s configs written in Jsonnet with it's advantages (variables, templates). More convinient than Helm but not so popular
minikube - local deployment
yc managed-kubernetes - For working with k8s in YandexCloud
eksctl - For working with k8s in AWS
prometheus+grafana for monitoring k8s metrics
```

4. What is helm chart?

```
A yaml template that loads variables from a vars file. Converts to a complete k8s yaml config that is uploaded by kubectl to k8s. 
```

5. What is an umbrella chart?

```
Combines multiple helm charts into one chart
```

## Tasks

* create helm charts for applications from [docker-compose](../03%20-%20docker-compose) task

```
Done.

DB uses a PVC so the data isn't lost when db pod crashes or gets evicted
DB is initialised in flaskapp init container
In production it's better to use Ingress controller instead of deploying nginx
```

* create an umbrella helm chart for you helm charts

```
provectus-stack
```

* `*` Lint and deploy the umbrella helm chart

```
$ helm lint provectus-stack
==> Linting provectus-stack
[INFO] Chart.yaml: icon is recommended

1 chart(s) linted, 0 chart(s) failed


$ helm install provectus-stack provectus-stack --namespace provectus --create-namespace --wait
$ minikube service -n provectus nginx
```

* `*` Deploy logging and monitoring tools for your users

```
-
```



