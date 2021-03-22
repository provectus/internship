## Prerequsite

* Minikube v1.6.2 or greater

* Docker 19.03 or greater

* Git 2.28 or greater

## Questions

1. What is git flow and its variations?
    GitFlow is a branching model for Git, created by Vincent Driessen. It has attracted a lot of attention because it is very well suited to collaboration and scaling the development team. Mainly, git flow uses "releases" for version distribution.

    Git Flow has several variations that deal with "deployed" branch:
    - Hotfixes - branched directly from a tagged release in the master branch, and when finished are merged back into both master and develop to make sure that the hotfix isn’t accidentally lost when the next regular release occurs.
    - Master-only - abandoning releases branch in favor of using master branch as source for build and delivery.

2. What is Continuous integration ?

    Continuous Integration is a methodology for rolling out small changes. TThe main goal of CI is to set up automated pulling, building, packaging, and testing an application. 

3. What is Continuous deployment?

    Continuous Delivery is the process of automated deployment of an application to a set of infrastructure units. The purpose of the CD is to keep the production and development environments in sync. 
    
4. What types of deployment can you name and describe ? (Green-blue, etc.)

    - Minimum In-Service - specify the minimum number of instances that remain in-service while the rest are updated.
    - Rolling updates - extension of minimum in-service, which consists in specifying the number of simultaneously updated instances at a time, instead of specifying the number of in-service instances.
    - Blue/Green - consists of creating a complete replica of the existing infrastructure for the testing period. When testing is complete, traffic is redirected to the new version of the application. The arrival of Cloud technologies has seriously lowered the cost of this type of delivery. 
    - A/B - virtually identical to Blue/Green, but in this method, we send a small percentage of traffic to our new green environment. This method is capable of switching environments and changing infrastructure, but in a far more precise way than with Blue/Green deployment.

5. What types of testing do you know? What are they?

    - Unit testing - checking that a certain input leads to a known output
    - Component testing - unit testing for a specific component 
    - Integration Testing - Testing the interaction of individual components
    - Regression Testing - checking that new changes do not lead to malfunctions of existing functionality 

6. `*` Describe how the code from the developer's computer reaches the production environment? What stages would you set up?


## Tasks

* Log in to https://circleci.com/ with your github account 

* Edit `.circleci/config.yaml` and create pipelines that:
    * build your [dockerfile](../02%20-%20dockerfile/Dockerfile) with new version tag and store in into a registry (dockerhub or smth else with public access)

    *  `*` update your [docker-compose](../03%20-%20docker-compose/example/docker-compose.yaml) with a new tag and create new release with changelog

    *  `*` update you helm charts and umbrella helm chart, create release in your repository, download release and redeploy umbrella helm chart to minikube for testing
