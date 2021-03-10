## Prerequsite

* Minikube v1.6.2 or greater

* Docker 19.03 or greater

* Git 2.28 or greater

## Questions

1. What is git flow and its variations?

```
An approach of managing branches, PRs and releases

GitHub flow: feat/dev/master

GitLab flow: create feature branches from issues, if passes all tests and approved by teammates, merge to master for deploying on stage. Create tags for merging into prod branch and deploying on prod
```

2. What is Continuous integration ?

```
Merge to master frequently for detecting bugs asap in automated test suites running on CI server. Avoid the pain of merging big feature branches.
```

3. What is Continuous deployment?

```
Deploy frequently in automated way so that features can be released when they are ready instead of waiting for a scheduled release
```

4. What types of deployment can you name and describe ? (Green-blue, etc.)

```
Recreate: causes downtime between turning off old instances and launching new ones
Green-blue: Deploy the new version alongside the previous one, switch traffic to the new version. Expensive, requires twice as much resources
Canary: Same as g/b but the new version is available only for a subset of users to ensure that it works well, then make available for the rest of users
A/B: keep multiple versions for data analytics
```

5. What types of testing do you know? What are they?

```
Unit testing: Tests each component separately using test suites like Junit
Test coverage: Percentage of branches/statements covered by unit tests
Mutation testing: Quality of unit tests by modifying conditions and expecting unit tests to faail
Regression Testing: Check whether the system performs worse than the last time
Smoke testing: Quick sanity checks before proceeding to heavier tests
Integration Testing: Check connection between different modules of the system
UAT: manual checks
```

6. `*` Describe how the code from the developer's computer reaches the production environment? What stages would you set up?

```
computer -> ci_server -> unit_tests -> build -> docker -> smoke_tests -> integration_tests -> regression_test -> deploy_stage -> user_acceptance_tests -> deploy_prod
```


## Tasks

* Log in to https://circleci.com/ with your github account 

* Edit `.circleci/config.yaml` and create pipelines that:
    * build your [dockerfile](../02%20-%20dockerfile/Dockerfile) with new version tag and store in into a registry (dockerhub or smth else with public access)
    
    ```
    https://hub.docker.com/r/kochetov98/provectus-test/tags
    ```

    *  `*` update your [docker-compose](../03%20-%20docker-compose/example/docker-compose.yaml) with a new tag and create new release with changelog
    
    ```
    v0.1.0
    ```
    
    *  `*` update you helm charts and umbrella helm chart, create release in your repository, download release and redeploy umbrella helm chart to minikube for testing
