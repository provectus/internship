## Prerequsite

* Minikube v1.6.2 or greater with ingress plugin enabled

* Helm 3.2.3 or greater

## Questions

1. What is Kubernetes and what is it for?

    Container orchestration tool used to manage containerized applications using its main features - scalability, deployment, self-healing, load balancing, rollouts, rollbacks 

2. What Kubernetes entities can you list and what is their purpose?

    Namespace - provides possibility to logically isolate kubernetes resources from each other

    Pod - the smallest entity in kubernetes, contains one or more container inside, purpose is to run application in container :) .

    ReplicaSet - used to manage set of similar pods together, provides main features - availability and self-healing.
    
    Deployments - the same as ReplicaSet, but higher level of abstraction, provides ability to rollout/rollback applications.

    DaemonSet - pods running on each node in kubernetes cluster as "daemon" (for example, to collect application logs).

    StatefulSet - used for stateful applications, creates unique pods, each of them stores state

    Service - used to expose application to be able to communicate a different set of pods between each other, or used as "proxy" to access application and load balance requests between pods, also can be used as external load balancer in clouds (AWS/GCP etc)

    Ingress - used to access application from outside world. Main entry point to access app for external users.  

    HPA - used to horizontally scale pods replicas up and down depending on different metrics (CPU load is supported by default)


3. What tools did you use to work with Kubernetes and what tasks did you solve?

    Moved containers from running on ec2 to run in kubernetes (AWS EKS). Tools - terraform, kubectl

    Set up jenkins and spinnaker pipelines to deploy apps to Kubernetes. Tools - jenkins, spinnaker

4. What is helm chart?

    Kubernetes manifests (yaml files) combined together into one single package maintained by helm

5. What is an umbrella chart?

    Chart with dependencies and requirements to other charts


## Tasks

* create helm charts for applications from [docker-compose](../03%20-%20docker-compose) task

    We don't need to create nginx chart as we use ingress, charts located inside umbrella chart.

* create an umbrella helm chart for you helm charts

    done

* `*` Lint and deploy the umbrella helm chart

    icon added, no more warnings found.

    `helm install umbrella umbrella`

    Wait for 30-60 seconds until ingress is initialized. `kubectl get ingress` will show IP.

    Add line `IP_ADDRESS_FROM_INGRESS flaskapp.local` to /etc/hosts file.

    Browse to flaskapp.local and enjoy! Data is persistent so it will survive if app/db crash.

* `*` Deploy logging and monitoring tools for your users

    Very basic local installation:

    Install Grafana+Loki+Prometheus

    `helm upgrade --install loki grafana/loki-stack  --set grafana.enabled=true,prometheus.enabled=true,prometheus.alertmanager.persistentVolume.enabled=false,prometheus.server.persistentVolume.enabled=false`

    then get grafana admin password

    `kubectl get secret loki-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo`

    Use grafana app on localhost

    `kubectl port-forward --namespace <YOUR-NAMESPACE> service/loki-grafana 3000:80`

    Browse to localhost:3000, open 'Explore' section and choose pod to watch logs.
