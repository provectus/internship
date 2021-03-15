## Prerequsite

* Minikube v1.6.2 or greater

* Docker 19.03 or greater

* Git 2.28 or greater

## Questions

1. What is git flow and its variations?

    Branching and merging strategy in git.

    Variations:

    classic git flow - master(main) branch with current production code, hotfix branches to do fix in production code, feature branches to develop new features, develop branch to merge feature branches together

    github flow - master(main) branch and other branches then merged to master

    gitlab flow - adds production and/or preprod/uat/staging branches, features merged to master and then code is merged from master to environment branches

2. What is Continuous integration ?

    Software development practice where each team member merge their code into one common branch to be able to identify problems quickly and frequently using different testing and CI tools.

3. What is Continuous deployment?

    Software release practice where build application is going through pipeline for testing and then deployed to production automatically without manual intervention as often as possible.

4. What types of deployment can you name and describe ? (Green-blue, etc.)

    Rollout - replace current version of app with new version

    Blue-green - create new version of app, but don't touch current version. Switch traffic to new version using DNS/LoadBalancing tools, in case of issues switch traffic back to point to previous stable version of app.

    Canary - create new version of app and point to this app only small percentage of users. If everything is good, gradually increase percentages to point to new app.

    A/B - used for testing new features of application, where we release new version along with current version to check new functionality and receive feedback.

5. What types of testing do you know? What are they?

    Unit: test different components/modules of app (methods/functions) separately

    Integration: test how all components of app integrate and work with each other
	
	Regression: test old functionality of app whether its working ok after upgrade
	
	Smoke: sanity check of functionality of whole system
	
	UAT: users acceptance testing to test usability of application from users perspective

6. `*` Describe how the code from the developer's computer reaches the production environment? What stages would you set up?

    Only in ideal world, don't try this in real life (haha, just kidding):

    Commit and push code to git => Unit testing with CI tool => Integration testing with CI tool => CI tool builds application and produces artifact (docker image, archive etc.) => Deploy application to dev environment => Smoke(sanity) tests => Deploy application to staging environment => Smoke(sanity) tests => Regression testing => UAT => Deploy application to production


## Tasks

* Log in to https://circleci.com/ with your github account 

* Edit `.circleci/config.yaml` and create pipelines that:
    * build your [dockerfile](../02%20-%20dockerfile/Dockerfile) with new version tag and store in into a registry (dockerhub or smth else with public access)

        done, job is called "build-and-push"

    *  `*` update your [docker-compose](../03%20-%20docker-compose/example/docker-compose.yaml) with a new tag and create new release with changelog

    *  `*` update you helm charts and umbrella helm chart, create release in your repository, download release and redeploy umbrella helm chart to minikube for testing
