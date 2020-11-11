## Prerequsite

* Minikube v1.6.2 or greater

* Docker 19.03 or greater

* Git 2.28 or greater

## Questions

1 What is git flow and its variations?

2 What is Continuous integration ?

3 What is Continuous deployment?

4 what types of deployment can you name and describe ? (Green-blue, etc.)

5 What types of testing do you know? What are they?

`*` 6 Describe how the code from the developer's computer reaches the production environment? What stages would you set up?


## Tasks

* login with your github account to https://circleci.com/

* in .circleci/config.yaml create pipeline for:

 * build you [dockerfile](../02%20-%20dockerfile/Dockerfile) with new version tag and store in into registry (dockerhub or smth else with public access)

 `*` update you [docker-compose](../03%20-%20docker-compose/example/docker-compose.yaml) to new tag and create new release with changelog

 `*` update you helm charts and umbrella helm chart, create release in your repository, download release and redeploy umbrella helm chart to minikube for test
