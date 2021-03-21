## Prerequsite

* Minikube v1.6.2 or greater

* Docker 19.03 or greater

* Git 2.28 or greater

## Questions

1. What is git flow and its variations?

GitFlow is a branching model of Git that offers a logical branch structure. This logical branch structure will provides a more efficient working environment.

Basic - only master branch
Feature branch - a separate branch is created for each feature
Feature and MR branches - each feature is first in MR and after rewiev it takes a separate branch
Gitflow - Master (for releases), Develop(an ongoing branch for features and testing), Features branches

2. What is Continuous integration ?
Continuous integration is a coding philosophy and set of practices that are aimed at implementing small changes frequently. The technical goal of CI is to establish a consistent and automated way to build, package, and test applications. 

3. What is Continuous deployment?

Continuous deployment start right after CI ends. CD automates the delivery of applications to selected infrastructure environments. Most teams work with multiple environments other than the production, such as development and testing environments, and CD ensures there is an automated way to push code changes to them.

4. What types of deployment can you name and describe ? (Green-blue, etc.)

Minimum In-Service - sustain a certain number of running entities, make changes in others (sometimes one more boundary is set - a maximum number of assets updated simultaneously)
BlueGreen - replicate fully the current infrastructure and have one for stable running (Blue) and the other for testing (Green)
AB - the same as GB, but only a certain portion of traffic is sent to Green infrastructure

5. What types of testing do you know? What are they?

Unit testing - ensure that given a certain input the testd code produces the desired output
Component testing - the same as unit testing, but for a component (some asset that is a part of another bigger system)
Integration Testing - Test how individual components function together
Regression Testing - to check a new feature or component did not break the previously existing functionality
User Acceptance Testing - not majorly related to code, check the conformance to the stakeholder requirements 

6. `*` Describe how the code from the developer's computer reaches the production environment? What stages would you set up?

I would rather not reinvent the wheel - Commit, Build, Test, Release, Deploy, Operate, Monitor


## Tasks

* Log in to https://circleci.com/ with your github account 

* Edit `.circleci/config.yaml` and create pipelines that:
    * build your [dockerfile](../02%20-%20dockerfile/Dockerfile) with new version tag and store in into a registry (dockerhub or smth else with public access)

    *  `*` update your [docker-compose](../03%20-%20docker-compose/example/docker-compose.yaml) with a new tag and create new release with changelog

    *  `*` update you helm charts and umbrella helm chart, create release in your repository, download release and redeploy umbrella helm chart to minikube for testing
